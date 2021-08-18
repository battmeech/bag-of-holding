import { SimpleGrid, Skeleton } from "@chakra-ui/react";
import { ListCampaigns_campaigns } from "campaigns/gql";
import React from "react";
import { CampaignCard } from "./CampaignCard";

export const CampaignList = ({
  loading = false,
  campaigns = [],
}: {
  loading?: boolean;
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
      {loading
        ? Array(10)
            .fill(undefined)
            .map((_, i) => (
              <Skeleton borderRadius="lg" h="145" w="330" key={i} />
            ))
        : campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
    </SimpleGrid>
  );
};
