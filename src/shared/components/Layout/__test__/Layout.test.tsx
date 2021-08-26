import { render, fireEvent } from "shared";
import { Layout } from "../Layout";
import { useSession, signIn, signOut } from "next-auth/client";

jest.mock("next-auth/client");

describe("Layout", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const setupComponent = ({
    session = {},
    sessionLoading = false,
  }: {
    session?: any;
    sessionLoading?: boolean;
  }) => {
    (useSession as jest.Mock).mockReturnValue([session, sessionLoading]);
    const rendered = render(
      <Layout>
        <p>Child content</p>
      </Layout>
    );
    return rendered;
  };

  it("renders child content", () => {
    const { getByText } = setupComponent({});

    expect(getByText("Child content")).toBeInTheDocument();
  });

  it("renders sign in button when there is no session", () => {
    const { getByText } = setupComponent({ session: null });

    expect(getByText("sign in")).toBeInTheDocument();
  });

  it("clicking sign in calls the sign in function", () => {
    const { getByText } = setupComponent({ session: null });

    fireEvent.click(getByText("sign in"));

    expect(signIn as unknown as jest.Mock).toHaveBeenCalled();
  });

  it("renders a user avatar when there is a session", () => {
    const { getByLabelText } = setupComponent({
      session: { user: { id: "1234" } },
    });

    expect(getByLabelText("user avatar")).toBeInTheDocument();
  });

  it("clicking sign out redirects user to home page", () => {
    const { getByLabelText, getByText } = setupComponent({
      session: { user: { id: "1234" } },
    });

    fireEvent.click(getByLabelText("user avatar"));
    fireEvent.click(getByText("sign out"));

    expect(signOut as unknown as jest.Mock).toHaveBeenCalledWith({
      callbackUrl: "/",
    });
  });
});
