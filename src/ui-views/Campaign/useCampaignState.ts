import { useEffect, useState } from "react";
import { Campaign } from "@ui-views/Campaign/types";

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
  isLoading,
  data,
  error,
}: {
  isLoading: boolean;
  data?: Campaign | null;
  error: boolean;
}) {
  const [state, setState] = useState<CampaignPageState>({ state: "loading" });

  useEffect(() => {
    if (isLoading) setState({ state: "loading" });
    if (error) setState({ state: "error", message: "error" });
    if (!data) setState({ state: "not found" });
    if (data) setState({ state: "loaded", campaign: data });
  }, [isLoading, data, error]);

  return state;
}
