'use server';

import { signIn, signOut } from "@/auth";
import { sql } from "@vercel/postgres";
import { AuthError } from "next-auth";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Usuario o Contraseña Incorrecta.';
          default:
            return 'Algo salió mal.';
        }
      }
      throw error;
    }
  }
  export async function updateAttendace(
    id_user:number,
    id_client:number,
    asistencia:number,
    puntualidad:number,
    escrituras:number,
    lectura:number,
    otro:number,
    estrella:number,
    fecha:number
  ) {
    try {
      await sql`
INSERT INTO bank.income (created_at,id_user,id_client,asistencia,puntualidad,escrituras,lectura,otro,estrella,fecha_numero) 
VALUES (now(),${id_user},${id_client},${asistencia},${puntualidad},${escrituras},${lectura},${otro},${estrella},${fecha})
ON CONFLICT (fecha_numero,id_client) DO UPDATE 
  SET created_at = excluded.created_at, 
      asistencia = excluded.asistencia,
      puntualidad = excluded.puntualidad,
      escrituras = excluded.escrituras,
      lectura = excluded.lectura,
      otro = excluded.otro,
      estrella = excluded.estrella
      `;      
    } catch (error) {
      console.log(error);
      return {
        message: 'Database Error: Failed to Create Invoice.',
      };
    }
  }
  export async function signout(){
    await signOut();
  }