export interface DataToUpload {
    habits: Habit[];
    actions: HabitAction[];
}
export interface GlobalState {

    userName: string;
    setUserName: (name: string) => void;

    avatar: string;
    setAvatar: (file: string) => void;

    currentDateCorrection: number;
    setCurrentDateCorrection: (date: Date) => void;

    habits: Habit[];
    addHabit: (habit: CreateHabit) => void;
    removeHabit: (id: number) => void;
    getLastId: () => number;
    getHabitsWithPeriod: (period: 'daily' | 'weekly' | 'monthly') => Habit[];
    toggleHabit: (habit: Habit) => boolean; // Возвращает, происходит ли переход на новый уровень
    completeHabit: (id: number) => boolean // Возвращает, происходит ли переход на новый уровень
    changeTargetValue: (id: number, value: number) => void;

    lastStreakUpdateDate: Date;
    setLastStreakUpdateDate: (date: Date) => void;

    updateStreak: () => void;
    updateHabits: (period: 'daily' | 'weekly' | 'monthly') => void;
    isNewPeriod: (period: 'daily' | 'weekly' | 'monthly') => boolean;

    history: HabitAction[];
    addAction: (action:     HabitActionCreate) => void;
    removeAllHabitHistroy: (habit_id: number) => void;
    removeCurrentAction: (habit_id: number) => boolean; // Возвращает, происходит ли переход на новый уровень
    getLastHistoryId: () => number;

    categories: string[];
    addCategory: (category: string) => void;

    experience: number;
    level: number;
    gold: number;
    earned: number;
    spent: number;

    increaseExperienceAndGold: (value: number) => boolean; // Возвращает, происходит ли переход на новый уровень

    getCurrentLevelExperience: () => number;

    daysStreak: number;
    maxDaysStreak: number;

    increaseDaysStreak: () => void;
}

export interface LibraryStore {
    habits: LibraryHabit[];
    getLastHabitId: () => number;
    addHabit: (habit: LibraryHabitCreate) => void;
    removeHabit: (id: number) => void;
    removeAllSelectedHabits: (habits_id: number[]) => void;
    addHabitToGlobalStore: (habit: LibraryHabit) => void;
    saveAllSelectedHabits: (habits: LibraryHabit[]) => void;
}

export interface LibraryHabit {
    id: number;
    title: string;
    category: string;
    period: 'daily' | 'weekly' | 'monthly';
    targetValue?: number;
    saved: boolean;
    selected: boolean;
}
  

export interface LibraryHabitCreate {
    title: string;
    category: string;
    period: 'daily' | 'weekly' | 'monthly';
    targetValue?: number;
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

    isCompleted: boolean;
}

export interface CreateHabit {
    title: string;
    category: string;
    period: 'daily' | 'weekly' | 'monthly';
    targetValue: number;
}

export interface HabitAction {
    id: number;
    // id привычки, к которой относится это действие
    habit_id: number
    habit_period: 'daily' | 'weekly' | 'monthly';
    // дата и время, когда это действие отмечено как выполненное
    date: Date;
    isCompleted: boolean;

    // необязательное поле – значение для численных привычек
    value?: number;
}

export interface HabitActionCreate {
    habit_id: number;
    habit_period: 'daily' | 'weekly' | 'monthly';
    date: Date;
    isCompleted: boolean;
    value?: number;
}