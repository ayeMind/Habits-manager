import { Tabs } from "@mantine/core";
import PageLayout from "ui/layouts/PageLayout";

import { Check } from "lucide-react";

function Home() {

  return (
    <PageLayout>
       <Tabs variant="pills" defaultValue="gallery">
      <Tabs.List>
        <Tabs.Tab value="gallery" leftSection={<Check />}>
          Ежедневные
        </Tabs.Tab>
        <Tabs.Tab value="messages" leftSection={<Check />}>
          Еженедельные
        </Tabs.Tab>
        <Tabs.Tab value="settings" leftSection={<Check />}>
          Ежемесячные
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery">
        Gallery tab content
      </Tabs.Panel>

      <Tabs.Panel value="messages">
        Messages tab content
      </Tabs.Panel>

      <Tabs.Panel value="settings">
        Settings tab content
      </Tabs.Panel>
    </Tabs>
    </PageLayout>
  );
}

export default Home;
