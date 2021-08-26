import { redirectToProfile } from "../redirect";
import { getSession } from "next-auth/client";

jest.mock("next-auth/client");

describe("redirect", () => {
  const res = {
    redirect: jest.fn(),
    end: jest.fn(),
  } as any;

  const setupSessionMock = (isNewUser: boolean) => {
    (getSession as jest.Mock).mockReturnValueOnce({
      user: {
        email: "test@test.com",
        image: "https://avatars.githubusercontent.com/u/38220395?v=4",
        name: "Test User",
      },
      userId: "ac218e46-2a83-42ee-84bb-c35516edc485",
      username: isNewUser ? undefined : "user x",
      isNewUser,
    });
  };

  it("redirects a new user to the signup page", async () => {
    setupSessionMock(true);

    await redirectToProfile(
      { query: { callbackUrl: "/campaigns" } } as any,
      res
    );

    expect(res.redirect).toHaveBeenCalledWith(
      302,
      "/signup?callbackUrl=/campaigns"
    );
  });

  it("redirects an existing user to their desired page", async () => {
    setupSessionMock(false);

    await redirectToProfile(
      { query: { callbackUrl: "/campaigns" } } as any,
      res
    );

    expect(res.redirect).toHaveBeenCalledWith(302, "/campaigns");
  });
});
