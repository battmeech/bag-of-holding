import * as Router from "next/router";
import * as GQL from "@apollo/client";
import { FetchCampaignGQL } from "campaign/gql";
import { render } from "shared";
import Campaign from "campaign";

describe("Campaign", () => {
  it("executes a gql query on load", () => {
    jest.spyOn(Router, "useRouter").mockReturnValue({
      query: {
        campaignId: "campaign-id",
      },
    } as any);

    const gqlSpy = jest.spyOn(GQL, "useQuery").mockReturnValue({} as any);

    render(<Campaign />);

    expect(gqlSpy).toHaveBeenCalledWith(FetchCampaignGQL, {
      variables: { id: "campaign-id" },
    });
  });
});
