import { graphUrl } from "api/config";
import { request } from "graphql-request";
import { NextPageContext } from "next";
import absolute from "next-absolute-url";
import { getUserId } from "shared/session";
import { AddUser, AddUserGQL, AddUserVariables } from "./gql";

export const addToCampaign = async (ctx: NextPageContext) => {
  const userId = await getUserId(ctx);
  const { req } = ctx;

  if (!req?.url) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  const { url } = req;

  if (!userId) {
    const { origin } = absolute(req);

    const callbackUrl = `?callbackUrl=${origin}${url}`;

    return {
      redirect: {
        destination: `/auth/signin${callbackUrl}`,
        permanent: false,
      },
    };
  }

  const campaignId = url.split("/")[2];

  const res = await request<AddUser, AddUserVariables>(
    graphUrl,
    AddUserGQL,
    { campaignId },
    { "bag-user-id": userId as string }
  );

  if (res.addUser.__typename !== "Campaign") {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: `/campaigns/${res.addUser.id}`,
    },
  };
};
