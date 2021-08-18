import React from "react";
import { render, screen } from "shared";
import { CTA } from ".";

describe("CTA", () => {
  it("should render a 'get started' button", () => {
    render(<CTA />);
    expect(screen.getByRole("button", { name: /get started/i })).toBeVisible();
  });
});
