import {
  Text,
  Progress,
  ThemeIcon,
  rem,
  Flex,
  Table,
  Button,
  Modal,
  NumberInput,
  ActionIcon,
  Popover,
  Container,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCircleCheck,
  IconCircleDashed,
  IconEdit,
  IconSquareRoundedMinus,
} from "@tabler/icons-react";
import { useGlobalStore } from "app/globalStore";
import { Habit, HabitAction } from "app/interfaces";

import { FC } from "react";

import classes from "./style.module.css";
import ModalDelete from "../ModalDelete";

interface Props {
  period: "daily" | "weekly" | "monthly";
}

const HabitsList: FC<Props> = ({ period }) => {
  const {
    getHabitsWithPeriod,
    toggleHabit,
    completeHabit,
    changeTargetValue,
    removeCurrentAction,
    addAction,
    getLastHistoryId,
    history,
  } = useGlobalStore((state) => state);

  const habits = getHabitsWithPeriod(period) as Habit[];

  const [opened, { open, close }] = useDisclosure(false);

  const handleOpen = (id: number) => {
    localStorage.setItem("habitToDelete", JSON.stringify(id));
    open();
  };

  const timeByPeriod = (period: "daily" | "weekly" | "monthly") => {
    if (period === "daily") return 86400;
    if (period === "weekly") return 604800;
    if (period === "monthly") return 2592000;
  };

  const preHabitChange = (habit: Habit) => {
    if (habit.isCompleted) {
      const time = timeByPeriod(habit.period) as number;
      removeCurrentAction(habit.id, time);
    } else {
      const lastHistoryId = getLastHistoryId();

      let action = {} as HabitAction;
      if (habit.targetValue) {
        action = {
          id: lastHistoryId + 1,
          habit_id: habit.id,
          date: new Date(),
          isCompleted: true,
          value: habit.currentValue,
        };
      } else {
        action = {
          id: lastHistoryId + 1,
          habit_id: habit.id,
          date: new Date(),
          isCompleted: true,
        };
      }

      addAction(action);

      console.log(history);
    }
  };

  const handleIconClick = (habit: Habit) => {
    const id = habit.id;

    let maxTargetValue = habit.targetValue;
    if (!habit.isCompleted) {
      if (!maxTargetValue || maxTargetValue <= 1) maxTargetValue = 1;
    } else {
      maxTargetValue = 0;
    }

    preHabitChange(habit);

    toggleHabit(id);
    changeTargetValue(id, maxTargetValue);
  };

  const progressChange = (habit: Habit, value: number) => {
    const id = habit.id;
    changeTargetValue(id, value);
    if (habit.targetValue === value) {
      completeHabit(id);
      const action = {
        id: getLastHistoryId() + 1,
        habit_id: id,
        date: new Date(),
        isCompleted: true,
        value: value,
      };
      addAction(action);
    } else if (habit.isCompleted) {
      toggleHabit(id);
      const time = timeByPeriod(habit.period) as number;
      removeCurrentAction(id, time);
    }
  };

  const handleChangeProgress = (
    e: React.MouseEvent<HTMLButtonElement>,
    habit: Habit
  ) => {
    const form = document.querySelector(".mobile-form");
    e.preventDefault();
    const formData = new FormData(e.currentTarget.form as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    const progress = +data.progress;

    if (progress < 0) return;
    if (habit.targetValue && progress > habit.targetValue) {
      progressChange(habit, habit.targetValue);
    } else if (habit.targetValue) {
      progressChange(habit, progress);
    } else if (!habit.targetValue && progress > 0) {
      progressChange(habit, 1);
    } else if (progress === 0) {
      progressChange(habit, 0);
    }
  };

  const rows = habits.map((habit) => (
    <Table.Tr key={habit.id}>
      <Table.Td maw={200}>
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
          <p className={classes["habit-title"]}>{habit.title}</p>
        </Flex>
      </Table.Td>
      <Table.Td>
        <Progress
          className={classes.slider}
          value={
            habit.targetValue
              ? (habit.currentValue / habit.targetValue) * 100
              : habit.isCompleted
              ? 100
              : 0
          }
          color={habit.isCompleted ? "teal" : "blue"}
        />
      </Table.Td>
      <Table.Td>
        <form>
          <Flex align="center" gap="md" visibleFrom="sm">
            <NumberInput
              hideControls
              name="progress"
              size="xs"
              placeholder="0"
              radius="md"
            />
            <Button
              type="submit"
              variant="outline"
              onClick={(e) => handleChangeProgress(e, habit)}
            >
              <Text visibleFrom="md">Изменить прогресс</Text>
              <Text hiddenFrom="md">Изменить</Text>
            </Button>
          </Flex>
        </form>

        <Container hiddenFrom="sm">
          <Popover>
            <Popover.Target>
              <ActionIcon bg="none">
                <IconEdit stroke={1} />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
              <form className={classes["mobile-form"]}>
                <NumberInput
                  hideControls
                  name="progress"
                  size="xs"
                  placeholder="0"
                  radius="md"
                />
                <Button
                  type="submit"
                  variant="outline"
                  onClick={(e) => handleChangeProgress(e, habit)}
                >
                  <Text>Изменить прогресс</Text>
                </Button>
              </form>
            </Popover.Dropdown>
          </Popover>
        </Container>
      </Table.Td>
      <Table.Td>
        <Button
          color="red"
          variant="outline"
          visibleFrom="md"
          onClick={() => handleOpen(habit.id)}
        >
          Удалить
        </Button>
        <ActionIcon
          type="submit"
          hiddenFrom="md"
          bg="none"
          onClick={() => handleOpen(habit.id)}
        >
          <IconSquareRoundedMinus stroke={1} color="pink" />
        </ActionIcon>
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
        <ModalDelete close={close} />
      </Modal>

      <Table withRowBorders={false} highlightOnHover>
        <Table.Thead>{ths}</Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
};

export default HabitsList;
