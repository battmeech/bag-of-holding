import { useMutation } from "@apollo/client";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
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
  const [mutate, { loading }] = useMutation<RemoveItem, RemoveItemVariables>(
    RemoveItemGQL,
    {
      variables: {
        id: campaignId,
        input: {
          id: item.id,
        },
      },
    }
  );

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="4">
        <Flex>
          <Text fontSize="md">{item.name}</Text>

          <Box flex="1 1 auto" />

          <IconButton
            aria-label="edit item"
            size="xs"
            variant="ghost"
            disabled={loading}
            icon={<EditIcon />}
            onClick={() =>
              openModal(<EditItemModal campaignId={campaignId} item={item} />)
            }
          />

          <IconButton
            aria-label="delete item"
            size="xs"
            variant="ghost"
            disabled={loading}
            icon={<DeleteIcon />}
            onClick={() => mutate()}
          />
        </Flex>

        <Text fontSize="sm">{item.description}</Text>
      </Box>
    </Box>
  );
};
