import { Card, Image, Text } from "@mantine/core";
import { FC } from "react";

import classes from "./style.module.css";

interface Props {
  title: string;
  description: string;
  price: number;
  image: string;
  onClick: () => void;
}

const StoreCard: FC<Props> = ({ title, description, price, image, onClick }) => {
  return (
    <Card onClick={onClick}
      className={classes["card"]}
      shadow="sm"
      padding="xl"
      component="button"
    >
      <Card.Section>
        <Image className={classes["image"]} src={image} h={160} />
      </Card.Section>

      <Text fw={500} size="lg" mt="md">
        {title}
      </Text>

      <Text size="sm">
        {price} монет
      </Text>

      <Text mt="xs" c="dimmed" size="sm">
        {description}
      </Text>
    </Card>
  );
};

export default StoreCard;
