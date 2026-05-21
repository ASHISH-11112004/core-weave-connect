import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Surface, Avatar, Badge, StatusDot, PageHeader } from "@/components/widgets/Card";
import { employees, departments } from "@/lib/data";
import { Search, Mail, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/_app/directory")({ component: Page });

function Page() {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState<string>("All");

  const filtered = useMemo(
    () =>
      employees.filter(
        (e) =>
          (dept === "All" || e.dept === dept) &&
          (e.name.toLowerCase().includes(q.toLowerCase()) ||
            e.role.toLowerCase().includes(q.toLowerCase())),
      ),
    [q, dept],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Directory"
        subtitle={`${employees.length} teammates · ${departments.length} departments`}
      />

      <Surface className="p-3 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, role, skill…"
            className="w-full h-10 pl-10 pr-3 rounded-xl bg-muted/50 text-sm outline-none focus:bg-card border border-transparent focus:border-primary/40"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["All", ...departments.map((d) => d.name)].map((d) => (
            <button
              key={d}
              onClick={() => setDept(d)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${dept === d ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              {d}
            </button>
          ))}
        </div>
      </Surface>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((e, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <Surface hover className="p-5">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar initials={e.avatar} className="h-12 w-12 text-base" />
                  <span className="absolute -bottom-0.5 -right-0.5">
                    <StatusDot status={e.status} />
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{e.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{e.role}</p>
                  <Badge color="blue">{e.dept}</Badge>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {e.skills.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border flex gap-2">
                <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-muted hover:bg-muted/70 text-xs py-2">
                  <MessageSquare className="h-3 w-3" /> Message
                </button>
                <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-muted hover:bg-muted/70 text-xs py-2">
                  <Mail className="h-3 w-3" /> Email
                </button>
              </div>
            </Surface>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
