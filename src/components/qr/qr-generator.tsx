"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockUser } from "@/lib/mock-data";
import { Copy, Check } from "lucide-react";

export function QrGenerator() {
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);

  const qrData = JSON.stringify({
    beamPayId: mockUser.beamPayId,
    amount: amount || undefined,
  });

  function handleCopy() {
    navigator.clipboard.writeText(mockUser.beamPayId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Card className="border-border/50 bg-secondary/20">
        <CardContent className="flex flex-col items-center gap-4 p-6">
          <div className="rounded-xl bg-white p-4">
            <QRCodeSVG
              value={qrData}
              size={180}
              bgColor="#FFFFFF"
              fgColor="#27272A"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono">{mockUser.beamPayId}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-primary" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="w-full space-y-2">
        <Label htmlFor="receiveAmount">Amount (optional)</Label>
        <Input
          id="receiveAmount"
          type="number"
          placeholder="Enter amount in VND"
          min="0"
          step="1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
    </div>
  );
}
