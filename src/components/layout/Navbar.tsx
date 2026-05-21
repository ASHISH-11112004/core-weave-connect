import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Moon, Sun, Plus, Menu } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { notifications } from "@/lib/data";

export function Navbar({ onOpenMobileNav }: { onOpenMobileNav: () => void }) {
  const { theme, toggle } = useTheme();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border/70 glass">
      <div className="h-full px-4 md:px-8 flex items-center gap-3">
        <button
          onClick={onOpenMobileNav}
          className="md:hidden h-9 w-9 rounded-lg grid place-items-center hover:bg-muted"
          aria-label="Menu"
        >
          <Menu className="h-4 w-4" strokeWidth={1.75} />
        </button>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" strokeWidth={2} />
          <input
            placeholder="Search people, posts, docs…"
            className="w-full h-9 pl-9 pr-16 rounded-lg bg-muted/60 border border-transparent focus:border-primary/40 focus:bg-card outline-none text-[13px] placeholder:text-muted-foreground transition"
          />
          <kbd className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 items-center gap-0.5 text-[10px] text-muted-foreground bg-background/60 border border-border rounded px-1.5 py-0.5 font-medium">
            ⌘K
          </kbd>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <button className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-[12.5px] font-medium gradient-primary text-white hover:brightness-110 transition shadow-md shadow-blue-600/25">
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} /> New post
          </button>

          <button
            onClick={toggle}
            className="h-9 w-9 rounded-lg grid place-items-center hover:bg-muted text-muted-foreground hover:text-foreground transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" strokeWidth={1.75} /> : <Moon className="h-4 w-4" strokeWidth={1.75} />}
          </button>

          <div className="relative">
            <button
              onClick={() => { setNotifOpen((o) => !o); setProfileOpen(false); }}
              className="relative h-9 w-9 rounded-lg grid place-items-center hover:bg-muted text-muted-foreground hover:text-foreground transition"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" strokeWidth={1.75} />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-red-500" />
            </button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-2 w-80 rounded-2xl border border-border bg-popover shadow-elevated overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                    <span className="text-[13px] font-semibold">Notifications</span>
                    <span className="text-[10.5px] text-muted-foreground">4 new</span>
                  </div>
                  <ul className="max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <li key={n.id} className="px-4 py-3 hover:bg-muted/60 cursor-pointer border-b border-border last:border-0">
                        <p className="text-[13px] leading-snug">{n.title}</p>
                        <span className="text-[10.5px] text-muted-foreground">{n.time} ago</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative ml-1">
            <button
              onClick={() => { setProfileOpen((o) => !o); setNotifOpen(false); }}
              className="h-9 w-9 rounded-full gradient-accent text-white grid place-items-center text-[11px] font-semibold ring-2 ring-background hover:ring-primary/30 transition"
            >
              MC
            </button>
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-2 w-64 rounded-2xl border border-border bg-popover shadow-elevated overflow-hidden"
                >
                  <div className="p-4 border-b border-border">
                    <p className="font-semibold text-[13px]">Maya Chen</p>
                    <p className="text-[11px] text-muted-foreground">Chief of Staff</p>
                  </div>
                  <ul className="p-1.5 text-[12.5px]">
                    {["My profile", "Preferences", "Help & support", "Sign out"].map((i) => (
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
