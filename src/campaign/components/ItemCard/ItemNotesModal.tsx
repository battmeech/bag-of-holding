import {
  Button,
  HStack,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@chakra-ui/react";
import { useModal } from "shared";
import { useEditNotes } from "./useEditNotes";

export const ItemNotes = ({
  currentNotes,
  campaignId,
  itemId,
}: {
  currentNotes: string | null;
  campaignId: string;
  itemId: string;
}) => {
  const { closeModal } = useModal();

  const { notes, setNotes, saveItem, saveActive } = useEditNotes({
    campaignId,
    itemId,
    currentNotes,
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

          <Button disabled={!saveActive} colorScheme="teal" onClick={saveItem}>
            save changes
          </Button>
        </HStack>
      </ModalFooter>
    </>
  );
};
