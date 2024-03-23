import ThemeCard from "components/ThemeCard/ThemeCard";
import { Text } from "@mantine/core";
import PageLayout from "layouts/PageLayout";

import { useGlobalStore } from "app/globalStore";

import classes from "./style.module.css";

const Themes = () => {

  const { savedThemes } = useGlobalStore((state) => state);
  const cards = savedThemes.map((theme) => <ThemeCard key={theme} theme={theme} />);
  const cardsAmount = cards.length;

  return (
    <PageLayout title="Смена темы" defaultTab="themes" className={classes["page"]}>
      {cardsAmount === 0 && <Text>У вас нет доступных тем</Text>}
      {cards}
      {cardsAmount < 6 && <Text>У вас заполучены не все темы. Вы можете приобрести больше в магазине</Text>}
      {cardsAmount === 6 && <Text>Вы купили все темы!</Text>}
    </PageLayout>
  );
};

export default Themes;