"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export function PageHeader({ title, showBack, rightAction }: PageHeaderProps) {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)] transition-colors hover:bg-neon-500 hover:text-zinc-950 hover:border-neon-500"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      </div>
      {rightAction && <div>{rightAction}</div>}
    </header>
  );
}
