import { Box, Button, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DateTimePicker } from "@mantine/dates";
import { useGlobalStore } from "app/globalStore";
import { useState } from "react";
import UserNameInput from "components/UserNameInput";
import PageLayout from "layouts/PageLayout";
import ModalResetData from "components/Modals/ModalResetData";
import ModalImport from "components/Modals/ModalImport";

import classes from "./style.module.css";
import ModalTemplateImport from "components/Modals/ModalTemplateImport";
import ModalTargetSettings from "components/Modals/ModalTargetSettings";

const Settings = () => {
  const { userName, currentDateCorrection, setCurrentDateCorrection, templateImportIsOpen } = useGlobalStore(
    (state) => state
  );
  const [date, setDate] = useState(new Date(new Date().getTime() + currentDateCorrection));

  const [resetModalOpened, resetModalActions] = useDisclosure();
  const [importModalOpened, importModalActions] = useDisclosure();
  const [templateModalOpened, templateModalActions] = useDisclosure();
  const [targetModalOpened, targetModalActions] = useDisclosure();


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
  }
  
  return (
    <PageLayout title="Настройки" defaultTab="settings" className={classes["page"]}>
      
      <ModalResetData opened={resetModalOpened} close={resetModalActions.close} />
      <ModalImport opened={importModalOpened} close={importModalActions.close} />
      <ModalTemplateImport opened={templateModalOpened} close={templateModalActions.close} />
      <ModalTargetSettings opened={targetModalOpened}  close={targetModalActions.close} />

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
      <Flex mb="md" gap="lg">
            <Button onClick={exportData}>Экспорт данных</Button>
            <Button onClick={importModalActions.open}>Импорт данных</Button>
      </Flex>

      <Flex direction="column" gap="md" w={300}>
        <Button variant="outline" onClick={targetModalActions.open}>Настройка цели</Button>
        {templateImportIsOpen && (
          <Button variant="outline" onClick={templateModalActions.open}>Временный импорт</Button>
        )}
        
        <Button variant="outline" color="red" onClick={resetModalActions.open}>
          Удалить все данные
        </Button>
      </Flex>
    </PageLayout>
  );
};

export default Settings;
