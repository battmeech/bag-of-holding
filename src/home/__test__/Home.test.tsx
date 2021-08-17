import { Home } from "home";
import { render } from "shared";

describe("Home", () => {
  it("renders", () => {
    const { getByText } = render(<Home />);

    expect(getByText("a place to store all your treasure")).toBeInTheDocument();
  });
});
