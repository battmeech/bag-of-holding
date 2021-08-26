import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";

export const createIssue = async (
  req: NextApiRequest,
  res: NextApiResponse,
  issueType: "enhancement" | "bug"
) => {
  if (req.method !== "POST") {
    res.status(405);
    res.json({ message: `${req.method} not supported.` });
  } else {
    const github = new Octokit({
      auth: process.env.GITHUB_API_KEY,
    });

    try {
      await github.rest.issues.create({
        owner: "battmeech",
        repo: "bag-of-holding-web",
        title: `${issueType === "bug" ? "Defect" : "Feature request"}: ${
          req.body.title
        }`,
        body: req.body.content,
        labels: [issueType],
      });

      res.status(200);
      res.json({ message: "success" });
    } catch {
      res.status(500);
    }
  }
};
