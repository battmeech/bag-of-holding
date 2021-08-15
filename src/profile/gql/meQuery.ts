import gql from "graphql-tag";

export const MeGQL = gql`
  query Me {
    me {
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
