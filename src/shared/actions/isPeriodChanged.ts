const msInDay = 1000 * 60 * 60 * 24;
const daysInWeek = 7;
const mondayNumber = 1;

const isDayChanged = (date1: Date, date2: Date) => {
  return (
    date1.getDate() !== date2.getDate() ||
    date1.getMonth() !== date2.getMonth() ||
    date1.getFullYear() !== date2.getFullYear()
  );
};

const countDaysDiff = (date1: Date, date2: Date) => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.round(diffTime / (msInDay));
};

const isWeekChanged = (date1: Date, date2: Date) => {

  const firstDate = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const lastDate = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  const daysUntilMonday = ((daysInWeek - date1.getDay()) % daysInWeek) + mondayNumber
  const daysDiff = countDaysDiff(firstDate, lastDate);

  return daysDiff >= daysUntilMonday;
};

const isMonthChanged = (date1: Date, date2: Date) => {
  return (
    date1.getMonth() !== date2.getMonth() ||
    date1.getFullYear() !== date2.getFullYear()
  );
};

export const isPeriodChanged = (
  date1: Date,
  date2: Date,
  period: "daily" | "weekly" | "monthly"
) => {
  if (period === "daily") {
    return isDayChanged(date1, date2);
  }

  if (period === "weekly") {
    return isWeekChanged(date1, date2);
  }

  if (period === "monthly") {
    return isMonthChanged(date1, date2);
  }

  return false;
};
