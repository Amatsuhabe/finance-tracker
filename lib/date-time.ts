interface CalendarDateParts {
  year: number;
  month: number;
  day: number;
}

interface CalendarMonth {
  year: number;
  month: number;
}

export function getCalendarDateParts(date: Date, timeZone: string): CalendarDateParts {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);

  return {
    year: Number(parts.find((part) => part.type === "year")?.value),
    month: Number(parts.find((part) => part.type === "month")?.value),
    day: Number(parts.find((part) => part.type === "day")?.value),
  };
}

export function getDateKeyInTimeZone(date: Date, timeZone: string): string {
  const { year, month, day } = getCalendarDateParts(date, timeZone);
  return `${year.toString().padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
}

export function getDatePartsUtc(date: Date): CalendarDateParts {
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  };
}

export function getDateKey(date: Date | string): string {
  const parsedDate = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(parsedDate.getTime())) throw new Error("Invalid transaction date");
  return parsedDate.toISOString().slice(0, 10);
}

export function dateKeyToLocalDate(dateKey: string): Date {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatDateKey(date: Date): string {
  return `${date.getFullYear().toString().padStart(4, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

export function formatStoredDate(date: Date | string, locale = "en-US"): string {
  const dateKey = getDateKey(date);
  return new Date(`${dateKey}T00:00:00.000Z`).toLocaleDateString(locale, {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getYearMonthInTimeZone(date: Date, timeZone: string): CalendarMonth {
  const { year, month } = getCalendarDateParts(date, timeZone);
  return { year, month };
}

export function getDateMonthRange(year: number, month: number) {
  const nextYear = month === 12 ? year + 1 : year;
  const nextMonth = month === 12 ? 1 : month + 1;

  return {
    start: new Date(Date.UTC(year, month - 1, 1)),
    end: new Date(Date.UTC(nextYear, nextMonth - 1, 1)),
  };
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}
