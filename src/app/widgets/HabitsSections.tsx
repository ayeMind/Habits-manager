import { Button, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import HabitsList from "components/Habit/HabitsList";

import { FC } from "react"

interface Props {
    period: "daily" | "weekly" | "monthly";
}

const HabitsSection:FC<Props> = ({period}) => {

  const [opened, { open, close }] = useDisclosure(false);


  return (
    <>

        <Modal opened={opened} onClose={close} title="Добавить привычку">
            <p>Добавление привычки</p>
        </Modal>


        <HabitsList period={period} />
        <Group mt="xl" align="center" justify="center">
            <Button onClick={open} color="teal">
                Добавить привычку
            </Button>
            {/* <Button onClick={() => setHabitsList([])} color="red">
                Очистить список
            </Button> */}
        </Group>
    </>
  );
};

export default HabitsSection;

