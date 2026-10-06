import { prisma } from "../prisma";

interface GetTransactionsParams {
  userId: string;
  take?: number;
  skip?: number;
}

export async function getTransactions({ userId, take, skip }: GetTransactionsParams) {
  return prisma.transaction.findMany({
    where: {
      userId
    },
    include: {
      category: true
    },
    orderBy: [{ updatedAt: "desc" }, { date: "desc" }],
    take,
    skip
  });
}