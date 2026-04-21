import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Search, ShieldCheck, TrendingUp, Sparkles, Activity, MapPin, Heart } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Verified facilities", value: "2,400+" },
  { label: "Procedures tracked", value: "180+" },
  { label: "Cities covered", value: "36" },
  { label: "Reports resolved", value: "94%" },
];

const features = [
  { icon: Search, title: "Price Pulse Search", desc: "Compare prices for X-Ray, MRI, lab tests and more across thousands of verified facilities in real time.", color: "text-primary", bg: "bg-accent" },
  { icon: ShieldCheck, title: "Provider Verified", desc: "Trust the green badge — prices come straight from facilities or are confirmed by the community.", color: "text-success", bg: "bg-success-soft" },
  { icon: TrendingUp, title: "Transparency Reports", desc: "Spotted overcharging? File a report in 30 seconds and help fellow Nigerians avoid surprise bills.", color: "text-warning", bg: "bg-warning-soft" },
];

const popularSearches = ["Chest X-Ray", "MRI Scan", "Malaria Test", "Antenatal", "CT Scan", "FBC"];

export default function Landing() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <PageShell withMesh>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container pt-16 pb-20 md:pt-24 md:pb-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium text-primary mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Now tracking 2,400+ facilities across Nigeria
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              Healthcare prices,<br />
              <span className="text-gradient">finally transparent.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Find, compare and verify the real cost of medical procedures at hospitals, clinics and diagnostic centres across Nigeria — before you walk in.
            </p>
          </motion.div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-10 max-w-2xl"
          >
            <div className="glass rounded-2xl p-2 flex items-center gap-2 shadow-elevated">
              <div className="flex items-center pl-4 text-muted-foreground">
                <Search className="h-5 w-5" />
              </div>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Try “MRI Scan in Lagos”..."
                className="flex-1 bg-transparent border-0 outline-none py-3 px-2 text-base placeholder:text-muted-foreground"
              />
              <Button type="submit" size="lg" className="rounded-xl shadow-soft">
                Search
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground mr-1">Popular:</span>
              {popularSearches.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => navigate(`/search?q=${encodeURIComponent(t)}`)}
                  className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-accent transition-smooth"
                >
                  {t}
                </button>
              ))}
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-5">
                <div className="font-display text-2xl md:text-3xl font-bold text-gradient">{s.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating decorative card */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden lg:block absolute right-12 top-32 w-72 animate-float"
        >
          <div className="glass rounded-2xl p-5 shadow-elevated">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-lg bg-success-soft flex items-center justify-center">
                  <Heart className="h-4 w-4 text-success" />
                </div>
                <div>
                  <div className="font-display font-semibold text-sm">Reddington Hospital</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />Lagos</div>
                </div>
              </div>
              <Activity className="h-4 w-4 text-success animate-pulse-soft" />
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Chest X-Ray</div>
                <div className="font-display text-2xl font-bold">₦18,000</div>
              </div>
              <span className="text-[10px] font-semibold text-success bg-success-soft px-2 py-1 rounded-full">VERIFIED</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="container py-20">
        <div className="max-w-2xl mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Built for trust. Designed for clarity.</h2>
          <p className="mt-3 text-muted-foreground">Everything you need to make informed healthcare decisions — without the guesswork.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-gradient-card border border-border rounded-2xl p-6 hover:shadow-elevated transition-smooth"
            >
              <div className={`h-12 w-12 rounded-xl ${f.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-bounce`}>
                <f.icon className={`h-6 w-6 ${f.color}`} />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 md:p-16 text-primary-foreground">
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Are you a healthcare provider?</h2>
            <p className="mt-4 text-base md:text-lg opacity-90">Claim your facility, manage your prices, and earn the verified badge that patients trust.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary" className="shadow-soft">
                <Link to="/register">Claim your facility</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link to="/search">Explore prices</Link>
              </Button>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-primary-foreground/10 blur-3xl" />
          <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-primary-foreground/10 blur-2xl" />
        </div>
      </section>
    </PageShell>
  );
}
