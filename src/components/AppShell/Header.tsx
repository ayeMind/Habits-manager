import { AppShell, Burger, Group, Text } from "@mantine/core";
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
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
          <Text size="xl">Трекер привычек</Text>
        </Group>
      </AppShell.Header>
    </>
  );
};

export default Header;
