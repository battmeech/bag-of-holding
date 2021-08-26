import { createIssue } from "api";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) =>
  createIssue(req, res, "enhancement");

export default handler;
