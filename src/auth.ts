import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import { authConfig } from './auth.config';

async function getUser(name: string,password: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`
    SELECT * FROM bank.user
    where "user"=${name}
    and password = ${password}
    `;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ name: z.string(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { name, password } = parsedCredentials.data;
          const user = await getUser(name,password);
          if (!user) return null;
          return user;
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});