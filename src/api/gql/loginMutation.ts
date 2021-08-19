import gql from "graphql-tag";

export const LoginGQL = gql`
  mutation Login($externalId: String!) {
    login(externalId: $externalId) {
      __typename
      id
      username
    }
  }
`;
