import { gql } from "graphql-request";

export const editUserMutation = gql`
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
