import { useGlobalStore } from 'app/globalStore'
import { LibraryHabit, LibraryStore } from 'app/interfaces';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
        title: "Читать научную статью",
        category: "Образование",
        period: "weekly",
        targetValue: 2
    },
    {
        id: 3,
        title: "Убрать свое рабочее место",
        category: "Дом",
        period: "daily",
    },
    {
        id: 4,
        title: "Работа над проектом на 2 часа",
        category: "Работа",
        period: "daily",
        targetValue: 3
    },
    {
        id: 5,
        title: "Прогулка на свежем воздухе",
        category: "Здоровье",
        period: "daily",
    },
    {
        id: 6,
        title: "Прочитать главу из учебника",
        category: "Образование",
        period: "daily",
    },
    {
        id: 7,
        title: "Помыть посуду сразу после еды",
        category: "Дом",
        period: "daily",
    },
    {
        id: 9,
        title: "Прогулка на свежем воздухе",
        category: "Здоровье",
        period: "weekly",
    },
    {
        id: 10,
        title: "Прочитать 10 глав из учебника",
        category: "Образование",
        period: "weekly",
        targetValue: 10
    },
    {
        id: 13,
        title: "Не курить весь день",
        category: "Отказ от вредной привычки",
        period: "daily",
    },
    {
        id: 14,
        title: "Не употреблять алкоголь весь день",
        category: "Отказ от вредной привычки",
        period: "daily",
    },
];


export const useLibraryStore = create<LibraryStore>() (
  persist(
    (set, get) => ({
        habits: habitsList as LibraryHabit[],
        getLastHabitId: () => get().habits.reduce((acc, habit: LibraryHabit) => (habit.id > acc ? habit.id : acc), 0),

        addHabit: (habit: LibraryHabit) => {
            const lastHabitId = get().getLastHabitId();
            set((state: LibraryStore) => ({ habits: [...state.habits, {...habit, id: lastHabitId}] }));
        },

        removeHabit: (id: number) => set((state: LibraryStore) => ({ habits: state.habits.filter((habit: LibraryHabit) => habit.id !== id) })),
        
        addHabitToGlobalStore: (habit: LibraryHabit) => {
            const habitToAdd = {
                title: habit.title,
                category: habit.category,
                period: habit.period,
                targetValue: habit.targetValue ? habit.targetValue : 1,
            }
            addHabit(habitToAdd);
        }
    }),
    {
      name: 'library-storage',
    },
  ),
)

