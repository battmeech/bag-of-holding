import gql from "graphql-tag";

export const ListCampaignsGQL = gql`
  query ListCampaigns {
    campaigns {
      __typename
      id
      name
      userCount
      itemCount
    }
  }
`;
