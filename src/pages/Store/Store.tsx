import { SimpleGrid,Text } from "@mantine/core";
import { useGlobalStore } from "app/globalStore";
import StoreCard from "components/StoreCard/StoreCard";
import PageLayout from "layouts/PageLayout";

import question from '../../assets/store/question.jpg';

const Store = () => {

  const { gold, savedThemes, buyRandomTheme } = useGlobalStore((state) => state);

  const handleBuyTheme = () => {
    if ( savedThemes.length === 7 ) {
      alert('Вы уже купили все темы!');
      return;
    } else if ( buyRandomTheme() ) {
      alert('Вы успешно купили тему!');
    } else {
      alert('У вас недостаточно монет!');
    }
  }

  return (
    <PageLayout title="Магазин" defaultTab="store">
      <Text size="lg">У вас {gold} монет!</Text>
        <SimpleGrid mt={30} cols={{ base: 1, xs: 2, lg: 3, xl: 4, xxxl: 6 }}>
          <StoreCard title="Купить случайную тему" description="Выпавшие темы не будут повторятся" image={question} onClick={handleBuyTheme}/>
        </SimpleGrid>
    </PageLayout>
  );
};

export default Store;