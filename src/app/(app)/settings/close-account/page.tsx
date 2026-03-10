"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/tokens";

export default function CloseAccountPage() {
  return (
    <div className={`flex flex-col min-h-screen ${t.bg}`}>
      <PageHeader title="Close account" showBack />

      <div className="flex flex-col gap-6 px-5 py-4">
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium text-red-600">
            Danger Zone
          </p>
          <p className={`text-sm ${t.textSecondary}`}>
            Once you delete your account, there is no going back. This will
            permanently delete your account, wallet balance, transaction
            history, and saved cards.
          </p>
        </div>

        <Button
          variant="destructive"
          size="xl"
          className="w-full"
        >
          Delete account
        </Button>
      </div>
    </div>
  );
}
