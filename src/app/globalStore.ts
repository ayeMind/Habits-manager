import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Habit, GlobalState, HabitAction  } from './interfaces';

const countDaysDiff = (date1: Date, date2: Date) => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set, get) => ({
      habits: [] as Habit[],
      getLastId: () => 
        get().habits.reduce((acc, habit) => (habit.id > acc ? habit.id : acc), 0),
      
      getHabitsWithPeriod: 
        (period: 'daily' | 'weekly' | 'monthly') => get().habits.filter((habit) => habit.period === period),

      addHabit: 
        (habit: Habit) => set((state) => ({ habits: [...state.habits, habit] })),

      removeHabit: 
        (id: number) => set((state) => ({ habits: state.habits.filter((habit) => habit.id !== id) })),

      toggleHabit: 
        (id: number) => set((state) => ({ habits: state.habits.map((habit) => (habit.id === id ? { ...habit, isCompleted: !habit.isCompleted } : habit) ) })),

      completeHabit: 
        (id: number) => set((state) => ({ habits: state.habits.map((habit) => (habit.id === id ? { ...habit, isCompleted: true } : habit) ) })),
      
      changeTargetValue: 
        (id: number, value: number) => set((state) => ({ habits: state.habits.map((habit) => (habit.id === id ? { ...habit, currentValue: value } : habit) ) })),

      // Для обнуления прогресса всех привычек в начале нового периода
      updateHabits: (period: 'daily' | 'weekly' | 'monthly') => {
        const habits = get().habits.map((habit) => {
          if (habit.period === period) {
            return { ...habit, currentValue: 0, isCompleted: false };
          }
          return habit;
        });
        set({ habits });
      },

      // Для проверки, закончилось ли время предыдущего периода (смотрит на соответствущую часть даты (день, неделя, месяц))
      checkPeriod(period: 'daily' | 'weekly' | 'monthly') {
        const history = get().history.filter((action) => action.habit_period === period);
        const lastActionDate = new Date(history[history.length - 1]?.date);
        const currentDate = new Date();

        if (period === 'daily') {
          return lastActionDate.getDate() !== currentDate.getDate();
        }

        if (period === 'weekly') {
          const daysUntilMonday = (7 - lastActionDate.getDay()) % 7 + 1;
          const daysDiff = countDaysDiff(lastActionDate, currentDate);

          return daysDiff >= daysUntilMonday;
        }

        if (period === 'monthly') {
          return lastActionDate.getMonth() !== currentDate.getMonth()
        }

        console.error("Некорректный период")
        return false;
      },

      
      clearHabits: () => set({ habits: [] }),

      history: [],
      getLastHistoryId: 
        () => get().history.reduce((acc, action) => (action.id > acc ? action.id : acc), 0),

      addAction: (action: HabitAction) => set((state) => ({ history: [...state.history, action] })),
      removeAllHabitHistroy: (habit_id: number) => set((state) => ({ history: state.history.filter((action) => action.habit_id !== habit_id) })),

      // Смотрит на дату, и если действие с habit_id  было совершено в течение последних X секунд, то удаляет это действие из истории
      // Нужно для того, чтобы можно было отменить действие, если оно было совершено случайно
      removeCurrentAction: (habit_id: number, habit_period: "daily" | "weekly" | "monthly") => {
        const lastAction = get().history.filter((action) => {action.habit_id !== habit_id}).pop();
        if (!lastAction) return;
        const currentDate = new Date();
        const lastActionDate = new Date(lastAction.date);

        const allHistory = get().history;

        if (habit_period === "daily") {
          if (currentDate.getDate() === lastActionDate.getDate()) {
            set({ history: allHistory.filter((action) => action.id !== lastAction.id) });
          }
        }

        if (habit_period === "weekly") {
          const daysUntilMonday = (7 - lastActionDate.getDay()) % 7 + 1;
          const daysDiff = countDaysDiff(lastActionDate, currentDate);
          if (daysDiff < daysUntilMonday) {
            set({ history: allHistory.filter((action) => action.id !== lastAction.id) });
          }
        }

        if (habit_period === "monthly") {
          if (currentDate.getMonth() === lastActionDate.getMonth() && currentDate.getFullYear() === lastActionDate.getFullYear()){
            set({ history: allHistory.filter((action) => action.id !== lastAction.id) });
          }
        }
      },
      
    }),
    {
      name: 'habits-storage',
    },
  ),
)

