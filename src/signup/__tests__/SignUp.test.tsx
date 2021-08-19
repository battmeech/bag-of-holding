import { render, screen } from "shared";
import { SignUp } from "signup/SignUp";

describe("SignUp", () => {
  it("should show the user's name in the heading when available", () => {
    jest.spyOn(require("next-auth/client"), "useSession").mockReturnValue([
      {
        user: {
          name: "test person",
        },
      },
    ]);
    render(<SignUp />);
    expect(screen.getByRole("heading", { name: /test person/i })).toBeVisible();
  });
  it("should show 'adventurer' in the heading when no user name is available", () => {
    jest.spyOn(require("next-auth/client"), "useSession").mockReturnValue([{}]);
    render(<SignUp />);
    expect(screen.getByRole("heading", { name: /adventurer/i })).toBeVisible();
  });

  it("should render a signup form", () => {
    jest.spyOn(require("next-auth/client"), "useSession").mockReturnValue([{}]);
    render(<SignUp />);
    expect(screen.getByLabelText(/username/i)).toBeVisible();
    expect(screen.getByLabelText(/avatar url/i)).toBeVisible();
    expect(screen.getByRole("button", { name: /submit/i }));
  });
});
