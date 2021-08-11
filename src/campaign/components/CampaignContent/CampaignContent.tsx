import { QueryResult } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { FetchCampaign } from "campaign/gql";
import { MotionBox } from "shared";
import { CampaignLoaded } from "./CampaignLoaded";
import { useCampaignPageState } from "./useCampaignPageState";

type CampaignContentProps = {
  result: QueryResult<FetchCampaign>;
};

export const CampaignContent = ({ result }: CampaignContentProps) => {
  const pageState = useCampaignPageState(result);

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
