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

export default function AddTransactionModal() {
  const isOpen = useTransactionModalStore((state) => state.isAddOpen)
  const setIsOpen = useTransactionModalStore((state) => state.setIsAddOpen)

  const onSubmit = async (data: TransactionData) => {
    const promise = fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to add transaction")
        }

        return res
      })

    toast.promise(promise, {
      loading: "Adding transaction...",
      success: "Transaction added successfully",
      error: (error) => error
    })

    try {
      await promise

      setIsOpen(false)

      mutate((key) => typeof key === 'string' && key.startsWith('/api/transactions'))
      mutate((key) => typeof key === 'string' && key.startsWith('/api/dashboard/summary'))
    } catch (error) {
      console.error('Failed to add transaction:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent  className="md:max-w-md md:w-full">
        <DialogHeader className="text-base font-medium">
          Add Transaction
        </DialogHeader>

        <TransactionModalContent formId="add-transaction-modal" onSubmit={onSubmit}></TransactionModalContent>

        <DialogFooter>
          <Button variant={"outline"} type="button" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" form="add-transaction-modal">Save Transaction</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}