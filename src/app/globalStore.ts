import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Habit, GlobalState, HabitActionCreate, CreateHabit, HabitAction } from "./interfaces";

import { isPeriodChanged } from "actions/isPeriodChanged";
import { defaultBase64Avatar } from "src/defaultBase64Avatar";

const themeStore = ["blue", "grey", "purple", "red"];

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set, get) => ({
      userName: "",
      setUserName: (name: string) => set({ userName: name }),
      avatar: defaultBase64Avatar(),
      setAvatar: (file: string) => set({ avatar: file }),

      theme: "standard",
      setTheme: (theme: string) => set({ theme }),

      savedThemes: ["standard", "light"],
      buyRandomTheme: () => {
  
        set((state) => ({ gold: state.gold - 150, spent: state.spent + 150 }));

        const themes = themeStore.filter((theme) => !get().savedThemes.includes(theme));
        if (themes.length === 0) return ""
        const randomTheme = themes[Math.floor(Math.random() * themes.length)];
        set((state) => ({ savedThemes: [...state.savedThemes, randomTheme] }));

        return randomTheme;
      },

      currentDateCorrection: 0,
      getDate: () => new Date(new Date().getTime() + get().currentDateCorrection),
      setCurrentDateCorrection: (date: Date) => set({ currentDateCorrection: date.getTime() - new Date().getTime()}),

      experience: 0,
      level: 1,
      gold: 0,
      cheatGold: () => {
        set({ gold: 5000 })
      },
      earned: 0,
      spent: 0,

      templateImportIsOpen: false,
      openTemplateImport: () => {
        set((state) => ({ gold: state.gold - 350, spent: state.spent + 350 }));
        set({ templateImportIsOpen: true })
      },

      templateDaily: [],
      setTemplateDaily: (habits: Habit[]) => set({ templateDaily: habits }),
      lastTemplateImportDate: new Date(0),
      setLastTemplateImportDate: (date: Date) => set({ lastTemplateImportDate: date }),

      toggleTemplateDaily(habit) {
        const habits = get().templateDaily;
        const newHabits = habits.map((h) =>
          h.id === habit.id ? { ...h, isCompleted: !h.isCompleted } : h
        );
        set({ templateDaily: newHabits });
      },

      changeTemplateDailyTargetValue(id, value) {
        const habits = get().templateDaily;
        const newHabits = habits.map((h) =>
          h.id === id ? { ...h, currentValue: value } : h
        );
        set({ templateDaily: newHabits });
      },
    
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
              addDate: get().getDate(),
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
          get().increaseCompletedHabits();
        }

        set((state) => ({
          habits: state.habits.map((h) =>
            h.id === habit.id ? { ...h, isCompleted: !h.isCompleted } : h
          ),
        }));

        return isNextLevel;
      },

      completedHabits: 0,
      increaseCompletedHabits: () => set((state) => ({ completedHabits: state.completedHabits + 1 })),
      decreaseCompletedHabits: () => set((state) => ({ completedHabits: state.completedHabits - 1 })),

      countMissingHabits: () => {

        const periodChangeCount = (addDate: Date, period: "daily" | "weekly" | "monthly") => {

          const msOnDay = 1000 * 60 * 60 * 24;

          const firstDate = new Date(addDate);
          const lastDate = get().getDate();

          if (period === "daily") {
            return Math.floor((lastDate.getTime() - firstDate.getTime()) / (msOnDay));
          }

          if (period === "weekly") {
            const daysUntilMonday = ((7 - firstDate.getDay()) % 7) + 1;
            const daysDiff = Math.round((lastDate.getTime() - firstDate.getTime()) / (msOnDay));
            return Math.floor(daysDiff / 7) + (daysDiff % 7 >= daysUntilMonday ? 1 : 0);
          }

          if (period === "monthly") {
            return lastDate.getMonth() - firstDate.getMonth() + (12 * (lastDate.getFullYear() - firstDate.getFullYear()));
          }

          return 0;
        }

        const habits = get().habits;
        const history = get().history;

        let count = 0;

        habits.forEach((habit) => {
          const addDate = new Date(habit.addDate);
          const period = habit.period;
          const periodChange = periodChangeCount(addDate, period);

          const realCompleteCount = history.filter((action) => action.habit_id === habit.id && action.isCompleted).length;

          count += Math.max(0, periodChange - realCompleteCount);
        });
          
        return count;
      },


      completeHabit: (id: number) => {
        const daysStreak = get().daysStreak;
        const isNextLevel = get().increaseExperienceAndGold((daysStreak + 1) * 10);
        get().increaseCompletedHabits();
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === id ? { ...habit, isCompleted: true } : habit
          ),
        }))
        return isNextLevel;
      },

      completeAllDailyHabits: () => {
        set(state => ({
          habits: state.habits.map((habit) => {
            if (!habit.isCompleted) {
              set(state => ({
                history: [...state.history, {
                  id: get().getLastHistoryId() + 1,
                  habit_id: habit.id,
                  isCompleted: true,
                  habit_period: habit.period,
                  date: get().getDate()
                }]
              }))
            }
            return habit.period === "daily" ? { ...habit, isCompleted: true } : habit
          }
          ),
        }));
      },

      changeTargetValue: (id: number, value: number) =>
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === id ? { ...habit, currentValue: value } : habit
          ),
        })),

        userTarget: 0,
        setUserTarget: (target: number) => set({ userTarget: target }),


      lastStreakUpdateDate: new Date(),
      setLastStreakUpdateDate: (date: Date) => set({ lastStreakUpdateDate: date }),

      updateStreak: () => {
        const currentDate = get().getDate();
        const lastDate = new Date(get().lastStreakUpdateDate);

        if (!isPeriodChanged(lastDate, currentDate, "daily")) return;
        const habits = get().habits;
        const periodIsOk = (period: "daily" | "weekly" | "monthly") => {
         
          if (!isPeriodChanged(lastDate, currentDate, period)) return true;

          if (period === "daily") {
            const userTarget = get().userTarget;
            const completedDailyHabitsAmount = get().getHabitsWithPeriod("daily").filter(habit => habit.isCompleted).length;
            if (userTarget && (completedDailyHabitsAmount < userTarget)) {
              const newExperience = Math.round(get().experience * 0.95);
              const currentLevel = get().level;
              set({ experience: newExperience });
              if (newExperience < (currentLevel-1) * (200 + (currentLevel-2) * 50) / 2) {
                set({ level: currentLevel - 1})                
              }
            }
          }
                  
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

      lastUpdateHabitsDate: new Date(),
      setLastUpdateHabitsDate: (date: Date) => set({ lastUpdateHabitsDate: date }),

      // Для обнуления прогресса всех привычек в начале нового периода
      updateHabits: (period: "daily" | "weekly" | "monthly") => {        

        if (!isPeriodChanged(new Date(get().lastUpdateHabitsDate), get().getDate(), "daily")) return;

        const allHabits = get().habits;
        const habits = allHabits.map((habit) => {
          if (habit.period === period) {
            return { ...habit, currentValue: 0, isCompleted: false };
          }
          return habit;
        });
        set({ habits });
      },

      isNewPeriod(period: "daily" | "weekly" | "monthly") {
        
        const history = get().history;
        const lastActionDate = new Date(history[history.length - 1]?.date);
        const currentDate = get().getDate();

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
        
        get().decreaseCompletedHabits();

        return isNextLevel;
      },

      achievements: [
        {id: 1, title: "Первый шаг", description: "Выполнить первую привычку", isCompleted: false},
        {id: 2, title: "Полный день", description: "Выполнить все привычки за предыдущий период", isCompleted: false},
        {id: 3, title: "Подающий надежды", description: "Выполнить 5 прывычек", isCompleted: false},
        {id: 4, title: "Знающий толк в привычках", description: "Выполнить 10 привычек", isCompleted: false},
        {id: 5, title: "Привыкающий", description: "Стрик 5 дней", isCompleted: false},
        {id: 6, title: "Уже бывалый", description: "Стрик 10 дней", isCompleted: false},
        {id: 7, title: "Распродажа в Steam", description: "Потратить 100 золота", isCompleted: false},
        {id: 8, title: "Постоянный покупатель", description: "Потратить 500 золота", isCompleted: false},
        {id: 9, title: "Шопоголик", description: "Потратить 1000 золота", isCompleted: false},
        {id: 10, title: "Сберегатель", description: "Накопить 5000 золота", isCompleted: false},
        {id: 11, title: "КМС по привычкам", description: "Выполнить 100 привычек", isCompleted: false},
        {id: 12, title: "Не гитхаб, но тоже пойдет", description: "Выполнять все привычки на протяжении года", isCompleted: false},
      ],

     completeAchievement: (id: number) => {
        const achievement = get().achievements.find((achievement) => achievement.id === id);
        if (!achievement) return;
        set((state) => ({
          achievements: state.achievements.map((a) =>
            a.id === id ? { ...a, isCompleted: true } : a
          ),
        }));
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
