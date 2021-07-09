import gql from "graphql-tag";

export const ModifyMoneyGQL = gql`
  mutation ModifyMoney($id: ID!, $input: ModifyMoneyInput!) {
    modifyMoney(id: $id, input: $input) {
      __typename
      ... on Campaign {
        id
        electrum
        platinum
        gold
        silver
        copper
      }
      ... on CampaignNotFound {
        message
      }
    }
  }
`;
