import {
  Box,
  Button,
  HStack,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@chakra-ui/react";
import { useModal } from "@ui-components/ModalProvider";
import { Quest } from "@ui-views/Campaign/types";
import { useEditQuest } from "@ui-views/Campaign/QuestModal/useQuestForm";
import { useState } from "react";
import { Markdown } from "@ui-components/Markdown";

export const QuestNotes = ({ quest }: { quest: Quest }) => {
  const { closeModal } = useModal();
  const [mode, setMode] = useState<"view" | "edit">("view");

  const { saveQuest, formProps, isSaveEnabled } = useEditQuest({
    existingQuest: quest,
    onSuccessCallback: () => {
      setMode("view");
    },
  });

  return (
    <>
      <ModalHeader>{quest.name}</ModalHeader>
      <ModalCloseButton />
      <ModalBody overflow="scroll">
        {mode === "view" ? (
          <Box h="60vh" minH="50vh" maxH="70vh" px={2}>
            <Markdown text={formProps.values.notes || ""} />
          </Box>
        ) : (
          <Textarea
            placeholder="click here to add notes"
            onChange={(e) =>
              formProps.setValue("notes", e.target.value, { shouldDirty: true })
            }
            value={formProps.values.notes}
            h="60vh"
            minH="50vh"
            maxH="70vh"
          />
        )}
      </ModalBody>

      <ModalFooter>
        <HStack spacing="3">
          <Button variant="ghost" onClick={closeModal}>
            close
          </Button>

          {mode === "view" ? (
            <Button onClick={() => setMode("edit")} colorScheme="teal">
              edit
            </Button>
          ) : (
            <Button
              isDisabled={!isSaveEnabled}
              colorScheme="teal"
              onClick={saveQuest}
            >
              save changes
            </Button>
          )}
        </HStack>
      </ModalFooter>
    </>
  );
};
