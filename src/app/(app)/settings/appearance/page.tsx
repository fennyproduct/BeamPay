"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { t } from "@/lib/tokens";

const themeOptions = [
  {
    id: "light",
    icon: Sun,
    title: "Light",
    description: "Classic Light Theme",
  },
  {
    id: "dark",
    icon: Moon,
    title: "Easy on the eyes",
    description: "Easy on the eyes",
  },
  {
    id: "system",
    icon: Monitor,
    title: "System",
    description: "Match your device",
  },
];

export default function AppearancePage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={`flex flex-col min-h-screen ${t.bg}`}>
      <PageHeader title="Appearance" showBack />

      <div className="px-5 py-4">
        <div className="flex flex-col gap-2">
          {themeOptions.map((option, i) => (
            <div
              key={option.id}
              className="flex gap-3 items-start cursor-pointer"
              onClick={() => setTheme(option.id)}
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${t.surface}`}>
                <option.icon className={`h-6 w-6 ${t.textPrimary}`} />
              </div>
              <div
                className="flex flex-1 items-center gap-1 pb-3"
              >
                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  <p className={`text-base font-medium ${t.textPrimary}`}>
                    {option.title}
                  </p>
                  <p className={`text-sm ${t.textSecondary}`}>
                    {option.description}
                  </p>
                </div>
                {/* Radio */}
                {theme === option.id ? (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-50">
                    <Check className="h-4 w-4 text-white dark:text-zinc-900" />
                  </div>
                ) : (
                  <div className={`h-6 w-6 shrink-0 rounded-full border ${t.border}`} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
