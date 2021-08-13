import gql from "graphql-tag";

export const AddItemGQL = gql`
  mutation AddItem($id: ID!, $input: AddItemInput!) {
    addItem(campaignId: $id, input: $input) {
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
      ... on CampaignNotFound {
        message
      }
    }
  }
`;
