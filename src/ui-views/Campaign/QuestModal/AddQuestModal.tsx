import {
  Button,
  chakra,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { useModal } from "@ui-components/ModalProvider";
import { useCreateQuest } from "@ui-views/Campaign/QuestModal/useQuestForm";
import { QuestForm } from "@ui-views/Campaign/QuestModal/QuestForm";

export function AddQuestModal({ campaignId }: { campaignId: string }) {
  const { closeModal } = useModal();

  const { saveQuest, isSaveEnabled, formProps } = useCreateQuest({
    campaignId,
    onSuccessCallback: closeModal,
  });

  return (
    <chakra.form onSubmit={saveQuest}>
      <ModalHeader>new quest</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <QuestForm {...formProps} mode="create" />
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" mr={3} onClick={closeModal}>
          close
        </Button>
        <Button colorScheme="teal" type="submit" isDisabled={!isSaveEnabled}>
          save quest
        </Button>
      </ModalFooter>
    </chakra.form>
  );
}
