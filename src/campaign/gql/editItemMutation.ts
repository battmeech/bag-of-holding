import gql from "graphql-tag";

export const EditItemGQL = gql`
  mutation EditItem($id: ID!, $input: EditItemInput!) {
    editItem(itemId: $id, input: $input) {
      __typename
      ... on Item {
        id
        name
        description
        quantity
        notes
      }
      ... on ItemNotFound {
        message
      }
    }
  }
`;
