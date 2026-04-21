import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function VerifiedBadge({ className, withLabel = true }: { className?: string; withLabel?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-success", className)}>
      <BadgeCheck className="h-4 w-4 fill-success text-background" />
      {withLabel && <span className="text-xs font-semibold">Verified Facility</span>}
    </span>
  );
}
