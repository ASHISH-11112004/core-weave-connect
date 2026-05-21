import { createFileRoute } from "@tanstack/react-router";
import { Surface, Badge, PageHeader } from "@/components/widgets/Card";
import { departments, employees } from "@/lib/data";
import { motion } from "framer-motion";
import { Users, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/_app/teams")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Teams & Departments" subtitle="Explore how the company is organized" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {departments.map((d, i) => {
          const members = employees.filter((e) => e.dept === d.name).slice(0, 5);
          return (
            <motion.div key={d.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Surface hover className="p-5">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-2xl grid place-items-center text-white" style={{ background: d.color }}>
                    <Users className="h-4 w-4" />
                  </div>
                  <Badge color="gray">{d.count} people</Badge>
                </div>
                <h3 className="mt-4 font-semibold text-lg">{d.name}</h3>
                <p className="text-xs text-muted-foreground">12 active projects · 4 squads</p>
                <div className="mt-4 flex -space-x-2">
                  {members.map((m) => (
                    <div key={m.id} className="h-8 w-8 rounded-full gradient-accent text-white grid place-items-center text-[10px] font-semibold ring-2 ring-card">{m.avatar}</div>
                  ))}
                  {d.count > members.length && <div className="h-8 w-8 rounded-full bg-muted text-muted-foreground grid place-items-center text-[10px] ring-2 ring-card">+{d.count - members.length}</div>}
                </div>
                <button className="mt-4 w-full text-sm rounded-xl bg-muted hover:bg-muted/70 py-2 inline-flex items-center justify-center gap-1.5">
                  View team <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </Surface>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
