import gql from "graphql-tag";

export const LoginGQL = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      __typename
      id
    }
  }
`;
