"use client";

import { mockExchangeRates } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";

interface CurrencyConverterProps {
  usdtAmount: number;
}

export function CurrencyConverter({ usdtAmount }: CurrencyConverterProps) {
  const usdAmount = usdtAmount * mockExchangeRates.USDT_USD;
  const vndAmount = usdtAmount * mockExchangeRates.USDT_VND;

  if (usdtAmount <= 0) return null;

  return (
    <div className="rounded-lg bg-secondary/30 border border-border/30 p-3 space-y-1">
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
        Conversion Preview
      </p>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">USDT</span>
        <span className="tabular-nums">{usdtAmount.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">USD</span>
        <span className="tabular-nums">{formatCurrency(usdAmount, "USD")}</span>
      </div>
      <div className="flex items-center justify-between text-sm font-medium text-primary">
        <span>VND</span>
        <span className="tabular-nums">{formatCurrency(vndAmount, "VND")}</span>
      </div>
    </div>
  );
}
