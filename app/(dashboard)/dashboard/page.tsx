import WeeklyOverviewChart from "@/components/dashboard/weekly-overview-chart";
import TransactionsList from "@/components/transactions/transactions-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { ArrowRight, Plus, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import Link from "next/link";

const mockDashboardData = {
  month: "June",
  year: 2026,
  netBalance: 3843.5,
  totalIncome: 5850,
  totalExpenses: 2007,
  weeks: [
    {
      income: 5350,
      expenses: 1674
    },
    {
      income: 500,
      expenses: 333
    },
    {
      income: 0,
      expenses: 0
    },
    {
      income: 0,
      expenses: 0
    }
  ]
}

const mockTransactions = [
  {
    id: "1",
    title: "Salary",
    amount: 5000,
    date: "2023-06-01",
    category: "Investments",
    icon: "trending-up",
    color: "#2dd4bf",
    type: "income"
  },
  {
    id: "2",
    title: "Grocery Shopping",
    amount: 200,
    date: "2023-06-05",
    category: "Food",
    icon: "shopping-cart",
    color: "#f87171",
    type: "expense"
  }
];

export default function Dashboard() {
  const { month, year, netBalance, totalIncome, totalExpenses } = mockDashboardData;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xl font-semibold">Dashboard</div>
          <div className="text-muted-foreground text-sm">{month} {year}</div>
        </div>
        <Button>
          <Plus></Plus>
          <span>Add Transaction</span>
        </Button>
      </div>

      <div className="flex gap-4">
        <Card className="w-full">
          <CardHeader className="flex justify-between">
            <CardTitle className="text-sm text-muted-foreground">Net Balance</CardTitle>
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/15">
              <Wallet className="size-4 text-primary"></Wallet></div>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold tracking-tight">{formatCurrency(netBalance)}</p>
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
          <CardTitle>Income vs Expenses</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">Weekly breakdown for this month</CardDescription>
        </CardHeader>
        <CardContent>
          <WeeklyOverviewChart weeks={mockDashboardData.weeks}></WeeklyOverviewChart>
        </CardContent>
      </Card>

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
        <CardContent className="divide-y! divide-border!">
          <TransactionsList transactions={mockTransactions} amount={8}></TransactionsList>
        </CardContent>
      </Card>
    </div>
  )
}