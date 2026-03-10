"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PreferencesSection() {
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("en");

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label>Primary Currency</Label>
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD - US Dollar</SelectItem>
            <SelectItem value="VND">VND - Vietnamese Dong</SelectItem>
            <SelectItem value="USDT">USDT - Tether</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Language</Label>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="vi">Tieng Viet</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
