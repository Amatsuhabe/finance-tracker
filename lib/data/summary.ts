import getSession from "../auth/get-session";
import { prisma } from "../prisma";

interface GetSummaryParams {
  month: number;
  year: number;
  isAllTimePeriod?: boolean
}

export async function getSummary({ month, year, isAllTimePeriod = false }: GetSummaryParams) {
  const session = await getSession()

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: session.user.id,
      date: isAllTimePeriod ? undefined : {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 1)
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

  const monthSummary = new Array(new Date(year, month, 0).getDate()).fill(0).map((_, index) => {
    const date = new Date(year, month - 1, index + 1);

    const totalDayIncome = transactions.reduce((acc, transaction) => {
      if (transaction.type === "income" && new Date(transaction.date).getDate() === date.getDate()) {
        return acc + transaction.amount;
      } else {
        return acc;
      }
    }, 0);

    const totalDayExpenses = transactions.reduce((acc, transaction) => {
      if (transaction.type === "expense" && new Date(transaction.date).getDate() === date.getDate()) {
        return acc + transaction.amount;
      } else {
        return acc;
      }
    }, 0);

    return { date, totalDayIncome, totalDayExpenses };
  });
  
  return { netBalance, totalIncome, totalExpenses, monthSummary };
}