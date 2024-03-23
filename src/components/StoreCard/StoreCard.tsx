import { Card, Image, Text } from "@mantine/core";
import { FC } from "react";

import classes from "./style.module.css";

interface Props {
  title: string;
  description: string;
  image: string;
  onClick: () => void;
}

const StoreCard: FC<Props> = ({ title, description, image, onClick }) => {
  return (
    <Card onClick={onClick}
      className={classes["card"]}
      shadow="sm"
      padding="xl"
      component="button"
    >
      <Card.Section>
        <Image src={image} h={160} alt={title} />
      </Card.Section>

      <Text fw={500} size="lg" mt="md">
        {title}
      </Text>

      <Text mt="xs" c="dimmed" size="sm">
        {description}
      </Text>
    </Card>
  );
};

export default StoreCard;
