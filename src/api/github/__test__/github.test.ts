import { createIssue } from "../github";
import { Octokit } from "octokit";
import { getSession } from "next-auth/client";

jest.mock("octokit");
jest.mock("next-auth/client");

describe("github api", () => {
  const res = {
    status: jest.fn(),
    json: jest.fn(),
    end: jest.fn(),
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

  const setupSessionMock = (
    session: any = {
      user: {
        email: "test@test.com",
        image: "https://avatars.githubusercontent.com/u/38220395?v=4",
        name: "Test User",
      },
      userId: "ac218e46-2a83-42ee-84bb-c35516edc485",
      username: "user x",
      isNewUser: false,
    }
  ) => {
    (getSession as jest.Mock).mockReturnValueOnce(session);
  };

  it("creates an issue with the enhancement tag", async () => {
    const { create } = setupGithubMock();
    setupSessionMock();
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
    setupSessionMock();
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

  it("sends a 405 when an invalid method is provided", async () => {
    setupSessionMock();
    const req = {
      method: "GET",
    } as any;

    await createIssue(req, res, "bug");

    expect(res.status).toHaveBeenCalledWith(405);
  });

  it("sends a 500 when github fails", async () => {
    setupSessionMock();
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

  it("sends a 401 when a user has no session", async () => {
    setupSessionMock(null);
    const req = {
      method: "POST",
    } as any;

    await createIssue(req, res, "bug");

    expect(res.status).toHaveBeenCalledWith(401);
  });
});
