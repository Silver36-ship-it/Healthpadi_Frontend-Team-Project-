import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, ArrowRight, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // If already logged in, redirect
  if (isAuthenticated) {
    const from = (location.state as any)?.from || "/dashboard";
    navigate(from, { replace: true });
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      const from = (location.state as any)?.from || "/dashboard";
      navigate(from, { replace: true });
    } catch (err: any) {
      toast.error(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 mesh-bg opacity-40" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground w-full">
          <Link to="/" className="flex items-center gap-2 w-fit">
            <div className="h-9 w-9 rounded-xl bg-primary-foreground/15 backdrop-blur flex items-center justify-center">
              <Activity className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-bold">HealthPadi</span>
          </Link>
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight max-w-md">Know the cost before you go.</h2>
            <p className="mt-4 opacity-90 max-w-md">No more hospital bill surprises. Compare procedure prices across Lagos facilities and walk in prepared.</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-primary-foreground bg-primary-foreground/20" />
                ))}
              </div>
              <span className="text-sm opacity-90">Trusted by thousands of Nigerians</span>
            </div>
          </div>
          <div className="text-xs opacity-60">© {new Date().getFullYear()} HealthPadi</div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
        <div className="absolute top-6 right-6">
          <Button asChild variant="ghost" size="sm">
            <Link to="/register">Create account <ArrowRight className="h-4 w-4 ml-1" /></Link>
          </Button>
        </div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <h1 className="font-display text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground mt-2 text-sm">Sign in to access your dashboard.</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="pl-9 h-11"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-9 h-11"
                />
              </div>
            </div>
            <Button type="submit" className="w-full h-11 shadow-soft" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            New to HealthPadi? <Link to="/register" className="text-primary font-medium hover:underline">Create an account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
