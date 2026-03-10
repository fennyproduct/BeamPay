import { GreetingHeader } from "@/components/dashboard/greeting-header";
import { WalletBalanceCard } from "@/components/dashboard/wallet-balance-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 bg-page-gradient min-h-screen">
      <GreetingHeader />
      <WalletBalanceCard />
      <QuickActions />
      <RecentTransactions />
    </div>
  );
}
