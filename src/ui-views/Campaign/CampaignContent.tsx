import { Box } from "@chakra-ui/react";
import { useCampaignPageState } from "@ui-views/Campaign/useCampaignState";
import { CampaignLoaded } from "@ui-views/Campaign/CampaignLoaded";
import { Campaign } from "@ui-views/Campaign/types";
import { CampaignLoading } from "@ui-views/Campaign/CampaignLoading";

type CampaignContentProps = {
  isLoading: boolean;
  data?: Campaign | null;
  error: boolean;
};

export const CampaignContent = ({
  isLoading,
  error,
  data,
}: CampaignContentProps) => {
  const pageState = useCampaignPageState({ data, error, isLoading });

  switch (pageState.state) {
    case "loading":
      return <CampaignLoading />;
    case "error":
      return <Box>something went wrong</Box>;
    case "not found":
      return <Box>campaign not found</Box>;
    case "loaded":
      return <CampaignLoaded campaign={pageState.campaign} />;
  }
};
