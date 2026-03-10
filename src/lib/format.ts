import { CURRENCIES } from "./constants";
import { type CurrencyCode, type TransactionType } from "./types";

export function formatCurrency(amount: number, currency: CurrencyCode): string {
  const config = CURRENCIES[currency];
  if (currency === "VND") {
    return `${config.symbol}${Math.round(amount).toLocaleString("vi-VN")}`;
  }
  if (currency === "IDR") {
    return `${config.symbol}${Math.round(amount).toLocaleString("id-ID")}`;
  }
  if (currency === "USDT") {
    return `${amount.toFixed(2)} USDT`;
  }
  return `${config.symbol}${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTime(date: string): string {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDateShort(date: string): string {
  const d = new Date(date);
  const month = d.toLocaleDateString("en-US", { month: "short" });
  const day = d.getDate();
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  return `${month} ${day}, ${hours}:${minutes}`;
}

export function formatRelativeTime(date: string): string {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(date);
}

const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  add_fund_stablecoin: "Stablecoin Top Up",
  add_fund_user: "BeamPay Transfer",
  transfer_qr: "QR Payment",
  transfer_bank_vn: "Bank Transfer (VN)",
  transfer_bank_id: "Bank Transfer (ID)",
  transfer_bank_ph: "Bank Transfer (PH)",
  transfer_crypto: "Crypto Transfer",
};

export function getTransactionTypeLabel(type: TransactionType): string {
  return TRANSACTION_TYPE_LABELS[type];
}
