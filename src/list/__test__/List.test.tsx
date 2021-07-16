import List from "list";
import { ListCampaignsGQL } from "list/gql";
import { render } from "shared";

describe("List", () => {
  it("executes a gql query on load", () => {
    const gqlSpy = jest
      .spyOn(require("@apollo/client"), "useQuery")
      .mockReturnValue({} as any);

    render(<List />);

    expect(gqlSpy).toHaveBeenCalledWith(ListCampaignsGQL);
  });

  it("displays campaigns that are returned", () => {
    jest.spyOn(require("@apollo/client"), "useQuery").mockReturnValue({
      data: { listCampaigns: [{ name: "My campaign", id: "12" }] },
    } as any);

    const { getByText } = render(<List />);

    expect(getByText("My campaign")).toBeInTheDocument();
  });
});
