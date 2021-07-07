import { Box, Text } from "@chakra-ui/react";
import { FetchCampaign_fetchCampaign_Campaign_items as Item } from "campaign/gql";
import React from "react";

export const ItemCard = ({ item }: { item: Item }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="4">
        <Text fontSize="md">{item.name}</Text>

        <Text fontSize="sm">{item.description}</Text>
      </Box>
    </Box>
  );
};
