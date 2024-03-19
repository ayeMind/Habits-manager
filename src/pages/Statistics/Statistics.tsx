import { Avatar, Flex, Progress, Text, Tooltip } from "@mantine/core";
import PageLayout from "layouts/PageLayout";

import classes from './style.module.css'
import Heatmap from "components/Heatmap/Heatmap";
import { useGlobalStore } from "app/globalStore";

const Statistics = () => {

  const { getCurrentLevelExperience, level, daysStrick, maxDaysStrick, earned, spent } = useGlobalStore((state) => state);

  const experience = getCurrentLevelExperience();
  const maxExperience = (level-1) * 50 + 100;

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
          <Text>Уровень: {level}</Text>
          <Tooltip label={`Опыт: ${experience}/${maxExperience}`} position="top" events={{ hover: true, focus: true, touch: true }}>
            <Progress color="teal" value={experience / maxExperience * 100} w={200} />
          </Tooltip>
    
      

          <Text size="xs">Осталось следующего уровня: {maxExperience - experience}</Text>
          <Text size="sm">Получено достижений: 0</Text>
        </Flex>
      </Flex>
      <div className={classes["heatmap-container"]}>
        <Heatmap />
      </div>
      <div className={classes["text-container"]}>
        <Text>Количество дней с выполнением всех привычек до конца периода</Text>
        <Text>Текущий стрик: {daysStrick}</Text>
        <Text mb="md">Максимальный стрик: {maxDaysStrick}</Text>
        <Text>Заработано монет: {earned}</Text>
        <Text mb="md">Потрачено монет: {spent}</Text>
        <Text>Количество выполненных привычек: 0</Text>
        <Text>Количество пропущенных привычек: 0</Text>


      </div>
    </PageLayout>
  );
};

export default Statistics;
