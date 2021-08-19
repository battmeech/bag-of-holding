import { NextApiHandler } from "next";
import { getSession } from "shared/session";

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const newUser = (session as any).isNewUser;
  const callbackUrl = req.query.callbackUrl as string;
  res
    .redirect(302, newUser ? `/signup?callbackUrl=${callbackUrl}` : callbackUrl)
    .end();
};

export default handler;
