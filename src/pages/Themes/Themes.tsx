import ThemeCard from "components/ThemeCard/ThemeCard";
import PageLayout from "layouts/PageLayout";

import classes from "./style.module.css";

const Themes = () => {

  return (
    <PageLayout title="Смена темы" defaultTab="themes" className={classes["page"]}>
      <ThemeCard theme="standard" />
      <ThemeCard theme="light" />
      <ThemeCard theme="blue" />
      <ThemeCard theme="grey" />
      <ThemeCard theme="purple" />
      <ThemeCard theme="red" />

    </PageLayout>
  );
};

export default Themes;