import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.access_token = token.access_token as string;
        session.user.name = token.name as string;
        session.user.expires = String(token.picture) as string;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.access_token || "";
        token.role = user.role || "default";
        token.id = user.id || "";
        token.email = user.email;
        token.name = user.name || "User";
        token.picture = user.expires_in;
      }
      return token;
    },
  },
});
