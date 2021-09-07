import gql from "graphql-tag";

export const CheckCampaignExistsGQL = gql`
  query CheckCampaignExists($id: ID!) {
    campaign(campaignId: $id) {
      __typename
    }
  }
`;
