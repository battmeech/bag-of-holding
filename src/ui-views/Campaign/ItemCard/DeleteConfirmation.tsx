import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { useModal } from "@ui-components/ModalProvider";

export function DeleteConfirmationModal({ itemId }: { itemId: string }) {
  const { closeModal } = useModal();

  const onClick = async () => {
    alert(`TODO: delete item ${itemId}`);
    closeModal();
  };

  return (
    <>
      <ModalHeader>are you sure?</ModalHeader>
      <ModalCloseButton />
      <ModalBody>it will be deleted forever</ModalBody>

      <ModalFooter>
        <Button variant="ghost" mr={3} onClick={closeModal}>
          nope
        </Button>
        <Button colorScheme="red" onClick={onClick}>
          yep
        </Button>
      </ModalFooter>
    </>
  );
}
