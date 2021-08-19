import { render, screen } from "shared";
import { SignUpForm } from "../SignUpForm";

jest.spyOn(require("next-auth/client"), "useSession").mockReturnValue([
  {
    user: {
      image: "test-image-url",
    },
  },
]);

describe("SignUpForm", () => {
  it("should render a username input", () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/username/i)).toBeVisible();
  });
  it("should render an avatar url input", () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/avatar url/i)).toBeVisible();
  });
  it("should render a submit button", () => {
    render(<SignUpForm />);
    expect(screen.getByRole("button", { name: /submit/i })).toBeVisible();
  });
  it("should prepopulate the avatar url with the session image URL if available", () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/avatar url/i)).toHaveValue("test-image-url");
  });
});
