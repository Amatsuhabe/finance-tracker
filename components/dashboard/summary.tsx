'use client'

import CashFlowChart from "@/components/dashboard/cash-flow-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, fetcher, formatCurrency } from "@/lib/utils";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

interface SummaryProps {
  month: number,
  year: number,
  isAllTimePeriod: boolean,
  netBalance: number,
  totalIncome: number,
  totalExpenses: number,
  monthSummary: {
    date: Date;
    totalDayIncome: number;
    totalDayExpenses: number;
  }[]
}

export default function Summary(summary: SummaryProps) {
  const searchParams = useSearchParams()

  const month = searchParams.get("month") ?? summary.month.toString()
  const year = searchParams.get("year") ?? summary.year.toString()
  const isAllTimePeriod = searchParams.get("isAllTimePeriod") ?? summary.isAllTimePeriod

  const { data } = useSWR(`/api/dashboard/summary?month=${month}&year=${year}&isAllTimePeriod=${isAllTimePeriod}`, fetcher, {
    fallbackData: summary,
  })

  const { netBalance, totalIncome, totalExpenses, monthSummary } = data

  return (
    <>
      <div className="flex gap-4">
        <Card className="w-full">
          <CardHeader className="flex justify-between">
            <CardTitle className="text-sm text-muted-foreground">Net Balance</CardTitle>
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/15">
              <Wallet className="size-4 text-primary"></Wallet></div>
          </CardHeader>

          <CardContent>
            <p className={cn("text-2xl font-bold tracking-tight", netBalance < 0 ? "text-expense" : netBalance > 0 ? "text-income" : null)}>{formatCurrency(netBalance)}</p>
            <p className="mt-1 text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Income</CardTitle>
            <div className="flex size-8 items-center justify-center rounded-lg bg-income/15">
              <TrendingUp className="size-4 text-income" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tracking-tight text-income">
              {formatCurrency(totalIncome)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
            <div className="flex size-8 items-center justify-center rounded-lg bg-expense/15">
              <TrendingDown className="size-4 text-expense" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tracking-tight text-expense">
              {formatCurrency(totalExpenses)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Cash Flow</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">Day-by-day breakdown for this month</CardDescription>
        </CardHeader>
        <CardContent>
          <CashFlowChart summary={monthSummary}></CashFlowChart>
        </CardContent>
      </Card>
    </>
  )
}