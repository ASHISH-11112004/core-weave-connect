import { createFileRoute } from "@tanstack/react-router";
import { Surface, Badge, PageHeader, Avatar } from "@/components/widgets/Card";
import { discussions } from "@/lib/data";
import { motion } from "framer-motion";
import { MessageSquare, Flame, Hash } from "lucide-react";

export const Route = createFileRoute("/_app/discussions")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Discussions" subtitle="Open conversations across the company"
        action={<button className="rounded-2xl gradient-primary text-white text-sm px-4 py-2.5 shadow-lg shadow-blue-500/20">Start a thread</button>} />
      <div className="grid lg:grid-cols-4 gap-4 sm:gap-6">
        <Surface className="p-4 lg:col-span-1 h-fit">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Channels</p>
          <ul className="flex lg:block gap-1 overflow-x-auto lg:space-y-1 -mx-1 px-1 lg:mx-0 lg:px-0">
            {["general", "engineering", "design", "culture", "product", "random"].map((c, i) => (
              <li key={c} className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-sm cursor-pointer ${i === 0 ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}>
                <Hash className="h-3.5 w-3.5" /> {c}
              </li>
            ))}
          </ul>
        </Surface>
        <div className="lg:col-span-3 space-y-3">
          {discussions.map((d, i) => (
            <motion.div key={d.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Surface hover className="p-4 sm:p-5 flex gap-3 sm:gap-4">
                <Avatar initials={d.author.split(" ").map(s => s[0]).join("")} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge color="gray"><Hash className="h-3 w-3" />{d.channel}</Badge>
                    {d.hot && <Badge color="amber"><Flame className="h-3 w-3" /> Hot</Badge>}
                  </div>
                  <h3 className="mt-2 font-semibold">{d.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">by {d.author} · {d.replies} replies</p>
                </div>
                <div className="hidden sm:flex flex-col items-end justify-center text-xs text-muted-foreground">
                  <MessageSquare className="h-4 w-4 mb-1" />{d.replies}
                </div>
              </Surface>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
