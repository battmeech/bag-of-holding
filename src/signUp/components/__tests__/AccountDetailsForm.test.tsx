import userEvent from "@testing-library/user-event";
import { render, screen } from "shared";
import { AccountDetailsForm } from "../AccountDetailsForm";

jest.spyOn(require("next-auth/client"), "useSession").mockReturnValue([
  {
    user: {
      image: "test-image-url",
    },
  },
]);

describe("SignUpForm", () => {
  it("should render a username input", () => {
    render(<AccountDetailsForm onSuccessCallback={jest.fn} />);
    expect(screen.getByLabelText(/username/i)).toBeVisible();
  });

  it("should render an avatar url input", () => {
    render(<AccountDetailsForm onSuccessCallback={jest.fn} />);

    expect(screen.getByLabelText(/avatar url/i)).toBeVisible();
  });

  describe("signup mode", () => {
    it("should render a submit button", () => {
      render(<AccountDetailsForm onSuccessCallback={jest.fn} isSignUp />);

      expect(screen.getByRole("button", { name: /submit/i })).toBeVisible();
    });
  });

  it("should render a save changes button", () => {
    render(<AccountDetailsForm onSuccessCallback={jest.fn} />);

    expect(screen.getByRole("button", { name: /save changes/i })).toBeVisible();
  });

  it("should have a disabled save button by default", () => {
    render(<AccountDetailsForm onSuccessCallback={jest.fn} />);

    expect(
      screen.getByRole("button", { name: /save changes/i })
    ).toBeDisabled();
  });

  it("should enable the save button when the form is dirty", () => {
    render(<AccountDetailsForm onSuccessCallback={jest.fn} />);

    userEvent.type(screen.getByLabelText(/username/i), "some text");
    expect(screen.getByRole("button", { name: /save changes/i })).toBeEnabled();
  });

  it("should prepopulate the avatar url with the session image URL if available", () => {
    render(<AccountDetailsForm onSuccessCallback={jest.fn} />);

    expect(screen.getByLabelText(/avatar url/i)).toHaveValue("test-image-url");
  });
});
