import { useMutation } from "@apollo/client";
import { Box, CloseButton, Flex, Text } from "@chakra-ui/react";
import {
  FetchCampaign_fetchCampaign_Campaign_items as Item,
  RemoveItem,
  RemoveItemGQL,
  RemoveItemVariables,
} from "campaign/gql";
import React from "react";

export const ItemCard = ({
  item,
  campaignId,
}: {
  item: Item;
  campaignId: string;
}) => {
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

          <CloseButton
            aria-label="delete item"
            size="sm"
            disabled={loading}
            onClick={() => mutate()}
          />
        </Flex>

        <Text fontSize="sm">{item.description}</Text>
      </Box>
    </Box>
  );
};
