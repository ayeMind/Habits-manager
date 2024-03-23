import { SimpleGrid, Text, Modal, Button, ModalTitle } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { useState } from "react";
import { useGlobalStore } from "app/globalStore";
import StoreCard from "components/StoreCard/StoreCard";
import PageLayout from "layouts/PageLayout";

import question from '../../assets/store/question.jpg';

const Store = () => {

  const { gold, savedThemes, buyRandomTheme } = useGlobalStore((state) => state);

  const [opened, { open, close }] = useDisclosure(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');

  const handleBuyTheme = () => {
    setModalTitle('Покупка темы');
    if ( savedThemes.length === 7 ) {
      setModalDescription('Вы уже купили все темы!');
    }
    else {
      const theme = buyRandomTheme();
      if (theme) setModalDescription(`Вы успешно купили новую тему! Вам выпала тема: ${theme}!`)
      else setModalDescription('У вас недостаточно монет для покупки темы!')
    }
    open()
  }

  const handleBuyImport = () => {
    setModalTitle('Покупка временного импорта');
    setModalDescription('Покупка прошла успешно! Воспользоваться временным импортом можно в настройках');
    open()
  }

  return (
    <PageLayout title="Магазин" defaultTab="store">
       <Modal opened={opened} onClose={close} title={modalTitle}>
          <Text>{modalDescription}</Text>
          <Button onClick={close} mt={20}>Вернуться</Button>
       </Modal>  
      <Text size="lg">У вас {gold} монет!</Text>
        <SimpleGrid mt={30} cols={{ base: 1, xs: 2, lg: 3, xl: 4, xxxl: 6 }}>
          <StoreCard title="Покупка темы" description="Выпавшие темы не будут повторятся" price={150}
                     image={question} onClick={handleBuyTheme} />
          <StoreCard title="Покука временного импорта" description="С этим вы сможете заменить свои ежедневные привычки на привычки вашего друга на один день"
                     price={350} image={question} onClick={handleBuyImport}  />
        </SimpleGrid>
    </PageLayout>
  );
};

export default Store;