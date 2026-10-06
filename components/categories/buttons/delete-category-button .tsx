'use client'

import { Trash2 } from "lucide-react"
import { Button } from "../../ui/button"
import { useCategoryModalStore } from "../modals/category-modal-content"
import { Category } from "@/lib/types"

export default function DeleteCategoryButton({ category }: { category: Pick<Category, "id" | "name" | "color" | "icon" | "type"> }) {
  const openDelete = useCategoryModalStore((state) => state.openDelete)

  function handleClick() {
    openDelete(category)
  }

  return (
    <Button onClick={handleClick} variant="ghost" size="icon" className='text-muted-foreground hover:text-destructive duration-200'>
      <Trash2 />
    </Button>
  )
}