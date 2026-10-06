'use client'

import { toast } from "sonner"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog"
import { Button } from "../../ui/button"
import { mutate } from "swr"
import { useCategoryModalStore } from "./category-modal-content"
import CategoryItem from "../category-item"

export default function DeleteCategoryModal() {
  const isOpen = useCategoryModalStore((state) => state.isDeleteOpen)
  const setIsOpen = useCategoryModalStore((state) => state.setIsDeleteOpen)
  const category = useCategoryModalStore((state) => state.category)

  if (!category) return null

  const handleDelete = async () => {
    const promise = fetch(`/api/categories/${category.id}`, {
      method: "DELETE",
    })
      .then(async (res) => {
        const body = await res.json()

        if (!res.ok) {
          throw new Error(body.message || "Failed to delete category")
        }

        return res
      })

    toast.promise(promise, {
      loading: "Deleting category...",
      success: "Category deleted successfully",
      error: (error) => error.message
    })

    try {
      await promise

      setIsOpen(false)

      mutate("/api/categories")
      mutate((key) => typeof key === 'string' && key.startsWith('/api/dashboard/summary'))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md!">
        <DialogHeader>
          <DialogTitle>Delete category?</DialogTitle>
          <DialogDescription className="space-y-3" asChild>
            <div>
              <div>
                This action cannot be undone.
              </div>

              <CategoryItem {...category} id="preview" />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

}