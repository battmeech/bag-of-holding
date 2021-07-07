import { FetchCampaign_fetchCampaign_Campaign as Campaign } from "campaign/gql";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { ItemCard } from "./ItemCard";

export const CampaignLoaded = ({ campaign }: { campaign: Campaign }) => {
  return (
    <Box>
      <Text mb={4} fontSize="xl">
        {campaign.name}
      </Text>

      <Text mb={4}>
        gold: {campaign.gold} silver: {campaign.silver} copper:{" "}
        {campaign.bronze}
      </Text>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 4 }} spacing={4} mb={4}>
        {campaign.items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </SimpleGrid>

      <Text fontSize="xs">campaign id: {campaign.id}</Text>
    </Box>
  );
};
