import type { DefaultSession, NextAuthConfig } from 'next-auth';
import { getUser } from './app/lib/data';
import { User } from './app/lib/definitions';

declare module "next-auth" {
  interface Session {
    user: {
      id_user: number,
      ward: string,
    } & DefaultSession["user"]
  }
}
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/puntos');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/puntos', nextUrl));
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        if(user.email!=null){
          token.user = await getUser(user.name|| '')
        }else{
          token.user=user;
        }
        //
      }
      return token;
    },
    session(sessionArgs) {
      // token only exists when the strategy is jwt and not database, so sessionArgs here will be { session, token }
      // with a database strategy it would be { session, user } 
      if ("token" in sessionArgs) {
         const session = sessionArgs.session;
         if ("user" in sessionArgs.token) {
           const tokenUser = sessionArgs.token.user as User;
           if (tokenUser.id) {
             session.user.id = tokenUser.id;
             session.user.id_user = tokenUser.id_user;
             session.user.ward = tokenUser.ward;
             return session;
           }
         }
      }
      return sessionArgs.session;
     },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;