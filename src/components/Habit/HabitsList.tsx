import { List, ThemeIcon, rem } from "@mantine/core";
import { IconCircleCheck, IconCircleDashed } from "@tabler/icons-react";
import { Habit } from "app/interfaces";
import { useState } from "react";

import { FC } from "react";

interface Props {
  period: "daily" | "weekly" | "monthly";
}

const HabitsList: FC<Props> = ({ period }) => {

    // const [habitsList, setHabitsList] = useState([
    //   {"id": 1, "title": "Пить воду 1", "category": "Здоровье", "addDate": new Date(), "period": "daily", "isCompleted": false},
    //   {"id": 2, "title": "Пить воду 2", "category": "ЗОЖ", "addDate": new Date(), "period": "daily", "targetValue": 108, "isCompleted": false},
    //   {"id": 3, "title": "Пить воду 3", "category": "Здоровый образ жизни", "addDate": new Date(), "period": "daily", "targetValue": 1000, "isCompleted": false},
    //   {"id": 4, "title": "Пить воду 4", "category": "Здоровье", "addDate": new Date(), "period": "weekly", "isCompleted": true},
    //   {"id": 5, "title": "Пить воду 5", "category": "Здоровье", "addDate": new Date(), "period": "monthly", "isCompleted": false},
    //   {"id": 6, "title": "Пить воду 6", "category": "Здоровье", "addDate": new Date(), "period": "weekly", "isCompleted": false},
    //   {"id": 7, "title": "Пить воду 7", "category": "Здоровье", "addDate": new Date(), "period": "daily", "isCompleted": true},

    // ] as Habit[]);

    // localStorage.setItem("habits", JSON.stringify(habitsList));

  let habits: Habit[] | null = JSON.parse(localStorage.getItem("habits") as string)
  if (!habits) {
    habits = []
  }
  const [habitsList, setHabitsList] = useState(habits as Habit[]);

  const handleIconClick = (id: number) => {
    const newHabitsList = habitsList.map((habit) => {
      if (habit.id === id) {
        return { ...habit, isCompleted: !habit.isCompleted };
      }
      return habit;
    });

    setHabitsList(newHabitsList);
    localStorage.setItem("habits", JSON.stringify(newHabitsList));
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
