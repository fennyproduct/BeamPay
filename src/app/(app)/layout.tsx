import { MobileContainer } from "@/components/layout/mobile-container";
import { BottomNav } from "@/components/layout/bottom-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <MobileContainer>
      <main className="pb-36">{children}</main>
      <BottomNav />
    </MobileContainer>
  );
}
