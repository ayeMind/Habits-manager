import { FC, useEffect } from "react";
import { AppShell, AppShellMain, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";

import Header from "components/AppShell/Header";
import SidePanel from "components/AppShell/SidePanel";
import { useGlobalStore } from "app/globalStore";
import UserNameInput from "components/UserNameInput";

interface Props {
  children: React.ReactNode;
  title: string;
  defaultTab: string;
}

const PageLayout: FC<Props> = ({ children, title, defaultTab }) => {
  const [navBarOpened, { toggle }] = useDisclosure();
  const [modalOpened, { open, close }] = useDisclosure();

  const {userName } = useGlobalStore((state) => state);

  useEffect(() => {
    if (!userName) {
      open();
    }
  }, [userName]);

  return (
    <>
      <Notifications w={500} visibleFrom="sm" />
      <Notifications w={300} hiddenFrom="sm" />
      <Modal opened={modalOpened} onClose={close} centered withCloseButton={false} closeOnClickOutside={false} closeOnEscape={false} title="Добро пожаловать в менеджер привычек!  ">
        <UserNameInput placeholder="Введите своё имя" close={close} />
        <Text size="sm" mt="xs">Сменить имя можно будет в настройках</Text>
      </Modal>
      <AppShell
        layout="alt"
        w="auto"
        navbar={{
          width: 200,
          breakpoint: "md",
          collapsed: { mobile: !navBarOpened },
        }}
        header={{ height: 65 }}
        padding="md"
      >
        <Header title={title} opened={navBarOpened} toggle={toggle} />
        <SidePanel defaultTab={defaultTab} opened={navBarOpened} toggle={toggle} />
        <AppShellMain>{children}</AppShellMain>
      </AppShell>
    </>
  );
};

export default PageLayout;
 