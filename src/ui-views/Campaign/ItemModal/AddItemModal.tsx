import {
  Button,
  chakra,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { useModal } from "@ui-components/ModalProvider";
import { useCreateItem } from "@ui-views/Campaign/ItemModal/useItemForm";
import { ItemForm } from "@ui-views/Campaign/ItemModal/ItemForm";

export function AddItemModal({ campaignId }: { campaignId: string }) {
  const { closeModal } = useModal();

  const { saveItem, isSaveEnabled, formProps } = useCreateItem({
    campaignId,
    onSuccessCallback: closeModal,
  });

  return (
    <chakra.form onSubmit={saveItem}>
      <ModalHeader>new item</ModalHeader>
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
