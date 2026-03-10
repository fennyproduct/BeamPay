"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { COUNTRIES } from "@/lib/constants";
import { mockBanks } from "@/lib/mock-data";
import { type CountryCode } from "@/lib/types";

interface CountryBankSelectorProps {
  country: CountryCode;
  bank: string;
  onCountryChange: (country: CountryCode) => void;
  onBankChange: (bankId: string) => void;
}

export function CountryBankSelector({
  country,
  bank,
  onCountryChange,
  onBankChange,
}: CountryBankSelectorProps) {
  const banks = mockBanks.filter((b) => b.country === country);

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label>Country</Label>
        <Select value={country} onValueChange={(v) => onCountryChange(v as CountryCode)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(COUNTRIES).map(([code, info]) => (
              <SelectItem key={code} value={code}>
                {info.flag} {info.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Bank</Label>
        <Select value={bank} onValueChange={onBankChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a bank" />
          </SelectTrigger>
          <SelectContent>
            {banks.map((b) => (
              <SelectItem key={b.id} value={b.id}>
                {b.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
