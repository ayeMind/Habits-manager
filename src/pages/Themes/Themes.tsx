import { Button } from "@mantine/core";
import { useGlobalStore } from "app/globalStore";
import PageLayout from "layouts/PageLayout";

const Themes = () => {

  const setTheme = useGlobalStore((state) => state.setTheme);

  return (
    <PageLayout title="Смена темы" defaultTab="themes">
        <Button onClick={()=>{setTheme("standard")}}>Стандартная тема</Button>
        <Button onClick={()=>{setTheme("light")}}>Светлая тема</Button>
        <Button onClick={()=>{setTheme("blue")}}>Синяя тема</Button>
    </PageLayout>
  );
};

export default Themes;