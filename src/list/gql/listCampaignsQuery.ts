import gql from "graphql-tag";

export const ListCampaignsGQL = gql`
  query ListCampaigns {
    listCampaigns {
      __typename
      id
      name
    }
  }
`;
