'use server';

import { signIn } from "@/auth";
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
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
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
    otro:number,
    fecha:string
  ) {
    try {
      await sql`
INSERT INTO bank.income (created_at,id_user,id_client,asistencia,puntualidad,escrituras,otro,"date") 
VALUES (now(),${id_user},${id_client},${asistencia},${puntualidad},${escrituras},${otro},${fecha})
ON CONFLICT ("date",id_client) DO UPDATE 
  SET created_at = excluded.created_at, 
      asistencia = excluded.asistencia,
      puntualidad = excluded.puntualidad,
      escrituras = excluded.escrituras,
      otro = excluded.otro
      `;
      console.log(`
INSERT INTO bank.income (created_at,id_user,id_client,asistencia,puntualidad,escrituras,otro,"date") 
VALUES (now(),${id_user},${id_client},${asistencia},${puntualidad},${escrituras},${otro},${fecha})
ON CONFLICT ("date",id_client) DO UPDATE 
  SET created_at = excluded.created_at, 
      asistencia = excluded.asistencia,
      puntualidad = excluded.puntualidad,
      escrituras = excluded.escrituras,
      otro = excluded.otro
      `);
    } catch (error) {
      console.log(error);
      return {
        message: 'Database Error: Failed to Create Invoice.',
      };
    }
   
  }