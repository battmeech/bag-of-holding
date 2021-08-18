import { graphUrl } from "api/config";
import { request } from "graphql-request";
import { NextPageContext } from "next";
import absolute from "next-absolute-url";
import { getUserId } from "shared/session";
import { JoinCampaign, JoinCampaignGQL, JoinCampaignVariables } from "./gql";

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
        destination: `/login${callbackUrl}`,
        permanent: false,
      },
    };
  }

  const campaignId = url.split("/")[2];

  const res = await request<JoinCampaign, JoinCampaignVariables>(
    graphUrl,
    JoinCampaignGQL,
    { campaignId },
    { "bag-user-id": userId as string }
  );

  if (res.joinCampaign.__typename !== "Campaign") {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: `/campaigns/${res.joinCampaign.id}`,
    },
  };
};
