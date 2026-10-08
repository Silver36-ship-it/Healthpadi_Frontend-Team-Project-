import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Building2, MapPin, Star, ChevronRight, Loader2 } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { api } from "@/lib/api";

export default function FacilitiesPage() {
  const [filter, setFilter] = useState<"all" | "verified">("all");
  const {
    data: allFacilities = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["facilities"],
    queryFn: api.getFacilities,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: false,
  });

  useEffect(() => {
    if (error) console.error("Failed to load facilities:", error);
  }, [error]);

  const facilities = allFacilities.filter((f) => filter === "all" || f.is_verified);
  const showError = Boolean(error) && allFacilities.length === 0;

  return (
    <PageShell withMesh>
      <div className="container pt-10 pb-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Facilities</h1>
            <p className="mt-2 text-muted-foreground">
              {showError ? "Facilities are temporarily unavailable." : `${allFacilities.length} healthcare facilities tracked across Nigeria.`}
            </p>
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

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : showError ? (
          <div className="mt-8 rounded-2xl border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">We couldn’t load facilities. Please try again shortly.</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-4 rounded-full border border-border px-4 py-2 text-sm hover:border-primary/50"
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {facilities.map((f) => (
              <div key={f.facility_id}>
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
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
