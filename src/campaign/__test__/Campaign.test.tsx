import { useQuery } from "@apollo/client";
import { Campaign } from "campaign";
import { FetchCampaignGQL } from "campaign/gql";
import { useRouter } from "next/router";
import { render } from "shared";

jest.mock("@apollo/client");
jest.mock("next/router");

describe("Campaign", () => {
  it("executes a gql query on load", () => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      query: {
        campaignId: "campaign-id",
      },
    });

    (useQuery as jest.Mock).mockReturnValueOnce({} as any);

    render(<Campaign />);

    expect(useQuery).toHaveBeenCalledWith(FetchCampaignGQL, {
      variables: { id: "campaign-id" },
      pollInterval: expect.any(Number),
    });
  });
});
