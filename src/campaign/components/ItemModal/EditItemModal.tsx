import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { EditItem_editItem_Item as ExistingItem } from "campaign/gql";
import { useModal } from "shared";
import { ItemForm } from "./ItemForm";
import { useEditItem } from "./useItemForm";

export function EditItemModal({ item }: { item: ExistingItem }) {
  const { closeModal } = useModal();

  const { saveItem, isSaveEnabled, formProps } = useEditItem({
    onSuccessCallback: closeModal,
    existingItem: item,
  });
  return (
    <>
      <ModalHeader>edit item</ModalHeader>
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
