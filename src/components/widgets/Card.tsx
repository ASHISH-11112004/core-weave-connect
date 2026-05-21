import { motion } from "framer-motion";
import { type ReactNode } from "react";

export function Surface({ className = "", children, hover = false, delay = 0 }: { className?: string; children: ReactNode; hover?: boolean; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      whileHover={hover ? { y: -2 } : undefined}
      className={`rounded-2xl bg-card border border-border shadow-sm shadow-black/[0.02] ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function Avatar({ initials, className = "", gradient = "gradient-accent" }: { initials: string; className?: string; gradient?: string }) {
  return (
    <div className={`shrink-0 grid place-items-center rounded-full text-white font-semibold ${gradient} ${className || "h-10 w-10 text-sm"}`}>
      {initials}
    </div>
  );
}

export function Badge({ children, color = "blue" }: { children: ReactNode; color?: "blue" | "purple" | "cyan" | "green" | "amber" | "red" | "gray" }) {
  const map: Record<string, string> = {
    blue: "bg-blue-500/10 text-blue-500",
    purple: "bg-purple-500/10 text-purple-500",
    cyan: "bg-cyan-500/10 text-cyan-500",
    green: "bg-emerald-500/10 text-emerald-500",
    amber: "bg-amber-500/10 text-amber-600",
    red: "bg-red-500/10 text-red-500",
    gray: "bg-muted text-muted-foreground",
  };
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${map[color]}`}>{children}</span>;
}

export function StatusDot({ status }: { status: string }) {
  const c = status === "online" ? "bg-emerald-500" : status === "busy" ? "bg-red-500" : status === "away" ? "bg-amber-500" : "bg-gray-400";
  return <span className={`h-2 w-2 rounded-full ${c} ring-2 ring-card inline-block`} />;
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
