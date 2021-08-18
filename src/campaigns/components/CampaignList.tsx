import { SimpleGrid } from "@chakra-ui/react";
import { ListCampaigns_campaigns } from "campaigns/gql";
import React from "react";
import { CampaignCard } from "./CampaignCard";

export const CampaignList = ({
  campaigns = [],
}: {
  campaigns?: ListCampaigns_campaigns[];
}) => {
  return (
    <SimpleGrid
      mt="4"
      data-testid="card-grid"
      columns={{ base: 1, md: 2, lg: 3 }}
      spacing={4}
      mb={6}
    >
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </SimpleGrid>
  );
};
