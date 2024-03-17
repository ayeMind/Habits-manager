import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Habit, GlobalState  } from './interfaces';

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set, get) => ({
      habits: [],
      getLastId: () => get().habits.reduce((acc, habit) => (habit.id > acc ? habit.id : acc), 0),
      addHabit: (habit: Habit) => set((state) => ({ habits: [...state.habits, habit] })),
      removeHabit: (habit: Habit) => set((state) => ({ habits: state.habits.filter((h) => h !== habit) })),
      toggleHabit: (id: number) => set((state) => ({ habits: state.habits.map((habit) => (habit.id === id ? { ...habit, isCompleted: !habit.isCompleted } : habit) ) })),
      clearHabits: () => set({ habits: [] }),
    }),
    {
      name: 'food-storage',
    },
  ),
)

