import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import absolute from "next-absolute-url";
import { getSession, SessionWithID } from "./session";

export const requireLogin = (
  gssp?: (
    // eslint-disable-next-line no-unused-vars
    context: GetServerSidePropsContext,
    // eslint-disable-next-line no-unused-vars
    session: SessionWithID
  ) => GetServerSidePropsResult<any> | Promise<GetServerSidePropsResult<any>>
) => {
  return async (ctx: GetServerSidePropsContext) => {
    const session = await getSession(ctx);

    if (!session.userId) {
      const { req, resolvedUrl } = ctx;
      const { origin } = absolute(req);

      const callbackUrl = `${origin}${resolvedUrl}`;

      return {
        redirect: {
          destination: `/login?callbackUrl=${callbackUrl}`,
          permanent: false,
        },
      };
    }

    return gssp ? gssp(ctx, session) : { props: {} };
  };
};

export const provideSession: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  return { props: { session } };
};
