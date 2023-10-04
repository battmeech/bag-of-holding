import { Header } from "@ui-components/Header";
import { render, screen } from "@testing-library/react";

describe(Header.name, () => {
  it("should render the website name", async () => {
    render(<Header />);

    expect(screen.getByText("bag of holding")).toBeInTheDocument();
  });
});
