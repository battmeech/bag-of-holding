import gql from "graphql-tag";

export const FetchCampaignGQL = gql`
  query FetchCampaign($id: ID!) {
    fetchCampaign(id: $id) {
      __typename
      ... on Campaign {
        id
        name
        electrum
        platinum
        gold
        silver
        copper
        items {
          id
          name
          description
          quantity
        }
      }
      ... on CampaignNotFound {
        message
      }
    }
  }
`;
