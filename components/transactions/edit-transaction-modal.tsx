'use client'

import { TransactionData } from "@/lib/schemas/add-transaction"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { mutate } from "swr"
import TransactionModalContent, { useTransactionModalStore } from "./transaction-modal-content"
import { Button } from "../ui/button"
import { isEqual } from "lodash"

export default function EditTransactionModal() {
  const isOpen = useTransactionModalStore((state) => state.isEditOpen)
  const setIsOpen = useTransactionModalStore((state) => state.setIsEditOpen)

  const transaction = useTransactionModalStore((state) => state.transaction)

  if (!transaction) return null

  const defaultValues: TransactionData = {
    amount: transaction.amount,
    type: transaction.type == "income" ? transaction.type : "expense",
    date: new Date(transaction.date),
    description: transaction.description || "",
    categoryId: transaction.category.id,
  }

  const onSubmit = async (data: TransactionData) => {
    if (isEqual(data, defaultValues)) {
      setIsOpen(false)
      return
    }

    const promise = fetch(`/api/transactions/${transaction.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(async (res) => {
        const body = await res.json()

        if (!res.ok) {
          throw new Error(body.message || "Failed to edit transaction")
        }

        return res
      })

    toast.promise(promise, {
      loading: "Editing transaction...",
      success: "Transaction edited successfully",
      error: (error) => error
    })

    try {
      await promise

      setIsOpen(false)

      mutate((key) => typeof key === 'string' && key.startsWith('/api/transactions'))
    } catch (error) {
      console.error('Failed to add transaction:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="md:max-w-md md:w-full" >
        <DialogHeader className="text-base font-medium">
          Edit Transaction
        </DialogHeader>

        <TransactionModalContent formId="edit-transaction-modal" defaultValues={defaultValues} onSubmit={onSubmit} />

        <DialogFooter>
          <Button variant={"outline"} type="button" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" form="edit-transaction-modal">Save Transaction</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}