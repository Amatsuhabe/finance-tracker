'use client'

import { Pencil } from "lucide-react"
import { Button } from "../../ui/button"
import { useTransactionModalStore } from "../transaction-modal-content"
import { Transaction } from "@/lib/types"

export default function EditTransactionButton({ transaction }: { transaction: Transaction }) {
  const openEdit = useTransactionModalStore((state) => state.openEdit)

  function handleClick() {
    openEdit(transaction)
  }

  return (
    <Button onClick={handleClick} variant="ghost" size="icon" className='text-muted-foreground hover:text-foreground duration-200' >
      <Pencil />
    </Button>
  )
}