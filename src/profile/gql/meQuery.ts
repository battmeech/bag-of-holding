import gql from "graphql-tag";

export const MeGQL = gql`
  query Me {
    me {
      ... on User {
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
