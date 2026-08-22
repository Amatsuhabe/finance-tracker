import { Transaction } from "@/lib/types";
import { cn, hexToRgba } from "@/lib/utils";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { Badge } from "../ui/badge";

interface TransactionItemContentProps extends React.HTMLAttributes<HTMLDivElement> {
  transaction: Transaction;
}

export default function TransactionItemContent({ transaction, className, ...props }: TransactionItemContentProps) {
  return (
    <div className={cn("flex items-center gap-3 w-full", className)} {...props}>
      <div
        className="flex justify-center items-center size-9 rounded-lg"
        style={{
          backgroundColor: hexToRgba(transaction.category.color, 0.2),
          color: transaction.category.color
        }}
      >
        <DynamicIcon size={20} name={transaction.category.icon as IconName} />
      </div>

      <div className="flex flex-col gap-0.5">
        <div className="text-sm font-medium">
          {transaction.description || transaction.category.name}
        </div>

        <div className="text-muted-foreground text-xs">
          {
            new Date(transaction.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })
          }
        </div>
      </div>

      <div className="flex items-center ml-auto">
        <Badge variant={"secondary"}>
          {transaction.category.name}
        </Badge>

        <div className={cn("text-sm font-medium min-w-24 text-right", transaction.type === "income" ? "text-income" : "text-expense")}>
          {`${transaction.type === "income" ? "+" : "-"}$${Math.abs(transaction.amount).toFixed(2)}`}
        </div>

      </div>
    </div>
  )
}