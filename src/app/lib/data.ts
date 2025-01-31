import { sql } from '@vercel/postgres';
import { Attendance, Balance, FechaDB } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchDates(){
    noStore();
    try{
        const data = await sql<FechaDB> `
select date("date") "date", periodo
from bank.dates 
--where date <= date(now())
order by date desc
        `;
        const listDates = data.rows;
        console.log(listDates);
        return listDates;
    } catch(error){
        console.error('Database error:',error);
        throw new Error ('Failed to fetch dates');
    }
}

export async function fetchCardData() {
    noStore();
    try {
      const totalMaestros = sql`
      SELECT COUNT(*) FROM bank.user where role='Maestro'`;
      const totalAlumnos = sql`
      SELECT COUNT(*) FROM bank.client`;
      const totalPuntos = sql`
      SELECT
      SUM(asistencia+puntualidad+escrituras+otro) total
      FROM bank.income`;
       const totalPuntosGastados = sql`
       SELECT
           SUM(amount) total
           FROM bank.expense`;
      const data = await Promise.all([
        totalMaestros,
        totalAlumnos,
        totalPuntos,
        totalPuntosGastados
      ]);
  
      const numberOfTeachers = Number(data[0].rows[0].count ?? '0');
      const numberOfStudents = Number(data[1].rows[0].count ?? '0');
      const totalIncomes = Number(data[2].rows[0].total ?? '0');
      const totalExpenses = Number(data[3].rows[0].total ?? '0');
      
  
      return {
        numberOfTeachers,
        numberOfStudents,
        totalIncomes,
        totalExpenses
      };
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch card data.');
    }
  }

  export async function fetchAttendance(
    barrio: string,
    fecha: string,
  ) {
    noStore();
    try {
      const attendance = await sql<Attendance>`
select dacl.date,
dacl.id id_client,
concat(last_name,' ',name) apellidos_nombres,
coalesce(asistencia,0) asistencia,
coalesce(puntualidad,0) puntualidad,
coalesce(escrituras,0) escrituras,
coalesce(otro,0) otro,
coalesce(asistencia+puntualidad+escrituras+otro,0) total
from 
(select da."date", cl.id,cl.last_name,cl.name, cl.ward
from bank.dates da,
bank.client cl) dacl 
left join bank.income asi on dacl."date" = date(asi.date)
and dacl."id" = asi.id_client 
where dacl.ward = ${barrio}
and dacl.date = ${fecha}
order by last_name`;
      return attendance.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch Attendance.');
    }
  }
  
  const ITEMS_PER_PAGE = 10;
  export async function fetchFilteredExtracts(
    tag: string,
    currentPage: number,
  ) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    try {
      const balances = await sql<Balance>`
select * from 
(select date,
c.tag,
concat(last_name,' ',name) apellidos_nombres,
concat('Seminarios A:',coalesce(asistencia,0),', P:',coalesce(puntualidad,0),', E:',coalesce(escrituras,0)) motivo,
coalesce(asistencia+puntualidad+escrituras+otro,0) monto
from bank.income i inner join bank.client c on i.id_client = c.id
union 
select
created_at,
c.tag,
concat(last_name,' ',name) apellidos_nombres,
reason motivo,
amount*-1 monto
from bank.expense e inner join bank.client c on e.id_client = c.id
) abc
where tag = ${tag}
order by date desc
LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
      const saldo = sql`
      select sum(abc.monto) saldo from 
(select date,
c.tag,
concat(last_name,' ',name) apellidos_nombres,
concat('Seminarios A:',coalesce(asistencia,0),', P:',coalesce(puntualidad,0),', E:',coalesce(escrituras,0)) motivo,
coalesce(asistencia+puntualidad+escrituras+otro,0) monto
from bank.income i inner join bank.client c on i.id_client = c.id
union 
select
created_at,
c.tag,
concat(last_name,' ',name) apellidos_nombres,
reason motivo,
amount*-1 monto
from bank.expense e inner join bank.client c on e.id_client = c.id
) abc
where tag = ${tag}
`;
const saldoLista=balances.rows;
const saldoNumero = Number((await saldo).rows[0].saldo)
      return{ 
        saldoLista,
        saldoNumero
      };
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch balances.');
    }
  }
  
  export async function fetchPuntosPages(tag: string) {
    noStore();
    try {
      const count = await sql`select tag from 
(select date,
c.tag,
concat(last_name,' ',name) apellidos_nombres,
concat('Seminarios A:',coalesce(asistencia,0),', P:',coalesce(puntualidad,0),', E:',coalesce(escrituras,0)) motivo,
coalesce(asistencia+puntualidad+escrituras+otro,0) monto
from bank.income i inner join bank.client c on i.id_client = c.id
union 
select
created_at,
c.tag,
concat(last_name,' ',name) apellidos_nombres,
reason motivo,
amount*-1 monto
from bank.expense e inner join bank.client c on e.id_client = c.id
) abc
where tag = ${tag}
order by date
  `;
      const totalPages = Math.ceil(Number((await count)?.rows.length) / ITEMS_PER_PAGE);
      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch puntos.');
    }
  }