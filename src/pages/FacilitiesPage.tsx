import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, MapPin, Star, ChevronRight, Loader2 } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { api, Facility } from "@/lib/api";
import { useState, useEffect } from "react";

export default function FacilitiesPage() {
  const [filter, setFilter] = useState<"all" | "verified">("all");
  const [allFacilities, setAllFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getFacilities().then(data => {
      setAllFacilities(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const facilities = allFacilities.filter((f) => filter === "all" || f.is_verified);

  return (
    <PageShell withMesh>
      <div className="container pt-10 pb-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Facilities</h1>
            <p className="mt-2 text-muted-foreground">{allFacilities.length} healthcare facilities tracked across Nigeria.</p>
          </div>
          <div className="flex gap-2">
            {[
              { k: "all", label: "All" },
              { k: "verified", label: "Verified only" },
            ].map((t) => (
              <button
                key={t.k}
                onClick={() => setFilter(t.k as "all" | "verified")}
                className={`text-sm px-4 py-2 rounded-full border transition-smooth ${filter === t.k ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/50"}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {facilities.map((f, i) => (
              <motion.div
                key={f.facility_id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link to={`/facility/${f.facility_id}`} className="group block bg-gradient-card border border-border rounded-2xl p-6 hover:shadow-elevated hover:border-primary/30 transition-smooth h-full">
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                      <Building2 className="h-6 w-6" />
                    </div>
                    {f.is_verified && <VerifiedBadge withLabel={false} />}
                  </div>
                  <h3 className="font-display font-semibold text-lg mt-4">{f.facility_name}</h3>
                  <p className="text-xs text-muted-foreground capitalize">{f.facility_type}</p>
                  <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{f.facility_city}</span>
                    <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-warning text-warning" />{f.rating || "4.5"}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{f.pricing?.length || 0} procedures listed</span>
                    <span className="text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      View <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
