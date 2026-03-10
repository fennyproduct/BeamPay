import { mockExchangeRates } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";

export function CurrencyRates() {
  return (
    <div className="mx-4 flex items-center gap-2 rounded-lg bg-secondary/30 border border-border/30 px-3 py-2">
      <span className="text-[10px] font-medium text-muted-foreground">Rates</span>
      <div className="flex items-center gap-1 text-xs">
        <span className="tabular-nums">1 USDT</span>
        <ArrowRight className="h-3 w-3 text-muted-foreground" />
        <span className="tabular-nums">${mockExchangeRates.USDT_USD.toFixed(2)}</span>
        <ArrowRight className="h-3 w-3 text-muted-foreground" />
        <span className="tabular-nums text-primary">
          {mockExchangeRates.USD_VND.toLocaleString()}₫
        </span>
      </div>
    </div>
  );
}
