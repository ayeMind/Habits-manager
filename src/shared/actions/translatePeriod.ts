export const translatePeriod = (period: "daily" | "weekly" | "monthly") => {
    switch (period) {
        case "daily":
        return "День";
        case "weekly":
        return "Неделя";
        case "monthly":
        return "Месяц";
    }
};