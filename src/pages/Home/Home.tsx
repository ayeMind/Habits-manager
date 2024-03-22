import { Group, Tabs, Text } from "@mantine/core";
import PageLayout from "layouts/PageLayout";

import {
  IconCalendar,
  IconCalendarMonth,
  IconCalendarWeek,
} from "@tabler/icons-react";
import HabitsSection from "components/Habit/HabitsSection";

function Home() {

  return (
    <PageLayout title="Трекер привычек" defaultTab="home">
      <Tabs variant="pills" defaultValue="daily">
        <Tabs.List>
          <Tabs.Tab value="daily" leftSection={<IconCalendar />}>
            <Text visibleFrom="sm">Ежедневные</Text>
          </Tabs.Tab>
          <Tabs.Tab value="weekly" leftSection={<IconCalendarWeek />}>
            <Text visibleFrom="sm">Еженедельные</Text>
          </Tabs.Tab>
          <Tabs.Tab value="monthly" leftSection={<IconCalendarMonth />}>
            <Text visibleFrom="sm">Ежемесячные</Text>
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
