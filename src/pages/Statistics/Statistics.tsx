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
          <Tooltip label="Опыт: 0/100" position="top" events={{ hover: true, focus: true, touch: true }}>
            <Progress color="teal" value={0} w={200} />
          </Tooltip>
    
      

          <Text size="xs">Осталось следующего уровня: 100</Text>
          <Text size="sm">Получено достижений: 0</Text>
        </Flex>
      </Flex>
      <div className={classes["heatmap-container"]}>
        <Heatmap />
      </div>
    </PageLayout>
  );
};

export default Statistics;
