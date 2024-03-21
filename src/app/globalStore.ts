import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Habit, GlobalState, HabitActionCreate, CreateHabit, HabitAction } from "./interfaces";

import { isPeriodChanged } from "actions/isPeriodChanged";
import { defaultBase64Avatar } from "src/defaultBase64Avatar";


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
      
      daysStreak: 0,
      maxDaysStreak: 0,

      increaseDaysStreak: () => {
        set((state) => ({ daysStreak: state.daysStreak + 1 }));
        set((state) => ({ maxDaysStreak: Math.max(state.daysStreak, state.maxDaysStreak) }));
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

        const daysStreak = get().daysStreak;

        if (!habit.isCompleted) {
          isNextLevel = get().increaseExperienceAndGold((daysStreak + 1) * 10);
        }

        set((state) => ({
          habits: state.habits.map((h) =>
            h.id === habit.id ? { ...h, isCompleted: !h.isCompleted } : h
          ),
        }));

        return isNextLevel;
      },


      completeHabit: (id: number) => {
        const daysStreak = get().daysStreak;
        const isNextLevel = get().increaseExperienceAndGold((daysStreak + 1) * 10);
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


      lastStreakUpdateDate: new Date(),
      setLastStreakUpdateDate: (date: Date) => set({ lastStreakUpdateDate: date }),

      updateStreak: () => {
        const currentDate = new Date(get().currentDateCorrection + new Date().getTime());
        const lastDate = new Date(get().lastStreakUpdateDate);

        if (!isPeriodChanged(lastDate, currentDate, "daily")) return;
        const habits = get().habits;
        const periodIsOk = (period: "daily" | "weekly" | "monthly") => {
         
          if (!isPeriodChanged(lastDate, currentDate, period)) return true;
                  
          const periodHabits = habits.filter((habit) => habit.period === period);
          if (periodHabits.every((habit) => habit.isCompleted)) {
            return true;
          } else {
            return false;
          }
        }

        if (periodIsOk("daily") && periodIsOk("weekly") && periodIsOk("monthly")) {
          get().increaseDaysStreak();
        } else {
          set({ daysStreak: 0 });
        }
          get().setLastStreakUpdateDate(currentDate);
      },

      // Для обнуления прогресса всех привычек в начале нового периода
      updateHabits: (period: "daily" | "weekly" | "monthly") => {
        const allHabits = get().habits;
        const habits = allHabits.map((habit) => {
          if (habit.period === period) {
            return { ...habit, currentValue: 0, isCompleted: false };
          }
          return habit;
        });
        set({ habits });
      },

      // Для проверки, закончилось ли время предыдущего периода (смотрит на соответствущую часть даты (день, неделя, месяц))
      isNewPeriod(period: "daily" | "weekly" | "monthly") {
        
        const history = get().history.filter(
          (action) => action.habit_period === period
        );
        const lastActionDate = new Date(history[history.length - 1]?.date);
        const currentDate = new Date(new Date().getTime() + get().currentDateCorrection);

        return isPeriodChanged(lastActionDate, currentDate, period);
      
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
        
        const history = get().history
        const lastAction = history.filter((action) => action.habit_id === habit_id).pop()
        
        if (!lastAction) return false;

        set((state) => ({
          history: state.history.filter(
            (action) => action.id !== lastAction.id
          ),
        }));

        const daysStreak = get().daysStreak;
        const isNextLevel = get().increaseExperienceAndGold(-(daysStreak + 1) * 10);

        return isNextLevel;
      },

      importStorage: (habits: Habit[], actions: HabitAction[]) => {
        set({ habits });
        set({ history: actions });
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
