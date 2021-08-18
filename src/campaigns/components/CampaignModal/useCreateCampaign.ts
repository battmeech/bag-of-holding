import { useMutation } from "@apollo/client";
import {
  CreateCampaign,
  CreateCampaignVariables,
  CreateCampaignGQL,
} from "campaigns/gql";
import { useEffect, useState } from "react";

type Input = {
  // eslint-disable-next-line no-unused-vars
  onSuccessCallback: (campaignId: string) => void;
};

export const useCreateCampaign = ({ onSuccessCallback }: Input) => {
  const [campaignName, setCampaignName] = useState("");
  const [isSavedEnabled, setIsSaveEnabled] = useState(false);

  const [mutate, { loading }] = useMutation<
    CreateCampaign,
    CreateCampaignVariables
  >(CreateCampaignGQL);

  useEffect(() => {
    if (loading) setIsSaveEnabled(false);
    else if (!campaignName.trim()) setIsSaveEnabled(false);
    else setIsSaveEnabled(true);
  }, [campaignName, loading]);

  const createCampaign = async () => {
    const { data } = await mutate({ variables: { name: campaignName } });

    if (data?.createCampaign.__typename === "Campaign") {
      onSuccessCallback(data.createCampaign.id);
    }
  };

  return {
    createCampaign,
    campaignName,
    setCampaignName,
    isSavedEnabled,
  };
};
