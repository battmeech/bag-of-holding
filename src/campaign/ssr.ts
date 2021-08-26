import { graphUrl } from "api/config";
import { FetchCampaign, FetchCampaignVariables } from "campaign/gql";
import request, { gql } from "graphql-request";
import { requireLogin } from "shared";

export const getServerSideProps = requireLogin(async (ctx, { userId }) => {
  const data = await request<FetchCampaign, FetchCampaignVariables>(
    graphUrl,
    gql`
      query FetchCampaign($id: ID!) {
        campaign(campaignId: $id) {
          __typename
          ... on Campaign {
            id
          }
          ... on CampaignNotFound {
            message
          }
        }
      }
    `,
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
