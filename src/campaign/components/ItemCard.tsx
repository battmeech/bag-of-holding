import { useMutation } from "@apollo/client";
import { DeleteIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
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
import {
  FetchCampaign_fetchCampaign_Campaign_items as Item,
  RemoveItem,
  RemoveItemGQL,
  RemoveItemVariables,
} from "campaign/gql";
import React from "react";
import { useModal } from "shared";
import { EditItemModal } from "./EditItemModal";

export const ItemCard = ({
  item,
  campaignId,
}: {
  item: Item;
  campaignId: string;
}) => {
  const { openModal } = useModal();
  const [mutate] = useMutation<RemoveItem, RemoveItemVariables>(RemoveItemGQL, {
    variables: {
      id: campaignId,
      input: {
        id: item.id,
      },
    },
  });

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="4">
        <Flex>
          <Text fontSize="md">{item.name}</Text>

          <Box flex="1 1 auto" />

          <Menu placement="bottom-end">
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
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
              <MenuItem icon={<DeleteIcon />} onClick={() => mutate()}>
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
