import { Box } from "@chakra-ui/react";
import { MotionBox } from "@ui-components/MotionBox";
import { useCampaignPageState } from "@ui-views/Campaign/useCampaignState";
import { CampaignLoaded } from "@ui-views/Campaign/CampaignLoaded";
import { Campaign } from "@ui-views/Campaign/types";

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
      return (
        <MotionBox
          animate={{ y: 20 }}
          transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
          width={["100%", "70%", "60%", "60%"]}
          margin="0 auto"
        >
          loading
        </MotionBox>
      );
    case "error":
      return <Box>something went wrong</Box>;
    case "not found":
      return <Box>campaign not found</Box>;
    case "loaded":
      return <CampaignLoaded campaign={pageState.campaign} />;
    /* istanbul ignore next */
    default:
      return null;
  }
};
