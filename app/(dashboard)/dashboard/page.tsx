import Summary from "@/components/dashboard/summary";
import AddTransactionButton from "@/components/transactions/buttons/add-transaction-button";
import TransactionsList from "@/components/transactions/transactions-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MONTHS } from "@/lib/const";
import getSession from "@/lib/auth/get-session";
import { getSummary } from "@/lib/data/summary";
import { getTransactions } from "@/lib/data/transactions";
import { ArrowRight, ReceiptText } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SWRConfig } from "swr";

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ month: string, year: string, isAllTimePeriod?: string }> }) {
  const session = await getSession()
  if (!session?.user.id) redirect("/sign-in")

  const params = await searchParams

  const summaryMonth = params.month ? Number(params.month) : new Date().getMonth() + 1;
  const summaryYear = params.year ? Number(params.year) : new Date().getFullYear();
  const isAllTimePeriod = params.isAllTimePeriod === "true"

  const summary = await getSummary({ userId: session.user.id, month: summaryMonth, year: summaryYear, isAllTimePeriod });

  const transactions = await getTransactions({ userId: session.user.id, take: 8 })
  const summaryKey = `/api/dashboard/summary?month=${summaryMonth}&year=${summaryYear}&isAllTimePeriod=${isAllTimePeriod}`

  return (
    <SWRConfig value={{ fallback: { [summaryKey]: summary } }}>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xl font-semibold">Dashboard</div>
            <div className="text-muted-foreground text-sm">{MONTHS[summaryMonth - 1]} {summaryYear}</div>
          </div>
          <AddTransactionButton />
        </div>

        <Summary month={summaryMonth} year={summaryYear} isAllTimePeriod={isAllTimePeriod} />

        <Card className="w-full">
          <CardHeader className="flex justify-between items-center">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">Your latest activity</CardDescription>
            </div>

            <Button variant="ghost" size="sm" asChild>
              <Link href="/transactions" >
                View all
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </CardHeader>

          <CardContent>
            {
              transactions.length > 0 ? (
                <TransactionsList transactions={transactions} amount={8} />
              ) : (
                <div className="flex flex-col gap-3 items-center justify-center p-8">
                  <div className="rounded-full bg-muted p-3 text-muted-foreground">
                    <ReceiptText />
                  </div>
                  <div className="font-medium">No transactions</div>
                  <div className="text-xs text-muted-foreground">No activity found for the selected period.</div>
                </div>
              )
            }
          </CardContent>
        </Card>
      </div>
    </SWRConfig>
  )
}