import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Star, ChevronRight } from "lucide-react";
import type { FacilityProcedure } from "@/lib/mockData";
import { formatNGN } from "@/lib/mockData";
import { PriceBadge } from "./PriceBadge";
import { VerifiedBadge } from "./VerifiedBadge";

export function ProcedureRow({ p, index }: { p: FacilityProcedure; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 p-4 md:p-5 border-b border-border last:border-0 hover:bg-accent/40 transition-smooth"
    >
      <div className="md:col-span-4 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <Link to={`/facility/${p.facility.id}`} className="font-display font-semibold text-base hover:text-primary transition-smooth truncate">
            {p.facility.name}
          </Link>
          {p.facility.is_verified && p.facility.is_claimed && <VerifiedBadge withLabel={false} />}
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{p.facility.address ? `${p.facility.address}, ${p.facility.state}` : `${p.facility.city}, ${p.facility.state}`}</span>
          <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-warning text-warning" />{p.facility.rating}</span>
        </div>
      </div>

      <div className="md:col-span-4 flex items-center justify-between md:justify-start md:flex-col md:items-start gap-1">
        <div>
          <div className="text-xs text-muted-foreground">{p.procedure_name}</div>
          <div className="font-display text-xl font-bold tabular-nums">{formatNGN(p.price_ngn)}</div>
        </div>
      </div>

      <div className="md:col-span-3 flex items-center">
        <PriceBadge source={p.price_source} communityCount={p.community_count} isStale={p.is_stale} />
      </div>

      <div className="md:col-span-1 flex items-center md:justify-end">
        <Link to={`/facility/${p.facility.id}`} className="text-sm text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
          View <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}
