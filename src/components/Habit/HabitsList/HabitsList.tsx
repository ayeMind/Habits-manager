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
  Tooltip,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCircleCheck,
  IconCircleDashed,
  IconEdit,
  IconSquareRoundedMinus,
} from "@tabler/icons-react";
import { useGlobalStore } from "app/globalStore";
import { isPeriodChanged } from "actions/isPeriodChanged";
import { GlobalState, Habit, HabitAction } from "app/interfaces";
import { FC, useEffect } from "react";
import classes from "./style.module.css";
import ModalDelete from "../../Modals/ModalDelete";


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
    level,
    currentDateCorrection,
    theme,
    lastTemplateImportDate,
    templateDaily,
    getDate,
    changeTemplateDailyTargetValue,
    toggleTemplateDaily,
    completeAllDailyHabits,
  } = useGlobalStore((state: GlobalState) => state);

  let habits = getHabitsWithPeriod(period) as Habit[];
  const isTemplateImported = (templateDaily.length > 0 && !isPeriodChanged(new Date(lastTemplateImportDate), getDate(), "daily"));
  if (isTemplateImported && period === "daily") {
    habits = templateDaily;
  }

  useEffect(() => {
    if (!isTemplateImported || period !== "daily") return;
    completeAllDailyHabits();
  }, [isTemplateImported])
  
  const editIconColor = (theme === "light") ? "black" : "white";
  const removeIconColor = (theme === "light") ? "red" : "pink";
  const [opened, { open, close }] = useDisclosure(false);
  const handleOpen = (id: number) => {
    localStorage.setItem("habitToDelete", JSON.stringify(id));
    open();
  };

  const preHabitChange = (habit: Habit) => {    
    if (habit.isCompleted) {
      removeCurrentAction(habit.id);
    } else {
      const lastHistoryId = getLastHistoryId();
      let action = {} as HabitAction;
      if (habit.targetValue) {
        action = {
          id: lastHistoryId + 1,
          habit_id: habit.id,
          habit_period: habit.period,
          date: new Date(new Date().getTime() + currentDateCorrection),
          isCompleted: true,
          value: habit.currentValue,
        };
      } else {
        action = {
          id: lastHistoryId + 1,
          habit_id: habit.id,
          habit_period: habit.period,
          date: new Date(new Date().getTime() + currentDateCorrection),
          isCompleted: true,
        };
      }
      addAction(action);
    }
  };

  const handleIconClick = (habit: Habit) => {
    const id = habit.id;
    let maxTargetValue = habit.targetValue;

    if (isTemplateImported) {
      if (habit.isCompleted) {
        changeTemplateDailyTargetValue(id, 0);
      } else {
        changeTemplateDailyTargetValue(id, habit.targetValue);
      }
      toggleTemplateDaily(habit);
      return;
    }

    if (!habit.isCompleted) {
      if (!maxTargetValue || maxTargetValue <= 1) maxTargetValue = 1;
    } else {
      maxTargetValue = 0;
    }

    preHabitChange(habit);

    if (toggleHabit(habit)) {
      notifications.show({
        color: "teal",
        title: "Поздравляю!",
        message: `Вы достигли уровня ${level + 1}`,
        autoClose: 5000,
      });
    }

    changeTargetValue(id, maxTargetValue);
  };

  const progressChange = (habit: Habit, value: number) => {
    const id = habit.id;
    if (isTemplateImported) {
      changeTemplateDailyTargetValue(id, value);
      if (value >= habit.targetValue && !habit.isCompleted) {
        toggleTemplateDaily(habit);
      } else if (value < habit.targetValue && habit.isCompleted) {
        toggleTemplateDaily(habit);
      }
      return;
    }

    if (habit.targetValue <= habit.currentValue && value >= habit.targetValue) {
      changeTargetValue(id, value);
      return;
    }

    changeTargetValue(id, value);

    if (habit.targetValue <= value) {
      const isNextLevel = completeHabit(id);
      const action = {
        id: getLastHistoryId() + 1,
        habit_id: id,
        habit_period: habit.period,
        date: new Date(new Date().getTime() + currentDateCorrection),
        isCompleted: true,
        value: value,
      };
      addAction(action);
      if (isNextLevel) {
        notifications.show({
          color: "teal",
          title: "Поздравляю!",
          message: `Вы достигли уровня ${level + 1}`,
          autoClose: 5000,
        });
      }
    } else if (habit.isCompleted) {
      toggleHabit(habit);
      removeCurrentAction(id);
    }
  };

  const handleChangeProgress = (
    e: React.MouseEvent<HTMLButtonElement>,
    habit: Habit
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget.form as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    const progress = +data.progress;

    if (progress < 0) return;
    if (habit.targetValue) {
      progressChange(habit, progress);
    } else if (!habit.targetValue && progress > 0) {
      progressChange(habit, 1);
    } else if (progress === 0) {
      progressChange(habit, 0);
    }
  };

  const calculateProgress = (habit: Habit) => {
    if (habit.targetValue) {
      return (habit.currentValue / habit.targetValue) * 100;
    } else {
      return habit.isCompleted ? 100 : 0;
    }
  };

  const rows = habits.map((habit) => (
    <Table.Tr key={habit.id}>
      <Table.Td maw={400}>
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
          <Tooltip
            className={classes["title-tooltip"]}
            label={habit.title}
            color="cyan"
            multiline
            events={{ hover: true, focus: true, touch: true }}
          >
            <Text className={classes["habit-title"]} lineClamp={3}>
              {habit.title}
            </Text>
          </Tooltip>
        </Flex>
      </Table.Td>
      <Table.Td>
        <Tooltip
          label={`Прогресс: ${habit.currentValue} из ${habit.targetValue} `}
          color="cyan"
          events={{ hover: true, focus: true, touch: true }}
        >
          <Progress
            className={classes.slider}
            value={calculateProgress(habit)}
            color={habit.isCompleted ? "teal" : "blue"}
          />
        </Tooltip>
      </Table.Td>
      <Table.Td>
        <form>
          <Flex align="center" gap="md" visibleFrom="sm">
            <Tooltip
              label="Введите прогресс"
              color="cyan"
              events={{ hover: true, focus: true, touch: true }}
            >
              <NumberInput
                hideControls
                name="progress"
                size="xs"
                placeholder="0"
                radius="md"
                allowNegative={false}
              />
            </Tooltip>
            <Button
              type="submit"
              variant="outline"
              onClick={(e) => handleChangeProgress(e, habit)}
            >
              <Text visibleFrom="lg">Изменить прогресс</Text>
              <Text hiddenFrom="lg">Изменить</Text>
            </Button>
          </Flex>
        </form>

        <Container hiddenFrom="sm">
          <Popover>
            <Popover.Target>
              <ActionIcon bg="none">
                <IconEdit stroke={1} color={editIconColor} />
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
                  allowNegative={false}
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
        {(period !== "daily" || isPeriodChanged(new Date(lastTemplateImportDate), getDate(), "daily")) && (
          <>
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
            <IconSquareRoundedMinus stroke={1} color={removeIconColor} />
          </ActionIcon>
          </>
        )}
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr visibleFrom="xxs">
      <Table.Th>Привычка</Table.Th>
      <Table.Th>Прогресс</Table.Th>
    </Table.Tr>
  );

  return (
    <>
      <Modal opened={opened} onClose={close} size="auto" title="Удаление">
        <ModalDelete close={close} />
      </Modal>

      {(habits.length === 0) ? (
        <Text size="xl">Нет привычек</Text>
      ) : (
        <Table withRowBorders={false} highlightOnHover>
          <Table.Thead>{ths}</Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      )}
    </>
  );
};

export default HabitsList;
