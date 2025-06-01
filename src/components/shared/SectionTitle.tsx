import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SectionTitleProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
}

export function SectionTitle({ title, description, icon: Icon, className }: SectionTitleProps) {
  return (
    <div className={cn("mb-8", className)}>
      <div className="flex items-center gap-3 mb-2">
        {Icon && <Icon className="h-8 w-8 text-primary" />}
        <h2 className="text-3xl font-headline font-semibold tracking-tight text-foreground">
          {title}
        </h2>
      </div>
      {description && (
        <p className="text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
