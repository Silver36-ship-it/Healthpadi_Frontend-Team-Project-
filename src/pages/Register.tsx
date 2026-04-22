import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, User, Building2, Mail, Lock, Phone, UserCircle, ArrowRight, Shield, Heart, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

type Role = "consumer" | "provider";

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
      style={{ border: "2px solid hsl(152 69% 45% / 0.4)" }}
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

export default function Register() {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const [role, setRole] = useState<Role>("consumer");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({
        username,
        email,
        password,
        phone,
        role: role === "consumer" ? "user" : "provider",
      });
      toast.success("Account created! Welcome to HealthPadi.");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.25 },
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

  const roles = [
    {
      k: "consumer" as Role,
      label: "Consumer",
      icon: User,
      desc: "Search & compare prices",
      gradient: "from-blue-500 to-cyan-400",
      glow: "hsl(217 89% 55% / 0.15)",
    },
    {
      k: "provider" as Role,
      label: "Provider",
      icon: Building2,
      desc: "Claim & manage facility",
      gradient: "from-emerald-500 to-teal-400",
      glow: "hsl(152 69% 45% / 0.15)",
    },
  ];

  return (
    <>
      <style>{shimmerKeyframes}</style>

      <div
        className="min-h-screen relative overflow-hidden flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, hsl(222 47% 5%) 0%, hsl(220 40% 8%) 30%, hsl(225 45% 7%) 70%, hsl(218 50% 6%) 100%)",
        }}
      >
        {/* ── Floating orbs ── */}
        <FloatingOrb delay={0} size={280} x="8%" y="15%" color="radial-gradient(circle, hsl(152 69% 45% / 0.25), transparent)" />
        <FloatingOrb delay={2} size={220} x="75%" y="8%" color="radial-gradient(circle, hsl(217 89% 55% / 0.25), transparent)" />
        <FloatingOrb delay={4} size={200} x="85%" y="65%" color="radial-gradient(circle, hsl(270 70% 55% / 0.15), transparent)" />
        <FloatingOrb delay={1} size={250} x="10%" y="70%" color="radial-gradient(circle, hsl(195 85% 50% / 0.2), transparent)" />
        <FloatingOrb delay={3} size={160} x="55%" y="88%" color="radial-gradient(circle, hsl(152 69% 45% / 0.2), transparent)" />

        {/* ── Grid pattern overlay ── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(152 69% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(152 69% 50%) 1px, transparent 1px)`,
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
            <div className="relative h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Activity className="h-5 w-5 text-white" />
              <PulseRing delay={0} />
              <PulseRing delay={1} />
            </div>
            <span className="font-display text-lg font-bold text-white/90 group-hover:text-white transition-colors">
              HealthPadi
            </span>
          </Link>
          <Button asChild variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
            <Link to="/login">
              Sign in <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </motion.div>

        {/* ── Main card ── */}
        <motion.div
          className="relative z-10 w-full max-w-[480px] mx-4 mt-8"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          {/* Holographic shimmer border */}
          <div
            className="absolute -inset-[1px] rounded-[28px] opacity-60"
            style={{
              background: "conic-gradient(from var(--shimmer-angle, 0deg), hsl(152 69% 45% / 0.1), hsl(217 89% 55% / 0.3), hsl(195 85% 50% / 0.1), hsl(152 69% 45% / 0.3), hsl(270 70% 55% / 0.1))",
              animation: "shimmer-rotate 4s linear infinite",
            }}
          />
          <div className="absolute -inset-8 rounded-[48px] bg-emerald-500/5 blur-3xl pointer-events-none" />

          <div
            className="relative rounded-[28px] px-8 py-8 overflow-hidden"
            style={{
              background: "linear-gradient(145deg, hsla(222, 47%, 12%, 0.85), hsla(222, 47%, 8%, 0.9))",
              backdropFilter: "blur(40px) saturate(150%)",
              border: "1px solid hsla(152, 69%, 45%, 0.08)",
            }}
          >
            {/* Inner card glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent rounded-full" />

            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              {/* Header */}
              <motion.div variants={itemVariants} className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/15 mb-4">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-xs font-medium text-emerald-300/80">Join HealthPadi</span>
                </div>
                <h1 className="font-display text-3xl font-bold tracking-tight text-white">
                  Create your account
                </h1>
                <p className="text-white/40 mt-2 text-sm leading-relaxed">
                  Join thousands making smarter healthcare choices
                </p>
              </motion.div>

              {/* Role selector */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 mb-6">
                {roles.map((opt) => {
                  const active = role === opt.k;
                  return (
                    <button
                      key={opt.k}
                      type="button"
                      onClick={() => setRole(opt.k)}
                      className="relative text-left p-4 rounded-2xl border transition-all duration-300 overflow-hidden group/role"
                      style={{
                        borderColor: active ? "hsla(152, 69%, 45%, 0.3)" : "hsla(0, 0%, 100%, 0.06)",
                        background: active ? opt.glow : "hsla(0, 0%, 100%, 0.02)",
                      }}
                    >
                      {active && (
                        <motion.div
                          className="absolute top-2.5 right-2.5 h-5 w-5 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        >
                          <Check className="h-3 w-3 text-white" />
                        </motion.div>
                      )}
                      <div
                        className={`h-8 w-8 rounded-xl flex items-center justify-center mb-2.5 bg-gradient-to-br ${opt.gradient} ${active ? "opacity-100 shadow-lg" : "opacity-30"} transition-all duration-300`}
                        style={{
                          boxShadow: active ? `0 4px 16px ${opt.glow}` : "none",
                        }}
                      >
                        <opt.icon className="h-4 w-4 text-white" />
                      </div>
                      <div className={`text-sm font-semibold ${active ? "text-white" : "text-white/50"} transition-colors`}>
                        {opt.label}
                      </div>
                      <div className={`text-xs mt-0.5 ${active ? "text-white/50" : "text-white/20"} transition-colors`}>
                        {opt.desc}
                      </div>
                    </button>
                  );
                })}
              </motion.div>

              {/* Form */}
              <form onSubmit={submit} className="space-y-4">
                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
                  {/* Username */}
                  <div className="space-y-1.5">
                    <Label htmlFor="reg-username" className="text-white/60 text-[11px] font-medium uppercase tracking-wider">
                      Username
                    </Label>
                    <div className="relative group">
                      <div className="absolute -inset-[1px] rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, hsl(152 69% 45% / 0.3), hsl(195 85% 50% / 0.2))" }} />
                      <div className="relative flex items-center">
                        <UserCircle className={`absolute left-3 h-4 w-4 transition-colors duration-300 ${focusedField === "username" ? "text-emerald-400" : "text-white/25"}`} />
                        <Input
                          id="reg-username"
                          required
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          onFocus={() => setFocusedField("username")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="johndoe"
                          className="pl-9 h-11 rounded-xl bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 focus:border-emerald-500/40 focus:bg-white/[0.06] transition-all duration-300 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <Label htmlFor="reg-phone" className="text-white/60 text-[11px] font-medium uppercase tracking-wider">
                      Phone
                    </Label>
                    <div className="relative group">
                      <div className="absolute -inset-[1px] rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, hsl(152 69% 45% / 0.3), hsl(195 85% 50% / 0.2))" }} />
                      <div className="relative flex items-center">
                        <Phone className={`absolute left-3 h-4 w-4 transition-colors duration-300 ${focusedField === "phone" ? "text-emerald-400" : "text-white/25"}`} />
                        <Input
                          id="reg-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          onFocus={() => setFocusedField("phone")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="+234"
                          className="pl-9 h-11 rounded-xl bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 focus:border-emerald-500/40 focus:bg-white/[0.06] transition-all duration-300 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div variants={itemVariants} className="space-y-1.5">
                  <Label htmlFor="reg-email" className="text-white/60 text-[11px] font-medium uppercase tracking-wider">
                    Email address
                  </Label>
                  <div className="relative group">
                    <div className="absolute -inset-[1px] rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, hsl(152 69% 45% / 0.3), hsl(195 85% 50% / 0.2))" }} />
                    <div className="relative flex items-center">
                      <Mail className={`absolute left-3.5 h-4 w-4 transition-colors duration-300 ${focusedField === "email" ? "text-emerald-400" : "text-white/25"}`} />
                      <Input
                        id="reg-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="you@example.com"
                        className="pl-10 h-11 rounded-xl bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 focus:border-emerald-500/40 focus:bg-white/[0.06] transition-all duration-300 text-sm"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Password */}
                <motion.div variants={itemVariants} className="space-y-1.5">
                  <Label htmlFor="reg-password" className="text-white/60 text-[11px] font-medium uppercase tracking-wider">
                    Password
                  </Label>
                  <div className="relative group">
                    <div className="absolute -inset-[1px] rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, hsl(152 69% 45% / 0.3), hsl(195 85% 50% / 0.2))" }} />
                    <div className="relative flex items-center">
                      <Lock className={`absolute left-3.5 h-4 w-4 transition-colors duration-300 ${focusedField === "password" ? "text-emerald-400" : "text-white/25"}`} />
                      <Input
                        id="reg-password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Create a strong password"
                        className="pl-10 h-11 rounded-xl bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 focus:border-emerald-500/40 focus:bg-white/[0.06] transition-all duration-300 text-sm"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-1">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-xl text-sm font-semibold relative overflow-hidden group shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-shadow duration-300"
                    style={{
                      background: "linear-gradient(135deg, hsl(152 69% 42%), hsl(170 75% 40%))",
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
                          Creating account...
                        </>
                      ) : (
                        <>
                          Create account
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%]" style={{ transition: "transform 0.7s ease, opacity 0.3s ease" }} />
                  </Button>
                </motion.div>
              </form>

              {/* Footer */}
              <motion.div variants={itemVariants} className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className="text-[11px] text-white/20 uppercase tracking-widest">or</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </motion.div>

              <motion.div variants={itemVariants} className="text-center">
                <p className="text-sm text-white/30">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors relative group/link"
                  >
                    Sign in
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-emerald-400 group-hover/link:w-full transition-all duration-300" />
                  </Link>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Bottom trust indicators ── */}
        <motion.div
          className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-6 text-white/15 text-xs z-10"
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
