import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { FormProps } from "campaign/hooks/useItemForm";
import React from "react";

export function ItemForm({ errors, values, setValues }: FormProps) {
  return (
    <>
      <Box mb={4}>
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
      </Box>

      <Box>
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
      </Box>
    </>
  );
}
