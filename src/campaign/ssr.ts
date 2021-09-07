import { graphUrl } from "api/config";
import {
  CheckCampaignExists,
  CheckCampaignExistsGQL,
  CheckCampaignExistsVariables,
} from "campaign/gql";
import request from "graphql-request";
import { requireLogin } from "shared";

export const getServerSideProps = requireLogin(async (ctx, { userId }) => {
  const data = await request<CheckCampaignExists, CheckCampaignExistsVariables>(
    graphUrl,
    CheckCampaignExistsGQL,
    { id: ctx.query.campaignId as string },
    {
      "bag-user-id": userId,
    }
  );

  if (!data || data.campaign.__typename === "CampaignNotFound") {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      campaign: data.campaign,
    },
  };
});
