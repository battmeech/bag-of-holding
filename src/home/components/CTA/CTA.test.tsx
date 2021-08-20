import { useSession } from "next-auth/client";
import React from "react";
import { render, screen } from "shared";
import { CTA } from ".";

jest.mock("next-auth/client");

describe("CTA", () => {
  it("should render a 'get started' button", () => {
    (useSession as jest.Mock).mockReturnValueOnce([{ isNewUser: true }, false]);
    render(<CTA />);
    expect(screen.getByRole("button", { name: /get started/i })).toBeVisible();
  });
  it("should render a 'sign in' button", () => {
    (useSession as jest.Mock).mockReturnValueOnce([null, false]);
    render(<CTA />);
    expect(screen.getByRole("button", { name: /sign in/i })).toBeVisible();
  });
  it("should render a 'see campaigns' button", () => {
    (useSession as jest.Mock).mockReturnValueOnce([{ userId: 23 }, false]);
    render(<CTA />);
    expect(
      screen.getByRole("button", { name: /see campaigns/i })
    ).toBeVisible();
  });
});
