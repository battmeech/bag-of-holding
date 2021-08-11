import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useModal } from "shared";

export const ItemNotes = ({ notes }: { notes: string | null }) => {
  const { closeModal } = useModal();

  const [value, setValue] = useState(notes);

  return (
    <>
      <ModalHeader>item notes</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Editable
          defaultValue={notes || ""}
          onChange={(e) => setValue(e)}
          value={value || ""}
        >
          <EditableInput />
          <EditablePreview />
        </Editable>
      </ModalBody>

      <ModalFooter>
        <HStack spacing="3">
          <Button variant="ghost" onClick={closeModal}>
            close
          </Button>

          <Button colorScheme="teal" onClick={closeModal}>
            save changes
          </Button>
        </HStack>
      </ModalFooter>
    </>
  );
};
