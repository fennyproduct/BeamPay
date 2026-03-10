"use client";

import { useState } from "react";
import { Copy, Check, CircleDollarSign } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { PageHeader } from "@/components/layout/page-header";
import { mockUser } from "@/lib/mock-data";

const WALLET_ADDRESS = "0x90f9e5f178423d63511004687b43e82be311ac5d";
const CHAIN = "Solana (SOL)";

export default function ReceivePage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  function handleCopy(text: string, field: string) {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PageHeader title="Receive" showBack />

      <div className="flex flex-1 flex-col items-center gap-6 px-4 pt-4">
        {/* QR Code */}
        <div className="rounded-xl bg-white p-3">
          <QRCodeSVG
            value={WALLET_ADDRESS}
            size={200}
            bgColor="#FFFFFF"
            fgColor="#27272A"
          />
        </div>

        {/* Wallet info card */}
        <div className="w-full max-w-[300px] rounded-lg bg-muted p-4 flex flex-col gap-3">
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
    </div>
  );
}
