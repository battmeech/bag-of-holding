import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { FetchCampaign_fetchCampaign_Campaign_items as Item } from "campaign/gql";
import React from "react";
import { useState } from "react";
import { CgNotes } from "react-icons/cg";
import { GoKebabVertical } from "react-icons/go";
import { useModal } from "shared";
import { DeleteConfirmationModal } from "../DeleteConfirmationModal";
import { EditItemModal } from "../EditItemModal";
import { ItemQuantityEditor } from "./ItemQuantityEditor";
import { ItemNotes } from "./ItemNotes";

export const ItemCard = ({
  item,
  campaignId,
}: {
  item: Item;
  campaignId: string;
}) => {
  const { openModal } = useModal();
  const [notesOpen, setNotesOpen] = useState(false);

  const toggleNotesOpen = () => {
    setNotesOpen(!notesOpen);
  };

  return (
    <VStack
      justify="space-between"
      p="4"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <VStack w="full">
        <HStack w="full" justify="space-between">
          <Text fontSize="md">{item.name}</Text>
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
        </HStack>
        <Flex w="full" justify="flex-start">
          <Text fontSize="sm">{item.description}</Text>
        </Flex>
      </VStack>

      <HStack display="flex" w="full" mt="4">
        <Tooltip label="view notes">
          <IconButton
            variant="ghost"
            aria-label="view notes"
            size="xs"
            icon={<CgNotes />}
            onClick={toggleNotesOpen}
          />
        </Tooltip>

        {notesOpen && <ItemNotes notes={item.notes} />}

        <Box flex="1 0 auto" />

        <ItemQuantityEditor campaignId={campaignId} item={item} />
      </HStack>
    </VStack>
  );
};
