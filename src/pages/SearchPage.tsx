import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { ResultsSkeleton } from "@/components/ResultsSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { ProcedureRow } from "@/components/ProcedureRow";
import { Button } from "@/components/ui/button";
import { NIGERIAN_STATES, PROCEDURE_CATEGORIES, formatNGN } from "@/lib/mockData";
import { api, SearchResult } from "@/lib/api";

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const [state, setState] = useState(params.get("state") || "All States");
  const [category, setCategory] = useState(params.get("category") || "All");
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const query = params.get("q") || "";
        const stateParam = params.get("state");
        const categoryParam = params.get("category") || "All";
        
        const res = await api.search(
          query, 
          undefined,
          stateParam !== "All States" ? stateParam || undefined : undefined
        );
        
        // Map backend flat results to the nested structure Expected by ProcedureRow
        let mappedResults = res.results.map((r, i) => ({
          id: `${r.facility_id}-${r.procedure_name}-${i}`, // Unique ID for keying
          facility: {
            id: r.facility_id,
            name: r.facility_name,
            city: r.facility_city,
            state: r.facility_state,
            address: r.facility_address,
            rating: parseFloat(r.rating) || 4.5,
            is_verified: true,
            is_claimed: true,
          },
          procedure_name: r.procedure_name,
          price_ngn: parseFloat(r.price),
          price_source: r.price_source as any,
          community_count: r.community_submission_count,
          is_stale: r.is_price_stale
        }));

        if (categoryParam !== "All") {
          mappedResults = mappedResults.filter(r => {
             const proc = r.procedure_name.toLowerCase();
             if (categoryParam === "Imaging") return proc.includes('x-ray') || proc.includes('mri') || proc.includes('scan') || proc.includes('ultrasound');
             if (categoryParam === "Laboratory") return proc.includes('blood') || proc.includes('test') || proc.includes('culture') || proc.includes('fbc') || proc.includes('rdt');
             if (categoryParam === "Maternal") return proc.includes('antenatal') || proc.includes('delivery') || proc.includes('cs:');
             if (categoryParam === "Fertility") return proc.includes('ivf');
             if (categoryParam === "Surgery") return proc.includes('surgery') || proc.includes('appendectomy');
             if (categoryParam === "Dental") return proc.includes('dental') || proc.includes('teeth');
             return true;
          });
        }

        setResults(mappedResults as any);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [params]);

  const stats = useMemo(() => {
    if (!results.length) return null;
    const prices = results.map((r: any) => r.price_ngn || parseFloat(r.price) || 0);
    return {
      count: results.length,
      min: Math.min(...prices),
      max: Math.max(...prices),
      avg: Math.round(prices.reduce((a: number, b: number) => a + b, 0) / prices.length),
    };
  }, [results]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams();
    if (q) next.set("q", q);
    if (state !== "All States") next.set("state", state);
    if (category !== "All") next.set("category", category);
    setParams(next);
  };

  return (
    <PageShell withMesh>
      <div className="container pt-10 pb-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Compare Prices</h1>
          <p className="mt-2 text-muted-foreground">Live procedure prices from across Nigeria.</p>
        </motion.div>

        {/* Search bar */}
        <form onSubmit={submit} className="mt-8">
          <div className="glass rounded-2xl p-2 flex items-center gap-2 shadow-soft-lg">
            <Search className="h-5 w-5 text-muted-foreground ml-3" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search procedure or facility (e.g., MRI, Reddington)..."
              className="flex-1 bg-transparent outline-none py-3 px-1 text-base placeholder:text-muted-foreground"
            />
            {q && (
              <button type="button" onClick={() => setQ("")} className="text-muted-foreground hover:text-foreground p-1">
                <X className="h-4 w-4" />
              </button>
            )}
            <Button type="button" variant="ghost" onClick={() => setShowFilters((v) => !v)} className="rounded-xl">
              <SlidersHorizontal className="h-4 w-4 mr-1" />
              Filters
            </Button>
            <Button type="submit" className="rounded-xl">Search</Button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 glass rounded-2xl p-5 grid sm:grid-cols-2 gap-4"
            >
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">State</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {NIGERIAN_STATES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setState(s)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-smooth ${state === s ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/50"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {PROCEDURE_CATEGORIES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCategory(c)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-smooth ${category === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/50"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </form>

        {/* Stats */}
        {stats && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {[
              { label: "Results", value: stats.count.toString() },
              { label: "Lowest", value: formatNGN(stats.min) },
              { label: "Average", value: formatNGN(stats.avg) },
              { label: "Highest", value: formatNGN(stats.max) },
            ].map((s) => (
              <div key={s.label} className="bg-card border border-border rounded-xl p-4">
                <div className="text-xs text-muted-foreground">{s.label}</div>
                <div className="font-display text-lg font-bold mt-1 tabular-nums">{s.value}</div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Results */}
        <div className="mt-8">
          {loading ? (
            <ResultsSkeleton />
          ) : results.length === 0 ? (
            <EmptyState
              title="No results found"
              description={`We couldn't find any procedures matching "${q}". Try a different search or remove some filters.`}
              actionLabel="Reset filters"
              onAction={() => { setQ(""); setState("All States"); setCategory("All"); setParams(new URLSearchParams()); }}
            />
          ) : (
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
              <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <div className="col-span-5">Facility</div>
                <div className="col-span-4">Procedure & Price</div>
                <div className="col-span-2">Source</div>
                <div className="col-span-1 text-right">Action</div>
              </div>
              {results.map((r, i) => (
                <ProcedureRow key={r.id} p={r} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
