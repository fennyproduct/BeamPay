"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/lib/constants";

export function AddFundUserForm() {
  const router = useRouter();
  const [beamPayId, setBeamPayId] = useState("");
  const [amount, setAmount] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(ROUTES.TRANSFER_SUCCESS);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label htmlFor="beamPayId">BeamPay ID</Label>
        <Input
          id="beamPayId"
          placeholder="e.g. BEAM-1234"
          value={beamPayId}
          onChange={(e) => setBeamPayId(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="requestAmount">Amount (USD)</Label>
        <Input
          id="requestAmount"
          type="number"
          placeholder="0.00"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Request Fund
      </Button>
    </form>
  );
}
