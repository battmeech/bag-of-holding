import {
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { createContext, FC, ReactNode, useContext, useState } from "react";

/* istanbul ignore next */
const ModalContext = createContext({
  // eslint-disable-next-line no-unused-vars
  openModal: (content: ReactNode) => {},
  closeModal: () => {},
});

export const ModalProvider: FC = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [content, setContent] = useState<ReactNode>(null);

  const openModal = (modalContent: ReactNode) => {
    setContent(modalContent);
    onOpen();
  };

  const closeModal = () => {
    onClose();
    setContent(null);
  };

  const value = {
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Modal isOpen={isOpen} onClose={closeModal} isCentered size="xs">
        <ModalOverlay data-testid="modal-overlay" />
        <ModalContent>{content}</ModalContent>
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
