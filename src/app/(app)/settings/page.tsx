"use client";

import { useRouter } from "next/navigation";
import {
  ChevronRight,
  User,
  Palette,
  Shield,
  UserX,
  LogOut,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { t } from "@/lib/tokens";

const settingsItems = [
  {
    icon: User,
    title: "Profile",
    description: "Name and email",
    href: "/settings/profile",
  },
  {
    icon: Palette,
    title: "Appearance",
    description: "Choose your preferred color theme",
    href: "/settings/appearance",
  },
  {
    icon: Shield,
    title: "Security",
    description: "Password and PIN",
    href: "/settings/security",
  },
  {
    icon: UserX,
    title: "Close account",
    description: "Permanently delete your account",
    href: "/settings/close-account",
  },
];

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className={`flex flex-col min-h-screen ${t.bg}`}>
      {/* Header */}
      <PageHeader title="Settings" showBack />

      {/* Menu items */}
      <div className="flex flex-col gap-9 px-5 py-4">
        <div className="flex flex-col gap-2">
          {settingsItems.map((item, i) => (
            <div
              key={item.title}
              className="flex gap-3 items-start cursor-pointer"
              onClick={() => item.href && router.push(item.href)}
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${t.surface}`}>
                <item.icon className={`h-6 w-6 ${t.textPrimary}`} />
              </div>
              <div
                className="flex flex-1 items-center gap-1 pb-3"
              >
                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  <p className={`text-base font-medium ${t.textPrimary}`}>
                    {item.title}
                  </p>
                  <p className={`text-sm ${t.textSecondary}`}>{item.description}</p>
                </div>
                <ChevronRight className="h-6 w-6 shrink-0 text-zinc-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Log Out button */}
        <Button
          variant="secondary"
          size="xl"
          className="w-full"
          onClick={() => router.push(ROUTES.LOGIN)}
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
