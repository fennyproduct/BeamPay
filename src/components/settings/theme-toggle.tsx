"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="default"
        onClick={() => setTheme("light")}
        className={cn(
          "flex-1 gap-2",
          theme === "light" && "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
      >
        <Sun className="h-4 w-4" />
        Light
      </Button>
      <Button
        variant="ghost"
        size="default"
        onClick={() => setTheme("dark")}
        className={cn(
          "flex-1 gap-2",
          theme === "dark" && "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
      >
        <Moon className="h-4 w-4" />
        Dark
      </Button>
    </div>
  );
}
