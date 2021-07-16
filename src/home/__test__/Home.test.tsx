import Home from "home";
import { fireEvent, render } from "shared";

describe("Home", () => {
  const setUpComponent = () => {
    const pushMock = jest.fn();

    jest.spyOn(require("next/router"), "useRouter").mockReturnValue({
      push: pushMock,
    } as any);

    const mutateMock = jest
      .fn()
      .mockResolvedValueOnce({ data: { createCampaign: "1234" } });
    jest
      .spyOn(require("@apollo/client"), "useMutation")
      .mockReturnValue([mutateMock, { loading: false } as any]);

    const rendered = render(<Home />);

    return { ...rendered, mutateMock, pushMock };
  };

  it("allows a user to enter a campaign name", () => {
    const { getByPlaceholderText } = setUpComponent();

    const input = getByPlaceholderText("campaign name");
    fireEvent.change(input, { target: { value: "1234" } });

    expect(input).toHaveValue("1234");
  });

  it("button is disabled when first entering page", () => {
    const { getByText } = setUpComponent();

    const button = getByText("create new campaign");
    expect(button).toBeDisabled();
  });

  it("executes a gql when user enters a campaign name and clicks button", () => {
    const { getByPlaceholderText, getByText, mutateMock } = setUpComponent();
    mutateMock.mockReset();
    mutateMock.mockResolvedValueOnce({ data: undefined });

    const input = getByPlaceholderText("campaign name");
    fireEvent.change(input, { target: { value: "1234" } });

    const button = getByText("create new campaign");
    fireEvent.click(button);

    expect(mutateMock).toHaveBeenCalledWith({ variables: { name: "1234" } });
    expect(mutateMock).toHaveBeenCalledWith({ variables: { name: "1234" } });
  });

  it("executes a gql when user enters a campaign name submits", () => {
    const { getByPlaceholderText, mutateMock } = setUpComponent();

    const input = getByPlaceholderText("campaign name");
    fireEvent.change(input, { target: { value: "1234" } });
    fireEvent.submit(input);

    expect(mutateMock).toHaveBeenCalledWith({ variables: { name: "1234" } });
  });
});
