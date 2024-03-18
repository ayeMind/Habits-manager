import { FC } from "react"
import { AppShell, AppShellMain } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';


import Header from "components/AppShell/Header";
import SidePanel from "components/AppShell/SidePanel";

interface Props {
    children: React.ReactNode;
    title: string;
    defaultTab: string;
}

const PageLayout:FC<Props> = ({children, title, defaultTab}) => {

    const [opened, { toggle }] = useDisclosure();

  
   return (
    <AppShell layout="alt"
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
      <AppShellMain>
        {children}
      </AppShellMain>
    </AppShell>
  );
}

export default PageLayout