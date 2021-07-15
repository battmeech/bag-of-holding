import gql from "graphql-tag";

export const EditItemGQL = gql`
  mutation EditItem($id: ID!, $input: EditItemInput!) {
    editItem(id: $id, input: $input) {
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
