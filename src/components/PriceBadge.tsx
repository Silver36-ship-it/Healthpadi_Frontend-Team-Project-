import { ShieldCheck, Users, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  source: "provider" | "community";
  isStale?: boolean;
  className?: string;
}

export function PriceBadge({ source, isStale, className }: Props) {
  if (isStale) {
    return (
      <span className={cn("inline-flex items-center gap-1.5 rounded-full bg-warning-soft px-2.5 py-1 text-xs font-medium text-warning-foreground border border-warning/30", className)}>
        <AlertTriangle className="h-3 w-3 text-warning" />
        Check with Facility
      </span>
    );
  }
  if (source === "provider") {
    return (
      <span className={cn("inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-xs font-medium text-success border border-success/20", className)}>
        <ShieldCheck className="h-3 w-3" />
        Provider Official
      </span>
    );
  }
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full bg-info-soft px-2.5 py-1 text-xs font-medium text-info border border-info/20", className)}>
      <Users className="h-3 w-3" />
      Community Reported
    </span>
  );
}
