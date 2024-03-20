import { Avatar, Flex, Progress, Skeleton, Text, Tooltip } from "@mantine/core";
import { useGlobalStore } from "app/globalStore";
import { useState } from "react";
import PageLayout from "layouts/PageLayout";
import Heatmap from "components/Heatmap/Heatmap";

import classes from './style.module.css'

const Statistics = () => {

  const [isLoading, setIsLoading] = useState(true);

  const { getCurrentLevelExperience, userName, level, daysStrick, maxDaysStrick, earned, spent, avatar, setAvatar} = useGlobalStore((state) => state);

  const experience = getCurrentLevelExperience();
  const maxExperience = (level-1) * 50 + 100;

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result as string);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  
  const handleUploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const base64 = await convertToBase64(file);
    setAvatar(base64);
  };
  
  return (
    <PageLayout title="Статистика" defaultTab="statistics">
        <Flex gap={20} align="center">
          <Flex direction="column" align="center">
              <div className={classes["avatar-container"]}>
                <Avatar className={classes['avatar']} src={avatar} onLoad={() => setIsLoading(false)} />
                <Skeleton className={classes["skeleton-avatar"]} circle visible={isLoading} />
                <input type="file" title="Выбери новую аватарку" className={classes["file-input"]} onChange={handleUploadAvatar} accept="image/*" />
              </div>
            <Text size="xl">{userName}</Text>
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
          <Skeleton className={classes["skeleton-heatmap"]} visible={isLoading} />
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
