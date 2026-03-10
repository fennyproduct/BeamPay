export type CurrencyCode = "USD" | "VND" | "USDT" | "IDR";

export type CountryCode = "VN" | "ID" | "PH";

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  country: CountryCode;
  beamPayId: string;
  createdAt: string;
}

export interface WalletBalance {
  currency: CurrencyCode;
  amount: number;
}

export interface Wallet {
  balances: WalletBalance[];
  primaryCurrency: CurrencyCode;
}

export type TransactionType =
  | "add_fund_stablecoin"
  | "add_fund_user"
  | "transfer_qr"
  | "transfer_bank_vn"
  | "transfer_bank_id"
  | "transfer_bank_ph"
  | "transfer_crypto";

export type TransactionStatus = "pending" | "completed" | "failed";

export type TransactionDirection = "incoming" | "outgoing";

export interface Transaction {
  id: string;
  type: TransactionType;
  direction: TransactionDirection;
  status: TransactionStatus;
  amount: number;
  currency: CurrencyCode;
  convertedAmount?: number;
  convertedCurrency?: CurrencyCode;
  description: string;
  recipientName?: string;
  recipientBank?: string;
  recipientAccount?: string;
  senderName?: string;
  timestamp: string;
  reference: string;
}

export interface ExchangeRates {
  USDT_USD: number;
  USD_VND: number;
  USDT_VND: number;
  USD_IDR: number;
}

export interface Bank {
  id: string;
  name: string;
  code: string;
  country: CountryCode;
}

export interface TransferFormData {
  method: string;
  amount: number;
  currency: CurrencyCode;
  recipientName?: string;
  recipientAccount?: string;
  bankId?: string;
  walletAddress?: string;
  network?: "TRC20" | "ERC20";
  note?: string;
}

export interface UserPreferences {
  primaryCurrency: CurrencyCode;
  theme: "light" | "dark";
  language: "en" | "vi";
}
