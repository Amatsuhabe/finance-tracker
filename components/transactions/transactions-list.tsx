'use client'

import { Transaction } from "@/lib/types";
import TransactionItem from "./transaction-item";
import useSWR from 'swr'
import { fetcher } from "@/lib/utils";

interface TransactionsListProps extends React.HTMLAttributes<HTMLDivElement> {
  transactions: Transaction[];
  amount?: number;
  skip?: number;
}

export default function TransactionsList({ transactions, amount, skip = 0, ...props }: TransactionsListProps) {
  const { data } = useSWR<Transaction[]>(`/api/transactions?take=${amount}&skip=${skip}`, fetcher, {
    fallbackData: transactions,
  })

  return (
    <div className="divide-y! divide-border!">
      {data?.slice(0, amount).map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} {...props} />
      ))}
    </div>
  )
}