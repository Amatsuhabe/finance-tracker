'use client'

import { Plus } from "lucide-react"
import { Button } from "../../ui/button"
import { useTransactionModalStore } from "../modals/transaction-modal-content"

export default function AddTransactionButton() {
  const setIsOpen = useTransactionModalStore((state) => state.setIsAddOpen)

  return (
    <Button onClick={() => setIsOpen(true)}>
      <Plus></Plus>
      <span>Add Transaction</span>
    </Button>
  )
}