"use client";

import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { mockUser } from "@/lib/mock-data";
import { t } from "@/lib/tokens";
import { ROUTES } from "@/lib/constants";

export function GreetingHeader() {
  const router = useRouter();
  const initials = mockUser.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center justify-between px-4 pt-6 pb-2">
      {/* Left: Avatar + Name */}
      <div className="flex items-center gap-3">
        <button onClick={() => router.push(ROUTES.SETTINGS)}>
          <Avatar className="h-11 w-11 border-2 border-white dark:border-white/10 shadow-md">
            <AvatarFallback className="bg-neon-400 text-zinc-900 dark:text-zinc-950 text-sm font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
        <h2 className={`text-xl font-semibold ${t.textPrimary} tracking-[-0.4px]`}>
          {mockUser.fullName}
        </h2>
      </div>

      {/* Right: QR scan icon */}
      <button
        onClick={() => router.push(ROUTES.RECEIVE)}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-transparent"
      >
        <Image src="/images/Vector.png" alt="BeamPay" width={20} height={20} />
      </button>
    </div>
  );
}
