import { sql } from '@vercel/postgres';
import { Attendance, Balance, fecha, User } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchDates(){
    noStore();
    try{
        const data = await sql<fecha> `
select fecha_numero, periodo
from bank.fecha 
--where fecha <= date(now())
order by fecha_numero desc
        `;
        const listDates = data.rows
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
      SELECT COUNT(*) FROM bank.client where seminario=1`;
      const totalPuntos = sql`
      SELECT
      SUM(asistencia+puntualidad+escrituras+otro+lectura) total
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

  export async function fetchEstrellitas(
    barrio: string,
    fecha: number
  ) {
    noStore();
    try {
      const attendance = await sql<Attendance>`
select dacl.fecha_numero,
dacl.id id_client,
concat(last_name,' ',name) apellidos_nombres,
coalesce(asistencia,0) asistencia,
coalesce(puntualidad,0) puntualidad,
coalesce(escrituras,0) escrituras,
coalesce(otro,0) otro,
coalesce(lectura,0) lectura,
coalesce(estrella,0) estrella,
coalesce(asistencia+puntualidad+escrituras+otro+lectura,0) total
from 
(select da.fecha_numero, cl.id,cl.last_name,cl.name, cl.ward
from (select ${fecha}::int4 fecha_numero) da,
bank.client cl) dacl 
left join bank.income asi on dacl.fecha_numero = asi.fecha_numero
and dacl."id" = asi.id_client 
where dacl.ward = ${barrio}
order by last_name`;
      return attendance.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch Attendance.');
    }
  }


  export async function fetchAttendance(
    barrio: string,
    fecha: number
  ) {
    noStore();
    try {
      const attendance = await sql<Attendance>`
select dacl.fecha_numero,
dacl.id id_client,
concat(last_name,' ',name) apellidos_nombres,
coalesce(asistencia,0) asistencia,
coalesce(puntualidad,0) puntualidad,
coalesce(escrituras,0) escrituras,
coalesce(otro,0) otro,
coalesce(lectura,0) lectura,
coalesce(estrella,0) estrella,
coalesce(asistencia+puntualidad+escrituras+otro+lectura,0) total
from 
(select da.fecha_numero, cl.id,cl.last_name,cl.name, cl.ward, cl.seminario
from bank.fecha da,
bank.client cl) dacl 
left join bank.income asi on dacl.fecha_numero = asi.fecha_numero
and dacl."id" = asi.id_client 
where dacl.ward = ${barrio}
and dacl.fecha_numero = ${fecha}
and seminario = 1
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
(select fecha_numero,
c.tag,
concat(last_name,' ',name) apellidos_nombres,
concat('Seminarios A:',coalesce(asistencia,0),', P:',coalesce(puntualidad,0),', E:',coalesce(escrituras,0)) motivo,
coalesce(asistencia+puntualidad+escrituras+otro+lectura,0) monto
from bank.income i inner join bank.client c on i.id_client = c.id
union 
select
fecha_numero,
c.tag,
concat(last_name,' ',name) apellidos_nombres,
reason motivo,
amount*-1 monto
from bank.expense e inner join bank.client c on e.id_client = c.id
) abc
where tag = ${tag}
order by fecha_numero desc
LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
      const saldo = sql`
select sum(abc.monto) saldo from 
(select fecha_numero,
c.tag,
concat(last_name,' ',name) apellidos_nombres,
concat('Seminarios A:',coalesce(asistencia,0),', P:',coalesce(puntualidad,0),', E:',coalesce(escrituras,0)) motivo,
coalesce(asistencia+puntualidad+escrituras+otro+lectura,0) monto
from bank.income i inner join bank.client c on i.id_client = c.id
union 
select
fecha_numero,
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
(select fecha_numero,
c.tag,
concat(last_name,' ',name) apellidos_nombres,
concat('Seminarios A:',coalesce(asistencia,0),', P:',coalesce(puntualidad,0),', E:',coalesce(escrituras,0)) motivo,
coalesce(asistencia+puntualidad+escrituras+otro+lectura,0) monto
from bank.income i inner join bank.client c on i.id_client = c.id
union 
select
fecha_numero,
c.tag,
concat(last_name,' ',name) apellidos_nombres,
reason motivo,
amount*-1 monto
from bank.expense e inner join bank.client c on e.id_client = c.id
) abc
where tag = ${tag}
order by fecha_numero desc
  `;
      const totalPages = Math.ceil(Number((await count)?.rows.length) / ITEMS_PER_PAGE);
      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch puntos.');
    }
  }

  export async function getUser(name: string): Promise<User | undefined> {
    try {
      const user = await sql<User>`SELECT "id", "id" as id_user,"name","password","role",ward
FROM bank."user" where "name" = ${name}`;
      return user.rows[0];
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }