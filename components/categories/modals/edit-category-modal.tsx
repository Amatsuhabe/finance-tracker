'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { mutate } from "swr"
import { useCategoryModalStore } from "./category-modal-content"
import { Button } from "../../ui/button"
import { isEqual } from "lodash"
import { CategoryData } from "@/lib/schemas/add-category"
import CategoryModalContent from "./category-modal-content"

export default function EditCategoryModal() {
  const isOpen = useCategoryModalStore((state) => state.isEditOpen)
  const setIsOpen = useCategoryModalStore((state) => state.setIsEditOpen)

  const category = useCategoryModalStore((state) => state.category)

  if (!category) return null

  const defaultValues: CategoryData = {
    name: category.name,
    icon: category.icon,
    type: category.type,
    color: category.color,
  }

  const onSubmit = async (data: CategoryData) => {
    if (isEqual(data, defaultValues)) {
      setIsOpen(false)
      return
    }

    const promise = fetch(`/api/categories/${category.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(async (res) => {
        const body = await res.json()

        if (!res.ok) {
          throw new Error(body.message || "Failed to edit category")
        }

        return res
      })

    toast.promise(promise, {
      loading: "Editing category...",
      success: "Category edited successfully",
      error: (error) => error
    })

    try {
      await promise

      setIsOpen(false)

      mutate("/api/categories")
      mutate((key) => typeof key === 'string' && key.startsWith('/api/dashboard/summary'))
    } catch (error) {
      console.error('Failed to add category:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="md:max-w-md md:w-full" >
        <DialogHeader className="text-base font-medium">
          Edit Category
        </DialogHeader>

        <CategoryModalContent formId="edit-category-modal" defaultValues={defaultValues} onSubmit={onSubmit} />

        <DialogFooter>
          <Button variant={"outline"} type="button" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" form="edit-category-modal">Save Category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}