import { cn } from "@/lib/utils";

interface IllustrationPlaceholderProps {
  label?: string;
  className?: string;
}

export function IllustrationPlaceholder({
  label = "Illustration",
  className,
}: IllustrationPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-2xl bg-secondary/30 border border-border/50",
        className
      )}
    >
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
