import {
  Button,
  HStack,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@chakra-ui/react";
import { useModal } from "@ui-components/ModalProvider";
import { useEditNotes } from "@ui-views/Campaign/ItemCard/useEditNotes";
import { Item } from "@ui-views/Campaign/types";

export const ItemNotes = ({ item }: { item: Item }) => {
  const { closeModal } = useModal();

  const { notes, setNotes, saveItem, saveActive } = useEditNotes({
    item,
  });

  return (
    <>
      <ModalHeader>item notes</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Textarea
          placeholder="click here to add notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes || ""}
          h="60vh"
          minH="50vh"
          maxH="70vh"
        />
      </ModalBody>

      <ModalFooter>
        <HStack spacing="3">
          <Button variant="ghost" onClick={closeModal}>
            close
          </Button>

          <Button
            isDisabled={!saveActive}
            colorScheme="teal"
            onClick={saveItem}
          >
            save changes
          </Button>
        </HStack>
      </ModalFooter>
    </>
  );
};
