import NextAuth from "next-auth";
import { jwt, session, redirect } from "./callbacks";
import { getAppProviders } from "./providers";

export const auth = NextAuth({
  providers: getAppProviders(),
  callbacks: {
    jwt,
    session,
    redirect,
  },
  pages: {
    signIn: "/login",
  },
});
