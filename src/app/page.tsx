"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MobileContainer } from "@/components/layout/mobile-container";
import { ROUTES } from "@/lib/constants";
import { useState, useEffect } from "react";

export default function SplashPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Staggered reveal: background(1) → sky(2) → boat(3) → buttons(4)
    const timers = [
      setTimeout(() => setStep(1), 100),   // sky bg
      setTimeout(() => setStep(2), 600),   // market
      setTimeout(() => setStep(3), 1100),  // boat
      setTimeout(() => setStep(4), 1600),  // logo + buttons
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <MobileContainer className="relative flex flex-col overflow-hidden bg-[#1a1a2e]">
      {/* Layer 1: Sky background */}
      <Image
        src="/images/splash-sky.png"
        alt=""
        fill
        className={`object-cover z-0 transition-opacity duration-700 ease-out ${
          step >= 1 ? "opacity-100" : "opacity-0"
        }`}
        priority
      />

      {/* Layer 2: Market scene */}
      <Image
        src="/images/splash-market.png"
        alt=""
        fill
        className={`object-cover z-[1] transition-all duration-700 ease-out ${
          step >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        priority
      />

      {/* Layer 3: Boat */}
      <Image
        src="/images/splash-boat.png"
        alt=""
        fill
        className={`object-cover z-[2] transition-all duration-700 ease-out ${
          step >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        priority
      />

      {/* BeamPay logo */}
      <div
        className={`relative z-10 flex flex-1 items-start justify-center pt-32 transition-all duration-700 ease-out ${
          step >= 4 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <Image
          src="/images/beampay-logo.png"
          alt="BeamPay"
          width={192}
          height={42}
          priority
        />
      </div>

      {/* Footer with gradient + buttons */}
      <div
        className={`relative z-10 flex flex-col items-center gap-5 px-5 pb-12 pt-12 bg-gradient-to-b from-transparent via-white/50 to-white transition-all duration-700 ease-out ${
          step >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex w-full flex-col gap-3">
          <Button
            className="w-full"
            onClick={() => router.push(ROUTES.SIGNUP)}
          >
            Create new account
          </Button>
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => router.push(ROUTES.LOGIN)}
          >
            I already have an account
          </Button>
        </div>
      </div>
    </MobileContainer>
  );
}
