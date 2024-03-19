import { AppShellNavbar, Burger, Group, Tabs } from "@mantine/core";
import { IconBrandAppgallery, IconChartHistogram, IconList, IconLibrary, IconBrush, IconSettings } from "@tabler/icons-react";

import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  defaultTab: string;

  opened: boolean;
  toggle: () => void;
}

const SidePanel: FC<Props> = ({ defaultTab, opened, toggle }) => {
  

  const navigate = useNavigate();

  return (
    <AppShellNavbar p="md">
      <Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
      </Group>
      <Tabs onChange={(value) => navigate(`/${value}`)}
            orientation="vertical"
            variant="pills" radius="xs"
            defaultValue={defaultTab}>
          
        <Tabs.List>
          <Tabs.Tab value="home" leftSection={<IconList />} >Свои привычки</Tabs.Tab>
          <Tabs.Tab value="library" leftSection={<IconLibrary />}>Библиотека</Tabs.Tab>
          <Tabs.Tab value="statistics" leftSection={<IconChartHistogram />}>Статистка</Tabs.Tab>
          <Tabs.Tab value="store" leftSection={<IconBrandAppgallery />}>Магазин</Tabs.Tab>
          <Tabs.Tab value="themes" leftSection={<IconBrush />}>Темы</Tabs.Tab>
          <Tabs.Tab value="settings" leftSection={<IconSettings />}>Настройки</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </AppShellNavbar>
  );
};

export default SidePanel;
