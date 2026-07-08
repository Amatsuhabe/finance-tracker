'use client'

import CategoryItem from "@/components/categories/category-item";
import { useCategoriesStore } from "@/components/providers/categories-provider";

export default function Categories() {
  const categories = useCategoriesStore((state) => state.categories)

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
          {categories.filter(category => category.type === "income" || category.type === "both").map(category => (
            <CategoryItem key={category.name} {...category}></CategoryItem>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="font-medium text-muted-foreground text-sm">
          EXPENSE
        </div>

        <div className="grid grid-cols-3 justify-start gap-3">
          {categories.filter(category => category.type === "expense" || category.type === "both").map(category => (
            <CategoryItem key={category.name} {...category}></CategoryItem>
          ))}
        </div>
      </div>
    </div>
  )
}