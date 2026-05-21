import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Surface, Avatar, Badge, PageHeader } from "@/components/widgets/Card";
import { recognitions } from "@/lib/data";
import { Heart, MessageSquare, Sparkles, Award } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/recognition")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Recognition Wall" subtitle="Celebrate the people who make us better, every day."
        action={<button className="rounded-2xl gradient-primary text-white text-sm px-4 py-2.5 shadow-lg shadow-blue-500/20 inline-flex items-center gap-2"><Sparkles className="h-4 w-4" /> Recognize someone</button>} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {recognitions.map((r, i) => <Card key={r.id} r={r} i={i} />)}
      </div>
    </div>
  );
}

function Card({ r, i }: { r: typeof recognitions[number]; i: number }) {
  const [liked, setLiked] = useState(false);
  const [pop, setPop] = useState(0);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
      <Surface hover className="relative overflow-hidden p-5">
        <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full gradient-accent opacity-20 blur-2xl" />
        <div className="flex items-center gap-3">
          <Avatar initials={r.to.split(" ").map((s) => s[0]).join("")} className="h-12 w-12 text-base" gradient="gradient-primary" />
          <div>
            <p className="font-semibold">{r.to}</p>
            <p className="text-xs text-muted-foreground">from {r.from} · {r.time}</p>
          </div>
        </div>
        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-gradient-to-r from-purple-500/15 to-blue-500/15 border border-purple-500/20 text-xs font-medium">
          <Award className="h-3.5 w-3.5 text-purple-500" /> {r.badge}
        </div>
        <p className="mt-3 text-sm leading-relaxed">"{r.message}"</p>
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <button
            onClick={() => { setLiked(!liked); setPop(Date.now()); }}
            className={`flex items-center gap-1.5 text-sm transition ${liked ? "text-red-500" : "text-muted-foreground hover:text-red-500"}`}
          >
            <motion.span key={pop} animate={pop ? { scale: [1, 1.4, 1] } : {}} transition={{ duration: 0.4 }}>
              <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
            </motion.span>
            {r.likes + (liked ? 1 : 0)}
          </button>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
            <MessageSquare className="h-4 w-4" /> {r.comments}
          </button>
          <Badge color="green">+50 pts</Badge>
        </div>
      </Surface>
    </motion.div>
  );
}
