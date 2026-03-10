"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { AddFundForm } from "@/components/transfer/add-fund-form";
import { AddFundUserForm } from "@/components/transfer/add-fund-user-form";

function AddFundContent() {
  const searchParams = useSearchParams();
  const method = searchParams.get("method") ?? "stablecoin";

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title={method === "user" ? "Add from BeamPay User" : "Add Fund (Stablecoin)"}
        showBack
      />
      <div className="px-4">
        {method === "user" ? <AddFundUserForm /> : <AddFundForm />}
      </div>
    </div>
  );
}

export default function AddFundPage() {
  return (
    <Suspense>
      <AddFundContent />
    </Suspense>
  );
}
