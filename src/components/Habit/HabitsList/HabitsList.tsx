import { Text, List, Slider, ThemeIcon, rem, Flex } from "@mantine/core";
import { IconCircleCheck, IconCircleDashed } from "@tabler/icons-react";
import { useGlobalStore } from "app/globalStore";
import { Habit } from "app/interfaces";

import { FC } from "react";

import classes from "./style.module.css";

interface Props {
  period: "daily" | "weekly" | "monthly";
}

const HabitsList: FC<Props> = ({ period }) => {
  const { getHabitsWithPeriod, toggleHabit, completeHabit, changeTargetValue } =
    useGlobalStore((state) => state);

  const habits = getHabitsWithPeriod(period) as Habit[];

  const handleIconClick = (habit: Habit) => {
    const id = habit.id;

    let maxTargetValue = habit.targetValue
    if (!habit.isCompleted) {
      if (!maxTargetValue || maxTargetValue <= 1) maxTargetValue = 1;
    } else {
      maxTargetValue = 0;
    }
    
    console.log(maxTargetValue);
    toggleHabit(id);
    changeTargetValue(id, maxTargetValue);
  };



  const onSliderChangeEnd = (habit: Habit, value: number) => {
    const id = habit.id;
    changeTargetValue(id, value);
    if (habit.targetValue === value) completeHabit(id);
    else if (habit.isCompleted) toggleHabit(id);

  };

  return (
    <>
      <List spacing="xs" size="lg" center>
        {habits.map((habit) => (
          <List.Item
            key={habit.id}
            icon={
              habit.isCompleted ? (
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
              )
            }
          >
            <Flex justify="center" align="center">
              <Text>{habit.title}</Text>
              <Slider
                className={classes.slider}
                onChangeEnd={(value) => onSliderChangeEnd(habit, value)}
                step={1}
                value={habit.currentValue ? habit.currentValue : 0}
                min={0}
                max={habit.targetValue ? habit.targetValue : 1}
                disabled={!habit.targetValue && !habit.isCompleted}
                color={habit.isCompleted ? "teal" : "blue"}
                thumbSize={12}
              />
            </Flex>
          </List.Item>
        ))}
      </List>
    </>
  );
};

export default HabitsList;
