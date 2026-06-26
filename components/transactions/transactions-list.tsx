import { Transaction } from "@/lib/types";
import TransactionItem from "./transaction-item";

interface TransactionsListProps extends React.HTMLAttributes<HTMLDivElement> {
  transactions: Transaction[];
  amount: number;
}

export default function TransactionsList({ transactions, amount, ...props }: TransactionsListProps) {
  return (
    <>
      {transactions.slice(0, amount).map((transaction) => (
        <TransactionItem key={transaction.date} transaction={transaction} {...props} />
      ))}
    </>
  )
}