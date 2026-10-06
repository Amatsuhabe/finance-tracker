'use client'

import { Plus } from "lucide-react"
import { Button } from "../../ui/button"
import { useCategoryModalStore } from "../modals/category-modal-content"

export default function AddCategoryButton() {
  const setIsOpen = useCategoryModalStore((state) => state.setIsAddOpen)

  return (
    <Button onClick={() => setIsOpen(true)}>
      <Plus></Plus>
      <span>Add Category</span>
    </Button>
  )
}