import {
  Button,
  chakra,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { Item } from "@ui-views/Campaign/types";
import { useModal } from "@ui-components/ModalProvider";
import { ItemForm } from "@ui-views/Campaign/ItemModal/ItemForm";
import { useEditItem } from "@ui-views//Campaign/ItemModal/useItemForm";

export function EditItemModal({ item }: { item: Item }) {
  const { closeModal } = useModal();

  const { saveItem, isSaveEnabled, formProps } = useEditItem({
    onSuccessCallback: closeModal,
    existingItem: item,
  });
  return (
    <chakra.form onSubmit={saveItem}>
      <ModalHeader>edit item</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <ItemForm {...formProps} />
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" mr={3} onClick={closeModal}>
          close
        </Button>
        <Button colorScheme="teal" type="submit" isDisabled={!isSaveEnabled}>
          save item
        </Button>
      </ModalFooter>
    </chakra.form>
  );
}
