import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Phone, Star, Building2, Flag } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { PriceBadge } from "@/components/PriceBadge";
import { Button } from "@/components/ui/button";
import { allFacilities, allProcedures, formatNGN } from "@/lib/mockData";

export default function FacilityProfile() {
  const { id } = useParams();
  const facility = allFacilities.find((f) => f.id === id);
  const procedures = allProcedures.filter((p) => p.facility_id === id);

  if (!facility) {
    return (
      <PageShell>
        <div className="container py-20 text-center">
          <h1 className="font-display text-2xl font-bold">Facility not found</h1>
          <Button asChild className="mt-4"><Link to="/facilities">Back to facilities</Link></Button>
        </div>
      </PageShell>
    );
  }

  const isVerified = facility.is_verified && facility.is_claimed;

  return (
    <PageShell withMesh>
      <div className="container pt-8 pb-16">
        <Link to="/facilities" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth">
          <ArrowLeft className="h-4 w-4" />
          All facilities
        </Link>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 glass rounded-3xl p-6 md:p-10 shadow-elevated">
          <div className="flex flex-col md:flex-row md:items-start gap-6 justify-between">
            <div className="flex gap-5">
              <div className="h-20 w-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-soft shrink-0">
                <Building2 className="h-10 w-10 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-display text-2xl md:text-4xl font-bold tracking-tight">{facility.name}</h1>
                  {isVerified && <VerifiedBadge />}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{facility.type}</p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{facility.address}</span>
                  <span className="flex items-center gap-1.5"><Phone className="h-4 w-4" />{facility.phone}</span>
                  <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-warning text-warning" />{facility.rating} <span className="text-xs">({facility.reviews_count})</span></span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline">
                <Link to={`/report?facility=${facility.id}`}>
                  <Flag className="h-4 w-4 mr-1.5" />
                  Report a price
                </Link>
              </Button>
              <Button>Get directions</Button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold">Procedures & pricing</h2>
              <span className="text-sm text-muted-foreground">{procedures.length} listed</span>
            </div>
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft">
              {procedures.length === 0 && (
                <div className="p-10 text-center text-muted-foreground">No procedures listed yet.</div>
              )}
              {procedures.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center justify-between gap-4 p-5 border-b border-border last:border-0 hover:bg-accent/40 transition-smooth"
                >
                  <div className="min-w-0">
                    <div className="font-medium">{p.procedure_name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{p.category} · Updated {new Date(p.updated_at).toLocaleDateString("en-NG", { month: "short", day: "numeric", year: "numeric" })}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-lg font-bold tabular-nums">{formatNGN(p.price_ngn)}</div>
                    <PriceBadge source={p.price_source} isStale={p.is_stale} className="mt-1" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <aside className="space-y-5">
            <div className="bg-gradient-card border border-border rounded-2xl p-6">
              <h3 className="font-display font-semibold mb-4">Trust signals</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Verification</span>
                  {isVerified ? <span className="text-success font-medium">Verified</span> : <span className="text-warning font-medium">Unverified</span>}
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Claimed by provider</span>
                  <span className={facility.is_claimed ? "text-success font-medium" : "text-muted-foreground"}>{facility.is_claimed ? "Yes" : "No"}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rating</span>
                  <span className="font-medium">{facility.rating} / 5</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Reviews</span>
                  <span className="font-medium">{facility.reviews_count}</span>
                </li>
              </ul>
            </div>

            <div className="bg-warning-soft border border-warning/30 rounded-2xl p-6">
              <h3 className="font-display font-semibold text-warning-foreground">Spotted overcharging?</h3>
              <p className="text-sm text-warning-foreground/80 mt-2">Help others by filing a transparency report. Takes 30 seconds.</p>
              <Button asChild variant="default" className="mt-4 w-full">
                <Link to={`/report?facility=${facility.id}`}>File a report</Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </PageShell>
  );
}
