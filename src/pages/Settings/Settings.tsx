import { Box, Button, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DateTimePicker } from "@mantine/dates";
import { useGlobalStore } from "app/globalStore";
import { useState } from "react";
import UserNameInput from "components/UserNameInput";
import PageLayout from "layouts/PageLayout";
import ModalResetData from "components/Modals/ModalResetData";
import ModalImport from "components/Modals/ModalImport";

const Settings = () => {
  const { userName, currentDateCorrection, setCurrentDateCorrection } = useGlobalStore(
    (state) => state
  );
  const [date, setDate] = useState(new Date(new Date().getTime() + currentDateCorrection));

  const [resetModalOpened, resetModalActions] = useDisclosure();
  const [importModalOpened, importModalActions] = useDisclosure();


  const exportData = () => {
    const data: { [key: string]: unknown } = {};
    for (const [key, value] of Object.entries(localStorage)) {
      data[key] = JSON.parse(value);
    }
  
    const file = new Blob([JSON.stringify(data)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "data.json";
    a.click();

    console.log(file.text());
    
  }
  
  return (
    <PageLayout title="Настройки" defaultTab="settings">
      
      <ModalResetData opened={resetModalOpened} close={resetModalActions.close} />
      <ModalImport opened={importModalOpened} close={importModalActions.close} />

      <Box mb="sm">
        <Text size="lg" mb="sm">
          Ваше текущее имя: {userName}
        </Text>
        <UserNameInput />
      </Box>
      <Box mb="md">
        <label htmlFor="date">Сменить текущее время:</label>
        <Flex mt={5} gap="sm" align="center">
          <DateTimePicker
            value={date}
            placeholder="Pick a Date"
            w={200}
            name="date"
            onChange={(date) => setDate(date as Date)}
          />
          <Button onClick={() => setCurrentDateCorrection(date)}>Сменить</Button>
        </Flex>
      </Box>
      <Flex mb="md" gap="sm">
            <Button onClick={exportData}>Экспорт данных</Button>
            <Button onClick={importModalActions.open}>Импорт данных</Button>
      </Flex>

      <Button color="red" onClick={resetModalActions.open}>
        Удалить все данные
      </Button>
    </PageLayout>
  );
};

export default Settings;
