import { create } from 'zustand'
import { Habit } from './interfaces';
import { persist } from 'zustand/middleware';

// Автоматическая синхронизация с localStorage
const useGlobalStore = create(
    persist(
        (set) => ({
            habits: [] as Habit[],
            setHabits: (habits: Habit[]) => set({habits})}),
        {
            name: 'habits-storage',
            getStorage: () => localStorage
        }
    )
);

export default useGlobalStore;
