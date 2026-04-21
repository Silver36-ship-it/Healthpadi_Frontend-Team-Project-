import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, User, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Role = "consumer" | "provider";

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("consumer");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Account created! Welcome to HealthPadi.");
      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 mesh-bg">
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2">
        <div className="h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center">
          <Activity className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="font-display font-bold">HealthPadi</span>
      </Link>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="glass rounded-3xl p-8 shadow-elevated">
          <h1 className="font-display text-3xl font-bold tracking-tight">Create account</h1>
          <p className="text-muted-foreground mt-2 text-sm">Join thousands making smarter healthcare choices.</p>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-2 mt-6">
            {[
              { k: "consumer", label: "I'm a Consumer", icon: User, desc: "Search & report prices" },
              { k: "provider", label: "I'm a Provider", icon: Building2, desc: "Claim & manage facility" },
            ].map((opt) => {
              const active = role === opt.k;
              return (
                <button
                  key={opt.k}
                  type="button"
                  onClick={() => setRole(opt.k as Role)}
                  className={`text-left p-4 rounded-2xl border-2 transition-smooth ${active ? "border-primary bg-accent" : "border-border hover:border-primary/40"}`}
                >
                  <opt.icon className={`h-5 w-5 mb-2 ${active ? "text-primary" : "text-muted-foreground"}`} />
                  <div className="text-sm font-semibold">{opt.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{opt.desc}</div>
                </button>
              );
            })}
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" required className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" placeholder="+234" required className="h-11" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required className="h-11" />
            </div>
            {role === "provider" && (
              <div className="space-y-2">
                <Label htmlFor="facility">Facility name</Label>
                <Input id="facility" required className="h-11" />
              </div>
            )}
            <Button type="submit" className="w-full h-11 shadow-soft" disabled={loading}>
              {loading ? "Creating..." : "Create account"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
