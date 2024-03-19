import { Avatar, Flex, Progress, Text, Tooltip } from "@mantine/core";
import PageLayout from "layouts/PageLayout";

import classes from './style.module.css'
import Heatmap from "components/Heatmap/Heatmap";

const Statistics = () => {
  return (
    <PageLayout title="Статистика" defaultTab="statistics">
      <Flex gap={20} align="center">
        <Flex direction="column" align="center">
          <Tooltip label="Изменить аватар" position="bottom">
            <div className={classes["avatar-container"]}>
              <Avatar className={classes["avatar"]} />
              <input type="file" className={classes["file-input"]} />
            </div>
          </Tooltip>
          <Text size="xl">ayeMind</Text>
        </Flex>

        <Flex direction="column" gap="xs">
          <Text>Уровень: 1</Text>
          <Progress color="teal" value={40} w={400} visibleFrom="xs" />
          <Progress color="teal" value={40} w={200} hiddenFrom="xs" />

          <Text size="xs">Осталось опыта до следующего уровня: 100</Text>
          <Text size="sm">Получено достижений: 0</Text>
        </Flex>
      </Flex>
      <Heatmap />
    </PageLayout>
  );
};

export default Statistics;
