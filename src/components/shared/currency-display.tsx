import { formatCurrency } from "@/lib/format";
import { type CurrencyCode } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CurrencyDisplayProps {
  amount: number;
  currency: CurrencyCode;
  className?: string;
  size?: "sm" | "md" | "lg";
  showSign?: boolean;
  direction?: "incoming" | "outgoing";
}

export function CurrencyDisplay({
  amount,
  currency,
  className,
  size = "md",
  showSign,
  direction,
}: CurrencyDisplayProps) {
  const formatted = formatCurrency(amount, currency);
  const sign = showSign && direction ? (direction === "incoming" ? "+" : "-") : "";

  return (
    <span
      className={cn(
        "font-semibold tabular-nums",
        size === "sm" && "text-sm",
        size === "md" && "text-base",
        size === "lg" && "text-2xl",
        showSign && direction === "incoming" && "text-primary",
        className
      )}
    >
      {sign}
      {formatted}
    </span>
  );
}
