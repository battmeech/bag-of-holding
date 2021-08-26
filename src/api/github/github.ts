import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";
import { getSession } from "shared/session";

export const createIssue = async (
  req: NextApiRequest,
  res: NextApiResponse,
  issueType: "enhancement" | "bug"
) => {
  const session = await getSession({ req });

  if (!session.user) {
    res.status(401);
    res.json({ message: "You must be signed in to raise an issue" });
  } else if (req.method !== "POST") {
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
