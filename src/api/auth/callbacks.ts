import { graphUrl } from "api/config";
import { request } from "graphql-request";
import { Account, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Login, LoginGQL, LoginVariables } from "./gql";

export const jwt = async (
  token: JWT,
  user: User | undefined,
  account: Account | undefined
) => {
  if (!user || !account) return token;

  // Fetch the user details from the database and attach to the JWT
  const res = await request<Login, LoginVariables>(graphUrl, LoginGQL, {
    externalId: `${account.provider}-${(user.id as any).toString()}`,
  });

  token.picture = res.login.imageUrl || token.picture;
  token.username = res.login.username;
  token.userId = res.login.id;

  return token;
};

export const session = async (session: Session, token: JWT | User) => {
  session.userId = token.userId;
  session.username = token.username;
  session.isNewUser = token.isNewUser;
  return session;
};

export const redirect = async (url: string, baseUrl: string) => {
  const callbackUrl = url.startsWith(baseUrl) ? url : baseUrl;
  return callbackUrl.match(/\/api\/redirect/i)
    ? callbackUrl
    : `${baseUrl}/api/redirect?callbackUrl=${callbackUrl}`;
};
