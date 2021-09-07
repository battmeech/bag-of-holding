import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { CampaignContent } from "./components";
import { FetchCampaign, FetchCampaignGQL, FetchCampaignVariables } from "./gql";

export const Campaign = () => {
  const router = useRouter();
  const { campaignId } = router.query;

  const result = useQuery<FetchCampaign, FetchCampaignVariables>(
    FetchCampaignGQL,
    {
      variables: {
        id: campaignId as string,
      },
      pollInterval: 5000,
    }
  );

  return <CampaignContent result={result} />;
};
