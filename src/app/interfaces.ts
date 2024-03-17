export interface DataToUpload {
    habits: Habit[];
    actions: HabitAction[];
}
export interface GlobalState {
    habits: Habit[];
    addHabit: (habit: Habit) => void;
    removeHabit: (id: number) => void;
    clearHabits: () => void;
    getLastId: () => number;
    getHabitsWithPeriod: (period: 'daily' | 'weekly' | 'monthly') => Habit[];
    toggleHabit: (id: number) => void;
    completeHabit: (id: number) => void;
    changeTargetValue: (id: number, value: number) => void;

    history: HabitAction[];
    addAction: (action: HabitAction) => void;
    removeAllHabitHistroy: (habit_id: number) => void;
    removeCurrentAction: (habit_id: number, seconds: number) => void;
    getLastHistoryId: () => number;
}
  
export interface Habit {
    id: number;
    title: string;
    category: string;
    // дата, начиная с которой Вася трекает эту привычку
    addDate: Date; 
    period: 'daily' | 'weekly' | 'monthly';
    // необязательное поле – целевое значение для численных привычек
    targetValue: number;
    currentValue: number;

    isCompleted?: boolean;
}

export interface HabitAction {
    id: number;
    // id привычки, к которой относится это действие
    habit_id: number;
    // дата и время, когда это действие отмечено как выполненное
    date: Date;
    isCompleted: boolean;

    // необязательное поле – значение для численных привычек
    value?: number;

}