import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Megaphone, Award, Users, Building2, Calendar,
  BookOpen, MessageSquare, Images, Trophy, Shield, Settings, Sparkles, ChevronLeft,
} from "lucide-react";

export const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/announcements", label: "Announcements", icon: Megaphone },
  { to: "/recognition", label: "Recognition Wall", icon: Award },
  { to: "/directory", label: "Employee Directory", icon: Users },
  { to: "/teams", label: "Teams & Departments", icon: Building2 },
  { to: "/calendar", label: "Event Calendar", icon: Calendar },
  { to: "/knowledge", label: "Knowledge Hub", icon: BookOpen },
  { to: "/discussions", label: "Discussions", icon: MessageSquare },
  { to: "/gallery", label: "Media Gallery", icon: Images },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/admin", label: "Admin Panel", icon: Shield },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar({
  collapsed, setCollapsed, onNavigate,
}: { collapsed: boolean; setCollapsed: (v: boolean) => void; onNavigate?: () => void }) {
  const { location } = useRouterState();
  const pathname = location.pathname;

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 264 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="hidden md:flex shrink-0 h-screen sticky top-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground"
    >
      <div className="flex items-center gap-3 px-5 h-16 border-b border-sidebar-border">
        <div className="h-9 w-9 rounded-2xl gradient-primary grid place-items-center text-white shadow-lg shadow-blue-500/20">
          <Sparkles className="h-4 w-4" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className="flex flex-col leading-tight"
            >
              <span className="font-semibold tracking-tight">Aurora</span>
              <span className="text-[11px] text-muted-foreground">Workplace OS</span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto h-7 w-7 grid place-items-center rounded-lg hover:bg-sidebar-accent transition"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full gradient-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <Icon className={`h-4.5 w-4.5 shrink-0 ${active ? "text-primary" : ""}`} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    className="truncate"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="m-3 rounded-2xl p-4 gradient-mesh border border-sidebar-border relative overflow-hidden"
          >
            <div className="text-sm font-semibold">Aurora AI</div>
            <p className="text-xs text-muted-foreground mt-1">
              Ask anything — policies, people, projects.
            </p>
            <button className="mt-3 w-full rounded-xl gradient-primary text-white text-xs font-medium py-2 hover:opacity-95 transition">
              Open Assistant
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
