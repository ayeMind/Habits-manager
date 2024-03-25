export interface HabitToUpload {
    // у каждой привычки уникальный id
    id: number;

    title: string;

    category: string;

    // дата, начиная с которой Вася трекает эту привычку
    addDate: Date; 

    period: 'daily' | 'weekly' | 'monthly';
    
    // необязательное поле – целевое значение для численных привычек,
    // например, пройти 10000 шагов
    targetValue?: number;
}

export interface HabitActionToUpload {
    // id привычки, чтобы связать с объектами Habit
    id: number;

    // дата и время, когда это действие отмечено как выполненное
    date: Date;
    
    // необязательное поле – значение для численных привычек,
    // например, 12000 для привычки "пройти 10000 шагов"
    value?: number;
}

export interface DataToUpload {
    habits: HabitToUpload[];
    actions: HabitActionToUpload[];
}

export interface DataToUploadExtended {
    habits: Habit[];
    actions: HabitAction[];
    library: LibraryHabit[];
}

export interface GlobalState {

    importStorage: (habits: Habit[], actions: HabitAction[]) => void;

    userName: string;
    setUserName: (name: string) => void;

    avatar: string;
    setAvatar: (file: string) => void;

    theme: string;
    setTheme: (theme: string) => void;
    savedThemes: string[];
    buyRandomTheme: () =>  string; // Возвращает выпавшую тему

    currentDateCorrection: number;
    setCurrentDateCorrection: (date: Date) => void;
    getDate: () => Date;

    habits: Habit[];
    addHabit: (habit: CreateHabit) => void;
    removeHabit: (id: number) => void;
    getLastId: () => number;
    getHabitsWithPeriod: (period: 'daily' | 'weekly' | 'monthly') => Habit[];
    toggleHabit: (habit: Habit) => boolean; // Возвращает, происходит ли переход на новый уровень
    completeHabit: (id: number) => boolean // Возвращает, происходит ли переход на новый уровень
    completeAllDailyHabits: () => void; // Для временного импорта
    changeTargetValue: (id: number, value: number) => void;

    userTarget: number;
    setUserTarget: (target: number) => void;

    completedHabits: number;
    increaseCompletedHabits: () => void;
    decreaseCompletedHabits: () => void;
    
    lastUpdateHabitsDate: Date;
    setLastUpdateHabitsDate: (date: Date) => void;

    countMissingHabits: () => number;

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
    cheatGold: () => void;
    earned: number;
    spent: number;

    templateImportIsOpen: boolean;
    openTemplateImport: () => void;
    templateDaily: Habit[];
    setTemplateDaily: (habits: Habit[]) => void;
    lastTemplateImportDate: Date;
    setLastTemplateImportDate: (date: Date) => void;
    toggleTemplateDaily: (habit: Habit) => void; // Привычки из временного импорта не влияют на статистику!
    changeTemplateDailyTargetValue: (id: number, value: number) => void;

    increaseExperienceAndGold: (value: number) => boolean; // Возвращает, происходит ли переход на новый уровень

    getCurrentLevelExperience: () => number;

    daysStreak: number;
    maxDaysStreak: number;

    increaseDaysStreak: () => void;

    achievements: Achievement[];
    completeAchievement: (id: number) => void;
}

export interface Achievement {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
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

    habit_id: number
    habit_period: 'daily' | 'weekly' | 'monthly';
    date: Date;
    isCompleted: boolean;

    value?: number;
}

export interface HabitActionCreate {
    habit_id: number;
    habit_period: 'daily' | 'weekly' | 'monthly';
    date: Date;
    isCompleted: boolean;
    value?: number;
}