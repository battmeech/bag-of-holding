import { SimpleGrid, Skeleton } from "@chakra-ui/react";
import React from "react";
import { CampaignCard } from "./CampaignCard";
import { Outputs } from "@trpc-client/client";

export const CampaignList = ({
  loading = false,
  campaigns = [],
}: {
  loading?: boolean;
  campaigns?: Outputs["campaign"]["list"];
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
