import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Mail, Lock, Eye, EyeOff, ArrowRight, Heart, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

/* ─── Floating orb component ───────────────────────────────── */
function FloatingOrb({ delay, size, x, y, color }: { delay: number; size: number; x: string; y: string; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: color,
        filter: `blur(${size * 0.6}px)`,
      }}
      animate={{
        y: [0, -30, 0, 20, 0],
        x: [0, 15, -10, 5, 0],
        scale: [1, 1.15, 0.95, 1.08, 1],
        opacity: [0.5, 0.7, 0.4, 0.65, 0.5],
      }}
      transition={{
        duration: 12 + delay * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

/* ─── Pulse ring on logo ───────────────────────────────── */
function PulseRing({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute inset-0 rounded-2xl"
      style={{ border: "2px solid hsl(217 89% 55% / 0.4)" }}
      animate={{
        scale: [1, 1.8],
        opacity: [0.6, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeOut",
        delay,
      }}
    />
  );
}

/* ─── Shimmer border effect ───────────────────────────────── */
const shimmerKeyframes = `
@keyframes shimmer-rotate {
  0%   { --shimmer-angle: 0deg; }
  100% { --shimmer-angle: 360deg; }
}
@property --shimmer-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
`;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      {/* Inject shimmer keyframes */}
      <style>{shimmerKeyframes}</style>

      <div className="min-h-screen relative overflow-hidden flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, hsl(222 47% 5%) 0%, hsl(220 40% 8%) 30%, hsl(225 45% 7%) 70%, hsl(218 50% 6%) 100%)",
        }}
      >
        {/* ── Floating orbs background ── */}
        <FloatingOrb delay={0} size={300} x="5%" y="10%" color="radial-gradient(circle, hsl(217 89% 55% / 0.3), transparent)" />
        <FloatingOrb delay={2} size={200} x="70%" y="5%" color="radial-gradient(circle, hsl(152 69% 45% / 0.25), transparent)" />
        <FloatingOrb delay={4} size={250} x="80%" y="60%" color="radial-gradient(circle, hsl(195 85% 50% / 0.2), transparent)" />
        <FloatingOrb delay={1} size={180} x="15%" y="70%" color="radial-gradient(circle, hsl(270 70% 55% / 0.15), transparent)" />
        <FloatingOrb delay={3} size={150} x="50%" y="85%" color="radial-gradient(circle, hsl(217 89% 60% / 0.2), transparent)" />

        {/* ── Grid pattern overlay ── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(217 89% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(217 89% 60%) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* ── Top nav ── */}
        <motion.div
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-5 z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Activity className="h-5 w-5 text-white" />
              <PulseRing delay={0} />
              <PulseRing delay={1} />
            </div>
            <span className="font-display text-lg font-bold text-white/90 group-hover:text-white transition-colors">
              HealthPadi
            </span>
          </Link>
          <Button asChild variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
            <Link to="/register">
              Create account <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </motion.div>

        {/* ── Main card ── */}
        <motion.div
          className="relative z-10 w-full max-w-[420px] mx-4"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          {/* Holographic shimmer border */}
          <div
            className="absolute -inset-[1px] rounded-[28px] opacity-60"
            style={{
              background: "conic-gradient(from var(--shimmer-angle, 0deg), hsl(217 89% 55% / 0.1), hsl(152 69% 45% / 0.3), hsl(195 85% 50% / 0.1), hsl(270 70% 55% / 0.3), hsl(217 89% 55% / 0.1))",
              animation: "shimmer-rotate 4s linear infinite",
            }}
          />
          {/* Glow behind card */}
          <div className="absolute -inset-8 rounded-[48px] bg-blue-500/5 blur-3xl pointer-events-none" />

          <div
            className="relative rounded-[28px] px-8 py-10 overflow-hidden"
            style={{
              background: "linear-gradient(145deg, hsla(222, 47%, 12%, 0.85), hsla(222, 47%, 8%, 0.9))",
              backdropFilter: "blur(40px) saturate(150%)",
              border: "1px solid hsla(217, 89%, 55%, 0.08)",
            }}
          >
            {/* Inner card glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent rounded-full" />

            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              {/* Header */}
              <motion.div variants={itemVariants} className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/15 mb-5">
                  <Shield className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-xs font-medium text-blue-300/80">Secure login</span>
                </div>
                <h1 className="font-display text-3xl font-bold tracking-tight text-white">
                  Welcome back
                </h1>
                <p className="text-white/40 mt-2.5 text-sm leading-relaxed">
                  Sign in to compare prices and manage your healthcare
                </p>
              </motion.div>

              {/* Form */}
              <form onSubmit={submit} className="space-y-5">
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="login-email" className="text-white/60 text-xs font-medium uppercase tracking-wider">
                    Email address
                  </Label>
                  <div className="relative group">
                    <div
                      className="absolute -inset-[1px] rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"
                      style={{
                        background: "linear-gradient(135deg, hsl(217 89% 55% / 0.3), hsl(195 85% 50% / 0.2))",
                      }}
                    />
                    <div className="relative flex items-center">
                      <Mail className={`absolute left-3.5 h-4 w-4 transition-colors duration-300 ${focusedField === "email" ? "text-blue-400" : "text-white/25"}`} />
                      <Input
                        id="login-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="you@example.com"
                        className="pl-10 h-12 rounded-xl bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 focus:border-blue-500/40 focus:bg-white/[0.06] transition-all duration-300"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password" className="text-white/60 text-xs font-medium uppercase tracking-wider">
                      Password
                    </Label>
                    <a href="#" className="text-xs text-blue-400/70 hover:text-blue-400 transition-colors">
                      Forgot?
                    </a>
                  </div>
                  <div className="relative group">
                    <div
                      className="absolute -inset-[1px] rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"
                      style={{
                        background: "linear-gradient(135deg, hsl(217 89% 55% / 0.3), hsl(195 85% 50% / 0.2))",
                      }}
                    />
                    <div className="relative flex items-center">
                      <Lock className={`absolute left-3.5 h-4 w-4 transition-colors duration-300 ${focusedField === "password" ? "text-blue-400" : "text-white/25"}`} />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Enter your password"
                        className="pl-10 pr-11 h-12 rounded-xl bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 focus:border-blue-500/40 focus:bg-white/[0.06] transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 text-white/25 hover:text-white/50 transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-xl text-sm font-semibold relative overflow-hidden group shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-shadow duration-300"
                    style={{
                      background: "linear-gradient(135deg, hsl(217 89% 50%), hsl(195 85% 45%))",
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <motion.div
                            className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign in
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    {/* Hover shimmer */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%]" style={{ transition: "transform 0.7s ease, opacity 0.3s ease" }} />
                  </Button>
                </motion.div>
              </form>

              {/* Divider */}
              <motion.div variants={itemVariants} className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className="text-[11px] text-white/20 uppercase tracking-widest">or</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </motion.div>

              {/* Social sign-in hint */}
              <motion.div variants={itemVariants} className="text-center">
                <p className="text-sm text-white/30">
                  New to HealthPadi?{" "}
                  <Link
                    to="/register"
                    className="text-blue-400 font-medium hover:text-blue-300 transition-colors relative group/link"
                  >
                    Create an account
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-400 group-hover/link:w-full transition-all duration-300" />
                  </Link>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Bottom trust indicators ── */}
        <motion.div
          className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-6 text-white/15 text-xs z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-1.5">
            <Shield className="h-3 w-3" />
            <span>256-bit encryption</span>
          </div>
          <div className="h-3 w-px bg-white/10" />
          <div className="flex items-center gap-1.5">
            <Heart className="h-3 w-3" />
            <span>Trusted by thousands</span>
          </div>
          <div className="h-3 w-px bg-white/10" />
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" />
            <span>© {new Date().getFullYear()} HealthPadi</span>
          </div>
        </motion.div>
      </div>
    </>
  );
}
