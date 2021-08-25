import { createIssue } from "api/github";
import { Octokit } from "octokit";

jest.mock("octokit");

describe("github api", () => {
  const res = {
    status: jest.fn(),
    json: jest.fn(),
  } as any;

  const setupGithubMock = () => {
    const create = jest.fn().mockResolvedValue(200);
    (Octokit as unknown as jest.Mock).mockImplementation(() => ({
      rest: {
        issues: {
          create,
        },
      },
    }));

    return { create };
  };

  it("creates an issue with the enhancement tag", async () => {
    const { create } = setupGithubMock();
    const req = {
      method: "POST",
      body: {
        title: "serious feature",
        content: "feature idea",
      },
    } as any;

    await createIssue(req, res, "enhancement");

    expect(create).toHaveBeenCalledWith({
      body: "feature idea",
      labels: ["enhancement"],
      owner: "battmeech",
      repo: "bag-of-holding-web",
      title: "Feature request: serious feature",
    });
  });

  it("creates an defect with the bug tag", async () => {
    const { create } = setupGithubMock();
    const req = {
      method: "POST",
      body: {
        title: "serious bug",
        content: "defect",
      },
    } as any;

    await createIssue(req, res, "bug");

    expect(create).toHaveBeenCalledWith({
      body: "defect",
      labels: ["bug"],
      owner: "battmeech",
      repo: "bag-of-holding-web",
      title: "Defect: serious bug",
    });
  });

  it("sends a 405 when an invalid method is provided", () => {
    const req = {
      method: "GET",
    } as any;

    createIssue(req, res, "bug");

    expect(res.status).toHaveBeenCalledWith(405);
  });

  it("sends a 500 when github fails", async () => {
    const req = {
      method: "POST",
      body: {
        title: "serious feature",
        content: "feature idea",
      },
    } as any;

    const failedCreate = jest.fn().mockRejectedValue(500);
    (Octokit as unknown as jest.Mock).mockImplementation(() => ({
      rest: {
        issues: {
          create: failedCreate,
        },
      },
    }));

    await createIssue(req, res, "bug");

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
