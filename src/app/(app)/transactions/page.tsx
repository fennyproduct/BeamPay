"use client";

import { mockTransactions } from "@/lib/mock-data";
import { TransactionList } from "@/components/transactions/transaction-list";
import { t } from "@/lib/tokens";

export default function TransactionsPage() {
  return (
    <div className={`flex flex-col min-h-screen ${t.bg}`}>
      <div className="flex items-center px-5 py-4 h-[76px]">
        <h1 className={`text-[23px] font-semibold ${t.textPrimary}`}>
          Activities
        </h1>
      </div>
      <div className="px-5 py-4">
        <TransactionList transactions={mockTransactions} />
      </div>
      <div className="h-[134px]" />
    </div>
  );
}
