import { graphUrl } from "api/config";
import { request } from "graphql-request";
import { GetServerSideProps } from "next";
import absolute from "next-absolute-url";
import { getSession } from "shared";
import { JoinCampaign, JoinCampaignGQL, JoinCampaignVariables } from "./gql";

export const joinCampaign: GetServerSideProps = async (ctx) => {
  const { userId } = await getSession(ctx);
  const { req, resolvedUrl } = ctx;

  if (!userId) {
    const { origin } = absolute(req);

    const callbackUrl = `${origin}${resolvedUrl}`;

    return {
      redirect: {
        destination: `/login?callbackUrl=${callbackUrl}`,
        permanent: false,
      },
    };
  }

  const campaignId = resolvedUrl.split("/")[2];

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
      permanent: false,
    },
  };
};
