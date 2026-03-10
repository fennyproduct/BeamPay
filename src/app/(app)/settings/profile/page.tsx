"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockUser } from "@/lib/mock-data";
import { t } from "@/lib/tokens";

export default function ProfilePage() {
  const [firstName, setFirstName] = useState(
    mockUser.fullName.split(" ")[0] ?? ""
  );
  const [lastName, setLastName] = useState(
    mockUser.fullName.split(" ").slice(1).join(" ") ?? ""
  );
  const [email, setEmail] = useState(mockUser.email);

  return (
    <div className={`flex flex-col min-h-screen ${t.bg}`}>
      <PageHeader title="Profile" showBack />

      <div className="flex flex-col gap-9 px-5 py-4">
        {/* Form fields */}
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Save button */}
        <Button size="xl" className="w-full">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
