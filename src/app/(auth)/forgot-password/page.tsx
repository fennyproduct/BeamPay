"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/lib/constants";
import { t } from "@/lib/tokens";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className={`flex flex-col min-h-screen ${t.bg}`}>
        {/* Header — back button only */}
        <div className="px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white dark:border-white/10 bg-zinc-50 dark:bg-white/[0.08] shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)] transition-colors hover:bg-neon-500 hover:text-zinc-950 hover:border-neon-500"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>

        {/* Centered confirmation */}
        <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className={`text-3xl font-bold ${t.textPrimary}`}>
              Check Your Email
            </h1>
            <p className={`text-base font-medium ${t.textSecondary} text-center`}>
              We&apos;ve sent a password reset link to {email}. Check your email and follow the instructions to reset your password.
            </p>
          </div>

          <Button
            onClick={() => router.push(ROUTES.LOGIN)}
          >
            Back to Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col min-h-screen ${t.bg}`}>
      {/* Header — back button only */}
      <div className="px-4 py-4">
        <button
          onClick={() => router.back()}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white dark:border-white/10 bg-zinc-50 dark:bg-white/[0.08] shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)] transition-colors hover:bg-neon-500 hover:text-zinc-950 hover:border-neon-500"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center gap-8 px-6 pt-10">
        {/* Title + description */}
        <div className="flex flex-col items-center gap-2">
          <h1 className={`text-3xl font-bold ${t.textPrimary}`}>
            Forgot Password?
          </h1>
          <p className={`text-base font-medium ${t.textSecondary} text-center`}>
            Enter your email address and we&apos;ll send you a link to reset your password
          </p>
        </div>

        {/* Email input */}
        <div className="flex w-full flex-col gap-1.5">
          <Label>Email Address</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl h-12"
            autoFocus
          />
        </div>

        {/* Send Reset Email button */}
        <Button
          className="w-full"
          disabled={!email}
          onClick={() => setSent(true)}
        >
          Send Reset Email
        </Button>

        {/* Back to Sign In */}
        <button
          onClick={() => router.push(ROUTES.LOGIN)}
          className={`text-base font-medium ${t.textPrimary}`}
        >
          Back to Sign In
        </button>
      </div>
    </div>
  );
}
