export type fecha = {
    fecha_numero: number;
    periodo: string;
}

export type Attendance = {
    fecha_numero: number;
    id_client: number;
    apellidos_nombres: string;
    asistencia: number;
    puntualidad: number;
    escrituras: number;
    otro: number;
    lectura: number;
    estrella:number;
    total:number;
}

export type Balance = {
    fecha_numero: number,
    tag: string,
    apellidos_nombres: string;
    motivo: string;
    monto: number;
}

export type User = {
    id: string;
    id_user: number;
    name: string;
    password: string;
    role: string;
    ward: string;
}