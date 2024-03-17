import { Group, Tabs } from "@mantine/core";
import PageLayout from "layouts/PageLayout";

import { IconCalendar, IconCalendarMonth, IconCalendarWeek } from "@tabler/icons-react"
import HabitsSection from "app/widgets/HabitsSections";

function Home() {
  return (
    <PageLayout>
      <Tabs variant="pills" defaultValue="daily">
        <Tabs.List>
          <Tabs.Tab value="daily" leftSection={<IconCalendar />}>
            Ежедневные
          </Tabs.Tab>
          <Tabs.Tab value="weekly" leftSection={<IconCalendarWeek />}>
            Еженедельные
          </Tabs.Tab>
          <Tabs.Tab value="monthly" leftSection={<IconCalendarMonth />}>
            Ежемесячные
          </Tabs.Tab>
        </Tabs.List>

        <Group gap="md" mt="md">
          <Tabs.Panel value="daily">
            <HabitsSection period="daily" />
          </Tabs.Panel>

          <Tabs.Panel value="weekly">
            <HabitsSection period="weekly" />
          </Tabs.Panel>

          <Tabs.Panel value="monthly">
            <HabitsSection period="monthly" />
          </Tabs.Panel>
        </Group>
      </Tabs>
    </PageLayout>
  );
}

export default Home;
