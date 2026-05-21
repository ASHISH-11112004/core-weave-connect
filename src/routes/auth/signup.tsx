import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/auth/signup")({
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    // Simulate signup delay
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
          <h2 className="text-2xl font-semibold mb-2">Create account</h2>
          <p className="text-sm text-muted-foreground mb-6">Join your workspace today</p>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 text-red-600 text-sm border border-red-500/20">
                {error}
              </div>
            )}

            {/* Name Input */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted/50 border border-border focus:border-primary/50 focus:bg-background outline-none text-sm transition"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted/50 border border-border focus:border-primary/50 focus:bg-background outline-none text-sm transition"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted/50 border border-border focus:border-primary/50 focus:bg-background outline-none text-sm transition"
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted/50 border border-border focus:border-primary/50 focus:bg-background outline-none text-sm transition"
                />
              </div>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 mt-6 rounded-lg gradient-primary text-white font-medium flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-70 transition"
            >
              {loading ? (
                "Creating account..."
              ) : (
                <>
                  Create account <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate({ to: "/auth/login" })}
            className="text-primary font-medium hover:underline"
          >
            Sign in
          </button>
        </p>
      </motion.div>
    </div>
  );
}
