import {
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
} from "@chakra-ui/react";
import { FormProps } from "campaign/hooks/useItemForm";
import React from "react";

export function ItemForm({ errors, values, setValues }: FormProps) {
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
        <Input
          isInvalid={errors.has("description")}
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
    </VStack>
  );
}
