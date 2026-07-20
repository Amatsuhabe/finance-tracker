import { toast } from "sonner"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { Trash2 } from "lucide-react"
import { Transaction } from "@/lib/types"
import TransactionItemContent from "./transaction-item-content"
import { mutate } from "swr"
import { useState } from "react"

export default function DeleteTransactionModal({ transaction }: { transaction: Transaction }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = async () => {
    const promise = fetch(`/api/transactions/${transaction.id}`, {
      method: "DELETE",
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to delete transaction")
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
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className='text-muted-foreground hover:text-destructive duration-200'>
          <Trash2 />
        </Button>
      </DialogTrigger>

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