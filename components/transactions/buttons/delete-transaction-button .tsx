'use client'

import { Trash2 } from "lucide-react"
import { Button } from "../../ui/button"
import { useTransactionModalStore } from "../transaction-modal-content"
import { Transaction } from "@/lib/types"

export default function DeleteTransactionButton({transaction} : {transaction: Transaction}) {
  const openDelete = useTransactionModalStore((state) => state.openDelete)

  function handleClick() {
    openDelete(transaction)
  }

  return (
    <Button onClick={handleClick} variant="ghost" size="icon" className='text-muted-foreground hover:text-destructive duration-200'>
      <Trash2 />
    </Button>
  )
}