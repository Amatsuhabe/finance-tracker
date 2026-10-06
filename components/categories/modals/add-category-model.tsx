'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { mutate } from "swr"
import TransactionModalContent, { useCategoryModalStore } from "./category-modal-content"
import { Button } from "../../ui/button"
import { CategoryData } from "@/lib/schemas/add-category"

export default function AddCategoryModal() {
  const isOpen = useCategoryModalStore((state) => state.isAddOpen)
  const setIsOpen = useCategoryModalStore((state) => state.setIsAddOpen)

  const onSubmit = async (data: CategoryData) => {
    const promise = fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to add category")
        }

        return res
      })

    toast.promise(promise, {
      loading: "Adding category...",
      success: "Category added successfully",
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
      <DialogContent className="md:max-w-md md:w-full">
        <DialogHeader className="text-base font-medium">
          Add Category
        </DialogHeader>

        <TransactionModalContent formId="add-transaction-modal" onSubmit={onSubmit}></TransactionModalContent>

        <DialogFooter>
          <Button variant={"outline"} type="button" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" form="add-transaction-modal">Add Category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}