import { SimpleGrid, Text, Modal, Button, Flex } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { useState } from "react";
import { useGlobalStore } from "app/globalStore";
import StoreCard from "components/StoreCard/StoreCard";
import PageLayout from "layouts/PageLayout";

import question from '../../assets/store/question.jpg';
import bought from '../../assets/store/bought.png';

const Store = () => {

  const { gold, savedThemes, buyRandomTheme, openTemplateImport, templateImportIsOpen, cheatGold } = useGlobalStore((state) => state);

  const [opened, { open, close }] = useDisclosure(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');

  const themeImage = (savedThemes.length === 6) ? bought : question;
  const templateImportImage = (templateImportIsOpen) ? bought : question;

  const handleBuyTheme = () => {

    setModalTitle('Покупка темы');
    if ( savedThemes.length === 6 ) {
      setModalDescription('Вы уже купили все темы!');
    } else if (gold < 150) {
      setModalDescription('У вас недостаточно монет для покупки темы!')
    } else {
      const theme = buyRandomTheme();
      setModalDescription(`Вы успешно купили новую тему! Вам выпала тема: ${theme}!`)
    }
    open()
  }

  const handleBuyImport = () => {
    setModalTitle('Покупка временного импорта');
    if (templateImportIsOpen) {
      setModalDescription('Вы уже купили временный импорт!');
    } else if (gold < 350) {
      setModalDescription('У вас недостаточно монет для покупки временного импорта!');
    } else {
      openTemplateImport();
      setModalDescription('Покупка прошла успешно! Воспользоваться временным импортом можно в настройках');
    }
    open()
  } 

  return (
    <PageLayout title="Магазин" defaultTab="store">
       <Modal opened={opened} onClose={close} title={modalTitle}>
          <Text>{modalDescription}</Text>
          <Button onClick={close} mt={20}>Вернуться</Button>
       </Modal>
       <Flex gap="lg">
        <Text size="lg">У вас {gold} монет!</Text>
        <Button onClick={cheatGold} size="xs">Начитерить монет</Button>
       </Flex>  
        <SimpleGrid mt={30} cols={{ base: 1, xs: 2, lg: 3, xl: 4, xxxl: 6 }}>
          <StoreCard title="Покупка темы" description="Выпавшие темы не будут повторятся" price={150}
                     image={themeImage} onClick={handleBuyTheme} />
          <StoreCard title="Покука временного импорта" description="С этим вы сможете заменить свои ежедневные привычки на привычки вашего друга на один день"
                     price={350} image={templateImportImage} onClick={handleBuyImport}  />
        </SimpleGrid>
    </PageLayout>
  );
};

export default Store;