import gql from "graphql-tag";

export const RemoveItemGQL = gql`
  mutation RemoveItem($id: ID!, $input: RemoveItemInput!) {
    removeItem(id: $id, input: $input) {
      __typename
      ... on Campaign {
        id
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
