"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CountryBankSelector } from "./country-bank-selector";
import { ROUTES } from "@/lib/constants";
import { type CountryCode } from "@/lib/types";

interface BankTransferFormProps {
  initialCountry?: CountryCode;
}

export function BankTransferForm({ initialCountry = "VN" }: BankTransferFormProps) {
  const router = useRouter();
  const [country, setCountry] = useState<CountryCode>(initialCountry);
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [amount, setAmount] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(ROUTES.TRANSFER_SUCCESS);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <CountryBankSelector
        country={country}
        bank={bank}
        onCountryChange={(c) => {
          setCountry(c);
          setBank("");
        }}
        onBankChange={setBank}
      />
      <div className="space-y-2">
        <Label htmlFor="accountNumber">Account Number</Label>
        <Input
          id="accountNumber"
          placeholder="Enter account number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="accountHolder">Account Holder Name</Label>
        <Input
          id="accountHolder"
          placeholder="Enter account holder name"
          value={accountHolder}
          onChange={(e) => setAccountHolder(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bankAmount">Amount (USD)</Label>
        <Input
          id="bankAmount"
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
        Send Transfer
      </Button>
    </form>
  );
}
