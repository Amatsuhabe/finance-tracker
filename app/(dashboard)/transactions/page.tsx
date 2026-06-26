import TransactionsList from "@/components/transactions/transactions-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent,  } from "@/components/ui/card";
import { Plus, } from "lucide-react";

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


const categories = [
  {
    name: "Food & Dining",
    icon: "utensils-crossed",
    color: "#f59e0b"
  }
]

export default function Transactions() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xl font-semibold">Transactions</div>
          <div className="text-muted-foreground text-sm">{mockTransactions.length} transactions</div>
        </div>
        <Button>
          <Plus></Plus>
          <span>Add Transaction</span>
        </Button>
      </div>

      <Card className="w-full p-0">
        <CardContent className="p-0">
          <div className="divide-y! divide-border!">
            <TransactionsList className="rounded-none" transactions={mockTransactions} amount={8}></TransactionsList>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}