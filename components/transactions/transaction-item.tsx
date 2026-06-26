import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import { cn, hexToRgba } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Transaction } from '@/lib/types';

interface TransactionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  transaction: Transaction;
}

export default function TransactionItem({ transaction, className, ...props }: TransactionItemProps) {
  return (
    <Button key={transaction.id} variant={"ghost"} className="h-auto w-full active:not-aria-[haspopup]:translate-y-0 border-0" asChild>
      <div className={cn("flex items-center gap-3 p-2 rounded-md", className)} {...props}>
        <div
          className="flex justify-center items-center size-9 rounded-lg"
          style={{
            backgroundColor: hexToRgba(transaction.color, 0.2),
            color: transaction.color
          }}
        >
          <DynamicIcon size={20} name={transaction.icon as IconName} />
        </div>

        <div className="flex flex-col gap-0.5">
          <div className="text-sm font-medium">
            {transaction.title}
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

        <div className="flex flex-col items-end ml-auto gap-0.5">
          <div className={cn("text-sm font-medium", transaction.type === "income" ? "text-income" : "text-expense")}>
            {transaction.type === "income" ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
          </div>
          <Badge variant={"secondary"}>
            {transaction.category}
          </Badge>
        </div>

      </div>
    </Button>
  )
}