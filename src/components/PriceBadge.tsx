import { ShieldCheck, Users, AlertTriangle, HelpCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  source: "provider" | "community" | "admin" | string;
  isStale?: boolean;
  communityCount?: number;
  className?: string;
}

/**
 * PriceBadge now supports multiple states to show 'levels of authenticity'.
 * It can render just the primary badge or a compact summary.
 */
export function PriceBadge({ source, isStale, communityCount, className }: Props) {
  if (isStale) {
    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-warning-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-warning-foreground border border-warning/30">
          <AlertTriangle className="h-3 w-3" />
          Likely Stale
        </span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {/* 1. Official Provider Status */}
      {source === "provider" && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-success border border-success/20">
          <ShieldCheck className="h-3.5 w-3.5" />
          Provider Official
        </span>
      )}

      {/* 2. Community Verification Status */}
      {(source === "community" || (communityCount && communityCount > 0)) && (
        <span className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border",
          source === "community" 
            ? "bg-info/10 text-info border-info/20" 
            : "bg-success/5 text-success/80 border-success/10"
        )}>
          <Users className="h-3.5 w-3.5" />
          {communityCount && communityCount > 0 ? `${communityCount} Community Confirmation${communityCount > 1 ? 's' : ''}` : 'Community Reported'}
        </span>
      )}

      {/* 3. Unverified / Admin fallback */}
      {source === "admin" && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 dark:bg-orange-950/30 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/20">
          <HelpCircle className="h-3.5 w-3.5" />
          Admin Unverified
        </span>
      )}
    </div>
  );
}
