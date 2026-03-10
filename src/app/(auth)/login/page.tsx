"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/lib/constants";
import { t } from "@/lib/tokens";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(ROUTES.DASHBOARD);
  }

  return (
    <div className={`flex flex-col min-h-screen ${t.bg}`}>
      <PageHeader title="Login" showBack />

      <form
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col gap-8 px-5"
      >
        {/* Input fields */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>Email Address</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl h-12"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl h-12 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${t.textSecondary}`}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Forgot Password */}
        <Button
          type="button"
          variant="ghost"
          className="self-center"
          onClick={() => router.push(ROUTES.FORGOT_PASSWORD)}
        >
          Forgot Password?
        </Button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Continue button */}
        <div className="pb-12 px-0">
          <Button
            type="submit"
            className="w-full"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
