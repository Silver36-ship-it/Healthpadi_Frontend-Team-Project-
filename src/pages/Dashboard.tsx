import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, Bell, FileText, ShieldCheck, TrendingUp, Plus, Building2 } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { mockReports, mockNotifications, formatNGN, allFacilities } from "@/lib/mockData";
import { useState } from "react";

const statusColor: Record<string, string> = {
  pending: "bg-secondary text-secondary-foreground",
  reviewing: "bg-info-soft text-info",
  resolved: "bg-success-soft text-success",
};

export default function Dashboard() {
  const [role, setRole] = useState<"consumer" | "provider">("consumer");
  const myFacility = allFacilities[0];

  const stats = role === "consumer"
    ? [
        { label: "Reports filed", value: "2", icon: FileText, color: "text-primary", bg: "bg-accent" },
        { label: "Resolved", value: "1", icon: ShieldCheck, color: "text-success", bg: "bg-success-soft" },
        { label: "Money saved", value: formatNGN(28000), icon: TrendingUp, color: "text-info", bg: "bg-info-soft" },
        { label: "Notifications", value: "3", icon: Bell, color: "text-warning", bg: "bg-warning-soft" },
      ]
    : [
        { label: "Facility status", value: "Verified", icon: ShieldCheck, color: "text-success", bg: "bg-success-soft" },
        { label: "Procedures listed", value: "12", icon: Activity, color: "text-primary", bg: "bg-accent" },
        { label: "Profile views", value: "1,284", icon: TrendingUp, color: "text-info", bg: "bg-info-soft" },
        { label: "Open reports", value: "1", icon: FileText, color: "text-warning", bg: "bg-warning-soft" },
      ];

  return (
    <PageShell withMesh>
      <div className="container pt-10 pb-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back, Ada</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mt-1">Your dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="inline-flex bg-secondary p-1 rounded-full">
              {(["consumer", "provider"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`text-xs font-medium px-4 py-1.5 rounded-full transition-smooth ${role === r ? "bg-card shadow-soft text-foreground" : "text-muted-foreground"}`}
                >
                  {r === "consumer" ? "Consumer" : "Provider"} view
                </button>
              ))}
            </div>
            <Button asChild size="sm" className="shadow-soft">
              <Link to="/report"><Plus className="h-4 w-4 mr-1" />New report</Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-gradient-card border border-border rounded-2xl p-5"
            >
              <div className={`h-10 w-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div className="font-display text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          {/* Reports / Provider panel */}
          <div className="lg:col-span-2">
            {role === "consumer" ? (
              <div className="bg-card border border-border rounded-2xl shadow-soft overflow-hidden">
                <div className="p-5 border-b border-border flex items-center justify-between">
                  <h2 className="font-display font-semibold">Recent reports</h2>
                  <Link to="/report" className="text-xs text-primary font-medium">View all</Link>
                </div>
                {mockReports.length === 0 && (
                  <div className="p-10 text-center text-muted-foreground text-sm">No reports yet.</div>
                )}
                {mockReports.map((r) => (
                  <div key={r.id} className="p-5 border-b border-border last:border-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="font-medium">{r.facility_name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{r.procedure_name}</div>
                      </div>
                      <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full ${statusColor[r.status]}`}>{r.status}</span>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <div className="text-xs text-muted-foreground">Advertised</div>
                        <div className="font-semibold tabular-nums">{formatNGN(r.advertised_price)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Charged</div>
                        <div className="font-semibold tabular-nums text-warning">{formatNGN(r.charged_price)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Difference</div>
                        <div className="font-semibold tabular-nums text-destructive">+{formatNGN(r.charged_price - r.advertised_price)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card border border-border rounded-2xl shadow-soft p-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center">
                    <Building2 className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-display font-bold text-lg">{myFacility.name}</h2>
                      <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-success-soft text-success">Claimed</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{myFacility.address}</p>
                  </div>
                </div>
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-secondary">
                    <div className="text-xs text-muted-foreground">Verification</div>
                    <div className="font-semibold text-success mt-1">Approved · April 2, 2025</div>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary">
                    <div className="text-xs text-muted-foreground">Last price update</div>
                    <div className="font-semibold mt-1">Today, 09:14</div>
                  </div>
                </div>
                <Button asChild className="mt-6">
                  <Link to={`/facility/${myFacility.id}`}>Manage facility</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Notifications */}
          <aside className="bg-card border border-border rounded-2xl shadow-soft overflow-hidden h-fit">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h2 className="font-display font-semibold">Notifications</h2>
              <span className="text-xs text-muted-foreground">{mockNotifications.filter((n) => !n.read).length} new</span>
            </div>
            {mockNotifications.map((n) => (
              <div key={n.id} className="p-4 border-b border-border last:border-0 flex gap-3">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                  n.type === "success" ? "bg-success-soft text-success" :
                  n.type === "warning" ? "bg-warning-soft text-warning" :
                  "bg-info-soft text-info"
                }`}>
                  <Bell className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium flex items-center gap-2">
                    {n.title}
                    {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </PageShell>
  );
}
