"use client";

import { ArrowLeftRight, Plus } from "lucide-react";
import { TransferDrawer } from "@/components/transfer/transfer-drawer";
import { AddFundsDrawer } from "@/components/transfer/add-funds-drawer";
import { Button } from "../ui/button";

export function QuickActions() {
  return (
    <div className="flex gap-3 px-4">
      <TransferDrawer>
        <Button variant="secondary" size="xl" className="flex-1 gap-2 text-lg">
          <ArrowLeftRight className="h-5 w-5" />
          Transfer
        </Button>
      </TransferDrawer>
      <AddFundsDrawer>
        <Button variant="secondary" size="xl" className="flex-1 gap-2 text-lg">
          <Plus className="h-5 w-5" />
          Add Funds
        </Button>
      </AddFundsDrawer>
    </div>
  );
}
