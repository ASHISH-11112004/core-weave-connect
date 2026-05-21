import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setLoading(false);
      // Navigate to dashboard
      navigate({ to: "/_app" });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500/10 via-background to-purple-500/10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg gradient-primary mb-4">
            <span className="text-white font-bold text-xl">✨</span>
          </div>
          <h1 className="text-3xl font-bold gradient-text">Aurora</h1>
          <p className="text-muted-foreground mt-2">Modern Workplace OS</p>
        </div>

        {/* Form Card */}
        <div className="frost rounded-3xl border border-border/60 p-8 backdrop-blur-md">
          <h2 className="text-2xl font-semibold mb-2">Welcome back</h2>
          <p className="text-sm text-muted-foreground mb-6">Sign in to your account to continue</p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div className="relative">
              <label className="text-sm font-medium text-foreground block mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted/50 border border-border focus:border-primary/50 focus:bg-background outline-none text-sm transition"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <label className="text-sm font-medium text-foreground block mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted/50 border border-border focus:border-primary/50 focus:bg-background outline-none text-sm transition"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 mt-6 rounded-lg gradient-primary text-white font-medium flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-70 transition"
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  Sign in <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-background text-muted-foreground">Or</span>
              </div>
            </div>

            {/* Demo Logins */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setEmail("maya@aurora.com");
                  setPassword("demo");
                }}
                className="w-full h-10 rounded-lg border border-border bg-card hover:bg-muted text-sm font-medium transition"
              >
                Demo: Chief of Staff
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail("sophia@aurora.com");
                  setPassword("demo");
                }}
                className="w-full h-10 rounded-lg border border-border bg-card hover:bg-muted text-sm font-medium transition"
              >
                Demo: Manager
              </button>
            </div>
          </form>
        </div>

        {/* Signup Link */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <button
            onClick={() => navigate({ to: "/auth/signup" })}
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </button>
        </p>
      </motion.div>
    </div>
  );
}
