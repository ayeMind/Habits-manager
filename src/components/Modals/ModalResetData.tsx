import { Modal, Text, Button, Flex } from "@mantine/core";
import { FC } from "react";

interface Props {
    opened: boolean;
    close: () => void;
}

const ModalResetData: FC<Props> = ({ opened, close }) => {
  return (
    <Modal opened={opened} onClose={close} title="Удаление">
      <Text>Вы уверены, что хотите удалить все данные?</Text>
      <Flex mt="md" gap="sm">
        <Button onClick={close} variant="light">
          Отмена
        </Button>
        <Button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
            close();
          }}
          color="red"
          variant="light"
        >
          Удалить
        </Button>
      </Flex>
    </Modal>
  );
};

export default ModalResetData;
