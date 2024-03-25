import { Flex, Modal, Text, FileButton, Button } from "@mantine/core";
import { useGlobalStore } from "app/globalStore";
import { Habit } from "app/interfaces";
import { FC } from "react"
import { useNavigate } from "react-router-dom";

interface Props {
    opened: boolean;
    close: () => void;
}

const ModalTemplateImport:FC<Props> = ({opened, close}) => {

    const navigate = useNavigate();

    const { setTemplateDaily, setLastTemplateImportDate, getDate } = useGlobalStore((state) => state);

    const templateImport = (file: File | null) => {
        
        if (!file) return;  

        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result;
            const data = JSON.parse(result as string);
            const daily = data["habits-storage"]["state"].habits.filter((habit: Habit) => habit.period === "daily");
            if (daily.length === 0) {
                alert("Нет ежедневных привычек в файле");
                close();
                return;
            }
            setTemplateDaily(daily);
            setLastTemplateImportDate(getDate());
            close()
            navigate('/home')
        }
        reader.readAsText(file);
    }

   return (
       <Modal opened={opened} onClose={close} title="Временный импорт">
             <Flex gap="sm" direction="column">
                <Text>Временный импорт меняет ваши ежедневные привычки до конца текущего дня. </Text>
                <Text>Все ваши привычки на сегодняшний день будут засчитаны как выполненные. Еженедельные и ежемесячные привычки остаются. </Text>
                <FileButton onChange={(file) => {templateImport(file)}}>
                    {(props) => <Button {...props} color="teal" variant="outline">Импорт</Button>}
                </FileButton>
                
            </Flex>
       </Modal>
   )
}

export default ModalTemplateImport