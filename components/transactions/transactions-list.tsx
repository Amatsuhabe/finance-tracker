import { Transaction } from "@/lib/types";
import TransactionItem from "./transaction-item";
import { CardContent } from "@/components/ui/card";

interface TransactionsListProps extends React.HTMLAttributes<HTMLDivElement> {
  transactions: Transaction[];
  amount: number;
}

export default function TransactionsList({ transactions, amount, ...props }: TransactionsListProps) {
  return (
    <div className="divide-y! divide-border!">
      {transactions.slice(0, amount).map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} {...props} />
      ))}
    </div>
  )
}