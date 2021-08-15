import { config } from "config";
import { request, gql } from "graphql-request";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const LoginMutation = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      __typename
      id
    }
  }
`;

export default NextAuth({
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
      const res = await request(config.graphURL, LoginMutation, {
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
