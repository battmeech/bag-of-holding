import request from "graphql-request";
import { getSession } from "next-auth/client";
import { JoinCampaign } from "../gql";
import { joinCampaign } from "../ssr";

jest.mock("next-auth/client");
jest.mock("graphql-request");

describe("SSR", () => {
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

  const setupGqlMock = (response: JoinCampaign) => {
    (request as jest.Mock).mockReturnValueOnce(response);
  };

  const ctx = {
    req: { headers: { host: "localhost:3000" } },
    resolvedUrl: "/campaigns/12",
  } as any;

  it("redirects an unauthenticated user to login", async () => {
    setupSessionMock(null);

    const result = await joinCampaign(ctx);

    expect(result).toStrictEqual({
      redirect: {
        destination: `/login?callbackUrl=http://localhost:3000/campaigns/12`,
        permanent: false,
      },
    });
  });

  it("redirects to 404 when campaign doesn't exist", async () => {
    setupSessionMock();
    setupGqlMock({ joinCampaign: { __typename: "CampaignNotFound" } });

    const result = await joinCampaign(ctx);

    expect(result).toStrictEqual({
      redirect: {
        destination: `/404`,
        permanent: false,
      },
    });
  });

  it("redirects to campaign page on success", async () => {
    setupSessionMock();
    setupGqlMock({ joinCampaign: { __typename: "Campaign", id: "123" } });

    const result = await joinCampaign(ctx);

    expect(result).toStrictEqual({
      redirect: {
        destination: `/campaigns/123`,
        permanent: false,
      },
    });
  });
});
