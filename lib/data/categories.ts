import { prisma } from "../prisma";

export async function getCategories({ userId }: { userId: string }) {
  return prisma.category.findMany({
    where: {
      userId
    },
    select: {
      icon: true,
      name: true,
      color: true,
      type: true,
      id: true
    }
  })
}