import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { useModal } from "shared";
import { ItemForm } from "./ItemForm";
import { useCreateItem } from "./useItemForm";

export function AddItemModal({ campaignId }: { campaignId: string }) {
  const { closeModal } = useModal();

  const { saveItem, isSaveEnabled, formProps } = useCreateItem({
    campaignId,
    onSuccessCallback: closeModal,
  });

  return (
    <>
      <ModalHeader>new item</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <ItemForm {...formProps} />
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
