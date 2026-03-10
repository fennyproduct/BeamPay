"use client";

import { useState } from "react";
import { X, Coins, QrCode, Copy, Check, CircleDollarSign } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { mockUser } from "@/lib/mock-data";

type DrawerView = "options" | "stablecoin" | "user";

const WALLET_ADDRESS = "0x90f9e5f178423d63511004687b43e82be311ac5d";
const CHAIN = "Solana (SOL)";

interface AddFundsDrawerProps {
  children: React.ReactNode;
}

export function AddFundsDrawer({ children }: AddFundsDrawerProps) {
  const [view, setView] = useState<DrawerView>("options");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  function handleCopy(text: string, field: string) {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      setTimeout(() => setView("options"), 300);
    }
  }

  const beamPayQrData = JSON.stringify({
    beamPayId: mockUser.beamPayId,
  });

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
              <h2 className="text-lg font-bold">Add Funds</h2>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setView("stablecoin")}
                className="flex items-start gap-3 w-full text-left"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Coins className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 border-b border-border/50 pb-3">
                  <p className="text-base font-medium">Stablecoins (USDT/USDC)</p>
                  <p className="text-sm text-muted-foreground">
                    Top up with stablecoins on Solana/SOL
                  </p>
                </div>
              </button>

              <button
                onClick={() => setView("user")}
                className="flex items-start gap-3 w-full text-left"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                  <QrCode className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 border-b border-border/50 pb-3">
                  <p className="text-base font-medium">From BeamPay user</p>
                  <p className="text-sm text-muted-foreground">
                    Show QR code to other BeamPay user
                  </p>
                </div>
              </button>
            </div>
          </div>
        ) : view === "stablecoin" ? (
          <div className="flex flex-col items-center gap-6">
            {/* Close button */}
            <div className="flex w-full items-center justify-end">
              <DrawerClose className="rounded-sm opacity-70 hover:opacity-100 transition-opacity">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </DrawerClose>
            </div>

            {/* QR Code */}
            <div className="rounded-xl bg-white dark:bg-white p-3">
              <QRCodeSVG
                value={WALLET_ADDRESS}
                size={200}
                bgColor="#FFFFFF"
                fgColor="#27272A"
              />
            </div>

            {/* Wallet info card */}
            <div className="w-[300px] rounded-lg bg-muted p-4 flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">Your Wallet Address</p>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium break-all">{WALLET_ADDRESS}</p>
                  <button
                    onClick={() => handleCopy(WALLET_ADDRESS, "address")}
                    className="shrink-0"
                  >
                    {copiedField === "address" ? (
                      <Check className="h-5 w-5 text-primary" />
                    ) : (
                      <Copy className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">Chain</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{CHAIN}</p>
                  <button
                    onClick={() => handleCopy(CHAIN, "chain")}
                    className="shrink-0"
                  >
                    {copiedField === "chain" ? (
                      <Check className="h-5 w-5 text-primary" />
                    ) : (
                      <Copy className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Supported stablecoins */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm text-muted-foreground">Supported stablecoins:</p>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#26A17B] text-[10px] font-bold text-white">₮</span>
                  <span className="text-sm font-medium">USDT</span>
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2775CA] text-[10px] font-bold text-white">$</span>
                  <span className="text-sm font-medium">USDC</span>
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
                  <CircleDollarSign className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">CASH</span>
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            {/* Close button */}
            <div className="flex w-full items-center justify-end">
              <DrawerClose className="rounded-sm opacity-70 hover:opacity-100 transition-opacity">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </DrawerClose>
            </div>

            {/* QR Code */}
            <div className="rounded-xl bg-white dark:bg-white p-3">
              <QRCodeSVG
                value={beamPayQrData}
                size={200}
                bgColor="#FFFFFF"
                fgColor="#415C0B"
              />
            </div>

            {/* Wallet info card */}
            <div className="w-[300px] rounded-lg bg-muted p-4 flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">Your BeamPay ID</p>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{mockUser.beamPayId}</p>
                  <button
                    onClick={() => handleCopy(mockUser.beamPayId, "beamPayId")}
                    className="shrink-0"
                  >
                    {copiedField === "beamPayId" ? (
                      <Check className="h-5 w-5 text-primary" />
                    ) : (
                      <Copy className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">Your Wallet Address</p>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium break-all">{WALLET_ADDRESS}</p>
                  <button
                    onClick={() => handleCopy(WALLET_ADDRESS, "address")}
                    className="shrink-0"
                  >
                    {copiedField === "address" ? (
                      <Check className="h-5 w-5 text-primary" />
                    ) : (
                      <Copy className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">Chain</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{CHAIN}</p>
                  <button
                    onClick={() => handleCopy(CHAIN, "chain")}
                    className="shrink-0"
                  >
                    {copiedField === "chain" ? (
                      <Check className="h-5 w-5 text-primary" />
                    ) : (
                      <Copy className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Supported stablecoins */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm text-muted-foreground">Supported stablecoins:</p>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#26A17B] text-[10px] font-bold text-white">₮</span>
                  <span className="text-sm font-medium">USDT</span>
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2775CA] text-[10px] font-bold text-white">$</span>
                  <span className="text-sm font-medium">USDC</span>
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
                  <CircleDollarSign className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">CASH</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
