import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@server/prisma";
import { getAppProviders } from "@app-auth/providers";

export const authOptions: AuthOptions = {
  providers: getAppProviders(),
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      const sanitizedToken = Object.keys(token).reduce((p, c) => {
        // strip unnecessary properties
        if (c !== "iat" && c !== "exp" && c !== "jti" && c !== "apiToken") {
          return { ...p, [c]: token[c] };
        } else {
          return p;
        }
      }, {});

      return {
        ...session,
        user: { ...sanitizedToken },
        apiToken: token.apiToken,
      };
    },
  },
};
