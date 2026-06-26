import CategoryItem from "@/components/category/category-item";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export default async function Categories() {
  const session = await auth.api.getSession({ headers: await headers() })

  const categories = await prisma.category.findMany({
    where: { userId: session?.user.id }
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xl font-semibold">Categories</div>
          <div className="text-muted-foreground text-sm">{categories.length} transactions</div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="font-medium text-muted-foreground text-sm">
          INCOME
        </div>

        <div className="grid grid-cols-3 justify-start gap-3">
          {categories.filter(category => category.type === "income" || category.type === "both").map(category => {
            const { id, userId, ...rest } = category

            return (
              <CategoryItem key={id} {...rest}></CategoryItem>
            )
          })}
        </div>
      </div>

      <div className="space-y-3">
        <div className="font-medium text-muted-foreground text-sm">
          EXPENSE
        </div>

        <div className="grid grid-cols-3 justify-start gap-3">
          {categories.filter(category => category.type === "expense" || category.type === "both").map(category => {
            const { id, userId, ...rest } = category

            return (
              <CategoryItem key={id} {...rest}></CategoryItem>
            )
          })}
        </div>
      </div>
    </div>
  )
}