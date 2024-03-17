export interface DataToUpload {
    habits: Habit[];
    actions: HabitAction[];
}
export interface GlobalState {
    habits: Habit[];
    addHabit: (habit: Habit) => void;
    removeHabit: (habit: Habit) => void;
    clearHabits: () => void;
    getLastId: () => number;
    getHabitsWithPeriod: (period: 'daily' | 'weekly' | 'monthly') => Habit[];
    toggleHabit: (id: number) => void;
    completeHabit: (id: number) => void;
    changeTargetValue: (id: number, value: number) => void;
}
  
export interface Habit {
    id: number;
    title: string;
    category: string;
    // дата, начиная с которой Вася трекает эту привычку
    addDate: Date; 
    period: 'daily' | 'weekly' | 'monthly';
    // необязательное поле – целевое значение для численных привычек
    targetValue?: number;
    currentValue?: number;

    isCompleted?: boolean;
}

export interface HabitAction {
    // id привычки, к которой относится это действие
    id: number;
    // дата и время, когда это действие отмечено как выполненное
    date: Date;
    // необязательное поле – значение для численных привычек
    value: number;
}