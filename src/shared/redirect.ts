import { NextPageContext } from "next";
import absolute from "next-absolute-url";
import { getSession } from "next-auth/client";

export async function redirect(ctx: NextPageContext) {
  const session = await getSession(ctx);

  if (!session) {
    const { req } = ctx;
    const { origin } = absolute(req);

    const callbackUrl = `?callbackUrl=${origin}${req?.url}`;

    return {
      redirect: {
        destination: `/auth/signin${callbackUrl}`,
        permanent: false,
      },
    };
  }

  return { props: {} };
}
