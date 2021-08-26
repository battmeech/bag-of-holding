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
import { TagInput } from "./TagInput";
import { FormProps } from "./useItemForm";

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
          onChange={(event) => setValue("name", event.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>item description</FormLabel>
        <Textarea
          maxH="30vh"
          placeholder="item description"
          my="auto"
          value={values.description}
          onChange={(event) => setValue("description", event.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>quantity</FormLabel>
        <NumberInput
          value={values.quantity}
          defaultValue={1}
          min={0}
          onChange={(value) => setValue("quantity", parseInt(value))}
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
            setValue("tags", tags);
          }}
        />
      </FormControl>
    </VStack>
  );
};
