import { createIssue } from "api";
import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => createIssue(req, res, "bug");

export default handler;
