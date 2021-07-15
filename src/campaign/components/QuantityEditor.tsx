import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, IconButton, Flex } from "@chakra-ui/react";
import { EditItem_editItem_Campaign_items as Item } from "campaign/gql";
import { useEditQuantity } from "campaign/hooks";
import React from "react";
import { debounce } from "lodash";
import { useCallback } from "react";

export const QuantityEditor = ({
  campaignId,
  item,
}: {
  campaignId: string;
  item: Item;
}) => {
  const { formProps, saveItem } = useEditQuantity({
    campaignId,
    existingItem: item,
  });
  const { quantity } = formProps.values;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSaveItem = useCallback(debounce(saveItem, 1000), [
    formProps.values.quantity,
  ]);

  const add = async () => {
    const newValue = Number(quantity) + 1;
    formProps.setValues({ key: "quantity", value: newValue.toString() });
    debounceSaveItem();
  };

  const deduct = () => {
    const newValue = Number(quantity) - 1;
    formProps.setValues({ key: "quantity", value: newValue.toString() });
    debounceSaveItem();
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
        {formProps.values.quantity}
      </Box>

      <IconButton
        variant="ghost"
        disabled={quantity === "0"}
        onClick={deduct}
        aria-label={`deduct-quantity`}
        size="sm"
        icon={<MinusIcon />}
      />
    </Flex>
  );
};
