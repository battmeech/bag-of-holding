import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { FetchCampaign_fetchCampaign_Campaign_items as Item } from "campaign/gql";
import React from "react";
import { GoKebabVertical } from "react-icons/go";
import { useModal } from "shared";
import { DeleteConfirmationModal } from "../DeleteConfirmationModal";
import { EditItemModal } from "../EditItemModal";

export const ItemCard = ({
  item,
  campaignId,
}: {
  item: Item;
  campaignId: string;
}) => {
  const { openModal } = useModal();

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="4">
        <Flex>
          <Text fontSize="md">{item.name}</Text>

          <Box flex="1 1 auto" />

          <Menu placement="bottom-end">
            <MenuButton
              as={IconButton}
              aria-label="item options"
              icon={<GoKebabVertical />}
              variant="ghost"
              size="xs"
            />
            <MenuList>
              <MenuItem
                icon={<EditIcon />}
                onClick={() =>
                  openModal(
                    <EditItemModal campaignId={campaignId} item={item} />
                  )
                }
              >
                edit item
              </MenuItem>
              <MenuItem
                icon={<DeleteIcon />}
                onClick={() =>
                  openModal(
                    <DeleteConfirmationModal
                      campaignId={campaignId}
                      itemId={item.id}
                    />
                  )
                }
              >
                delete item
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        <Text fontSize="sm">{item.description}</Text>
      </Box>
    </Box>
  );
};
