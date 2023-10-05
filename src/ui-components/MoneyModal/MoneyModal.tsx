import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { MoneyForm } from "./MoneyForm";
import { useMoneyForm } from "@ui-components/MoneyModal/useMoneyForm";
import { useModal } from "@ui-components/ModalProvider";

export function MoneyModal({ campaignId }: { campaignId: string }) {
  const { closeModal } = useModal();

  const { handleSubmit, formProps, isSaveEnabled } = useMoneyForm({
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
          variant="ghost"
          disabled={!isSaveEnabled}
          mr={3}
          onClick={handleSubmit("deduct")}
        >
          deduct
        </Button>
        <Button
          colorScheme="teal"
          disabled={!isSaveEnabled}
          onClick={handleSubmit("add")}
        >
          add
        </Button>
      </ModalFooter>
    </>
  );
}
