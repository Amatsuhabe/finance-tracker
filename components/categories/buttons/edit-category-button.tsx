'use client'

import { Pencil } from "lucide-react"
import { Button } from "../../ui/button"
import { useCategoryModalStore } from "../modals/category-modal-content"
import { Category } from "@/generated/prisma/browser"

export default function EditCategoryButton({ category }: { category: Pick<Category, "id" | "name" | "color" | "icon" | "type"> }) {
  const openEdit = useCategoryModalStore((state) => state.openEdit)

  function handleClick() {
    openEdit(category)
  }

  return (
    <Button onClick={handleClick} variant="ghost" size="icon" className='text-muted-foreground hover:text-foreground duration-200' >
      <Pencil />
    </Button>
  )
}