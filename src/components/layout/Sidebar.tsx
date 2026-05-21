import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Megaphone, Award, Users, Building2, Calendar,
  BookOpen, MessageSquare, Images, Trophy, Shield, Settings, Sparkles, ChevronLeft,
} from "lucide-react";

export const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, group: "Workspace" },
  { to: "/announcements", label: "Announcements", icon: Megaphone, group: "Workspace" },
  { to: "/recognition", label: "Recognition Wall", icon: Award, group: "Workspace" },
  { to: "/discussions", label: "Discussions", icon: MessageSquare, group: "Workspace" },
  { to: "/directory", label: "Employee Directory", icon: Users, group: "People" },
  { to: "/teams", label: "Teams & Departments", icon: Building2, group: "People" },
  { to: "/calendar", label: "Event Calendar", icon: Calendar, group: "People" },
  { to: "/knowledge", label: "Knowledge Hub", icon: BookOpen, group: "Resources" },
  { to: "/gallery", label: "Media Gallery", icon: Images, group: "Resources" },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy, group: "Resources" },
  { to: "/admin", label: "Admin Panel", icon: Shield, group: "Manage" },
  { to: "/settings", label: "Settings", icon: Settings, group: "Manage" },
] as const;

const groups = ["Workspace", "People", "Resources", "Manage"] as const;

export function Sidebar({
  collapsed, setCollapsed, onNavigate,
}: { collapsed: boolean; setCollapsed: (v: boolean) => void; onNavigate?: () => void }) {
  const { location } = useRouterState();
  const pathname = location.pathname;

  return (
    <motion.aside
      animate={{ width: collapsed ? 76 : 252 }}
      transition={{ type: "spring", stiffness: 280, damping: 32 }}
      className="hidden md:flex shrink-0 h-screen sticky top-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground"
    >
      <div className="flex items-center gap-2.5 px-4 h-16 border-b border-sidebar-border">
        <div className="h-8 w-8 rounded-xl gradient-primary grid place-items-center text-white shadow-lg shadow-blue-500/25">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }}
              className="flex flex-col leading-tight"
            >
              <span className="font-semibold text-[14px] tracking-tight">Aurora</span>
              <span className="text-[10.5px] text-muted-foreground">Workplace OS</span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto h-7 w-7 grid place-items-center rounded-lg hover:bg-sidebar-accent text-muted-foreground hover:text-foreground transition"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft className={`h-3.5 w-3.5 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {groups.map((g) => (
          <div key={g}>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="px-3 mb-1.5 text-[10px] uppercase tracking-[0.08em] text-muted-foreground/70 font-medium"
                >
                  {g}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="space-y-0.5">
              {navItems.filter((n) => n.group === g).map((item) => {
                const active = pathname === item.to;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to} to={item.to} onClick={onNavigate}
                    className={`group relative flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] transition-all ${
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="active-pill"
                        className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full gradient-primary"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <Icon className={`h-4 w-4 shrink-0 ${active ? "text-primary" : ""}`} strokeWidth={1.75} />
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -4 }}
                          className="truncate"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
            className="m-3 rounded-2xl p-4 gradient-mesh border border-sidebar-border relative overflow-hidden"
          >
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-white/10 grid place-items-center"><Sparkles className="h-3 w-3 text-white" /></div>
              <span className="text-[12px] font-semibold">Aurora AI</span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">
              Ask anything — policies, people, projects.
            </p>
            <button className="mt-3 w-full rounded-lg bg-white/10 hover:bg-white/15 text-[11.5px] font-medium py-1.5 transition">
              Open assistant
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
