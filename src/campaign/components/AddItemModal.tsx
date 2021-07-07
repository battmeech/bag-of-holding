import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useItemForm } from "campaign/hooks";
import React from "react";

export function AddItemModal({
  isOpen,
  onClose,
  campaignId,
}: {
  isOpen: boolean;
  campaignId: string;
  onClose: () => void;
}) {
  const { values, setValues, saveItem, errors, isSaveEnabled, resetForm } =
    useItemForm({ campaignId, onSuccessCallback: onClose });

  const closeModal = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered size="xs">
      <ModalOverlay />
      <ModalContent>
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
          <Button variant="ghost" mr={3} onClick={onClose}>
            close
          </Button>
          <Button
            colorScheme="teal"
            onClick={saveItem}
            disabled={!isSaveEnabled}
          >
            save item
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
