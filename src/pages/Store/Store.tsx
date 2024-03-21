import { Box, Title } from "@mantine/core";
import PageLayout from "layouts/PageLayout";

const Store = () => {
  return (
    <PageLayout title="Магазин" defaultTab="store">
        <Box>
          <Title order={2}>Темы</Title>
        </Box>
    </PageLayout>
  );
};

export default Store;