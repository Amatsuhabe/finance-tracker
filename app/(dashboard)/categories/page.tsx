'use client'

import AddCategoryButton from "@/components/categories/buttons/add-category-button";
import CategoryItem from "@/components/categories/category-item";
import { Category } from "@/lib/types";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

export default function Categories() {
  const { data: categories = [], error } = useSWR("/api/categories", fetcher<Category[]>)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xl font-semibold">Categories</div>
          <div className="text-muted-foreground text-sm">{categories.length} categories</div>
        </div>

        <AddCategoryButton/>
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          Failed to load categories. Please try again.
        </p>
      )}

      <div className="space-y-3">
        <div className="font-medium text-muted-foreground text-sm">
          INCOME
        </div>

        <div className="grid grid-cols-3 justify-start gap-3">
          {categories.filter(category => category.type === "income" || category.type === "both").map(category => (
            <CategoryItem key={category.id} {...category}></CategoryItem>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="font-medium text-muted-foreground text-sm">
          EXPENSE
        </div>

        <div className="grid grid-cols-3 justify-start gap-3">
          {categories.filter(category => category.type === "expense" || category.type === "both").map(category => (
            <CategoryItem key={category.id} {...category}></CategoryItem>
          ))}
        </div>
      </div>
    </div>
  )
}