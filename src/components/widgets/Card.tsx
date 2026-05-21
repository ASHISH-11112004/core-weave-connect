import { motion } from "framer-motion";
import { type ReactNode } from "react";

export function Surface({
  className = "",
  children,
  hover = false,
  delay = 0,
  elevated = false,
}: { className?: string; children: ReactNode; hover?: boolean; delay?: number; elevated?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 0.7, 0.2, 1] }}
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : undefined}
      className={`group/surface relative rounded-3xl bg-card border border-border/70 ${elevated ? "shadow-elevated" : "shadow-card"} ${hover ? "hover:border-border transition-colors" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function Avatar({
  initials, className = "", gradient = "gradient-accent", ring = false,
}: { initials: string; className?: string; gradient?: string; ring?: boolean }) {
  return (
    <div className={`shrink-0 grid place-items-center rounded-full text-white font-medium tracking-tight ${gradient} ${ring ? "ring-2 ring-card" : ""} ${className || "h-9 w-9 text-[11px]"}`}>
      {initials}
    </div>
  );
}

export function Badge({ children, color = "blue", subtle = true }: { children: ReactNode; color?: "blue" | "purple" | "cyan" | "green" | "amber" | "red" | "gray"; subtle?: boolean }) {
  const map: Record<string, string> = {
    blue: subtle ? "bg-blue-500/10 text-blue-400 ring-blue-500/20" : "bg-blue-500 text-white",
    purple: "bg-purple-500/10 text-purple-400 ring-purple-500/20",
    cyan: "bg-cyan-500/10 text-cyan-400 ring-cyan-500/20",
    green: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-500 ring-amber-500/20",
    red: "bg-red-500/10 text-red-400 ring-red-500/20",
    gray: "bg-muted text-muted-foreground ring-border",
  };
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-medium ring-1 ring-inset ${map[color]}`}>{children}</span>;
}

export function StatusDot({ status }: { status: string }) {
  const c = status === "online" ? "bg-emerald-500" : status === "busy" ? "bg-red-500" : status === "away" ? "bg-amber-500" : "bg-gray-400";
  return <span className={`h-2.5 w-2.5 rounded-full ${c} ring-2 ring-card inline-block`} />;
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
      <div>
        <h1 className="text-[28px] md:text-[34px] font-semibold tracking-tight leading-tight">{title}</h1>
        {subtitle && <p className="text-[13.5px] text-muted-foreground mt-1.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function SectionTitle({ icon: Icon, children, action }: { icon?: any; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        {Icon && <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary grid place-items-center"><Icon className="h-3.5 w-3.5" /></div>}
        <h3 className="font-semibold text-[14px] tracking-tight">{children}</h3>
      </div>
      {action}
    </div>
  );
}
