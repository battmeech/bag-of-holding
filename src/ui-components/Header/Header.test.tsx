import { Header } from "@ui-components/Header";
import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

describe(Header.name, () => {
  it("should render the website name", async () => {
    render(
      <SessionProvider session={null}>
        <Header />
      </SessionProvider>
    );

    expect(screen.getByText("bag of holding")).toBeInTheDocument();
  });
});
