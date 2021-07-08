import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, SimpleGrid, Text } from "@chakra-ui/react";
import { FetchCampaign_fetchCampaign_Campaign as Campaign } from "campaign/gql";
import React from "react";
import { useModal } from "shared";
import { AddItemModal } from "./AddItemModal";
import { Currency } from "./Currency";
import { ItemCard } from "./ItemCard";

export const CampaignLoaded = ({ campaign }: { campaign: Campaign }) => {
  const { openModal } = useModal();
  return (
    <Box>
      <Flex as="header" width="full" align="center" mb={4}>
        <Text fontSize="xl">{campaign.name}</Text>

        <Box ml="auto">
          <IconButton
            aria-label="add item"
            variant="ghost"
            size="lg"
            icon={<AddIcon />}
            onClick={() => openModal(<AddItemModal campaignId={campaign.id} />)}
          />
        </Box>
      </Flex>

      <Flex mb={4}>
        <Currency denomination="platinum" value={campaign.platinum} mr={3} />
        <Currency denomination="gold" value={campaign.gold} mr={3} />
        <Currency denomination="electrum" value={campaign.electrum} mr={3} />
        <Currency denomination="silver" value={campaign.silver} mr={3} />
        <Currency denomination="copper" value={campaign.copper} mr={3} />
      </Flex>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 4 }} spacing={4} mb={6}>
        {campaign.items.map((item) => (
          <ItemCard key={item.id} item={item} campaignId={campaign.id} />
        ))}
      </SimpleGrid>

      <Text fontSize="xs">campaign id: {campaign.id}</Text>
    </Box>
  );
};
