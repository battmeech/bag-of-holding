import {
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { createContext, FC, ReactNode, useContext, useState } from "react";

/* istanbul ignore next */
const ModalContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  openModal: (content: ReactNode, size = "xs") => {},
  closeModal: () => {},
});

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [content, setContent] = useState<ReactNode>(null);
  const [size, setSize] = useState("xs");

  const openModal = (modalContent: ReactNode, size = "xs") => {
    setContent(modalContent);
    setSize(size);
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
      <Modal isOpen={isOpen} onClose={closeModal} isCentered size={size}>
        <ModalOverlay data-testid="modal-overlay" />
        <ModalContent>{content}</ModalContent>
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
