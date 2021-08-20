import { Home } from "home";
import { useSession } from "next-auth/client";
import { render } from "shared";

jest.mock("next-auth/client");
(useSession as jest.Mock).mockReturnValueOnce([null, false]);

describe("Home", () => {
  it("renders", () => {
    const { getByText } = render(<Home />);

    expect(getByText("a place to store all your treasure")).toBeInTheDocument();
  });
});
