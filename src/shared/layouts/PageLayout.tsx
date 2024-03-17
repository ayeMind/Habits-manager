import { FC } from "react"
import { AppShell, AppShellMain } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';


import Header from "components/AppShell/Header";
import SidePanel from "components/AppShell/SidePanel";

interface Props {
    children: React.ReactNode;
}

const PageLayout:FC<Props> = ({children}) => {

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
      <Header opened={opened} toggle={toggle} />
      <SidePanel opened={opened} toggle={toggle} />
      <AppShellMain>
        {children}
      </AppShellMain>
    </AppShell>
  );
}

export default PageLayout