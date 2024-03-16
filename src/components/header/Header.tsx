import { AppShell, Burger, Group } from "@mantine/core";
import { FC } from "react";

interface Props {
  opened: boolean;
  toggle: () => void;
}

const Header: FC<Props> = ({ opened, toggle }) => {
  return (
    <>
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <h1>Трекер привычек</h1>
        </Group>
      </AppShell.Header>
    </>
  );
};

export default Header;
