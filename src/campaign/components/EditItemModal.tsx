import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { EditItem_editItem_Campaign_items as ExistingItem } from "campaign/gql";
import { useEditItem } from "campaign/hooks";
import React from "react";
import { useModal } from "shared";
import { ItemForm } from "./ItemForm";

export function EditItemModal({
  campaignId,
  item,
}: {
  campaignId: string;
  item: ExistingItem;
}) {
  const { closeModal } = useModal();

  const { saveItem, isSaveEnabled, formProps } = useEditItem({
    campaignId,
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
