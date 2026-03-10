import { type CurrencyCode, type CountryCode } from "./types";

export const ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  DASHBOARD: "/dashboard",
  TRANSACTIONS: "/transactions",
  TRANSFER: "/transfer",
  TRANSFER_ADD_FUND: "/transfer/add-fund",
  TRANSFER_SEND: "/transfer/send",
  TRANSFER_CONFIRM: "/transfer/confirm",
  TRANSFER_SUCCESS: "/transfer/success",
  QR: "/qr",
  RECEIVE: "/receive",
  SETTINGS: "/settings",
} as const;

export const CURRENCIES: Record<
  CurrencyCode,
  { symbol: string; name: string; locale: string }
> = {
  USD: { symbol: "$", name: "US Dollar", locale: "en-US" },
  VND: { symbol: "₫", name: "Vietnamese Dong", locale: "vi-VN" },
  USDT: { symbol: "₮", name: "Tether", locale: "en-US" },
  IDR: { symbol: "Rp", name: "Indonesian Rupiah", locale: "id-ID" },
};

export const COUNTRIES: Record<
  CountryCode,
  { name: string; flag: string; code: CountryCode }
> = {
  VN: { name: "Vietnam", flag: "🇻🇳", code: "VN" },
  ID: { name: "Indonesia", flag: "🇮🇩", code: "ID" },
  PH: { name: "Philippines", flag: "🇵🇭", code: "PH" },
};
