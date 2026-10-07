import { prisma } from "../prisma";
import { getDateMonthRange, getDatePartsUtc, getDaysInMonth } from "../date-time";

interface GetSummaryParams {
  userId: string;
  month: number;
  year: number;
  isAllTimePeriod?: boolean
}

export async function getSummary({ userId, month, year, isAllTimePeriod = false }: GetSummaryParams) {
  const { start, end } = getDateMonthRange(year, month);
  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      date: isAllTimePeriod ? undefined : {
        gte: start,
        lt: end,
      }
    }
  })

  const netBalance = transactions.reduce((acc, transaction) => {
    if (transaction.type === "income") {
      return acc + transaction.amount;
    } else {
      return acc - transaction.amount;
    }
  }, 0);

  const totalIncome = transactions.reduce((acc, transaction) => {
    if (transaction.type === "income") {
      return acc + transaction.amount;
    } else {
      return acc;
    }
  }, 0);

  const totalExpenses = transactions.reduce((acc, transaction) => {
    if (transaction.type === "expense") {
      return acc + transaction.amount;
    } else {
      return acc;
    }
  }, 0);

  const monthSummary = Array.from({ length: getDaysInMonth(year, month) }, (_, index) => ({
    date: new Date(Date.UTC(year, month - 1, index + 1)),
    totalDayIncome: 0,
    totalDayExpenses: 0,
  }));

  for (const transaction of transactions) {
    const transactionDate = getDatePartsUtc(transaction.date);
    if (transactionDate.year !== year || transactionDate.month !== month) continue;

    const dailySummary = monthSummary[transactionDate.day - 1];

    if (!dailySummary) continue;
    if (transaction.type === "income") dailySummary.totalDayIncome += transaction.amount;
    else dailySummary.totalDayExpenses += transaction.amount;
  }
  
  return { netBalance, totalIncome, totalExpenses, monthSummary };
}