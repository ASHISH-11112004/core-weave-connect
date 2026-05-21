import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Moon, Sun, Plus, Command } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { notifications } from "@/lib/data";

export function Navbar({ onOpenMobileNav }: { onOpenMobileNav: () => void }) {
  const { theme, toggle } = useTheme();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border glass">
      <div className="h-full px-4 md:px-6 flex items-center gap-3">
        <button
          onClick={onOpenMobileNav}
          className="md:hidden h-9 w-9 rounded-xl grid place-items-center hover:bg-muted"
          aria-label="Menu"
        >
          <Command className="h-4 w-4" />
        </button>

        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search people, posts, docs…"
            className="w-full h-10 pl-10 pr-16 rounded-2xl bg-muted/50 border border-transparent focus:border-primary/40 focus:bg-card outline-none text-sm transition"
          />
          <kbd className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-1 text-[10px] text-muted-foreground bg-background border border-border rounded-md px-1.5 py-0.5">
            ⌘ K
          </kbd>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <button className="hidden sm:inline-flex items-center gap-2 h-10 px-4 rounded-2xl text-sm font-medium gradient-primary text-white hover:opacity-95 transition shadow-lg shadow-blue-500/20">
            <Plus className="h-4 w-4" /> New Post
          </button>

          <button
            onClick={toggle}
            className="h-10 w-10 rounded-2xl grid place-items-center hover:bg-muted transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <div className="relative">
            <button
              onClick={() => { setNotifOpen((o) => !o); setProfileOpen(false); }}
              className="relative h-10 w-10 rounded-2xl grid place-items-center hover:bg-muted transition"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
            </button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  className="absolute right-0 mt-2 w-80 rounded-2xl border border-border bg-popover shadow-2xl shadow-black/10 overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                    <span className="text-sm font-semibold">Notifications</span>
                    <span className="text-[11px] text-muted-foreground">4 new</span>
                  </div>
                  <ul className="max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <li key={n.id} className="px-4 py-3 hover:bg-muted/60 cursor-pointer border-b border-border last:border-0">
                        <p className="text-sm">{n.title}</p>
                        <span className="text-[11px] text-muted-foreground">{n.time} ago</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button
              onClick={() => { setProfileOpen((o) => !o); setNotifOpen(false); }}
              className="h-10 w-10 rounded-2xl gradient-accent text-white grid place-items-center text-sm font-semibold shadow-md"
            >
              MC
            </button>
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  className="absolute right-0 mt-2 w-64 rounded-2xl border border-border bg-popover shadow-2xl overflow-hidden"
                >
                  <div className="p-4 border-b border-border">
                    <p className="font-semibold text-sm">Maya Chen</p>
                    <p className="text-xs text-muted-foreground">Chief of Staff</p>
                  </div>
                  <ul className="p-1.5 text-sm">
                    {["My Profile", "Preferences", "Help & Support", "Sign out"].map((i) => (
                      <li key={i} className="px-3 py-2 rounded-lg hover:bg-muted cursor-pointer">{i}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
