import { Flex, Modal, Text, FileButton, Button } from "@mantine/core";
import { DataToUpload, HabitActionToUpload, HabitToUpload, Habit, HabitAction } from "app/interfaces";
import { isPeriodChanged } from "actions/isPeriodChanged";
import { FC } from "react"
import { useGlobalStore } from "app/globalStore";
import { Link } from "react-router-dom";

interface Props {
    opened: boolean;
    close: () => void;
}

const ModalImport:FC<Props> = ({opened, close}) => {

    // Для стандартного импорта (просто привычки и действия, как в ТЗ)
    const importStorage = useGlobalStore((state) => state.importStorage);

    const standartImport = (file: File | null) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result;
                const data = JSON.parse(result as string) as DataToUpload

                const actionsToUpload = data["actions"];
                const habitsToUpload = data["habits"];

                const habits: Habit[] = habitsToUpload.map((habit: HabitToUpload) => {
                    const targetValue = habit.targetValue ? habit.targetValue : 1;

                    const filteredActions = actionsToUpload.filter((action: HabitActionToUpload) => {
                        if (action.id !== habit.id) return false;
                        if (!action.value) return false;
                        if (isPeriodChanged(new Date(action.date), new Date(), habit.period)) return false;
                        return true;
                    })

                    let currentValue;

                    if (filteredActions.length === 0) currentValue = 0;
                    else currentValue = filteredActions[filteredActions.length - 1].value;

                    if (!currentValue) currentValue = 0;

                    const isCompleted = actionsToUpload.some((action: HabitActionToUpload) => {
                        if (action.id !== habit.id) return false;
                        if (action.value && action.value < targetValue) return false;

                        return !isPeriodChanged(new Date(action.date), new Date(), habit.period);
                    });

                    return {
                        id: habit.id,
                        title: habit.title,
                        period: habit.period,
                        category: habit.category,
                        targetValue: targetValue,
                        isCompleted: isCompleted,
                        currentValue: currentValue,
                        addDate: new Date(habit.addDate),
                    }
                });

                let count = 0;

                const actions: HabitAction[] = actionsToUpload.map((action: HabitActionToUpload) => {

                    count++;

                    const habit_period = habits.find((habit) => habit.id === action.id)?.period;
                    let isCompleted = true;
                    const habitTargetValue = habits.find((habit) => habit.id === action.id)?.targetValue;
                    if (action.value && habitTargetValue && action.value < habitTargetValue) isCompleted = false;

                    return {
                        id: count,
                        habit_id: action.id,
                        habit_period: habit_period ? habit_period : "daily",
                        date: new Date(action.date),
                        isCompleted: isCompleted,
                        value: action.value,
                    }
                });

                importStorage(habits, actions);

                close()
                window.location.reload();

            }
            reader.readAsText(file);
        }
    }

    const extendedImport = (file: File | null) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result;
                const data = JSON.parse(result as string);
                const libraryStorage = data["library-storage"];
                const habitsStore = data["habits-storage"];
                
                localStorage.setItem("library-storage", JSON.stringify(libraryStorage));
                localStorage.setItem("habits-storage", JSON.stringify(habitsStore));

                close()
                window.location.reload();
            }
            reader.readAsText(file);
        }
    }

   return (
        <Modal opened={opened} onClose={close} title="Импорт" >
            <Flex gap="sm" direction="column">
                <Text>Вы можете импортировать данные как из JSON файла, полученного путем экспорта (расширенный импорт), 
                    так и своего собственного JSON файла (стандартный импорт).</Text>
                <Text>Их форматы отличаются! Путем экспорта сохраняется вся информация,
                     в том числе уровни и другая статистика. Стандартный импорт подразумевает только
                     импортирование привычек и истории прывычек.</Text>
                <Text>Посмотреть форматы можно <Link to="/formats">здесь</Link></Text>
                <FileButton onChange={(file) => {standartImport(file)}}>
                    {(props) => <Button {...props} color="teal" variant="outline">Стандартный импорт</Button>}
                </FileButton>
                <FileButton onChange={(file) => {extendedImport(file)}}>
                    {(props) => <Button {...props} color="teal" variant="outline">Расширенный импорт</Button>}
                </FileButton>
            </Flex>
        </Modal>
   )
}

export default ModalImport