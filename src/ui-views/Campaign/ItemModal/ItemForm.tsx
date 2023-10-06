import {
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { TagInput } from "@ui-views/Campaign/ItemModal/TagInput";
import { FormProps } from "@ui-views/Campaign/ItemModal/useItemForm";

export const ItemForm = ({ errors, values, setValue }: FormProps) => {
  return (
    <VStack spacing="4">
      <FormControl isRequired>
        <FormLabel>item name</FormLabel>
        <Input
          isInvalid={!!errors.name}
          placeholder="item name"
          my="auto"
          value={values.name}
          onChange={(event) =>
            setValue("name", event.target.value, { shouldDirty: true })
          }
        />
      </FormControl>

      <FormControl>
        <FormLabel>item description</FormLabel>
        <Textarea
          maxH="30vh"
          placeholder="item description"
          my="auto"
          value={values.description}
          onChange={(event) =>
            setValue("description", event.target.value, { shouldDirty: true })
          }
        />
      </FormControl>

      <FormControl>
        <FormLabel>quantity</FormLabel>
        <NumberInput
          value={values.quantity}
          defaultValue={1}
          min={0}
          onChange={(value) =>
            setValue("quantity", parseInt(value), { shouldDirty: true })
          }
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel>tags</FormLabel>
        <TagInput
          colorScheme="teal"
          tags={values.tags}
          onTagsChanged={(tags) => {
            setValue("tags", tags, { shouldDirty: true });
          }}
        />
      </FormControl>
    </VStack>
  );
};
