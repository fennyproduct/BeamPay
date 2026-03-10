import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TransferOptionCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export function TransferOptionCard({
  href,
  icon: Icon,
  title,
  description,
}: TransferOptionCardProps) {
  return (
    <Link href={href}>
      <Card className="border-border/30 bg-secondary/20 hover:bg-secondary/40 transition-colors">
        <CardContent className="flex items-center gap-3 p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{title}</p>
            <p className="text-[11px] text-muted-foreground truncate">
              {description}
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
        </CardContent>
      </Card>
    </Link>
  );
}
