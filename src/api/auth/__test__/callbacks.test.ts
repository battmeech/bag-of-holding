import { request } from "graphql-request";
import { JWT } from "next-auth/jwt";
import { jwt, redirect, session } from "../callbacks";
import { Login } from "../gql";

jest.mock("graphql-request");

describe("callbacks", () => {
  const createJwt = (): JWT => ({ email: "test@test.com", name: "test guy" });

  describe("jwt", () => {
    const setupGqlMock = (response: Login) => {
      (request as jest.Mock).mockReturnValueOnce(response);
    };
    it("returns the token as is if user or account are undefined", async () => {
      const token = createJwt();

      const result = await jwt(token, undefined, undefined);

      expect(result).toStrictEqual(token);
    });

    it("attaches details from the db when found", async () => {
      const token = createJwt();
      setupGqlMock({
        login: {
          id: "abc-123",
          __typename: "User",
          imageUrl: "https://pictures.com",
          username: "testUser",
        },
      });

      const result = await jwt(token, { id: "1234" }, {
        provider: "Google",
      } as any);

      expect(result.userId).toStrictEqual("abc-123");
      expect(result.picture).toStrictEqual("https://pictures.com");
      expect(result.username).toStrictEqual("testUser");
    });
  });

  describe("session", () => {
    it("enriches session with token data", async () => {
      const token = createJwt();
      token.userId = "123";
      token.username = "testUser";
      token.isNewUser = false;

      const result = await session({}, token);

      expect(result.userId).toStrictEqual(token.userId);
      expect(result.username).toStrictEqual(token.username);
      expect(result.isNewUser).toStrictEqual(token.isNewUser);
    });
  });

  describe("redirect", () => {
    it("constructs the correct url", async () => {
      const result = await redirect(
        "https://www.bagofholding.xyz/campaigns/12",
        "https://www.bagofholding.xyz"
      );

      expect(result).toStrictEqual(
        "https://www.bagofholding.xyz/api/redirect?callbackUrl=https://www.bagofholding.xyz/campaigns/12"
      );
    });

    it("goes to the home page if the url does not match the baseUrl", async () => {
      const result = await redirect(
        "https://bagofholding.xyz/campaigns/12",
        "https://www.bagofholding.xyz"
      );

      expect(result).toStrictEqual(
        "https://www.bagofholding.xyz/api/redirect?callbackUrl=https://www.bagofholding.xyz"
      );
    });

    it("does not add another /api/redirect if it's already in the url", async () => {
      const result = await redirect(
        "https://www.bagofholding.xyz/api/redirect?callbackUrl=https://www.bagofholding.xyz",
        "https://www.bagofholding.xyz"
      );

      expect(result).toStrictEqual(
        "https://www.bagofholding.xyz/api/redirect?callbackUrl=https://www.bagofholding.xyz"
      );
    });
  });
});
