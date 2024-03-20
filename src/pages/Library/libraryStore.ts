import { useGlobalStore } from "app/globalStore";
import { LibraryHabit, LibraryHabitCreate, LibraryStore } from "app/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const addHabit = useGlobalStore.getState().addHabit;

const habitsList = [
  {
    id: 1,
    title: "Пить воду сразу после будильника",
    category: "Здоровье",
    period: "daily",
  },
  {
    id: 2,
    title: "Прогулка на свежем воздухе",
    category: "Здоровье",
    period: "daily",
  },
  {
    id: 3,
    title: "Лечь спать до 23:00",
    category: "Здоровье",
    period: "daily",
  },
  {
    id: 4,
    title: "Встать по первому будильнику",
    category: "Здоровье",
    period: "daily",
  },
  {
    id: 5,
    title: "Прогулка на свежем воздухе",
    category: "Здоровье",
    period: "weekly",
  },
  {
    id: 6,
    title: "Читать научную статью",
    category: "Образование",
    period: "weekly",
    targetValue: 2,
  },
  {
    id: 7,
    title: "Прочитать главу из учебника",
    category: "Образование",
    period: "daily",
  },
  {
    id: 8,
    title: "Прочитать 10 глав из учебника",
    category: "Образование",
    period: "weekly",
    targetValue: 10,
  },
  {
    id: 9,
    title: "Попробовать новую библиотеку или фреймворк",
    category: "Образование",
    period: "monthly",
  },
  {
    id: 10,
    title: "Посмотреть фильм на английском языке",
    category: "Образование",
    period: "monthly",
  },
  {
    id: 11,
    title: "Прийти на конференцию по веб-разработке",
    category: "Образование",
    period: "monthly",
  },
  {
    id: 12,
    title: "Убрать свое рабочее место",
    category: "Дом",
    period: "daily",
  },
  {
    id: 13,
    title: "Помыть посуду сразу после еды",
    category: "Дом",
    period: "daily",
  },
  {
    id: 14,
    title: "Сделать генеральную уборку в квартире",
    category: "Дом",
    period: "monthly",
  },
  {
    id: 15,
    title: "Работа над проектом на 2 часа",
    category: "Работа",
    period: "daily",
    targetValue: 2,
  },
  {
    id: 16,
    title: "Не курить весь день",
    category: "Отказ от вредной привычки",
    period: "daily",
  },
  {
    id: 17,
    title: "Не употреблять алкоголь весь день",
    category: "Отказ от вредной привычки",
    period: "daily",
  },
  {
    id: 18,
    title: "Не есть сладкое весь день",
    category: "Отказ от вредной привычки",
    period: "daily",
  },
  {
    id: 19,
    title: "Сделать зарядку",
    category: "Здоровье",
    period: "daily",
  },
  {
    id: 20,
    title: "Сделать домашнее задание",
    category: "Образование",
    period: "daily",
  }
];


export const useLibraryStore = create<LibraryStore>()(
  persist(
    (set, get) => ({
      habits: habitsList as LibraryHabit[],
      getLastHabitId: () =>
        get().habits.reduce(
          (acc, habit: LibraryHabit) => (habit.id > acc ? habit.id : acc),
          0
        ),

      addHabit: (habit: LibraryHabitCreate) => {
        const lastHabitId = get().getLastHabitId();
        set((state: LibraryStore) => ({
          habits: [
            ...state.habits,
            { ...habit, id: lastHabitId + 1, selected: false, saved: false },
          ],
        }));
      },

      removeHabit: (id: number) =>
        set((state: LibraryStore) => ({
          habits: state.habits.filter((habit: LibraryHabit) => habit.id !== id),
        })),

      removeAllSelectedHabits: (habits_id: number[]) =>
        set((state: LibraryStore) => ({
          habits: state.habits.filter(
            (habit: LibraryHabit) => !habits_id.includes(habit.id)
          ),
        })),

      addHabitToGlobalStore: (habit: LibraryHabit) => {
        const habitToAdd = {
          title: habit.title,
          category: habit.category,
          period: habit.period,
          targetValue: habit.targetValue ? habit.targetValue : 1,
        };
        addHabit(habitToAdd);
        
        set((state: LibraryStore) => ({
          habits: state.habits.map((h) =>
            h.id === habit.id ? { ...h, saved: true } : h
          ),
        }));
      },

      saveAllSelectedHabits: (habits: LibraryHabit[]) => {
        habits.forEach((habit) => {
            get().addHabitToGlobalStore(habit);
        });
      }

    }),
    {
      name: "library-storage",
    }
  )
);
