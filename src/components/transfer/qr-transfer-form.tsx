"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/lib/constants";

export function QrTransferForm() {
  const router = useRouter();
  const [amount, setAmount] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(ROUTES.TRANSFER_SUCCESS);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label htmlFor="qrAmount">Amount (VND)</Label>
        <Input
          id="qrAmount"
          type="number"
          placeholder="0"
          min="0"
          step="1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Generate QR to Pay
      </Button>
      <Button
        type="button"
        variant="secondary"
        className="w-full"
        onClick={() => router.push(ROUTES.QR)}
      >
        Scan QR Code Instead
      </Button>
    </form>
  );
}
