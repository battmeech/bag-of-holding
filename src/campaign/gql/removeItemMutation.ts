import gql from "graphql-tag";

export const RemoveItemGQL = gql`
  mutation RemoveItem($id: ID!) {
    removeItem(itemId: $id) {
      __typename
      ... on Campaign {
        id
        items {
          id
          name
          description
          quantity
          notes
        }
      }
      ... on ItemNotFound {
        message
      }
    }
  }
`;
