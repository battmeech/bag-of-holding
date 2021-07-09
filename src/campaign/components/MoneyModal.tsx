import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { useMoneyForm } from "campaign/hooks";
import React from "react";
import { useModal } from "shared";
import { MoneyForm } from "./MoneyForm";

export function MoneyModal({ campaignId }: { campaignId: string }) {
  const { closeModal } = useModal();

  const { modifyMoney, formProps, isSaveEnabled } = useMoneyForm({
    campaignId,
    onSuccessCallback: closeModal,
  });

  return (
    <>
      <ModalHeader>modify money</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <MoneyForm {...formProps} />
      </ModalBody>

      <ModalFooter>
        <Button
          disabled={!isSaveEnabled}
          variant="ghost"
          mr={3}
          onClick={() => modifyMoney("deduct")}
        >
          deduct
        </Button>
        <Button
          disabled={!isSaveEnabled}
          colorScheme="teal"
          onClick={() => modifyMoney("add")}
        >
          add
        </Button>
      </ModalFooter>
    </>
  );
}
