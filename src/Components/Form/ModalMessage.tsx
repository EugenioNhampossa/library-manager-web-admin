import React, { useEffect } from "react";
import {
  Button,
  Header,
  Modal,
  TransitionablePortal,
} from "semantic-ui-react";
interface modalType {
  visibility: boolean;
  setVisible: any;
  title: string;
  message: string;
  icon: string;
}
export function ModalMessage({
  visibility,
  setVisible,
  title,
  message,
  icon,
}: modalType) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(visibility);
  }, [visibility]);

  function closeModal() {
    setOpen(false);
    setVisible(false);
  }

  return (
    <TransitionablePortal
      open={open}
      onClose={() => closeModal()}
      transition={{ animation: "swing down", duration: 500 }}
    >
      <Modal
        centered={false}
        open={open}
        onClose={() => closeModal()}
        onOpen={() => setOpen(true)}
        size="mini"
      >
        <Modal.Header>
          <Header as="h2" icon={icon} content={title} />
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>{message}</Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => closeModal()} inverted color="blue">
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    </TransitionablePortal>
  );
}
