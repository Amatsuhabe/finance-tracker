'use client'

import { toast } from "sonner"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import TransactionItemContent from "./transaction-item-content"
import { mutate } from "swr"
import { useTransactionModalStore } from "./transaction-modal-content"

export default function DeleteTransactionModal() {
  const isOpen = useTransactionModalStore((state) => state.isDeleteOpen)
  const setIsOpen = useTransactionModalStore((state) => state.setIsDeleteOpen)
  const transaction = useTransactionModalStore((state) => state.transaction)

  if (!transaction) return null

  const handleDelete = async () => {
    const promise = fetch(`/api/transactions/${transaction.id}`, {
      method: "DELETE",
    })
      .then(async (res) => {
        const body = await res.json()

        if (!res.ok) {
          throw new Error(body.message || "Failed to delete transaction")
        }

        return res
      })

    toast.promise(promise, {
      loading: "Deleting transaction...",
      success: "Transaction deleted successfully",
      error: (error) => error.message
    })

    try {
      await promise

      setIsOpen(false)

      mutate((key) => typeof key === 'string' && key.startsWith('/api/transactions'))
      mutate((key) => typeof key === 'string' && key.startsWith('/api/dashboard/summary'))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md!">
        <DialogHeader>
          <DialogTitle>Delete transaction?</DialogTitle>
          <DialogDescription className="space-y-3" asChild>
            <div>
              <div>
                This action cannot be undone.
              </div>

              <TransactionItemContent className="border! border-border! rounded-lg p-2.5" transaction={transaction} />
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