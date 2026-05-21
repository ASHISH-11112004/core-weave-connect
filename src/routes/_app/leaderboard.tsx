import { createFileRoute } from "@tanstack/react-router";
import { Surface, PageHeader, Avatar, Badge } from "@/components/widgets/Card";
import { leaderboard } from "@/lib/data";
import { motion } from "framer-motion";
import { Trophy, Award } from "lucide-react";

export const Route = createFileRoute("/_app/leaderboard")({ component: Page });

function Page() {
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <div className="space-y-6">
      <PageHeader title="Leaderboard" subtitle="Top contributors recognized by their peers" />

      <div className="grid sm:grid-cols-3 gap-4">
        {top3.map((e, i) => {
          const colors = ["from-amber-400 to-yellow-600", "from-slate-300 to-slate-500", "from-amber-700 to-orange-800"];
          return (
            <motion.div key={e.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Surface className={`p-6 text-center relative overflow-hidden ${i === 0 ? "sm:scale-105" : ""}`}>
                <div className={`absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-gradient-to-br ${colors[i]} opacity-20 blur-3xl`} />
                <div className="relative">
                  <div className={`mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br ${colors[i]} grid place-items-center text-white shadow-lg`}>
                    <Trophy className="h-6 w-6" />
                  </div>
                  <Avatar initials={e.avatar} className="mx-auto mt-4 h-16 w-16 text-lg" />
                  <p className="font-semibold mt-3">{e.name}</p>
                  <p className="text-xs text-muted-foreground">{e.role}</p>
                  <p className="mt-3 text-2xl font-semibold gradient-text">{e.points.toLocaleString()} pts</p>
                </div>
              </Surface>
            </motion.div>
          );
        })}
      </div>

      <Surface className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-muted-foreground text-xs">
            <tr><th className="text-left px-5 py-3">Rank</th><th className="text-left py-3">Employee</th><th className="text-left py-3 hidden sm:table-cell">Department</th><th className="text-right px-5 py-3">Points</th></tr>
          </thead>
          <tbody>
            {rest.map((e) => (
              <tr key={e.id} className="border-t border-border hover:bg-muted/30 transition">
                <td className="px-5 py-3 text-muted-foreground">#{e.rank}</td>
                <td className="py-3">
                  <div className="flex items-center gap-3"><Avatar initials={e.avatar} className="h-8 w-8 text-xs" /><span>{e.name}</span></div>
                </td>
                <td className="py-3 hidden sm:table-cell"><Badge color="blue">{e.dept}</Badge></td>
                <td className="px-5 py-3 text-right font-medium">{e.points.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Surface>
    </div>
  );
}
