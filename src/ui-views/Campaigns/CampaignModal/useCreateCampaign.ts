import { useEffect, useState } from "react";
import { trpc } from "@trpc-client/client";

type Input = {
  onSuccessCallback: () => void;
};

export const useCreateCampaign = ({ onSuccessCallback }: Input) => {
  const [campaignName, setCampaignName] = useState("");
  const [isSavedEnabled, setIsSaveEnabled] = useState(false);

  const trpcContext = trpc.useContext();
  const { mutate, isLoading: loading } = trpc.campaign.create.useMutation({
    onSuccess: () => {
      trpcContext.campaign.list.invalidate();
    },
  });

  useEffect(() => {
    if (loading) setIsSaveEnabled(false);
    else if (!campaignName.trim()) setIsSaveEnabled(false);
    else setIsSaveEnabled(true);
  }, [campaignName, loading]);

  const createCampaign = async () => {
    mutate({ name: campaignName });
    onSuccessCallback();
  };

  return {
    createCampaign,
    campaignName,
    setCampaignName,
    isSavedEnabled,
  };
};
