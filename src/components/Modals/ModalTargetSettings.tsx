import { Modal, Text, Flex, Button, Slider } from "@mantine/core";
import { useGlobalStore } from "app/globalStore";
import { FC, useState } from "react"

interface Props {
    opened: boolean;
    close: () => void;
}

const ModalTargetSettings:FC<Props> = ({opened, close}) => {

    const { getHabitsWithPeriod, userTarget, setUserTarget } = useGlobalStore(state => state)
    const maxTarget = getHabitsWithPeriod("daily").length
    
    const [target, setTarget] = useState(userTarget);
    
    const handleChangeTarget = (newTarget: number) => {
        setUserTarget(newTarget);
        close()
        setTarget(newTarget)
    }

   return (
       <Modal opened={opened} onClose={close} title="Изменение цели">
            <Text mb="xl">
                Если вы выберите цель X привычек, то будете вынуждены выполнять не менее X ежедневных привычек в сутки, 
                иначе у вас отнимется 5% от вашего текущего опыта (всего опыта, а не текущего уровня!). 
            </Text>
            <Slider value={target} min={1} max={maxTarget} onChange={setTarget} labelAlwaysOn step={1}
                    marks={[
                        { value: 1, label: 1},
                        { value: maxTarget, label: maxTarget }
                    ]} />
            <Flex gap="md" mt="xl">
                <Button variant="outline" onClick={() => handleChangeTarget(target)}>Изменить</Button>
                <Button variant="outline" color="red" onClick={() => handleChangeTarget(0)}>Удалить цель</Button>
            </Flex>
       </Modal>
   )
}

export default ModalTargetSettings