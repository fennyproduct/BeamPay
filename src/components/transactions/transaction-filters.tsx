"use client";

import { cn } from "@/lib/utils";
import { type TransactionFilter } from "@/hooks/use-transactions";

const filters: { value: TransactionFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "incoming", label: "Incoming" },
  { value: "outgoing", label: "Outgoing" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "failed", label: "Failed" },
];

interface TransactionFiltersProps {
  active: TransactionFilter;
  onChange: (filter: TransactionFilter) => void;
}

export function TransactionFilters({ active, onChange }: TransactionFiltersProps) {
  return (
    <div className="flex gap-2 px-4 overflow-x-auto scrollbar-hide">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={cn(
            "shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors border",
            active === f.value
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-secondary/30 text-muted-foreground border-border/50 hover:bg-secondary/50"
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
