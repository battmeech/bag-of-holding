import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";
import { getSession } from "shared";

export const createIssue = async (
  req: NextApiRequest,
  res: NextApiResponse,
  issueType: "enhancement" | "bug"
) => {
  const session = await getSession({ req });

  if (!session.user) {
    res.status(401);
    res.json({ message: "You must be signed in to raise an issue" });
    res.end();
  } else if (req.method !== "POST") {
    res.status(405);
    res.json({ message: `${req.method} not supported.` });
    res.end();
  } else {
    const github = new Octokit({
      auth: process.env.GITHUB_API_KEY,
    });

    const { title, content } = JSON.parse(req.body);

    try {
      await github.rest.issues.create({
        owner: "battmeech",
        repo: "bag-of-holding-web",
        title: `${
          issueType === "bug" ? "Defect" : "Feature request"
        }: ${title}`,
        body: content,
        labels: [issueType],
      });

      res.status(200);
      res.json({ message: "success" });
      res.end();
    } catch {
      res.status(500);
      res.json({ message: "internal server error" });
      res.end();
    }
  }
};
