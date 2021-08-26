import { NextApiHandler } from "next";
import { getSession } from "shared/session";

export const redirectToProfile: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const newUser = (session as any).userId && !(session as any).username;
  const callbackUrl = req.query.callbackUrl as string;
  res
    .redirect(302, newUser ? `/signup?callbackUrl=${callbackUrl}` : callbackUrl)
    .end();
};
