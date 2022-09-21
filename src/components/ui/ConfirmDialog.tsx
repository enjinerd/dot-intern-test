import { Button, Container, Group, Modal, Text, Title } from "@mantine/core";

interface Props {
  title: string;
  msg: string;
  isOpened: boolean;
  setOpened: (value: boolean) => void;
  handleConfirm: () => void;
}

export function ConfirmDialog(props: Props) {
  const { title, msg, isOpened, handleConfirm, setOpened } = props;

  return (
    <Modal withCloseButton={false} opened={isOpened} onClose={() => console.log("close")}>
      <Container>
        <Title color="orange">{title}</Title>
        <Group mt={12}>
          <Text>{msg}</Text>
        </Group>
        <Group mt={12}>
          <Button color="blue" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={() => handleConfirm()}>
            Confirm
          </Button>
        </Group>
      </Container>
    </Modal>
  );
}
