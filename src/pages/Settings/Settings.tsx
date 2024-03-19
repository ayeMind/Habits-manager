import { Text } from "@mantine/core";
import { useGlobalStore } from "app/globalStore";
import UserNameInput from "components/UserNameInput";
import PageLayout from "layouts/PageLayout";

const Settings = () => {
  
    const { userName } = useGlobalStore((state) => state);

  return (
    <PageLayout title="Настройки" defaultTab="settings">
      <Text mb="sm">Ваше имя: {userName}</Text>
      <UserNameInput placeholder="Смените имя пользователя" />
    </PageLayout>
  );
};

export default Settings;
