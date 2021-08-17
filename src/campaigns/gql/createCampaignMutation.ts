import gql from "graphql-tag";

export const CreateCampaignGQL = gql`
  mutation CreateCampaign($name: String!) {
    createCampaign(name: $name) {
      id
    }
  }
`;
