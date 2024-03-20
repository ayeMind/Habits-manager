import { Box, Button, Flex, Text, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DateTimePicker } from "@mantine/dates";
import { useGlobalStore } from "app/globalStore";
import { useState } from "react";
import UserNameInput from "components/UserNameInput";
import PageLayout from "layouts/PageLayout";

const Settings = () => {
  const { userName, currentDateCorrection, setCurrentDateCorrection } = useGlobalStore(
    (state) => state
  );
  const [date, setDate] = useState(new Date(new Date().getTime() + currentDateCorrection));

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <PageLayout title="Настройки" defaultTab="settings">
      <Modal opened={opened} onClose={close} title="Удаление">
        <Text>Вы уверены, что хотите удалить все данные?</Text>
        <Flex mt="md" gap="md">
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

      <Box mb="sm">
        <Text size="lg" mb="sm">
          Ваше текущее имя: {userName}
        </Text>
        <UserNameInput />
      </Box>
      <Box>
        <label htmlFor="date">Сменить текущее время:</label>
        <Flex mt={5} gap="sm" align="center">
          <DateTimePicker
            value={date}
            placeholder="Pick a Date"
            w={250}
            name="date"
            onChange={(date) => setDate(date as Date)}
          />
          <Button onClick={() => setCurrentDateCorrection(date)}>Сменить</Button>
        </Flex>
      </Box>
      <Button color="red" mt="md" onClick={open}>
        Удалить все данные
      </Button>
    </PageLayout>
  );
};

export default Settings;
