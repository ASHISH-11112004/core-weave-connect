import { createFileRoute } from "@tanstack/react-router";
import { Surface, PageHeader, Badge } from "@/components/widgets/Card";
import { media } from "@/lib/data";
import { motion } from "framer-motion";
import { Image as ImageIcon, Play } from "lucide-react";

export const Route = createFileRoute("/_app/gallery")({ component: Page });

const gradients = [
  "from-blue-500 to-indigo-600",
  "from-purple-500 to-pink-500",
  "from-cyan-500 to-blue-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-red-500",
];

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Media Gallery"
        subtitle="Moments, events, and stories from across the company"
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {media.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <Surface hover className="overflow-hidden group cursor-pointer">
              <div className={`h-48 bg-gradient-to-br ${gradients[i % gradients.length]} relative`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition" />
                <div className="absolute top-3 right-3">
                  <Badge color="gray">{m.count} items</Badge>
                </div>
                <div className="absolute bottom-3 left-3 text-white/80">
                  <ImageIcon className="h-5 w-5" />
                </div>
                <button className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-white/20 backdrop-blur grid place-items-center opacity-0 group-hover:opacity-100 transition">
                  <Play className="h-5 w-5 text-white" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{m.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">Curated by the People team</p>
              </div>
            </Surface>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
