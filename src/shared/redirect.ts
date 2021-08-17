import { NextPageContext } from "next";
import absolute from "next-absolute-url";
import { getUserId } from "./session";

export const redirect = async (ctx: NextPageContext) => {
  const userId = await getUserId(ctx);
  const { req } = ctx;

  if (!req) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  const { url } = req;

  if (!userId) {
    const { req } = ctx;
    const { origin } = absolute(req);

    const callbackUrl = `?callbackUrl=${origin}${url}`;

    return {
      redirect: {
        destination: `/auth/signin${callbackUrl}`,
        permanent: false,
      },
    };
  }

  return { props: {} };
};
