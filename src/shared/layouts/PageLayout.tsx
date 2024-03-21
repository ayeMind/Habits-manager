import { FC, useEffect } from "react";
import { AppShell, AppShellMain, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Notifications, notifications } from "@mantine/notifications";
import { useGlobalStore } from "app/globalStore";

import Header from "components/AppShell/Header";
import SidePanel from "components/AppShell/SidePanel";
import UserNameInput from "components/UserNameInput";
import { checkAchievements } from "actions/checkAchievements";
import { IconTrophy } from "@tabler/icons-react";

interface Props {
  children: React.ReactNode;
  title: string;
  defaultTab: string;
}

const PageLayout: FC<Props> = ({ children, title, defaultTab }) => {
  const [navBarOpened, { toggle }] = useDisclosure();
  const [modalOpened, { open, close }] = useDisclosure();


  const {userName, isNewPeriod, updateHabits,
     setLastUpdateHabitsDate, updateStreak, getDate,
     gold, spent, completedHabits, daysStreak, achievements, completeAchievement } = useGlobalStore((state) => state);

  useEffect(() => {
    if (!userName) {
      open();
    }
  }, [userName]);

  useEffect(() => {
    if (isNewPeriod("daily")) {
      updateStreak();
      updateHabits("daily");
    }
    if (isNewPeriod("weekly")) {
      updateHabits("weekly");      
    }
    if (isNewPeriod("monthly")) {
      updateHabits("monthly");
    }
    setLastUpdateHabitsDate(getDate());
  }, []);

  const completed = checkAchievements(achievements, completedHabits, daysStreak, gold, spent);

  useEffect(() => {
    completed.forEach(achievement => {
      completeAchievement(achievement.id);
      notifications.show({
        title: achievement.title,
        message: achievement.description,
        icon: <IconTrophy />,
        color: "yellow",
      });
    });
  }, [completed]);

  return (
    <>
      <Notifications w={500} visibleFrom="sm" />
      <Notifications w={300} hiddenFrom="sm" />
      <Modal opened={modalOpened} onClose={close} centered withCloseButton={false} closeOnClickOutside={false} closeOnEscape={false} title="Добро пожаловать в менеджер привычек!">
        <UserNameInput close={close} />
        <Text size="sm" mt="xs">Сменить имя можно будет в настройках</Text>
      </Modal>
      <AppShell
        layout="alt"
        w="auto"
        navbar={{
          width: 200,
          breakpoint: "md",
          collapsed: { mobile: !navBarOpened },
        }}
        header={{ height: 65 }}
        padding="md"
      >
        <Header title={title} opened={navBarOpened} toggle={toggle} />
        <SidePanel defaultTab={defaultTab} opened={navBarOpened} toggle={toggle} />
        <AppShellMain>{children}</AppShellMain>
      </AppShell>
    </>
  );
};

export default PageLayout;
 