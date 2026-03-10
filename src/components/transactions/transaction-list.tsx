import { TransactionItem } from "./transaction-item";
import { type Transaction } from "@/lib/types";

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No transactions found
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {transactions.map((txn, i) => (
        <TransactionItem
          key={txn.id}
          transaction={txn}
          showBorder={i < transactions.length - 1}
        />
      ))}
    </div>
  );
}
