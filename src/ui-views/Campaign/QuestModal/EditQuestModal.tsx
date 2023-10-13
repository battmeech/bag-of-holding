import {
  Button,
  chakra,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { useModal } from "@ui-components/ModalProvider";
import { useEditQuest } from "@ui-views/Campaign/QuestModal/useQuestForm";
import { QuestForm } from "@ui-views/Campaign/QuestModal/QuestForm";
import { Quest } from "@ui-views/Campaign/types";

export function EditQuestModal({ quest }: { quest: Quest }) {
  const { closeModal } = useModal();

  const { saveQuest, isSaveEnabled, formProps } = useEditQuest({
    existingQuest: quest,
    onSuccessCallback: closeModal,
  });

  return (
    <chakra.form onSubmit={saveQuest}>
      <ModalHeader>new quest</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <QuestForm {...formProps} mode="edit" />
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" mr={3} onClick={closeModal}>
          close
        </Button>
        <Button colorScheme="teal" type="submit" isDisabled={!isSaveEnabled}>
          update quest
        </Button>
      </ModalFooter>
    </chakra.form>
  );
}
