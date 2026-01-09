import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { API_CONFIG } from "@/config/api";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: API_CONFIG.GOOGLE_CLIENT_ID,
      clientSecret: API_CONFIG.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: API_CONFIG.nextAuthSecret,
  pages: {
    signIn: '/',
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        // @ts-expect-error session.user.id is not indexable
        session.user.id = token.sub;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
