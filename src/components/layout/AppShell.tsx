import { useState } from "react";
import { Outlet, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { Sidebar, navItems } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Link } from "@tanstack/react-router";

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { location } = useRouterState();

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
              className="fixed z-50 top-0 left-0 h-dvh w-72 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col md:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 h-16 border-b border-sidebar-border shrink-0">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-xl gradient-primary grid place-items-center text-white shadow-lg shadow-blue-500/25">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="font-semibold text-[14px] tracking-tight">Aurora</span>
                    <span className="text-[10px] text-muted-foreground">Workplace OS</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="h-8 w-8 grid place-items-center rounded-lg hover:bg-sidebar-accent text-muted-foreground hover:text-foreground transition"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {navItems.map((n) => {
                  const isActive = location.pathname === n.to;
                  const Icon = n.icon;
                  return (
                    <Link
                      key={n.to}
                      to={n.to}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{n.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="border-t border-sidebar-border p-4 shrink-0">
                <button className="w-full inline-flex items-center justify-center gap-2 h-9 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 text-sm font-medium transition">
                  <Sparkles className="h-3.5 w-3.5" /> Ask Aurora
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar onOpenMobileNav={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto px-3 sm:px-5 md:px-8 py-4 sm:py-6 md:py-8 pb-24 md:pb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-3 left-3 right-3 z-30 glass border border-border rounded-2xl px-1.5 py-1.5 flex justify-around shadow-2xl backdrop-blur-xl">
          {navItems.slice(0, 5).map((n) => {
            const active = location.pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex flex-col items-center gap-0.5 flex-1 min-w-0 px-2 py-1.5 rounded-xl text-[10px] transition ${active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"}`}
              >
                <n.icon className="h-[18px] w-[18px]" />
                <span>{n.label.split(" ")[0]}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex flex-col items-center gap-0.5 flex-1 min-w-0 px-2 py-1.5 rounded-xl text-[10px] text-muted-foreground hover:text-foreground transition"
            aria-label="More"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="5" cy="12" r="1.2" />
              <circle cx="12" cy="12" r="1.2" />
              <circle cx="19" cy="12" r="1.2" />
            </svg>
            <span>More</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
