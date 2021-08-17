import gql from "graphql-tag";

export const AddUserGQL = gql`
  mutation AddUser($campaignId: String!) {
    addUser(campaignId: $campaignId) {
      __typename
      ... on Campaign {
        id
      }
    }
  }
`;
