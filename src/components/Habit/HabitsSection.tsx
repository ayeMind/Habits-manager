import { Button, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import HabitsList from "components/Habit/HabitsList/HabitsList";
import ModalCreate from "components/Modals/ModalCreate/ModalCreate";

import { FC } from "react"


interface Props {
    period: "daily" | "weekly" | "monthly";
}

const HabitsSection:FC<Props> = ({period}) => {

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
        <Modal opened={opened} onClose={close} title="Добавление привычки">
            <ModalCreate close={close} />
        </Modal>

        <HabitsList period={period} />
        
        <Group mt="xl" align="center">
            <Button onClick={open} color="teal">
                Добавить привычку
            </Button>
        </Group>
    </>
  );
};

export default HabitsSection;

