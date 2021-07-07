import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { CampaignContent } from "./components";
import { FetchCampaign, FetchCampaignGQL, FetchCampaignVariables } from "./gql";

function Campaign() {
  const router = useRouter();
  const { campaignId } = router.query;

  const result = useQuery<FetchCampaign, FetchCampaignVariables>(
    FetchCampaignGQL,
    {
      variables: {
        id: campaignId as string,
      },
    }
  );

  return <CampaignContent result={result} />;
}

export default Campaign;
