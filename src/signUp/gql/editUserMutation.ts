import gql from "graphql-tag";

export const EditUserGQL = gql`
  mutation EditUser($input: EditUserInput!) {
    editUser(input: $input) {
      __typename
      ... on User {
        id
      }
      ... on UserNotFound {
        message
      }
    }
  }
`;
