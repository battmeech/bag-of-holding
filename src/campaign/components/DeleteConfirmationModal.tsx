import { useMutation } from "@apollo/client";
import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { RemoveItem, RemoveItemGQL, RemoveItemVariables } from "campaign/gql";
import React from "react";
import { useModal } from "shared";

export function DeleteConfirmationModal({
  campaignId,
  itemId,
}: {
  campaignId: string;
  itemId: string;
}) {
  const { closeModal } = useModal();

  const [mutate] = useMutation<RemoveItem, RemoveItemVariables>(RemoveItemGQL, {
    variables: {
      id: campaignId,
      input: {
        id: itemId,
      },
    },
  });

  const onClick = async () => {
    await mutate();
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
