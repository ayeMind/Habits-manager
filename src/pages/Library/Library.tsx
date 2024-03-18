import {
  Autocomplete,
  Button,
  Card,
  Flex,
  Group,
  Modal,
  SegmentedControl,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { useGlobalStore } from "app/globalStore";
import { useLibraryStore } from "./libraryStore";
import { LibraryHabit } from "app/interfaces";
import { translatePeriod } from "actions/translatePeriod";
import { useDisclosure } from "@mantine/hooks";

import PageLayout from "layouts/PageLayout";
import ModalAdd from "./ModalAdd";

import classes from "./style.module.css";

const Library = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const categoires = useGlobalStore((state) => state.categories);

  const segmentedContolLabels = ["Все", "День", "Неделя", "Месяц"];

  const [period, setPeriod] = useState("Все");
  const [category, setCategory] = useState("");

  const habits = useLibraryStore((state) => state.habits);
  const [filteredHabits, setFilteredHabits] = useState(
    habits as LibraryHabit[]
  );

  useEffect(() => {
    console.log(period, category, habits);

    if (period === "Все" && category === "") {
      setFilteredHabits(habits);
    } else if (period === "Все" && category !== "") {
      setFilteredHabits(
        habits.filter((habit) => habit.category.includes(category))
      );
    } else if (period !== "Все" && category === "") {
      setFilteredHabits(
        habits.filter((habit) => translatePeriod(habit.period) === period)
      );
    } else {
      setFilteredHabits(
        habits.filter(
          (habit) =>
            translatePeriod(habit.period) === period &&
            habit.category.includes(category)
        )
      );
    }
  }, [period, category, habits]);

  const toggleCard = (id: number) => {
    const updatedHabits = filteredHabits.map((habit) => {
      if (habit.id === id) {
        return { ...habit, selected: !habit.selected };
      }
      return habit;
    });
    setFilteredHabits(updatedHabits);
  };

  const checkHaveSelected = () => {
    return filteredHabits.some((habit) => habit.selected);
  };

  const habitsList = filteredHabits.map((habit) => {
    return (
      <Card
        onClick={() => toggleCard(habit.id)}
        className={!habit.selected ? classes["card"] : classes["active-card"]}
        key={habit.id}
        shadow="xs"
        radius="md"
        padding="md"
        role="checkbox"
      >
        <Text size="md" mb={5}>
          {habit.title}
        </Text>
        <Flex justify="space-between">
          <Text size="sm">{translatePeriod(habit.period)}</Text>
          <Text size="sm">{habit.category}</Text>
        </Flex>
      </Card>
    );
  });

  return (
    <PageLayout title="Библиотека" defaultTab="library">
      <Modal opened={opened} onClose={close} title="Добавление в библиотеку">
        <ModalAdd close={close} />
      </Modal>

      <Group>
        <SegmentedControl
          defaultValue="all"
          value={period}
          onChange={setPeriod}
          h={35}
          data={segmentedContolLabels}
        />
        <Autocomplete
          h={35}
          value={category}
          onChange={(value) => setCategory(value)}
          placeholder="Введи категорию"
          maw={300}
          data={categoires}
          leftSection={<IconSearch stroke={1} />}
        />
        {checkHaveSelected() && (
          <Button w={200} h={35} visibleFrom="sm">
            Добавить выбранные
          </Button>
        )}
      </Group>
      {filteredHabits.length === 0 ? (
        <Text mt={20}>Ничего не найдено</Text>
      ) : (
        <SimpleGrid mt={30} cols={{ base: 1, xs: 2, lg: 3, xl: 4, xxxl: 6 }}>
          {habitsList}
        </SimpleGrid>
      )}
      <Flex direction="column" align="center">
        {checkHaveSelected() && (
          <Button mt={20} w={250} hiddenFrom="sm">
            Добавить выбранные
          </Button>
        )}
        <Button mt={20} w={250} onClick={open}>
          Пополнить библиотеку
        </Button>
      </Flex>
    </PageLayout>
  );
};

export default Library;
