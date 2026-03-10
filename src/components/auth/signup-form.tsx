"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROUTES, COUNTRIES } from "@/lib/constants";

export function SignupForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(ROUTES.DASHBOARD);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          placeholder="Alex Nguyen"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signupEmail">Email</Label>
        <Input
          id="signupEmail"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+84 912 345 678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Country</Label>
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger>
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(COUNTRIES).map(([code, info]) => (
              <SelectItem key={code} value={code}>
                {info.flag} {info.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="signupPassword">Password</Label>
        <Input
          id="signupPassword"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full mt-2">
        Create Account
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href={ROUTES.LOGIN} className="text-primary font-medium hover:underline">
          Log In
        </Link>
      </p>
    </form>
  );
}
