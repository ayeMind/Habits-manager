import { AppShell, Burger, Group, Text } from "@mantine/core";
import { FC } from "react";

interface Props {
  title: string;

  opened: boolean;
  toggle: () => void;
}

const Header: FC<Props> = ({ title, opened, toggle }) => {
  return (
    <>
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
          <Text size="xl">{title}</Text>
        </Group>
      </AppShell.Header>
    </>
  );
};

export default Header;
