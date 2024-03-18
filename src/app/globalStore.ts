import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Habit, GlobalState, HabitAction  } from './interfaces';

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set, get) => ({
      habits: [],
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
          const daysPassed = (currentDate.getTime() - lastActionDate.getTime()) / (1000 * 60 * 60 * 24);
          return daysPassed >= daysUntilMonday;
        }

        if (period === 'monthly') {
          return lastActionDate.getMonth() !== currentDate.getMonth()
        }
      },

      
      clearHabits: () => set({ habits: [] }),

      history: [],
      getLastHistoryId: 
        () => get().history.reduce((acc, action) => (action.id > acc ? action.id : acc), 0),

      addAction: (action: HabitAction) => set((state) => ({ history: [...state.history, action] })),
      removeAllHabitHistroy: (habit_id: number) => set((state) => ({ history: state.history.filter((action) => action.habit_id !== habit_id) })),

      // Смотрит на дату, и если действие с habit_id  было совершено в течение последних X секунд, то удаляет его из истории
      removeCurrentAction:
       (habit_id: number, seconds: number) =>
        set((state) => ({ history: state.history.filter(
            (action) => action.habit_id !== habit_id || (new Date().getTime() - new Date(action.date).getTime()) / 1000 > seconds) })),
    }),
    {
      name: 'habits-storage',
    },
  ),
)

