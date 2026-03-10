import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { formatCurrency, formatDateShort } from "@/lib/format";
import { mockExchangeRates } from "@/lib/mock-data";
import { type Transaction } from "@/lib/types";
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

function getDisplayName(txn: Transaction): string {
  if (txn.recipientName && !txn.recipientName.startsWith("0x")) return txn.recipientName;
  if (txn.senderName) return txn.senderName;
  return txn.description;
}

function getUsdAmount(txn: Transaction): number {
  if (txn.currency === "USD") return txn.amount;
  if (txn.currency === "USDT") return txn.amount;
  if (txn.currency === "VND") return txn.amount / mockExchangeRates.USD_VND;
  return txn.amount;
}

function getVndAmount(txn: Transaction): number {
  if (txn.currency === "VND") return txn.amount;
  if (txn.currency === "USD") return txn.amount * mockExchangeRates.USD_VND;
  if (txn.currency === "USDT") return txn.amount * mockExchangeRates.USDT_VND;
  return txn.amount;
}

function isPersonTransaction(txn: Transaction): boolean {
  if (txn.type === "add_fund_stablecoin" || txn.type === "transfer_crypto") return false;
  if (txn.recipientName?.startsWith("0x")) return false;
  return !!(txn.recipientName || txn.senderName);
}

interface TransactionItemProps {
  transaction: Transaction;
  showBorder?: boolean;
}

export function TransactionItem({ transaction: txn, showBorder = true }: TransactionItemProps) {
  const displayName = getDisplayName(txn);
  const isPerson = isPersonTransaction(txn);
  const usd = getUsdAmount(txn);
  const vnd = getVndAmount(txn);
  const sign = txn.direction === "incoming" ? "+" : "-";

  return (
    <div className="flex gap-3 items-start">
      {/* Avatar */}
      {isPerson ? (
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: getAvatarColor(displayName) }}
        >
          <span className="text-base font-medium text-white">
            {getInitials(displayName)}
          </span>
        </div>
      ) : (
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${t.surface}`}>
          {txn.direction === "incoming" ? (
            <ArrowDownLeft className={`h-5 w-5 ${t.textPrimary}`} />
          ) : (
            <ArrowUpRight className={`h-5 w-5 ${t.textPrimary}`} />
          )}
        </div>
      )}

      {/* Content row */}
      <div className={`flex flex-1 gap-1 items-center pb-3 ${showBorder ? `border-b ${t.border}` : ""}`}>
        {/* Left — name + date */}
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <p className={`text-base font-medium ${t.textPrimary} truncate`}>
            {displayName}
          </p>
          <p className={`text-sm ${t.textSecondary}`}>
            {formatDateShort(txn.timestamp)}
          </p>
        </div>

        {/* Right — amounts */}
        <div className="flex flex-col gap-1 items-end text-right">
          <p className={`text-base font-medium ${t.textPrimary} tabular-nums whitespace-nowrap`}>
            {sign}{formatCurrency(usd, "USD")}
          </p>
          <p className={`text-sm ${t.textSecondary} tabular-nums whitespace-nowrap`}>
            {sign}{formatCurrency(vnd, "VND")}
          </p>
        </div>
      </div>
    </div>
  );
}
