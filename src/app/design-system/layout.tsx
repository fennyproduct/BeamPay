"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "spacing-radius", label: "Spacing & Radius" },
  { id: "shadows", label: "Shadows" },
  { id: "buttons", label: "Buttons" },
  { id: "cards", label: "Cards" },
  { id: "badges", label: "Badges" },
  { id: "inputs", label: "Inputs & Labels" },
  { id: "avatars", label: "Avatars" },
  { id: "selects", label: "Selects" },
  { id: "separators", label: "Separators" },
  { id: "dialogs", label: "Dialogs" },
  { id: "drawers", label: "Drawers" },
];

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const themes = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
  ];

  return (
    <div className="flex gap-1 rounded-full bg-muted p-1">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            theme === value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          title={label}
        >
          <Icon className="h-3.5 w-3.5" />
          <span className="hidden lg:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}

function Sidebar() {
  const [activeId, setActiveId] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col gap-6 sticky top-0 h-screen overflow-y-auto border-r border-border p-6">
      <div>
        <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          &larr; Back to app
        </Link>
        <h2 className="mt-3 text-lg font-semibold text-foreground">BeamPay</h2>
        <p className="text-xs text-muted-foreground">Design System</p>
      </div>

      <ThemeSwitcher />

      <nav className="flex flex-col gap-0.5">
        {sections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`rounded-md px-3 py-2 text-sm transition-colors ${
              activeId === id
                ? "bg-foreground text-background font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl flex">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
