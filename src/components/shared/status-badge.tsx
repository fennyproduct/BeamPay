import { Badge } from "@/components/ui/badge";
import { type TransactionStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const statusConfig: Record<
  TransactionStatus,
  { label: string; className: string }
> = {
  completed: {
    label: "Completed",
    className: "bg-primary/20 text-primary border-primary/30",
  },
  pending: {
    label: "Pending",
    className: "bg-secondary/50 text-secondary-foreground border-secondary",
  },
  failed: {
    label: "Failed",
    className: "bg-destructive/20 text-destructive-foreground border-destructive/30",
  },
};

interface StatusBadgeProps {
  status: TransactionStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0", config.className, className)}>
      {config.label}
    </Badge>
  );
}
