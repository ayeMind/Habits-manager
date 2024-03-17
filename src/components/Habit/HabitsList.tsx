import { List, ThemeIcon, rem } from "@mantine/core";
import { IconCircleCheck, IconCircleDashed } from "@tabler/icons-react";
import { useGlobalStore } from "app/globalStore";
import { Habit } from "app/interfaces";

import { FC } from "react";

interface Props {
  period: "daily" | "weekly" | "monthly";
}

const HabitsList: FC<Props> = ({ period }) => {

  const habitsList = useGlobalStore((state) => state.habits);
  const toggleHabit = useGlobalStore((state) => state.toggleHabit);

  let habits: Habit[] | null = JSON.parse(localStorage.getItem("habits") as string)
  if (!habits) {
    habits = []
  }
  const handleIconClick = (id: number) => {
   toggleHabit(id);
  }

  return (
    <>
      <List spacing="xs" size="lg" center>
        {habitsList.map((habit) => (
          <List.Item
            key={habit.id}
            icon={
              habit.isCompleted ? (
                <ThemeIcon color="teal" size={24} radius="xl">
                  <IconCircleCheck
                    role="button"
                    style={{ width: rem(16), height: rem(16), cursor: "pointer"}}
                    onClick={() => handleIconClick(habit.id)}
                  />
                </ThemeIcon>
              ) : (
                <ThemeIcon color="blue" size={24} radius="xl">
                  <IconCircleDashed
                    role="button"
                    style={{ width: rem(16), height: rem(16), cursor: "pointer"}}
                    onClick={() => handleIconClick(habit.id)}
                  />
                </ThemeIcon>
              )
            }
          >
            {habit.title}
          </List.Item>
        ))}
      </List>
    </>
  );
};

export default HabitsList;
