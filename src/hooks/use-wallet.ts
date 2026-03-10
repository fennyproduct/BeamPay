"use client";

import { useState, useCallback } from "react";
import { mockWallet } from "@/lib/mock-data";
import { type CurrencyCode } from "@/lib/types";

export function useWallet() {
  const [balanceVisible, setBalanceVisible] = useState(true);

  const toggleBalanceVisibility = useCallback(() => {
    setBalanceVisible((prev) => !prev);
  }, []);

  const getBalance = useCallback(
    (currency: CurrencyCode) => {
      const balance = mockWallet.balances.find((b) => b.currency === currency);
      return balance?.amount ?? 0;
    },
    []
  );

  return {
    wallet: mockWallet,
    balanceVisible,
    toggleBalanceVisibility,
    getBalance,
  };
}
