"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";

const mockTransferDetails = {
  recipientAddress: "ErPigk...asNj",
  senderAddress: "ErPigk...asNj",
  date: "mar 3, 2026 at 12:03 PM",
  internalId: "66ass...a2344",
  signature: "rmmaa...9ajj",
  amount: "-10 USDT",
  chain: "Solana",
  token: "USDT",
  fee: "0.50 USDT",
};

function DetailRow({
  label,
  value,
  isLink = false,
}: {
  label: string;
  value: string;
  isLink?: boolean;
}) {
  return (
    <div className="flex items-start justify-between border-b border-zinc-100 dark:border-zinc-800 py-3">
      <span className="text-sm text-zinc-500">{label}</span>
      <span
        className={`text-sm font-medium text-right ${
          isLink
            ? "text-zinc-500 underline"
            : "text-zinc-950 dark:text-zinc-50"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default function TransferSuccessPage() {
  const router = useRouter();
  const d = mockTransferDetails;

  return (
    <div
      className="flex flex-col min-h-dvh"
      style={{
        backgroundImage:
          "linear-gradient(180deg, var(--color-neon-100, #f6ffc4) 0%, var(--color-white, #fff) 38%)",
      }}
    >
      {/* Top section: badge + amount */}
      <div className="flex flex-col items-center justify-center gap-5 px-5 py-6 pt-16">
        <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-1 text-sm text-zinc-600 dark:text-zinc-400">
          Success
        </span>
        <h1 className="text-5xl font-semibold text-zinc-950 dark:text-zinc-50">
          {d.amount}
        </h1>
      </div>

      {/* Detail rows */}
      <div className="flex-1 px-5 pt-8">
        <DetailRow label="Recipient Address" value={d.recipientAddress} />
        <DetailRow label="Sender Address" value={d.senderAddress} />
        <DetailRow label="Date" value={d.date} />
        <DetailRow label="Internal ID" value={d.internalId} />
        <DetailRow label="Signature" value={d.signature} isLink />
        <DetailRow label="Amount" value={d.amount} />
        <DetailRow label="Chain" value={d.chain} />
        <DetailRow label="Token" value={d.token} />
        <DetailRow label="Fee" value={d.fee} />
      </div>

      {/* Back to Home button */}
      <div className="px-5 pb-8">
        <Button
          size="lg"
          className="w-full"
          onClick={() => router.push(ROUTES.DASHBOARD)}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
