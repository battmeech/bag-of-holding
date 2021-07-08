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
} from "@chakra-ui/react";
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
          <Menu placement="bottom-end">
            <MenuButton
              as={IconButton}
              aria-label="actions"
              icon={<HamburgerIcon />}
              variant="ghost"
            />
            <MenuList>
              <MenuItem
                onClick={() =>
                  openModal(<AddItemModal campaignId={campaign.id} />)
                }
              >
                add item
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>

      <Flex mb={4}>
        <Currency denomination="gold" value={campaign.gold} mr={3} />
        <Currency denomination="silver" value={campaign.silver} mr={3} />
        <Currency denomination="copper" value={campaign.copper} mr={3} />
      </Flex>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 4 }} spacing={4} mb={4}>
        {campaign.items.map((item) => (
          <ItemCard key={item.id} item={item} campaignId={campaign.id} />
        ))}
      </SimpleGrid>

      <Text fontSize="xs">campaign id: {campaign.id}</Text>
    </Box>
  );
};
