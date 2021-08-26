import { getAppProviders } from "../providers";

describe("providers", () => {
  it("filters the list of providers so there are no empty keys or secrets", () => {
    process.env = { NODE_ENV: "test" };
    process.env.GITHUB_CLIENT_ID = "1";
    process.env.GITHUB_CLIENT_SECRET = "2";

    const providers = getAppProviders();

    expect(providers.length).toStrictEqual(1);
  });
});
