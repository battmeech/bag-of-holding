import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FetchCampaign_fetchCampaign_Campaign as Campaign } from "campaign/gql";
import React from "react";
import { AddItemModal } from "./AddItemModal";
import { ItemCard } from "./ItemCard";

export const CampaignLoaded = ({ campaign }: { campaign: Campaign }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Box>
      <Flex as="header" width="full" align="center" mb={4}>
        <Text fontSize="xl">{campaign.name}</Text>

        <Box ml="auto">
          <Menu placement="bottom-end">
            <MenuButton
              as={IconButton}
              aria-label="actions"
              icon={<HamburgerIcon />}
              variant="ghost"
            />
            <MenuList>
              <MenuItem onClick={onOpen}>add item</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      <Text mb={4}>
        gold: {campaign.gold} silver: {campaign.silver} copper:{" "}
        {campaign.bronze}
      </Text>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 4 }} spacing={4} mb={4}>
        {campaign.items.map((item) => (
          <ItemCard key={item.id} item={item} campaignId={campaign.id} />
        ))}
      </SimpleGrid>

      <Text fontSize="xs">campaign id: {campaign.id}</Text>

      <AddItemModal
        isOpen={isOpen}
        onClose={onClose}
        campaignId={campaign.id}
      />
    </Box>
  );
};
