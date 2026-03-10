import { MobileContainer } from "@/components/layout/mobile-container";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <MobileContainer className="flex flex-col">
      {children}
    </MobileContainer>
  );
}
