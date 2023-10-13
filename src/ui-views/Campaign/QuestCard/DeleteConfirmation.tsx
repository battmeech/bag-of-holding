import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { useModal } from "@ui-components/ModalProvider";
import { trpc } from "@trpc-client/client";

export function DeleteConfirmationModal({
  questId,
  campaignId,
}: {
  questId: string;
  campaignId: string;
}) {
  const { closeModal } = useModal();

  const trpcContext = trpc.useContext();
  const mutation = trpc.quest.delete.useMutation({
    onSuccess: async () => {
      await trpcContext.campaign.getById.invalidate({ id: campaignId });
    },
  });

  const onClick = async () => {
    mutation.mutate({ questId, campaignId: campaignId });
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
