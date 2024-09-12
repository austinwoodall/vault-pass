import { createContext, useContext, useState } from "react";
import { Modal, ModalBackdrop, ModalContent } from "../ui/modal";

const ModalContext = createContext({});

const useModal = () => useContext(ModalContext);

function ModalProvider({ children }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const show = (content: any) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const hide = () => {
    setModalVisible(false);
    setModalContent(null);
  };
  return (
    <ModalContext.Provider value={{ show, hide }}>
      {children}
      <Modal
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
      >
        <ModalBackdrop />
        <ModalContent>{modalContent}</ModalContent>
      </Modal>
    </ModalContext.Provider>
  );
}

export { ModalProvider, ModalContext, useModal };
