import { Card, Image } from "@mantine/core";
import { useGlobalStore } from "app/globalStore";
import { FC } from "react";

import standard from "../../assets/themes/standard.png";
import blue from "../../assets/themes/blue.png";
import grey from "../../assets/themes/grey.png";
import light from "../../assets/themes/light.png";
import purple from "../../assets/themes/purple.png";
import red from "../../assets/themes/red.png";

import classes from "./style.module.css";

interface Props {
  theme: string;
}

const ThemeCard: FC<Props> = ({ theme }) => {
  const setTheme = useGlobalStore((state) => state.setTheme);

  const getThemeImage = (theme: string) => {
    switch (theme) {
      case "standard":
        return standard;
      case "blue":
        return blue;
      case "grey":
        return grey;
      case "light":
        return light;
      case "purple":
        return purple;
      case "red":
        return red;
      default:
        return standard;
    }
  };

  return (
    <Card
      component="button"
      padding="xl"
      onClick={() => {
        setTheme(theme);
      }}
      className={classes["card"]}
    >
      <Card.Section>
        <Image
          src={getThemeImage(theme)}
          alt={`${theme} theme`}
        />
      </Card.Section>
    </Card>
  );
};

export default ThemeCard;
