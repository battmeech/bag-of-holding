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
import TagInput from "./TagInput";
import { FormProps } from "./useItemForm";

export const ItemForm = ({ errors, values, setValues }: FormProps) => {
  return (
    <VStack spacing="4">
      <FormControl isRequired>
        <FormLabel>item name</FormLabel>
        <Input
          isInvalid={errors.has("name")}
          placeholder="item name"
          my="auto"
          value={values.name}
          onChange={(event) =>
            setValues({ key: "name", value: event.target.value })
          }
        />
      </FormControl>

      <FormControl>
        <FormLabel>item description</FormLabel>
        <Textarea
          isInvalid={errors.has("description")}
          maxH="30vh"
          placeholder="item description"
          my="auto"
          value={values.description || ""}
          onChange={(event) =>
            setValues({ key: "description", value: event.target.value })
          }
        />
      </FormControl>

      <FormControl>
        <FormLabel>quantity</FormLabel>
        <NumberInput
          value={values.quantity || 0}
          defaultValue={1}
          min={0}
          onChange={(value) =>
            setValues({ key: "quantity", value: parseInt(value) || 0 })
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
          onTagsChanged={(tags) => setValues({ key: "tags", value: tags })}
        />
      </FormControl>
    </VStack>
  );
};
