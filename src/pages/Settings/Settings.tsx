import { Box, Button, Flex, Text } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useGlobalStore } from "app/globalStore";
import { useState } from "react";
import UserNameInput from "components/UserNameInput";
import PageLayout from "layouts/PageLayout";

const Settings = () => {
  
    const { userName, currentDate, setCurrentDate } = useGlobalStore((state) => state);
    const [ date, setDate ] = useState(new Date(currentDate));

  return (
    <PageLayout title="Настройки" defaultTab="settings">
      <Box mb="sm">
        <Text size="lg" mb="sm">Ваше текущее имя: {userName}</Text>
        <UserNameInput />
      </Box>
      <Box>
        <label htmlFor="date">Сменить текущее время:</label>
        <Flex mt={5} gap="sm" align="center">
          <DateTimePicker value={date} placeholder="Pick a Date" w={250} name="date" onChange={(date) => setDate(date as Date)} />
          <Button onClick={() => setCurrentDate(date)}>Сменить</Button>
        </Flex>
      </Box>
    </PageLayout>
  );
};

export default Settings;
