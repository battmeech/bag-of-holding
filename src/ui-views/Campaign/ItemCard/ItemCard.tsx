import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
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
import React from "react";
import { CgNotes } from "react-icons/cg";
import { GoKebabHorizontal } from "react-icons/go";
import { RiPencilFill } from "react-icons/ri";
import { Item } from "@ui-views/Campaign/types";
import { useModal } from "@ui-components/ModalProvider";
import { TagGroup } from "@ui-views/Campaign/ItemCard/TagGroup";
import { DeleteConfirmationModal } from "@ui-views/Campaign/ItemCard/DeleteConfirmation";
import { ItemNotes } from "@ui-views/Campaign/ItemCard/ItemNotes";
import { ItemQuantityEditor } from "@ui-views/Campaign/ItemCard/ItemQuantity";
import { EditItemModal } from "@ui-views/Campaign/ItemModal/EditItemModal";

type ItemCardProps = {
  item: Item;
  onTagClick?: (tag: string) => void;
};

export const ItemCard = ({ item, onTagClick = () => {} }: ItemCardProps) => {
  const { openModal } = useModal();

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
              icon={<GoKebabHorizontal />}
              variant="ghost"
              size="xs"
            />
            <MenuList>
              <MenuItem
                icon={<EditIcon />}
                onClick={() => openModal(<EditItemModal item={item} />)}
              >
                edit item
              </MenuItem>
              <MenuItem
                icon={<DeleteIcon />}
                onClick={() =>
                  openModal(<DeleteConfirmationModal itemId={item.id} />)
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

      <VStack w="full">
        <TagGroup
          onTagClick={onTagClick}
          variant="outline"
          colorScheme="teal"
          w="full"
          displayLimit={10}
          tags={item.tags}
        />

        <HStack justify="space-between" w="full">
          <Tooltip label="view notes">
            <IconButton
              variant="ghost"
              aria-label="view notes"
              size="xs"
              icon={
                item.notes?.trim() ? (
                  <CgNotes data-testid="notes-icon" />
                ) : (
                  <RiPencilFill data-testid="no-notes-icon" />
                )
              }
              onClick={() =>
                openModal(
                  <ItemNotes currentNotes={item.notes} itemId={item.id} />,
                  "xl"
                )
              }
            />
          </Tooltip>

          <ItemQuantityEditor item={item} />
        </HStack>
      </VStack>
    </VStack>
  );
};
