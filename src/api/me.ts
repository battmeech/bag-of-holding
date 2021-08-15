import { config } from "config";
import { request } from "graphql-request";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import { Me, MeGQL } from "./gql";

export const me: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session?.userId) return res.status(400).send("no id");
  const response = await request<Me>(config.graphURL, MeGQL, {
    userId: session!.userId,
  });

  res.send(response);
};
