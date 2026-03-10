"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { BankTransferForm } from "@/components/transfer/bank-transfer-form";
import { QrTransferForm } from "@/components/transfer/qr-transfer-form";
import { UsdtTransferForm } from "@/components/transfer/usdt-transfer-form";
import { type CountryCode } from "@/lib/types";

function SendContent() {
  const searchParams = useSearchParams();
  const method = searchParams.get("method") ?? "qr";
  const country = (searchParams.get("country") ?? "VN") as CountryCode;

  const titles: Record<string, string> = {
    qr: "QR Payment",
    bank: "Bank Transfer",
    crypto: "USDT Transfer",
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title={titles[method] ?? "Send"} showBack />
      <div className="px-4">
        {method === "qr" && <QrTransferForm />}
        {method === "bank" && <BankTransferForm initialCountry={country} />}
        {method === "crypto" && <UsdtTransferForm />}
      </div>
    </div>
  );
}

export default function SendPage() {
  return (
    <Suspense>
      <SendContent />
    </Suspense>
  );
}
