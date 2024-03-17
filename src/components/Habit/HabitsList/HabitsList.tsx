import {
  Text,
  Slider,
  ThemeIcon,
  rem,
  Flex,
  Table,
  Button,
  Modal,
  Group,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCircleCheck, IconCircleDashed } from "@tabler/icons-react";
import { useGlobalStore } from "app/globalStore";
import { Habit } from "app/interfaces";

import { FC } from "react";

import classes from "./style.module.css";

interface Props {
  period: "daily" | "weekly" | "monthly";
}

const HabitsList: FC<Props> = ({ period }) => {
  const {
    getHabitsWithPeriod,
    toggleHabit,
    completeHabit,
    changeTargetValue,
    removeHabit,
  } = useGlobalStore((state) => state);

  const habits = getHabitsWithPeriod(period) as Habit[];

  const [opened, { open, close }] = useDisclosure(false);

  const handleOpen = (id: number) => {
    localStorage.setItem("habitToDelete", JSON.stringify(id));
    open();
  }

  const handleDeleteWithHistory = () => {
    const habitId = JSON.parse(localStorage.getItem("habitToDelete") as string);
    removeHabit(habitId);
    localStorage.removeItem("habitToDelete");
    close();
  };

  const handleDeleteWithoutHistory = () => {
    const habitId = JSON.parse(localStorage.getItem("habitToDelete") as string);
    removeHabit(habitId);
    localStorage.removeItem("habitToDelete");
    close();
  }

  const handleIconClick = (habit: Habit) => {
    const id = habit.id;

    let maxTargetValue = habit.targetValue;
    if (!habit.isCompleted) {
      if (!maxTargetValue || maxTargetValue <= 1) maxTargetValue = 1;
    } else {
      maxTargetValue = 0;
    }

    toggleHabit(id);
    changeTargetValue(id, maxTargetValue);
  };

  const onSliderChange = (habit: Habit, value: number) => {
    const id = habit.id;
    changeTargetValue(id, value);
    if (habit.targetValue === value) completeHabit(id);
    else if (habit.isCompleted) toggleHabit(id);
  };


  const rows = habits.map((habit) => (
    <Table.Tr key={habit.id}>
      <Table.Td maw={300}>
        <Flex align="center" gap="sm">
          {habit.isCompleted ? (
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck
                role="button"
                style={{
                  width: rem(16),
                  height: rem(16),
                  cursor: "pointer",
                }}
                onClick={() => handleIconClick(habit)}
              />
            </ThemeIcon>
          ) : (
            <ThemeIcon color="blue" size={24} radius="xl">
              <IconCircleDashed
                role="button"
                style={{
                  width: rem(16),
                  height: rem(16),
                  cursor: "pointer",
                }}
                onClick={() => handleIconClick(habit)}
              />
            </ThemeIcon>
          )}
          <Text>{habit.title}</Text>
        </Flex>
      </Table.Td>
      <Table.Td>
        <Slider
          className={classes.slider}
          onChange={(value) => onSliderChange(habit, value)}
          step={1}
          value={habit.currentValue ? habit.currentValue : 0}
          min={0}
          max={habit.targetValue ? habit.targetValue : 1}
          disabled={!habit.targetValue && !habit.isCompleted}
          color={habit.isCompleted ? "teal" : "blue"}
          thumbSize={12}
        />
      </Table.Td>
      <Table.Td>
        <Button
          color="red"
          variant="outline"
          onClick={() => handleOpen(habit.id)}
        >
          Удалить
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>Привычка</Table.Th>
      <Table.Th>Прогресс</Table.Th>
    </Table.Tr>
  );

  return (
    <>
      <Modal opened={opened} onClose={close} size="auto" title="Удаление">
        <Text mb={16}>Вы хотите удалить эту привычку и из истории тоже?</Text>
        <Group>
          <Button variant="outline" onClick={() => {handleDeleteWithHistory()}}>Да</Button>
          <Button color="red" variant="outline" onClick={() => {handleDeleteWithoutHistory()}}>Нет</Button>
        </Group>
      </Modal>

      <Table withRowBorders={false} highlightOnHover>
        <Table.Thead>{ths}</Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
};

export default HabitsList;
