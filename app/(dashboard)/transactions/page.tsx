import AddTransactionButton from "@/components/transactions/buttons/add-transaction-button";
import TransactionsList from "@/components/transactions/transactions-list";
import { Card, CardContent, } from "@/components/ui/card";
import { getTransactions } from "@/lib/data/transactions";
import { ReceiptText } from "lucide-react";

export default async function Transactions() {
  const transactions = await getTransactions()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xl font-semibold">Transactions</div>
          <div className="text-muted-foreground text-sm">{transactions.length} transactions</div>
        </div>
        <AddTransactionButton />
      </div>

      <Card className="w-full p-0">
        <CardContent className="p-0">
          {
            transactions.length > 0 ? (
              <TransactionsList transactions={transactions} amount={transactions.length} />
            ) : (
              <div className="flex flex-col gap-3 items-center justify-center p-8">
                <div className="rounded-full bg-muted p-3 text-muted-foreground">
                  <ReceiptText />
                </div>
                <div className="font-medium">No transactions found</div>
              </div>
            )
          }
        </CardContent>
      </Card>
    </div>
  )
}