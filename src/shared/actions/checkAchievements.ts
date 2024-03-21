import { Achievement } from "app/interfaces";

export function checkAchievements(achievements: Achievement[], completedHabits: number, daysStreak: number, gold:number, spent:number) {
    
    const completed = [];

    if (!achievements[0].isCompleted && completedHabits >= 1) {  
        completed.push(achievements[0]);
    }

    if (!achievements[1].isCompleted && daysStreak >= 1) {
        completed.push(achievements[1]);
    }

    if (!achievements[2].isCompleted && completedHabits >= 5) {
        completed.push(achievements[2]);
    }

    if (!achievements[3].isCompleted && completedHabits >= 10) {
        completed.push(achievements[3]);
    }

    if (!achievements[4].isCompleted && daysStreak >= 5) {
        completed.push(achievements[4]);
    }

    if (!achievements[5].isCompleted && daysStreak >= 10) {
        completed.push(achievements[5]);
    }

    if (!achievements[6].isCompleted && spent >= 100) {
        completed.push(achievements[6]);
    }

    if (!achievements[7].isCompleted && spent >= 500) {
        completed.push(achievements[7]);
    }

    if (!achievements[8].isCompleted && spent >= 1000) {
        completed.push(achievements[8]);
    }

    if (!achievements[9].isCompleted && gold >= 5000) {
        completed.push(achievements[9]);
    }

    if (!achievements[10].isCompleted && completedHabits >= 100) {
        completed.push(achievements[10]);
    }

    if (!achievements[11].isCompleted &&  daysStreak >= 365) {
        completed.push(achievements[11]);
    }

    return completed;
}
