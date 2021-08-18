import { Campaigns } from "campaigns";
import { ListCampaignsGQL } from "campaigns/gql";
import { useRouter } from "next/router";
import { fireEvent, render } from "shared";

jest.mock("next/router");

describe("Campaigns", () => {
  (useRouter as jest.Mock).mockReturnValue({ push: jest.fn });

  it("executes a gql query on load", () => {
    const gqlSpy = jest
      .spyOn(require("@apollo/client"), "useQuery")
      .mockReturnValue({} as any);

    render(<Campaigns />);

    expect(gqlSpy).toHaveBeenCalledWith(ListCampaignsGQL);
  });

  it("displays campaigns that are returned", () => {
    jest.spyOn(require("@apollo/client"), "useQuery").mockReturnValue({
      data: {
        campaigns: [
          { name: "My campaign", id: "12", itemCount: 0, userCount: 0 },
        ],
      },
    } as any);

    const { getByText } = render(<Campaigns />);

    expect(getByText("My campaign")).toBeInTheDocument();
  });

  it("clicking the + symbol opens a campaign modal", () => {
    const { getByLabelText, getByText } = render(<Campaigns />);

    const button = getByLabelText("create campaign");
    fireEvent.click(button);

    expect(getByText("create campaign")).toBeInTheDocument();
  });

  it("shows a 'create campaign' button when no campaigns are provided", () => {
    jest
      .spyOn(require("@apollo/client"), "useQuery")
      .mockReturnValue({ data: { campaigns: [] } });

    const { getByRole } = render(<Campaigns />);

    expect(
      getByRole("button", { name: /create a campaign/i })
    ).toBeInTheDocument();
  });
  it("does not show a 'create campaign' button when campaigns are provided", () => {
    jest
      .spyOn(require("@apollo/client"), "useQuery")
      .mockReturnValue({
        data: {
          campaigns: [
            { name: "My campaign", id: "12", itemCount: 0, userCount: 0 },
          ],
        },
      });

    const { queryByRole } = render(<Campaigns />);

    expect(
      queryByRole("button", { name: /create a campaign/i })
    ).not.toBeInTheDocument();
  });
});
