"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MobileContainer } from "@/components/layout/mobile-container";
import { ROUTES } from "@/lib/constants";

export default function SplashPage() {
  const router = useRouter();

  return (
    <MobileContainer className="relative flex flex-col overflow-hidden">
      {/* Background layers */}
      <Image
        src="/images/splash-sky.png"
        alt=""
        fill
        className="object-cover z-0"
        priority
      />
      <Image
        src="/images/splash-market.png"
        alt=""
        fill
        className="object-cover z-[1]"
        priority
      />
      <Image
        src="/images/splash-boat.png"
        alt=""
        fill
        className="object-cover z-[2]"
        priority
      />

      {/* BeamPay logo */}
      <div className="relative z-10 flex flex-1 items-start justify-center pt-32">
        <Image
          src="/images/beampay-logo.png"
          alt="BeamPay"
          width={192}
          height={42}
          priority
        />
      </div>

      {/* Footer with gradient + buttons */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-5 pb-12 pt-12 bg-gradient-to-b from-transparent via-white/50 to-white">
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
