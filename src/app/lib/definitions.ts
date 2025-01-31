export type FechaDB = {
    date: Date;
    periodo: string;
}

export type Attendance = {
    date: string;
    id_client: number;
    apellidos_nombres: string;
    asistencia: number;
    puntualidad: number;
    escrituras: number;
    otro: number;
    total:number;
}

export type Balance = {
    date: string,
    tag: string,
    apellidos_nombres: string;
    motivo: string;
    monto: number;
}

export type User = {
    id: string;
    name: string;
    password: string;
    role: string;
    ward: string;
}