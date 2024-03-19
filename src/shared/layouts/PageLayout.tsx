import { FC } from "react";
import { AppShell, AppShellMain } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";

import Header from "components/AppShell/Header";
import SidePanel from "components/AppShell/SidePanel";

interface Props {
  children: React.ReactNode;
  title: string;
  defaultTab: string;
}

const PageLayout: FC<Props> = ({ children, title, defaultTab }) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <Notifications w={500} visibleFrom="sm" />
      <Notifications w={300} hiddenFrom="sm" />
      <AppShell
        layout="alt"
        w="auto"
        navbar={{
          width: 200,
          breakpoint: "md",
          collapsed: { mobile: !opened },
        }}
        header={{ height: 65 }}
        padding="md"
      >
        <Header title={title} opened={opened} toggle={toggle} />
        <SidePanel defaultTab={defaultTab} opened={opened} toggle={toggle} />
        <AppShellMain>{children}</AppShellMain>
      </AppShell>
    </>
  );
};

export default PageLayout;
