import getSession from "../auth/get-session";
import { prisma } from "../prisma";

interface GetTransactionsParams {
  take?: number;
  skip?: number;
}

export async function getTransactions({ take, skip }: GetTransactionsParams = {}) {
  const session = await getSession()

  return prisma.transaction.findMany({
    where: {
      userId: session.user.id
    },
    include: {
      category: true
    },
    orderBy: [{ updatedAt: "desc" }, { date: "desc" }],
    take,
    skip
  });
}