import { View } from "@ui-views/Campaign/ViewControls/ViewProvider";
import { FC } from "react";
import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  VStack,
} from "@chakra-ui/react";
import { useModal } from "@ui-components/ModalProvider";

type ViewChangeModalProps = {
  view: View;
  changeView: (view: View) => void;
};

export const ViewChangeModal: FC<ViewChangeModalProps> = ({
  changeView,
  view,
}) => {
  const { closeModal } = useModal();

  const onClick = (view: View) => {
    changeView(view);
    closeModal();
  };

  return (
    <>
      <ModalHeader>change view</ModalHeader>
      <ModalCloseButton />

      <ModalBody pb={4}>
        <VStack w="full" spacing={4}>
          <Button
            w="full"
            colorScheme="teal"
            isDisabled={view === "item"}
            onClick={() => onClick("item")}
          >
            items
          </Button>

          <Button
            w="full"
            colorScheme="teal"
            isDisabled={view === "quest"}
            onClick={() => onClick("quest")}
          >
            quests
          </Button>
        </VStack>
      </ModalBody>
    </>
  );
};
