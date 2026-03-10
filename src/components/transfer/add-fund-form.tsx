"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CurrencyConverter } from "./currency-converter";
import { ROUTES } from "@/lib/constants";

export function AddFundForm() {
  const router = useRouter();
  const [amount, setAmount] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(ROUTES.TRANSFER_SUCCESS);
  }

  const numAmount = parseFloat(amount) || 0;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label htmlFor="usdtAmount">Amount (USDT)</Label>
        <Input
          id="usdtAmount"
          type="number"
          placeholder="0.00"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <CurrencyConverter usdtAmount={numAmount} />
      <Button type="submit" className="w-full" disabled={numAmount <= 0}>
        Confirm Top Up
      </Button>
    </form>
  );
}
