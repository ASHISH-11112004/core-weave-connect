import { createFileRoute } from "@tanstack/react-router";
import { Surface, Badge, PageHeader } from "@/components/widgets/Card";
import { events } from "@/lib/data";
import { motion } from "framer-motion";
import { Calendar as CalIcon, Clock, Users } from "lucide-react";

export const Route = createFileRoute("/_app/calendar")({ component: Page });

const days = Array.from({ length: 35 }, (_, i) => i - 2);
const eventDays = [3, 4, 7, 8, 10, 14, 21, 27];

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Event Calendar" subtitle="Company events, town halls, and team rituals"
        action={<button className="rounded-2xl gradient-primary text-white text-sm px-4 py-2.5 shadow-lg shadow-blue-500/20">New event</button>} />
      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        <Surface className="lg:col-span-2 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">May 2026</h3>
            <div className="flex gap-1">
              {["Day", "Week", "Month"].map((v) => (
                <button key={v} className={`px-3 py-1.5 text-xs rounded-xl ${v === "Month" ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>{v}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-xs">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i} className="text-center text-muted-foreground py-2">{d}</div>)}
            {days.map((n) => {
              const valid = n > 0 && n <= 31;
              const hasEvent = eventDays.includes(n);
              return (
                <div key={n} className={`aspect-square rounded-lg sm:rounded-xl flex items-center justify-center text-[11px] sm:text-sm transition cursor-pointer ${valid ? "hover:bg-muted" : "opacity-30"} ${hasEvent ? "bg-primary/10 text-primary font-semibold ring-1 ring-primary/20" : ""}`}>
                  {valid ? n : ""}
                </div>
              );
            })}
          </div>
        </Surface>

        <Surface className="p-4 sm:p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><CalIcon className="h-4 w-4 text-primary" /> Upcoming</h3>
          <ul className="space-y-4">
            {events.map((e, i) => (
              <motion.li key={e.id} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                className="rounded-2xl border border-border p-3 hover:border-primary/40 transition cursor-pointer">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{e.title}</p>
                  <Badge color="blue">{e.type}</Badge>
                </div>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><CalIcon className="h-3 w-3" /> {e.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {e.time}</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {e.attending}</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </Surface>
      </div>
    </div>
  );
}
