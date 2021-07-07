import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { useItemForm } from "campaign/hooks";
import React from "react";
import { useModal } from "shared";

export function AddItemModal({ campaignId }: { campaignId: string }) {
  const { closeModal } = useModal();

  const { values, setValues, saveItem, errors, isSaveEnabled } = useItemForm({
    campaignId,
    onSuccessCallback: closeModal,
  });

  return (
    <>
      <ModalHeader>new item</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
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
              value={values.description}
              onChange={(event) =>
                setValues({ key: "description", value: event.target.value })
              }
            />
          </FormControl>
        </Box>
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" mr={3} onClick={closeModal}>
          close
        </Button>
        <Button colorScheme="teal" onClick={saveItem} disabled={!isSaveEnabled}>
          save item
        </Button>
      </ModalFooter>
    </>
  );
}
