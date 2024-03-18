import {
  Autocomplete,
  Button,
  Card,
  Flex,
  Group,
  SegmentedControl,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useGlobalStore } from "app/globalStore";
import PageLayout from "layouts/PageLayout";
import { useLibraryStore } from "./libraryStore";
import { useEffect, useState } from "react";
import { LibraryHabit } from "app/interfaces";

const Library = () => {
  const categoires = useGlobalStore((state) => state.categories);

  const segmentedContolLabels = ["Все", "День", "Неделя", "Месяц"];

  const [period, setPeriod] = useState("Все");
  const [category, setCategory] = useState("");

  const habits = useLibraryStore((state) => state.habits);
  const [filteredHabits, setFilteredHabits] = useState(habits as LibraryHabit[]);

  const translatePeriod = (period: "daily" | "weekly" | "monthly") => {
    if (period === "daily") return "День";
    if (period === "weekly") return "Неделя";
    if (period === "monthly") return "Месяц";
  };

  useEffect(() => {
    console.log(period, category, habits);
    
    if (period === "Все" && category === "") {
      setFilteredHabits(habits);
    } else if (period === "Все" && category !== "") {
      setFilteredHabits(habits.filter((habit) => habit.category.includes(category)));
    } else if (period !== "Все" && category === "") {
      setFilteredHabits(habits.filter((habit) => translatePeriod(habit.period) === period));
    } else {
      setFilteredHabits(
        habits.filter(
          (habit) => translatePeriod(habit.period) === period && habit.category.includes(category))
        );
    }
  }, [period, category, habits]);

  const habitsList = filteredHabits.map((habit) => {
    return (
      <Card key={habit.id} shadow="xs" radius="md" padding="md" role="button">
        <Text size="md" mb={5}>
          {habit.title}
        </Text>
        <Flex justify="space-between">
          <Text size="sm">{habit.category}</Text>
          <Text size="sm">{translatePeriod(habit.period)}</Text>
        </Flex>
      </Card>
    );
  });


  return (
    <PageLayout title="Библиотека" defaultTab="library">
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
      </Group>
      <SimpleGrid mt={30} cols={{ base: 1, xs: 2, lg: 3, xl: 4, xxxl: 6 }}>
        {habitsList}
      </SimpleGrid>
      <Button mt={20}>Добавить из своих прывычек</Button>
    </PageLayout>
  );
};

export default Library;
