import { config } from "config";
import { request } from "graphql-request";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { Login, LoginGQL } from "./gql";

export const auth = NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // Fetch the ID of the user from the database and attach to the JWT
    jwt: async (token, user) => {
      if (!user) return token;
      const res = await request<Login>(config.graphURL, LoginGQL, {
        input: {
          email: user.email,
        },
      });
      token.userId = res.login.id;
      return token;
    },
    // Expose the user ID in the next-auth session
    session: async (session, token) => {
      session.userId = token.userId;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
