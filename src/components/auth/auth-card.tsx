"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { MOCK } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Eye, EyeOff, Mail, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// Lucide dropped brand icons; inline SVG for GitHub.
const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .297C5.37.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.42-1.305.762-1.605-2.665-.304-5.466-1.333-5.466-5.93 0-1.31.467-2.382 1.236-3.222-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.403 11.52 11.52 0 013.003.403c2.29-1.552 3.297-1.23 3.297-1.23.655 1.652.244 2.873.12 3.176.77.84 1.234 1.912 1.234 3.222 0 4.61-2.807 5.624-5.48 5.921.43.37.823 1.102.823 2.222 0 1.606-.014 2.9-.014 3.293 0 .32.216.694.825.576C20.565 22.092 24 17.597 24 12.297 24 5.67 18.627.297 12 .297z" />
  </svg>
);

type Mode = "login" | "signup";

export function AuthCard({ mode: initial }: { mode: Mode }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(initial);
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    city: MOCK.cities[0].name,
  });

  const emailValid = /\S+@\S+\.\S+/.test(form.email);
  const pwdValid = form.password.length >= 8;
  const confirmValid = mode === "signup" ? form.confirm === form.password && form.confirm.length > 0 : true;
  const nameValid = mode === "signup" ? form.name.trim().length >= 2 : true;

  const allValid = emailValid && pwdValid && confirmValid && nameValid;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allValid) {
      toast.error("Please fix validation errors first.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSuccess(true);
    await new Promise((r) => setTimeout(r, 1100));
    toast.success(mode === "login" ? "Welcome back!" : "Account created!");
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 mesh-bg relative overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute top-[10%] left-[20%] h-72 w-72 bg-civic-blue/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-[10%] right-[15%] h-80 w-80 bg-civic-purple/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-[30%] right-[25%] h-64 w-64 bg-civic-orange/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[560px]"
      >
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <Link href="/">
            <Logo size={48} />
          </Link>
        </motion.div>

        <div className="glass rounded-3xl p-8 md:p-10 relative">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="py-10 flex flex-col items-center text-center"
              >
                <div className="h-20 w-20 rounded-full bg-civic-teal/20 border-2 border-civic-teal flex items-center justify-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    <Check className="h-10 w-10 text-civic-teal" />
                  </motion.div>
                </div>
                <h2 className="font-display text-2xl font-bold mb-2">
                  {mode === "login" ? "Welcome back!" : "Account created!"}
                </h2>
                <p className="text-text-secondary">Redirecting to your dashboard…</p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Tab switcher */}
                <div className="relative grid grid-cols-2 bg-bg-primary/60 rounded-xl p-1 mb-8 border border-white/5">
                  <motion.div
                    layoutId="auth-tab-indicator"
                    className="absolute inset-y-1 rounded-lg bg-gradient-to-br from-civic-blue to-civic-purple shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                    animate={{
                      x: mode === "login" ? 0 : "100%",
                      width: "calc(50% - 4px)",
                      left: mode === "login" ? "4px" : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                  {(["login", "signup"] as Mode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={cn(
                        "relative z-10 py-2.5 text-sm font-medium transition-colors",
                        mode === m ? "text-white" : "text-text-secondary"
                      )}
                    >
                      {m === "login" ? "Login" : "Sign Up"}
                    </button>
                  ))}
                </div>

                <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">
                  {mode === "login"
                    ? "Welcome back to CivicFix"
                    : "Join the civic movement"}
                </h1>
                <p className="text-sm text-text-secondary mb-6">
                  {mode === "login"
                    ? "Log in to track your reports and upvote community issues."
                    : "Create an account to start reporting and holding your city accountable."}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === "signup" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <Field
                        label="Full name"
                        value={form.name}
                        valid={nameValid && form.name.length > 0}
                        onChange={(v) => setForm({ ...form, name: v })}
                        placeholder="Your name"
                      />
                    </motion.div>
                  )}

                  <Field
                    type="email"
                    label="Email"
                    value={form.email}
                    valid={emailValid}
                    onChange={(v) => setForm({ ...form, email: v })}
                    placeholder="you@example.com"
                  />

                  {mode === "signup" && (
                    <div>
                      <label className="text-xs text-text-secondary mb-1.5 block font-medium">
                        City
                      </label>
                      <select
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="w-full h-11 rounded-xl bg-bg-surface/80 border border-white/5 px-4 text-sm focus:outline-none focus:border-civic-blue"
                      >
                        {MOCK.cities.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="text-xs text-text-secondary mb-1.5 block font-medium">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showPwd ? "text" : "password"}
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        placeholder="••••••••"
                        className={cn(
                          "pr-12",
                          form.password && pwdValid && "border-civic-teal",
                          form.password && !pwdValid && "border-status-open"
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                        tabIndex={-1}
                      >
                        {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {form.password && !pwdValid && (
                      <p className="text-xs text-status-open mt-1">
                        Password must be at least 8 characters.
                      </p>
                    )}
                  </div>

                  {mode === "signup" && (
                    <Field
                      type="password"
                      label="Confirm password"
                      value={form.confirm}
                      valid={confirmValid}
                      onChange={(v) => setForm({ ...form, confirm: v })}
                      placeholder="••••••••"
                      errorMsg="Passwords don't match."
                    />
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full mt-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {mode === "login" ? "Signing in..." : "Creating account..."}
                      </>
                    ) : (
                      <>
                        {mode === "login" ? "Sign In" : "Create Account"}
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <div className="relative py-4">
                    <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
                    <span className="relative bg-bg-surface/90 px-4 text-xs text-text-muted uppercase tracking-wider">
                      or continue with
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="group"
                      onClick={() => toast.info("Google OAuth will be configured with Supabase.")}
                    >
                      <Mail className="h-4 w-4" />
                      Google
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => toast.info("GitHub OAuth will be configured with Supabase.")}
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center mt-6 text-sm text-text-secondary">
          {mode === "login" ? (
            <>
              New here?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-civic-blue-glow hover:underline font-medium"
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-civic-blue-glow hover:underline font-medium"
              >
                Log in
              </button>
            </>
          )}
        </p>
      </motion.div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  valid,
  placeholder,
  type = "text",
  errorMsg,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  valid: boolean;
  placeholder?: string;
  type?: string;
  errorMsg?: string;
}) {
  return (
    <div>
      <label className="text-xs text-text-secondary mb-1.5 block font-medium">
        {label}
      </label>
      <div className="relative">
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            value && valid && "border-civic-teal",
            value && !valid && "border-status-open"
          )}
        />
        {value && valid && (
          <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-civic-teal" />
        )}
      </div>
      {value && !valid && errorMsg && (
        <motion.p
          initial={{ x: -4 }}
          animate={{ x: [0, -4, 4, -2, 2, 0] }}
          transition={{ duration: 0.4 }}
          className="text-xs text-status-open mt-1"
        >
          {errorMsg}
        </motion.p>
      )}
    </div>
  );
}
