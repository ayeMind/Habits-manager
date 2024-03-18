import { AppShellNavbar, Burger, Group, Tabs } from "@mantine/core";
import { IconBrandAppgallery, IconChartHistogram, IconList, IconLibrary } from "@tabler/icons-react";

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
          <Tabs.Tab value="home" leftSection={<IconList stroke={2} />} >Свои привычки</Tabs.Tab>
          <Tabs.Tab value="library" leftSection={<IconLibrary stroke={2} />}>Библиотека</Tabs.Tab>
          <Tabs.Tab value="statistics" leftSection={<IconChartHistogram stroke={2} />}>Статистка</Tabs.Tab>
          <Tabs.Tab value="store" leftSection={<IconBrandAppgallery stroke={2} />}>Магазин</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </AppShellNavbar>
  );
};

export default SidePanel;
