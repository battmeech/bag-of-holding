import { Join } from "join";

describe("Join", () => {
  it("returns null", () => {
    const result = Join();

    expect(result).toStrictEqual(null);
  });
});
