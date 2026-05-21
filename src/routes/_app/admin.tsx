import { createFileRoute } from "@tanstack/react-router";
import { Surface, PageHeader, Badge } from "@/components/widgets/Card";
import { kpis, departments, engagementSeries, announcements } from "@/lib/data";
import { motion } from "framer-motion";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from "recharts";
import { Shield, MoreHorizontal, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/_app/admin")({ component: Page });

function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Admin Panel" subtitle="HR & Leadership analytics, moderation, and management"
        action={<Badge color="purple"><Shield className="h-3 w-3" /> Admin access</Badge>} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <Surface key={k.label} delay={i * 0.04} className="p-5">
            <div className="text-xs text-muted-foreground">{k.label}</div>
            <div className="mt-2 text-2xl font-semibold">{k.value}</div>
            <div className="text-xs text-emerald-500 mt-1">{k.delta}</div>
          </Surface>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Surface className="p-5">
          <h3 className="font-semibold">Engagement by department</h3>
          <p className="text-xs text-muted-foreground">Weekly active rate</p>
          <div className="h-64 mt-3">
            <ResponsiveContainer>
              <BarChart data={departments} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.08} />
                <XAxis dataKey="name" fontSize={11} stroke="currentColor" opacity={0.5} axisLine={false} tickLine={false} />
                <YAxis fontSize={11} stroke="currentColor" opacity={0.5} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#2563EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Surface>

        <Surface className="p-5">
          <h3 className="font-semibold">Daily active users</h3>
          <p className="text-xs text-muted-foreground">7-day trend</p>
          <div className="h-64 mt-3">
            <ResponsiveContainer>
              <LineChart data={engagementSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.08} />
                <XAxis dataKey="d" fontSize={11} stroke="currentColor" opacity={0.5} axisLine={false} tickLine={false} />
                <YAxis fontSize={11} stroke="currentColor" opacity={0.5} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Line type="monotone" dataKey="v" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 4, fill: "#8B5CF6" }} />
                <Line type="monotone" dataKey="p" stroke="#38BDF8" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Surface>
      </div>

      <Surface className="overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div><h3 className="font-semibold">Announcement management</h3><p className="text-xs text-muted-foreground">Moderate and schedule posts</p></div>
          <button className="rounded-2xl gradient-primary text-white text-sm px-4 py-2 self-start sm:self-auto">New announcement</button>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[520px]">
          <thead className="bg-muted/30 text-xs text-muted-foreground">
            <tr><th className="text-left px-5 py-3">Title</th><th className="text-left py-3 hidden md:table-cell">Author</th><th className="text-left py-3">Tag</th><th className="text-left py-3 hidden sm:table-cell">Engagement</th><th className="px-5 py-3"></th></tr>
          </thead>
          <tbody>
            {announcements.map((a, i) => (
              <motion.tr key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                className="border-t border-border hover:bg-muted/30">
                <td className="px-5 py-3 font-medium">{a.title}</td>
                <td className="py-3 hidden md:table-cell text-muted-foreground">{a.author}</td>
                <td className="py-3"><Badge color="blue">{a.tag}</Badge></td>
                <td className="py-3 hidden sm:table-cell text-muted-foreground">{a.reactions} reactions · {a.comments} comments</td>
                <td className="px-5 py-3 text-right"><button className="h-8 w-8 rounded-lg hover:bg-muted grid place-items-center"><MoreHorizontal className="h-4 w-4" /></button></td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        </div>
      </Surface>

      <Surface className="p-5">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-2xl bg-amber-500/10 grid place-items-center text-amber-600"><AlertCircle className="h-4 w-4" /></div>
          <div className="flex-1">
            <h3 className="font-semibold">Moderation queue</h3>
            <p className="text-xs text-muted-foreground">3 flagged comments awaiting review</p>
          </div>
          <button className="rounded-xl bg-muted text-sm px-3 py-2 hover:bg-muted/70">Review</button>
        </div>
      </Surface>
    </div>
  );
}
