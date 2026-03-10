"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROUTES } from "@/lib/constants";

export function UsdtTransferForm() {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [network, setNetwork] = useState("TRC20");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(ROUTES.TRANSFER_SUCCESS);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label htmlFor="walletAddress">Wallet Address</Label>
        <Input
          id="walletAddress"
          placeholder="Enter wallet address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Network</Label>
        <Select value={network} onValueChange={setNetwork}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TRC20">Tron (TRC20)</SelectItem>
            <SelectItem value="ERC20">Ethereum (ERC20)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="cryptoAmount">Amount (USDT)</Label>
        <Input
          id="cryptoAmount"
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
        Send USDT
      </Button>
    </form>
  );
}
