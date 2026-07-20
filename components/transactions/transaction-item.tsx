import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Transaction } from '@/lib/types';
import { Pencil } from 'lucide-react';
import DeleteTransactionModal from './delete-transaction-modal';
import TransactionItemContent from './transaction-item-content';

interface TransactionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  transaction: Transaction;
}

export default function TransactionItem({ transaction, className, ...props }: TransactionItemProps) {
  return (
    <Button variant={"ghost"} className="h-auto w-full active:not-aria-[haspopup]:translate-y-0 border-0 hover:bg-muted/40" asChild>
      <div className={cn("flex items-center gap-3 px-4 py-3 rounded-none group", className)} {...props}>
        <TransactionItemContent transaction={transaction} />

        <div>
          <div className='opacity-0 group-hover:opacity-100 duration-200'>
            <Button variant="ghost" size="icon" className='text-muted-foreground hover:text-foreground duration-200' >
              <Pencil />
            </Button>

            <DeleteTransactionModal transaction={transaction} />
          </div>
        </div>

      </div>
    </Button>
  )
}