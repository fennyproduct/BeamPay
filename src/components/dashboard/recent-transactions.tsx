"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { mockTransactions, mockExchangeRates } from "@/lib/mock-data";
import { formatCurrency, formatRelativeTime } from "@/lib/format";
import { ROUTES } from "@/lib/constants";
import { t } from "@/lib/tokens";

const AVATAR_COLORS = ["#ec4899", "#3b82f6", "#eab308", "#a855f7", "#14b8a6"];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getDisplayName(txn: (typeof mockTransactions)[0]): string {
  if (txn.recipientName) return txn.recipientName;
  if (txn.senderName) return txn.senderName;
  return txn.description;
}

function getUsdAmount(txn: (typeof mockTransactions)[0]): number {
  if (txn.currency === "USD") return txn.amount;
  if (txn.currency === "USDT") return txn.amount;
  if (txn.currency === "VND") return txn.amount / mockExchangeRates.USD_VND;
  return txn.amount;
}

function getVndAmount(txn: (typeof mockTransactions)[0]): number {
  if (txn.currency === "VND") return txn.amount;
  if (txn.currency === "USD") return txn.amount * mockExchangeRates.USD_VND;
  if (txn.currency === "USDT") return txn.amount * mockExchangeRates.USDT_VND;
  return txn.amount;
}

export function RecentTransactions() {
  const recent = mockTransactions.slice(0, 5);

  return (
    <div className="px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-base font-semibold ${t.textPrimary}`}>Activities</h3>
        <Link
          href={ROUTES.TRANSACTIONS}
          className="text-sm font-medium text-neon-600 hover:underline"
        >
          View all
        </Link>
      </div>

      {/* List */}
      <div className="flex flex-col">
        {recent.map((txn, i) => {
          const displayName = getDisplayName(txn);
          const isPersonTxn =
            txn.type === "add_fund_user" ||
            txn.type === "transfer_bank_vn" ||
            txn.type === "transfer_bank_id" ||
            txn.type === "transfer_bank_ph" ||
            txn.type === "transfer_qr";
          const usd = getUsdAmount(txn);
          const vnd = getVndAmount(txn);
          const sign = txn.direction === "incoming" ? "+" : "-";

          return (
            <div key={txn.id}>
              <div className="flex items-center gap-3 py-3">
                {/* Avatar */}
                {isPersonTxn ? (
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: getAvatarColor(displayName) }}
                  >
                    <span className="text-sm font-semibold text-white">
                      {getInitials(displayName)}
                    </span>
                  </div>
                ) : (
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${t.surface}`}>
                    <Download className={`h-4 w-4 ${t.textPrimary}`} />
                  </div>
                )}

                {/* Description + date */}
                <div className="flex-1 min-w-0">
                  <p className={`text-base font-medium ${t.textPrimary} truncate`}>
                    {txn.description}
                  </p>
                  <p className={`text-sm ${t.textSecondary}`}>
                    {formatRelativeTime(txn.timestamp)}
                  </p>
                </div>

                {/* Amounts */}
                <div className="flex flex-col items-end">
                  <p className={`text-base font-medium ${t.textPrimary} tabular-nums`}>
                    {sign}{formatCurrency(usd, "USD")}
                  </p>
                  <p className={`text-sm ${t.textSecondary} tabular-nums`}>
                    {formatCurrency(vnd, "VND")}
                  </p>
                </div>
              </div>
              {i < recent.length - 1 && (
                <div className={`border-b ${t.border}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
