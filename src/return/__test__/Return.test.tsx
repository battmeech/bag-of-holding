import Return from "return";
import { fireEvent, render } from "shared";

describe("Home", () => {
  const setUpComponent = () => {
    const pushMock = jest.fn();

    jest.spyOn(require("next/router"), "useRouter").mockReturnValue({
      push: pushMock,
    } as any);

    const rendered = render(<Return />);

    return { ...rendered, pushMock };
  };

  it("allows a user to enter a campaign ID", () => {
    const { getByPlaceholderText } = setUpComponent();

    const input = getByPlaceholderText("campaign code");
    fireEvent.change(input, { target: { value: "1234" } });

    expect(input).toHaveValue("1234");
  });

  it("button is disabled when first entering page", () => {
    const { getByText } = setUpComponent();

    const button = getByText("go to campaign");
    expect(button).toBeDisabled();
  });
});
