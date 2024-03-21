import { Button, Group, Text } from "@mantine/core";
import { useGlobalStore } from "app/globalStore";
import { FC } from "react";

interface Props {
  close: () => void;
}

const ModalDelete: FC<Props> = ({ close }) => {

    const {removeHabit, removeAllHabitHistroy } = useGlobalStore((state) => state);

    const handleDeleteWithHistory = () => {
        const habitId = JSON.parse(localStorage.getItem("habitToDelete") as string);
        removeHabit(habitId);
        localStorage.removeItem("habitToDelete");
        removeAllHabitHistroy(habitId);
        close();
      };
    
      const handleDeleteWithoutHistory = () => {
        const habitId = JSON.parse(localStorage.getItem("habitToDelete") as string);
        removeHabit(habitId);
        localStorage.removeItem("habitToDelete");
        close();
      };

  return (
    <>
      <Text mb={16}>Вы хотите удалить эту привычку и из истории тоже?</Text>
      <Group>
        <Button
          variant="outline"
          onClick={() => {
            handleDeleteWithHistory();
          }}
        >
          Да
        </Button>
        <Button
          color="red"
          variant="outline"
          onClick={() => {
            handleDeleteWithoutHistory();
          }}
        >
          Нет
        </Button>
      </Group>
    </>
  );
};

export default ModalDelete;
