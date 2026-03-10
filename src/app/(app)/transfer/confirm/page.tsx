"use client";

import { Suspense, useRef, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { mockWallet } from "@/lib/mock-data";
import { t } from "@/lib/tokens";

const SWIPE_THRESHOLD = 0.75;
const TRACK_PADDING = 4;
const KNOB_SIZE = 56;
const IDR_RATE = 16800;
const MIN_IDR = 200000;

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

function formatIDR(value: number): string {
  return value.toLocaleString("id-ID");
}

function TransferConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const recipientName = searchParams.get("name") || "Recipient";
  const recipientAccount = searchParams.get("account") || "";
  const recipientBank = searchParams.get("bank") || "";

  const trackRef = useRef<HTMLDivElement>(null);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [sent, setSent] = useState(false);
  const [amountStr, setAmountStr] = useState("");
  const amountIDR = parseInt(amountStr || "0", 10);

  const usdBalance =
    mockWallet.balances.find((b) => b.currency === "USD")?.amount ?? 0;
  const chargedUSD = amountIDR / IDR_RATE;
  const isOverBalance = chargedUSD > usdBalance;
  const canSend = amountIDR >= MIN_IDR && !isOverBalance;

  const getMaxX = useCallback(() => {
    if (!trackRef.current) return 200;
    return trackRef.current.offsetWidth - KNOB_SIZE - TRACK_PADDING * 2;
  }, []);

  function handlePointerDown(e: React.PointerEvent) {
    if (sent || !canSend) return;
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragging || sent) return;
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const x = e.clientX - rect.left - TRACK_PADDING - KNOB_SIZE / 2;
    const maxX = getMaxX();
    setDragX(Math.max(0, Math.min(x, maxX)));
  }

  function handlePointerUp() {
    if (!dragging || sent) return;
    setDragging(false);
    const maxX = getMaxX();
    if (dragX / maxX >= SWIPE_THRESHOLD) {
      setSent(true);
      setDragX(maxX);
      setTimeout(() => router.push(ROUTES.TRANSFER_SUCCESS), 400);
    } else {
      setDragX(0);
    }
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw.length <= 9) setAmountStr(raw);
  }

  const avatarColor = getAvatarColor(recipientName);
  const initials = getInitials(recipientName);
  const displayName = recipientBank
    ? recipientName
    : recipientName.length > 16
      ? `${recipientName.slice(0, 8)}...${recipientName.slice(-4)}`
      : recipientName;

  return (
    <div
      className="flex flex-col bg-page-gradient"
      style={{ minHeight: "calc(100dvh - 144px)" }}
    >
      {/* Back arrow */}
      <div className="px-5 py-3">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white dark:border-white/10 bg-zinc-50 dark:bg-white/[0.08] shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>

      {/* Content area */}
      <div className="flex flex-1 flex-col items-center gap-5 px-5 pt-6">
        {/* Avatar */}
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full"
          style={{ backgroundColor: avatarColor }}
        >
          <span className="text-2xl font-medium text-white">{initials}</span>
        </div>

        {/* Name / Account */}
        <p className={`text-base ${t.textPrimary}`}>{displayName}</p>

        {/* Amount input */}
        <div className="flex items-baseline">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoFocus
            value={amountIDR === 0 && amountStr === "" ? "" : formatIDR(amountIDR)}
            onChange={handleAmountChange}
            placeholder="0"
            className="bg-transparent text-5xl font-semibold text-zinc-950 dark:text-zinc-50 tabular-nums text-right outline-none w-auto max-w-[250px] placeholder:text-zinc-950 dark:placeholder:text-zinc-50"
            style={{ width: `${Math.max(1, (amountStr || "0").length) * 1.8}ch` }}
          />
          <span className="text-5xl font-semibold text-zinc-400 dark:text-zinc-500 ml-2">
            IDR
          </span>
        </div>

        {/* Charge + balance */}
        <div className="flex flex-col items-center">
          {isOverBalance && (
            <p className="text-sm text-red-500 py-1">Insufficient balance</p>
          )}
          <p className={`text-sm ${t.textSecondary} py-1`}>
            You will be charged ${chargedUSD.toFixed(2)}
          </p>
          <p className={`text-sm ${t.textSecondary} py-1`}>
            Current balance: ${usdBalance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Swipe to send */}
      <div className="px-5 pb-8 pt-2">
        <div
          ref={trackRef}
          className="relative flex h-14 items-center rounded-full p-1"
        >
          {/* Track gradient background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent to-zinc-200 dark:to-zinc-700" />

          {/* Neon fill that follows the knob */}
          {canSend && dragX > 0 && (
            <div
              className="absolute left-0 top-0 bottom-0 rounded-full bg-neon-500 transition-none"
              style={{ width: `${dragX + KNOB_SIZE + TRACK_PADDING}px` }}
            />
          )}

          {/* Knob */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full touch-none select-none transition-colors ${
              canSend
                ? "bg-neon-500 cursor-grab active:cursor-grabbing"
                : "bg-zinc-200 dark:bg-zinc-700 cursor-not-allowed"
            }`}
            style={{ transform: `translateX(${dragX}px)` }}
          >
            <ArrowRight
              className={`h-8 w-8 ${canSend ? "text-zinc-900" : "text-zinc-400 dark:text-zinc-500"}`}
            />
          </div>

          {/* Label */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            style={{ opacity: 1 - dragX / (getMaxX() || 1) }}
          >
            <span className={`text-lg font-semibold ${t.textSecondary}`}>
              Swipe to send
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default function TransferConfirmPage() {
  return (
    <Suspense>
      <TransferConfirmContent />
    </Suspense>
  );
}
