import {
  Autocomplete,
  Button,
  Card,
  Flex,
  Group,
  Modal,
  SegmentedControl,
  SimpleGrid,
  Switch,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { IconCheck, IconSearch } from "@tabler/icons-react";
import { useGlobalStore } from "app/globalStore";
import { useLibraryStore } from "./libraryStore";
import { translatePeriod } from "actions/translatePeriod";
import { useDisclosure } from "@mantine/hooks";

import { notifications } from "@mantine/notifications";

import PageLayout from "layouts/PageLayout";
import ModalAdd from "./ModalAdd";

import classes from "./style.module.css";

const Library = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const categoires = useGlobalStore((state) => state.categories);

  const segmentedContolLabels = ["Все", "День", "Неделя", "Месяц"];

  const [period, setPeriod] = useState("Все");
  const [category, setCategory] = useState("");

  const {habits, removeAllSelectedHabits, saveAllSelectedHabits } = useLibraryStore((state) => state);
  const [filteredHabits, setFilteredHabits] = useState(
    habits.filter((habit) => habit.saved !== true)
  );

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    
    setFilteredHabits(habits.filter((habit) => {
      return (translatePeriod(habit.period) === period || period === "Все") && 
      (habit.category.toLowerCase().includes(category.toLowerCase()) || category === "") && 
      (checked ? habit.saved === true : habit.saved !== true)
    }));
      
  }, [period, category, habits, checked]);

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

  const handleRemoveAllSelected = () => {
    const habits_id = filteredHabits
      .filter((habit) => habit.selected)
      .map((habit) => habit.id);
    removeAllSelectedHabits(habits_id);
  }

  const handleSaveAllSelected = () => {

    const habitsToSave = filteredHabits.filter((habit) => habit.selected);
    saveAllSelectedHabits(habitsToSave);
    setFilteredHabits(
      filteredHabits.map((habit) => {
        return { ...habit, selected: false };
      })
    );
          
    notifications.show({
      color: 'teal',
      title: 'Успех!',
      message: 'Выбранные привычки успешно добавлены в ваш список привычек',
      autoClose: 2000,
      icon: <IconCheck />,
    })
  }

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
        <Switch label={checked ? "Сохранённые" : "Не сохранённые"} checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)} />

        {checkHaveSelected() && (
          <Flex gap="md" visibleFrom="sm">
            <Button w={150} h={35} color="indigo" onClick={handleSaveAllSelected}>
              Сохранить себе
            </Button>
            <Button w={100} h={35} color="pink" onClick={handleRemoveAllSelected}>
              Удалить
            </Button>
          </Flex>
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
          <Flex mt={20} gap="md" hiddenFrom="sm">
            <Button w={150} h={35} color="indigo" onClick={handleSaveAllSelected}>
              Сохранить себе
            </Button>
            <Button w={95} h={35} color="pink" onClick={handleRemoveAllSelected}>
              Удалить
            </Button>
          </Flex>
        )}
        <Button mt={20} w={250} onClick={open}>
          Пополнить библиотеку
        </Button>
      </Flex>
    </PageLayout>
  );
};

export default Library;
