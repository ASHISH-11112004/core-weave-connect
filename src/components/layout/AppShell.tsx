import { useState } from "react";
import { Outlet, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
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
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
              className="fixed z-50 top-0 bottom-0 left-0 w-72 bg-sidebar text-sidebar-foreground border-r border-sidebar-border p-4 md:hidden"
            >
              <div className="font-semibold mb-4">Aurora</div>
              <nav className="space-y-1">
                {navItems.map((n) => (
                  <Link key={n.to} to={n.to} onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-sidebar-accent">
                    <n.icon className="h-4 w-4" /> {n.label}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar onOpenMobileNav={() => setMobileOpen(true)} />
        <main className="flex-1 px-3 sm:px-5 md:px-8 py-4 sm:py-6 md:py-8 pb-28 md:pb-10">
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
              <Link key={n.to} to={n.to}
                className={`flex flex-col items-center gap-0.5 flex-1 min-w-0 px-2 py-1.5 rounded-xl text-[10px] transition ${active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"}`}>
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
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/></svg>
            <span>More</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
