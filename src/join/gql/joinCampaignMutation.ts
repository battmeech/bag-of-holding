import gql from "graphql-tag";

export const JoinCampaignGQL = gql`
  mutation JoinCampaign($campaignId: String!) {
    joinCampaign(campaignId: $campaignId) {
      __typename
      ... on Campaign {
        id
      }
    }
  }
`;
