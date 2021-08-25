import { createIssue } from "api";
import { NextApiHandler } from "next";
import { getSession } from "shared/session";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session.user)
    res
      .status(401)
      .json({ message: "You must be signed in to raise an issue" });
  else createIssue(req, res, "enhancement");
};

export default handler;
