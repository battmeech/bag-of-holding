import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  IconButton,
  StackProps,
} from "@chakra-ui/react";
import { EditItem_editItem_Campaign_items as Item } from "campaign/gql";
import { useEditQuantity } from "campaign/hooks";
import { debounce } from "lodash";
import React, { useCallback } from "react";

type ItemQuantityEditorProps = {
  campaignId: string;
  item: Item;
} & StackProps;

export const ItemQuantityEditor = ({
  campaignId,
  item,
  ...stackProps
}: ItemQuantityEditorProps) => {
  const { quantity, saveItem, setQuantity } = useEditQuantity({
    campaignId,
    itemId: item.id,
    currentQuantity: item.quantity,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSaveItem = useCallback(debounce(saveItem, 1000), []);

  const add = async (event: any) => {
    let newValue = quantity;
    if (event.shiftKey) {
      newValue += 10;
    } else if (event.altKey) {
      newValue += 100;
    } else {
      newValue += 1;
    }

    setQuantity(newValue);
    debounceSaveItem(newValue);
  };

  const deduct = (event: any) => {
    let newValue = quantity;
    if (event.shiftKey) {
      newValue -= 10;
    } else if (event.altKey) {
      newValue -= 100;
    } else {
      newValue -= 1;
    }

    if (newValue < 0) newValue = 0;

    setQuantity(newValue);
    debounceSaveItem(newValue);
  };

  const validateInput: React.KeyboardEventHandler = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleChange = (value: string) => {
    const newValue = value ? parseInt(value) : 0;
    setQuantity(newValue);
    debounceSaveItem(newValue);
  };

  return (
    <HStack {...stackProps} spacing="1">
      <IconButton
        variant="ghost"
        disabled={quantity === 0}
        onClick={deduct}
        aria-label={`deduct-quantity`}
        size="xs"
        icon={<MinusIcon />}
      />
      <Box>
        <Editable onChange={handleChange} value={`${quantity}`}>
          <EditablePreview cursor="pointer" />
          <EditableInput maxW="35px" onKeyDown={validateInput} />
        </Editable>
      </Box>
      <IconButton
        variant="ghost"
        onClick={add}
        aria-label={`add-quantity`}
        size="xs"
        icon={<AddIcon />}
      />
    </HStack>
  );
};
