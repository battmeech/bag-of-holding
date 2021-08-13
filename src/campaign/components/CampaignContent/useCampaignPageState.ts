import { QueryResult } from "@apollo/client";
import {
  FetchCampaign,
  FetchCampaign_campaign_Campaign as Campaign,
} from "campaign/gql";
import { useEffect, useState } from "react";

export type CampaignPageState =
  | {
      state: "loading";
    }
  | {
      state: "error";
      message: string;
    }
  | {
      state: "not found";
    }
  | {
      state: "loaded";
      campaign: Campaign;
    };

export function useCampaignPageState({
  loading,
  data,
  error,
}: QueryResult<FetchCampaign>) {
  const [state, setState] = useState<CampaignPageState>({ state: "loading" });

  useEffect(() => {
    if (loading) setState({ state: "loading" });
    if (error) setState({ state: "error", message: error.message });
    if (data && data.campaign.__typename === "CampaignNotFound")
      setState({ state: "not found" });
    if (data && data.campaign.__typename === "Campaign")
      setState({ state: "loaded", campaign: data.campaign });
  }, [loading, data, error]);

  return state;
}
