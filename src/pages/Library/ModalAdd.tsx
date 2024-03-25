import { Text, Flex, Card, SimpleGrid, TextInput } from "@mantine/core";
import { useGlobalStore } from "app/globalStore";
import { FC, useState } from "react"

import classes from "./style.module.css";
import { useLibraryStore } from "./libraryStore";
import { Habit } from "app/interfaces";
import { IconSearch } from "@tabler/icons-react";

import { translatePeriod } from "actions/translatePeriod";

interface Props {
    close: () => void;
}


const ModalAdd:FC<Props> = ({close}) => {

    const habits = useGlobalStore((state) => state.habits);
    const addHabit = useLibraryStore((state) => state.addHabit);

    const [search, setSearch] = useState("");

    const handleAddHabit = (habit: Habit) => {
        const newHabit = {
            title: habit.title,
            category: habit.category,
            period: habit.period,
            targetValue: habit.targetValue
        }

        addHabit(newHabit);
        close();
    }

    const filteredHabits = habits.filter((habit) => habit.title.toLowerCase().includes(search.toLowerCase()) 
                           || habit.category.toLowerCase().includes(search.toLowerCase())
                           || translatePeriod(habit.period).toLowerCase().includes(search.toLowerCase()));

    const displayedHabits = filteredHabits.map((habit) => 
        <Card onClick={() => {handleAddHabit(habit)}} key={habit.id} className={classes["card"]} shadow="xs" radius="md" padding="md">
            <Text mb="xs">{habit.title}</Text>
            <Flex justify="space-between">
                <Text>{translatePeriod(habit.period)}</Text>
                <Text>{habit.category}</Text>
            </Flex>
        </Card>
    )


   return (
    <>
        <TextInput mb={20} placeholder="Поиск"
            leftSection={<IconSearch />}
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
        >

        </TextInput>
        {displayedHabits.length === 0 && (
            <Text>У вас нет своих привычек</Text>
        )}
       <SimpleGrid spacing={15}>
         {displayedHabits}
       </SimpleGrid>

    </>
   )
}

export default ModalAdd