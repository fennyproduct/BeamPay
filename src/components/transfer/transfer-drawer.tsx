"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, SquareUserRound, QrCode, Send, ChevronLeft, Copy, ArrowDownLeft, Search, ChevronDown } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { ROUTES, COUNTRIES } from "@/lib/constants";
import { mockBanks } from "@/lib/mock-data";
import type { CountryCode } from "@/lib/types";

type DrawerView = "options" | "bank-transfer" | "send-by-address" | "select-bank";

const PURPOSE_OPTIONS = [
  "Family support",
  "Business payment",
  "Education",
  "Salary",
  "Other",
];

interface TransferDrawerProps {
  children: React.ReactNode;
}

export function TransferDrawer({ children }: TransferDrawerProps) {
  const router = useRouter();
  const [view, setView] = useState<DrawerView>("options");
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>("ID");

  // Bank transfer form state
  const [recipientName, setRecipientName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bank, setBank] = useState("");
  const [purpose, setPurpose] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  // Bank search state
  const [bankSearch, setBankSearch] = useState("");

  // Send by address state
  const [solanaAddress, setSolanaAddress] = useState("");

  function handleOpenChange(open: boolean) {
    if (!open) {
      setTimeout(() => {
        setView("options");
        resetForm();
      }, 300);
    }
  }

  function resetForm() {
    setRecipientName("");
    setAccountNumber("");
    setBank("");
    setPurpose("");
    setBankSearch("");
    setSolanaAddress("");
    setShowErrors(false);
  }

  function handleBankTransfer(country: CountryCode) {
    setSelectedCountry(country);
    resetForm();
    setView("bank-transfer");
  }

  function handleBankContinue() {
    if (!recipientName || !accountNumber || !bank || !purpose) {
      setShowErrors(true);
      return;
    }
    const selectedBank = banks.find((b) => b.id === bank);
    router.push(
      `${ROUTES.TRANSFER_CONFIRM}?name=${encodeURIComponent(recipientName)}&account=${encodeURIComponent(accountNumber)}&bank=${encodeURIComponent(selectedBank?.name ?? bank)}&country=${selectedCountry}`
    );
  }

  const countryLabel = selectedCountry === "VN" ? "Vietnamese" : "Indonesian";
  const banks = mockBanks.filter((b) => b.country === selectedCountry);

  return (
    <Drawer onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        {view === "options" ? (
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center justify-end">
                <DrawerClose className="rounded-sm opacity-70 hover:opacity-100 transition-opacity">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </DrawerClose>
              </div>
              <DialogTitle className="text-lg font-bold">Transfer Money</DialogTitle>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-2">
              <DrawerClose asChild>
                <button
                  onClick={() => router.push(ROUTES.QR)}
                  className="flex items-start gap-3 w-full text-left"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                    <SquareUserRound className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 border-b border-border/50 pb-3">
                    <p className="text-base font-medium">To BeamPay User</p>
                    <p className="text-sm text-muted-foreground">Scan their QR code to send instantly</p>
                  </div>
                </button>
              </DrawerClose>

              <DrawerClose asChild>
                <button
                  onClick={() => router.push(ROUTES.QR)}
                  className="flex items-start gap-3 w-full text-left"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                    <QrCode className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 border-b border-border/50 pb-3">
                    <p className="text-base font-medium">Scan QR Code</p>
                    <p className="text-sm text-muted-foreground">Pay by QR</p>
                  </div>
                </button>
              </DrawerClose>

              <button
                onClick={() => { resetForm(); setView("send-by-address"); }}
                className="flex items-start gap-3 w-full text-left"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Send className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 border-b border-border/50 pb-3">
                  <p className="text-base font-medium">Send by Address</p>
                  <p className="text-sm text-muted-foreground">Transfer to any Solana address</p>
                </div>
              </button>

              {(["VN", "ID"] as const).map((country) => {
                const info = COUNTRIES[country];
                const titles: Record<string, string> = {
                  VN: "Vietnamese Bank Transfer",
                  ID: "Indonesian Bank Transfer",
                };
                const descs: Record<string, string> = {
                  VN: "Send to any Vietnamese bank",
                  ID: "Send to any Indonesian bank/e-wallet",
                };
                return (
                  <button
                    key={country}
                    onClick={() => handleBankTransfer(country)}
                    className="flex items-start gap-3 w-full text-left"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-lg">
                      {info.flag}
                    </div>
                    <div className="flex-1 border-b border-border/50 pb-3">
                      <p className="text-base font-medium">{titles[country]}</p>
                      <p className="text-sm text-muted-foreground">{descs[country]}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : view === "bank-transfer" ? (
          <div className="flex flex-col gap-5">
            {/* Header with back + close */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center justify-end">
                <DrawerClose className="rounded-sm opacity-70 hover:opacity-100 transition-opacity">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </DrawerClose>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView("options")}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h2 className="text-lg font-bold">
                  {countryLabel} Bank Transfer
                </h2>
              </div>
            </div>

            {/* Form fields */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium">Recipient full name</Label>
                <Input
                  placeholder="Enter recipient's name"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="rounded-xl h-12"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium">Account number</Label>
                <Input
                  placeholder="Enter account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="rounded-xl h-12"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium">Bank name</Label>
                <button
                  type="button"
                  onClick={() => { setBankSearch(""); setView("select-bank"); }}
                  className="flex items-center justify-between rounded-xl h-12 border border-input bg-transparent px-3 text-sm hover:border-neon-900 dark:hover:border-white focus:outline-none focus:ring-1 focus:ring-neon-900 focus:border-neon-900 dark:focus:ring-white dark:focus:border-white transition-colors"
                >
                  <span className={bank ? "text-foreground" : "text-muted-foreground"}>
                    {bank ? banks.find((b) => b.id === bank)?.name : "Select bank"}
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium">Purpose</Label>
                <Select value={purpose} onValueChange={setPurpose}>
                  <SelectTrigger className={`rounded-xl h-12 ${showErrors && !purpose ? "border-red-400" : ""}`}>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    {PURPOSE_OPTIONS.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {showErrors && !purpose && (
                  <div className="rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 px-3 py-2.5">
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">Purpose is required</p>
                    <p className="text-sm text-red-400 dark:text-red-500">
                      Contact support if you need help.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Continue button */}
            <Button
              onClick={handleBankContinue}
              disabled={!recipientName || !accountNumber || !bank}
              className="w-full rounded-full h-12 text-base font-semibold"
            >
              Continue
            </Button>
          </div>
        ) : view === "select-bank" ? (
          <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-bold">Select Bank Name</DialogTitle>
              <button
                onClick={() => setView("bank-transfer")}
                className="rounded-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={bankSearch}
                onChange={(e) => setBankSearch(e.target.value)}
                className="rounded-xl h-12 pl-9"
              />
            </div>

            {/* Bank list */}
            <div className="flex flex-col max-h-[40vh] overflow-y-auto">
              {banks
                .filter((b) =>
                  b.name.toLowerCase().includes(bankSearch.toLowerCase())
                )
                .map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setBank(b.id);
                      setView("bank-transfer");
                    }}
                    className="flex items-center w-full text-left py-3.5 border-b border-border/50 text-sm font-medium"
                  >
                    {b.name}
                  </button>
                ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Header with back button */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center justify-end">
                <DrawerClose className="rounded-sm opacity-70 hover:opacity-100 transition-opacity">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </DrawerClose>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView("options")}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h2 className="text-lg font-bold">Send by Address</h2>
              </div>
            </div>

            {/* Address input with paste button */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium">Recipient address</Label>
              <div className="flex gap-1">
                <Input
                  className="flex-1 rounded-xl h-12"
                  placeholder="Enter solana address"
                  value={solanaAddress}
                  onChange={(e) => setSolanaAddress(e.target.value)}
                />
                <button
                  onClick={async () => {
                    const text = await navigator.clipboard.readText();
                    setSolanaAddress(text);
                  }}
                  className="flex shrink-0 items-center gap-1.5 rounded-xl bg-muted px-4 text-sm font-medium text-muted-foreground hover:bg-muted/80 transition-colors"
                >
                  <Copy className="h-[18px] w-[18px]" />
                  Paste
                </button>
              </div>
            </div>

            {/* Continue button */}
            <DrawerClose asChild>
              <Button
                onClick={() => router.push(ROUTES.TRANSFER_CONFIRM)}
                className="w-full rounded-full h-12 text-base font-semibold"
              >
                Continue
              </Button>
            </DrawerClose>

            {/* Recent Addresses */}
            <div className="flex flex-col gap-4">
              <p className="text-base font-semibold">Recent Addresses</p>
              <button
                onClick={() => setSolanaAddress("hvHaiibinKH8x9oWPYFnR4d3qKJmSxE7YYnakle")}
                className="flex items-start gap-3 w-full text-left"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                  <ArrowDownLeft className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 border-b border-border/50 pb-3">
                  <p className="text-base font-medium">hvHaiibinKH...YYnakle</p>
                  <p className="text-sm text-muted-foreground">2h ago</p>
                </div>
              </button>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
