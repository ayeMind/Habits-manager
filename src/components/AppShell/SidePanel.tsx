import { AppShellNavbar, Burger, Group, Tabs } from "@mantine/core";

import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  opened: boolean;
  toggle: () => void;
}

const SidePanel: FC<Props> = ({ opened, toggle }) => {
  

  const navigate = useNavigate();

  return (
    <AppShellNavbar p="md">
      <Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </Group>
      <Tabs onChange={(value) => navigate(`/${value}`)}
            orientation="vertical"
            variant="pills" radius="xs"
            defaultValue={"/"}>
        <Tabs.List >
          <Tabs.Tab value="/" >Свои привычки</Tabs.Tab>
          <Tabs.Tab value="library" >Библиотека</Tabs.Tab>
          <Tabs.Tab value="statistics">Статистка</Tabs.Tab>
          <Tabs.Tab value="store">Магазин</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </AppShellNavbar>
  );
};

export default SidePanel;
