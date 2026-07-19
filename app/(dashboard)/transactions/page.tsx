import AddTransactionModal from "@/components/shared/add-transaction-modal";
import TransactionsList from "@/components/transactions/transactions-list";
import { Card, CardContent, } from "@/components/ui/card";
import getSession from "@/lib/auth/get-session";
import { prisma } from "@/lib/prisma";

export default async function Transactions() {
  const session = await getSession()

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: session.user.id
    },
    include: {
      category: true
    }
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xl font-semibold">Transactions</div>
          <div className="text-muted-foreground text-sm">{transactions.length} transactions</div>
        </div>
        <AddTransactionModal />
      </div>

      <Card className="w-full p-0">
        <CardContent className="p-0">
            <TransactionsList className="rounded-none" transactions={transactions} amount={8}></TransactionsList>
        </CardContent>
      </Card>
    </div>
  )
}