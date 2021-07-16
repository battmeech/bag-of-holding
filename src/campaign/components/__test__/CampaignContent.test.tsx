import { render } from "shared";
import CampaignContent from "../CampaignContent";
import { createCampaign } from "./testData";

describe("CampaignContent", () => {
  it("renders loading text when gql is loading", () => {
    const result = {
      loading: true,
    } as any;

    const { getByText } = render(<CampaignContent result={result} />);

    expect(getByText("loading")).toBeInTheDocument();
  });

  it("renders an error when the query returns an error", () => {
    const result = {
      loading: false,
      error: { message: "error" },
    } as any;

    const { getByText } = render(<CampaignContent result={result} />);

    expect(getByText("something went wrong")).toBeInTheDocument();
  });

  it("shows campaign not found when typename is campaign not found", () => {
    const result = {
      loading: false,
      data: {
        fetchCampaign: {
          __typename: "CampaignNotFound",
        },
      },
    } as any;

    const { getByText } = render(<CampaignContent result={result} />);

    expect(getByText("campaign not found")).toBeInTheDocument();
  });

  it("shows the campaign title when campaign is loaded", () => {
    const result = {
      loading: false,
      data: {
        fetchCampaign: createCampaign(),
      },
    } as any;

    const { getByText } = render(<CampaignContent result={result} />);

    expect(getByText("This is my campaign")).toBeInTheDocument();
  });
});
