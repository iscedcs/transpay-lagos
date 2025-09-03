import { decodeJwt } from "jose";
import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { API, URLS } from "./lib/const";

const headers = {
  "api-secret": process.env.API_SECRET || "",
  "Content-Type": "application/json",
};

export default {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🔑 [authorize] Starting credentials authorization...");

        const apiRoute = URLS.auth.signin.agent;
        const loginPayload = {
          email: credentials?.email,
          password: credentials?.password,
        };
        const mainUrl = API + apiRoute;

        console.log("🌍 [authorize] API route:", apiRoute);
        console.log("📡 [authorize] Full API URL:", mainUrl);
        console.log("📦 [authorize] Login payload:", loginPayload);
        console.log("📝 [authorize] Headers:", headers);

        try {
          const res = await fetch(mainUrl, {
            method: "POST",
            body: JSON.stringify(loginPayload),
            headers,
          });

          console.log("📨 [authorize] Response status:", res.status);
          console.log("📨 [authorize] Response ok?:", res.ok);

          const result = await res.json();
          console.log("✅ [authorize] Raw API response:", result);

          if (!result.success) {
            console.log("❌ [authorize] Login failed — returning null.");
            return null;
          }

          const user = result.user;
          console.log("👤 [authorize] User object from API:", user);

          const decoded = decodeJwt(result.jwtToken);
          console.log("🔓 [authorize] Decoded JWT payload:", decoded);

          const authUser = {
            id: user.id,
            email: user.email,
            role: user.role,
            access_token: result.jwtToken,
            name: `${user.firstName} ${user.lastName}`,
            token_type: "JWT",
            expires_in: String(decoded.exp),
          };

          console.log("🎉 [authorize] Final user object to return:", authUser);
          return authUser;
        } catch (error) {
          console.error("💥 [authorize] Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
