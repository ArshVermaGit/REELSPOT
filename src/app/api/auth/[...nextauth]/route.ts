import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { API_CONFIG } from "@/config/api";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: API_CONFIG.GOOGLE_CLIENT_ID,
      clientSecret: API_CONFIG.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: API_CONFIG.nextAuthSecret,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/',
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user && token.sub) {
        // @ts-expect-error session.user.id is not indexable
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
