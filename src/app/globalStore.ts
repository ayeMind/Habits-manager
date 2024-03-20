import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Habit, GlobalState, HabitActionCreate, CreateHabit } from "./interfaces";
import { defaultBase64Avatar } from "src/defaultBase64Avatar";

const countDaysDiff = (date1: Date, date2: Date) => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set, get) => ({

      userName: "",
      setUserName: (name: string) => set({ userName: name }),
      avatar: defaultBase64Avatar(),
      setAvatar: (file: string) => set({ avatar: file }),

      currentDateCorrection: 0,
      setCurrentDateCorrection: (date: Date) => set({ currentDateCorrection: date.getTime() - new Date().getTime()}),

      experience: 0,
      level: 1,
      gold: 0,
      earned: 0,
      spent: 0,
    
      increaseExperienceAndGold: (value: number) => {
        const newExperience = get().experience + value;
        const currentLevel = get().level;

        set((state) => ({ experience: state.experience + value }));
        set((state) => ({ gold: state.gold + value / 10 }));
        set((state) => ({ earned: state.earned + value / 10 }));

        if (newExperience >= currentLevel * (200 + (currentLevel-1) * 50) / 2) {
          set((state) => ({ level: state.level + 1 }));
          return true;
        } else if (newExperience < (currentLevel-1) * (200 + (currentLevel-2) * 50) / 2) {
          set((state) => ({ level: state.level - 1 }));
          return false;
        }
        
        return false;
      },

      getCurrentLevelExperience: () => {
        const currentLevel = get().level;
        const currentExperience = get().experience;
        return currentExperience - (currentLevel-1) * (200 + (currentLevel-2) * 50) / 2;
      },
      
      daysStrick: 0,
      maxDaysStrick: 0,

      increaseDaysStrick: () => {
        set((state) => ({ daysStrick: state.daysStrick + 1 }));
        set((state) => ({ maxDaysStrick: Math.max(state.daysStrick, state.maxDaysStrick) }));
      },

      habits: [] as Habit[],
      getLastId: () =>
        get().habits.reduce(
          (acc, habit) => (habit.id > acc ? habit.id : acc),
          0
        ),

      getHabitsWithPeriod: (period: "daily" | "weekly" | "monthly") =>
        get().habits.filter((habit) => habit.period === period),

      addHabit: (habit: CreateHabit) => {
        set((state) => ({
          habits: [
            ...state.habits,
            {
              ...habit,
              id: get().getLastId() + 1,
              currentValue: 0,
              addDate: new Date(new Date().getTime() + get().currentDateCorrection),
              isCompleted: false,
            },
          ],
        }));
      },

      removeHabit: (id: number) =>
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== id),
        })),

      toggleHabit: (habit: Habit) => {
        let isNextLevel = false;

        const daysStrick = get().daysStrick;

        if (!habit.isCompleted) {
          isNextLevel = get().increaseExperienceAndGold((daysStrick + 1) * 10);
        }

        set((state) => ({
          habits: state.habits.map((h) =>
            h.id === habit.id ? { ...h, isCompleted: !h.isCompleted } : h
          ),
        }));

        return isNextLevel;
      },


      completeHabit: (id: number) => {
        const daysStrick = get().daysStrick;
        const isNextLevel = get().increaseExperienceAndGold((daysStrick + 1) * 10);
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === id ? { ...habit, isCompleted: true } : habit
          ),
        }))
        return isNextLevel;
      },

      changeTargetValue: (id: number, value: number) =>
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === id ? { ...habit, currentValue: value } : habit
          ),
        })),

      // Для обнуления прогресса всех привычек в начале нового периода
      updateHabits: (period: "daily" | "weekly" | "monthly") => {
        const habits = get().habits.map((habit) => {
          if (habit.period === period) {
            return { ...habit, currentValue: 0, isCompleted: false };
          }
          return habit;
        });
        set({ habits });
      },

      // Для проверки, закончилось ли время предыдущего периода (смотрит на соответствущую часть даты (день, неделя, месяц))
      checkPeriod(period: "daily" | "weekly" | "monthly") {
        const history = get().history.filter(
          (action) => action.habit_period === period
        );
        const lastActionDate = new Date(history[history.length - 1]?.date);
        const currentDate = new Date(new Date().getTime() + get().currentDateCorrection);

        if (period === "daily") {
          return lastActionDate.getDate() !== currentDate.getDate();
        }

        if (period === "weekly") {
          const daysUntilMonday = ((7 - lastActionDate.getDay()) % 7) + 1;
          const daysDiff = countDaysDiff(lastActionDate, currentDate);

          return daysDiff >= daysUntilMonday;
        }

        if (period === "monthly") {
          return lastActionDate.getMonth() !== currentDate.getMonth();
        }

        console.error("Некорректный период");
        return false;
      },

      history: [],
      getLastHistoryId: () =>
        get().history.reduce(
          (acc, action) => (action.id > acc ? action.id : acc),
          0
        ),

      addAction: (action: HabitActionCreate) => {
        const lastHistoryId = get().getLastHistoryId();
        set((state) => ({
          history: [...state.history, { ...action, id: lastHistoryId + 1}],
        }));
      },

      removeAllHabitHistroy: (habit_id: number) =>
        set((state) => ({
          history: state.history.filter(
            (action) => action.habit_id !== habit_id
          ),
        })),

      removeCurrentAction: (
        habit_id: number,
      ) => {
        const lastAction = get().history.filter((action) => action.habit_id !== habit_id).pop()
        if (!lastAction) return false;

        set((state) => ({
          history: state.history.filter(
            (action) => action.id !== lastAction.id
          ),
        }));

        const daysStrick = get().daysStrick;
        const isNextLevel = get().increaseExperienceAndGold(-(daysStrick + 1) * 10);

        return isNextLevel;
      },

      categories: [
        "Здоровье",
        "Образование",
        "Дом",
        "Работа",
        "Отказ от вредной привычки",
      ] as string[],

      addCategory: (category: string) =>
        set((state) => ({ categories: [...state.categories, category] })),

    }),
    {
      name: "habits-storage",
    }
  )
);
