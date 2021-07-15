import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, IconButton, Flex } from "@chakra-ui/react";
import { EditItem_editItem_Campaign_items as Item } from "campaign/gql";
import { useEditQuantity } from "campaign/hooks";
import React from "react";
import { debounce } from "lodash";
import { useCallback } from "react";

type ItemQuantityEditorProps = {
  campaignId: string;
  item: Item;
};

export const ItemQuantityEditor = ({
  campaignId,
  item,
}: ItemQuantityEditorProps) => {
  const { quantity, saveItem, setQuantity } = useEditQuantity({
    campaignId,
    itemId: item.id,
    currentQuantity: item.quantity,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSaveItem = useCallback(debounce(saveItem, 1000), []);

  const add = async () => {
    const newValue = quantity + 1;
    setQuantity(newValue);
    debounceSaveItem(newValue);
  };

  const deduct = () => {
    const newValue = quantity - 1;
    setQuantity(newValue);
    debounceSaveItem(newValue);
  };

  return (
    <Flex>
      <IconButton
        variant="ghost"
        onClick={add}
        aria-label={`add-quantity`}
        size="sm"
        icon={<AddIcon />}
        mr={1}
      />

      <Box mx={1} my="auto">
        {quantity}
      </Box>

      <IconButton
        variant="ghost"
        disabled={quantity === 0}
        onClick={deduct}
        aria-label={`deduct-quantity`}
        size="sm"
        icon={<MinusIcon />}
      />
    </Flex>
  );
};
