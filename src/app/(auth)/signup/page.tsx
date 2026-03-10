"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/lib/constants";
import { t } from "@/lib/tokens";

const STEPS = [
  { title: "Email", key: "email" },
  { title: "Phone", key: "phone" },
  { title: "Password", key: "password" },
  { title: "Personal Info", key: "name" },
  { title: "Final Details", key: "final" },
] as const;

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [finalChecks, setFinalChecks] = useState([false, false, false, false]);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);

  const current = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  function handleBack() {
    if (step === 0) {
      router.back();
    } else {
      setStep(step - 1);
    }
  }

  function handleContinue() {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      router.push(ROUTES.DASHBOARD);
    }
  }

  function canContinue() {
    switch (current.key) {
      case "email":
        return email.length > 0 && agreedTerms && agreedPrivacy;
      case "password":
        return password.length >= 8;
      case "name":
        return firstName.length > 0 && lastName.length > 0;
      case "phone":
        return phone.length > 0;
      case "final":
        return finalChecks.every(Boolean);
      default:
        return false;
    }
  }

  return (
    <div className={`flex flex-col min-h-screen ${t.bg}`}>
      {/* Header with progress */}
      <div className="flex items-center gap-3 px-5 py-4">
        <button
          onClick={handleBack}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white dark:border-white/10 bg-zinc-50 dark:bg-white/[0.08] shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)] transition-colors hover:bg-neon-500 hover:text-zinc-950 hover:border-neon-500"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex flex-1 flex-col gap-0.5">
          <p className={`text-xl font-semibold ${t.textPrimary} tracking-[-0.4px]`}>
            {current.title}
          </p>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 h-2 rounded-full bg-neon-100 dark:bg-neon-900 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-cover bg-center transition-all duration-300"
                style={{ width: `${progress}%`, backgroundImage: "url('/images/progress-bar-bg.png')" }}
              />
            </div>
            <span className={`text-xs ${t.textSecondary} whitespace-nowrap`}>
              {step + 1} of {STEPS.length}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-5">
        {/* Step content */}
        <div className="flex flex-col gap-6 pt-10">
          {current.key === "email" && (
            <>
              <div className="flex flex-col gap-2">
                <h1 className={`text-3xl font-bold ${t.textPrimary}`}>
                  What&apos;s your email?
                </h1>
                <p className={`text-sm ${t.textSecondary}`}>
                  We&apos;ll use this to create your account and send important updates.
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
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
              {/* Checkboxes */}
              <div className="flex flex-col gap-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-1 h-5 w-5 shrink-0 rounded border-zinc-300 dark:border-zinc-600 accent-neon-500"
                  />
                  <span className={`text-xs leading-4 ${t.textSecondary}`}>
                    I have read, understood, and agree to the{" "}
                    <span className="underline">Terms of Service</span>, including the
                    limitations on service availability and transaction limits.
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedPrivacy}
                    onChange={(e) => setAgreedPrivacy(e.target.checked)}
                    className="mt-1 h-5 w-5 shrink-0 rounded border-zinc-300 dark:border-zinc-600 accent-neon-500"
                  />
                  <span className={`text-xs leading-4 ${t.textSecondary}`}>
                    I acknowledge that I have read and understood the{" "}
                    <span className="underline">Privacy Policy</span> and how my personal
                    information will be collected, used, and shared.
                  </span>
                </label>
              </div>
            </>
          )}

          {current.key === "password" && (
            <>
              <div className="flex flex-col gap-2">
                <h1 className={`text-3xl font-bold ${t.textPrimary}`}>
                  Create password
                </h1>
                <p className={`text-sm ${t.textSecondary}`}>
                  Choose a strong password to protect your account
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create Password (min. 8 Characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl h-12 pr-12"
                    autoFocus
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
            </>
          )}

          {current.key === "name" && (
            <>
              <div className="flex flex-col gap-2">
                <h1 className={`text-3xl font-bold ${t.textPrimary}`}>
                  What&apos;s your name?
                </h1>
                <p className={`text-sm ${t.textSecondary}`}>
                  Enter your information exactly as it appears on your official documents
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="rounded-xl h-12"
                    autoFocus
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="rounded-xl h-12"
                  />
                </div>
              </div>
            </>
          )}

          {current.key === "phone" && (
            <>
              <div className="flex flex-col gap-2">
                <h1 className={`text-3xl font-bold ${t.textPrimary}`}>
                  Your phone number
                </h1>
                <p className={`text-sm ${t.textSecondary}`}>
                  We&apos;ll use this for account verification and security.
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Phone Number</Label>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-xl h-12"
                  autoFocus
                />
              </div>
            </>
          )}

          {current.key === "final" && (
            <>
              <div className="flex flex-col gap-2">
                <h1 className={`text-3xl font-bold ${t.textPrimary}`}>
                  Almost done!
                </h1>
                <p className={`text-sm ${t.textSecondary}`}>
                  Please confirm a few important details to complete your registration
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  <>I confirm that I am not a resident or citizen of United Kingdom, United States, or any other excluded jurisdiction as defined in the <span className="underline">Terms of Service</span></>,
                  "I confirm that: I am not a person listed on any sanctions list, including but not limited to those maintained by the United Nations, European Union, United Kingdom, United States, or any other relevant jurisdiction; I am not acting on behalf of or for the benefit of any person subject to sanctions; I am not a resident, citizen, or located in a comprehensively sanctioned country or territory (including Cuba, Iran, North Korea, Syria, and the Crimea, Donetsk, and Luhansk regions); I will not use BeamPay to conduct transactions with any person or entity subject to sanctions; I will not use BeamPay to conduct transactions involving sanctioned countries or territories; and I understand that BeamPay conducts ongoing sanctions screening and may suspend or terminate services if any sanctions risk is identified.",
                  "I understand that BeamPay is NOT a bank, financial institution, money transmitter, or payment service provider. The funds I add to my non-custodial wallet are not covered by any deposit insurance scheme.",
                  "I agree to receive marketing communications from BeamPay about new features, promotions, and updates. I understand I can opt out at any time.",
                ].map((text, i) => (
                  <label key={i} className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={finalChecks[i]}
                      onChange={(e) => {
                        const next = [...finalChecks];
                        next[i] = e.target.checked;
                        setFinalChecks(next);
                      }}
                      className="mt-1 h-5 w-5 shrink-0 rounded border-zinc-300 dark:border-zinc-600 accent-neon-500"
                    />
                    <span className={`text-xs leading-4 ${t.textSecondary}`}>
                      {text}
                    </span>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Continue button */}
        <div className="pb-12">
          <Button
            onClick={handleContinue}
            disabled={!canContinue()}
            className="w-full"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
