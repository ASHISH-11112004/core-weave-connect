import { createFileRoute } from "@tanstack/react-router";
import { Surface, Badge, PageHeader } from "@/components/widgets/Card";
import { knowledge } from "@/lib/data";
import { motion } from "framer-motion";
import { BookOpen, ArrowUpRight, Search } from "lucide-react";

export const Route = createFileRoute("/_app/knowledge")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Knowledge Hub" subtitle="Handbooks, policies, and how-we-work guides" />
      <Surface className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search articles, policies, runbooks…"
            className="w-full h-11 pl-10 pr-3 rounded-xl bg-muted/50 outline-none text-sm focus:bg-card border border-transparent focus:border-primary/40"
          />
        </div>
      </Surface>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {knowledge.map((k, i) => (
          <motion.div
            key={k.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Surface hover className="p-5 group cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-2xl bg-primary/10 grid place-items-center text-primary">
                  <BookOpen className="h-4 w-4" />
                </div>
                <Badge color="blue">{k.category}</Badge>
              </div>
              <h3 className="font-semibold leading-snug group-hover:text-primary transition">
                {k.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{k.reads} reads · updated 2d ago</p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs text-primary">
                Read article <ArrowUpRight className="h-3 w-3" />
              </div>
            </Surface>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
