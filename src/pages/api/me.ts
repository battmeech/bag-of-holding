import { config } from "config";
import request, { gql } from "graphql-request";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

const MeQuery = gql`
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

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session?.userId) return res.status(400).send("no id");
  const response = await request(config.graphURL, MeQuery, {
    userId: session!.userId,
  });
  res.send(response);
};

export default handler;
