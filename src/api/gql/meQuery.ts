import gql from "graphql-tag";

export const MeGQL = gql`
  query Me($userId: ID!) {
    me(userId: $userId) {
      ... on User {
        email
        campaigns {
          id
          name
        }
      }
      ... on UserNotFound {
        message
      }
    }
  }
`;
