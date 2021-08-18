import { GetServerSideProps, GetServerSidePropsContext } from "next";
import absolute from "next-absolute-url";
import { getSession } from "./session";

export const requireLogin = (gssp?: GetServerSideProps) => {
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

    return gssp ? gssp(ctx) : { props: {} };
  };
};

export const provideSession: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  return { props: { session } };
};
