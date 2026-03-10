"use client";

import { useState, useMemo } from "react";
import { mockTransactions } from "@/lib/mock-data";
import { type TransactionDirection, type TransactionStatus } from "@/lib/types";

export type TransactionFilter = "all" | TransactionDirection | TransactionStatus;

export function useTransactions() {
  const [filter, setFilter] = useState<TransactionFilter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return mockTransactions;
    if (filter === "incoming" || filter === "outgoing") {
      return mockTransactions.filter((t) => t.direction === filter);
    }
    return mockTransactions.filter((t) => t.status === filter);
  }, [filter]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof mockTransactions> = {};
    for (const txn of filtered) {
      const date = new Date(txn.timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      if (!groups[date]) groups[date] = [];
      groups[date].push(txn);
    }
    return groups;
  }, [filtered]);

  return { filter, setFilter, filtered, grouped };
}
