import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Surface, Avatar, Badge, PageHeader } from "@/components/widgets/Card";
import {
  Sparkles, TrendingUp, Calendar as CalIcon, Award, Megaphone, Plus,
  ArrowUpRight, MessageSquare, Heart, Users, Zap,
} from "lucide-react";
import {
  kpis, announcements, events, recognitions, discussions, departments, engagementSeries,
} from "@/lib/data";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell,
} from "recharts";

export const Route = createFileRoute("/_app/")({ component: Dashboard });

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Hero / Leadership */}
      <Surface className="relative overflow-hidden p-6 md:p-8 gradient-mesh border-primary/10">
        <div className="absolute inset-0 opacity-30 pointer-events-none [background:radial-gradient(60%_50%_at_80%_0%,rgba(56,189,248,0.25),transparent)]" />
        <div className="relative flex flex-col md:flex-row md:items-center gap-6 justify-between">
          <div className="max-w-2xl">
            <Badge color="purple"><Sparkles className="h-3 w-3" /> Leadership message</Badge>
            <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">
              Good morning, <span className="gradient-text">Maya</span> — let's make today count.
            </h2>
            <p className="mt-2 text-sm md:text-base text-muted-foreground">
              "We're entering our most ambitious quarter yet. Thank you for the energy, focus, and care you bring every day." — Elena, CEO
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <button className="inline-flex items-center gap-2 rounded-2xl gradient-primary text-white text-sm px-4 py-2.5 shadow-lg shadow-blue-500/20 hover:opacity-95">
                <Plus className="h-4 w-4" /> Share an update
              </button>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-card border border-border text-sm px-4 py-2.5 hover:bg-muted">
                Watch CEO video <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto md:min-w-[280px]">
            {[
              { label: "Today's check-in", value: "92%", icon: Zap },
              { label: "Active rooms", value: "38", icon: MessageSquare },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-card/70 backdrop-blur border border-border p-4">
                <s.icon className="h-4 w-4 text-primary" />
                <div className="mt-2 text-2xl font-semibold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Surface>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <Surface key={k.label} delay={i * 0.05} hover className="p-5">
            <div className="flex items-center justify-between text-muted-foreground text-xs">
              {k.label}
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
            </div>
            <div className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">{k.value}</div>
            <div className="mt-1 text-xs text-emerald-500 font-medium">{k.delta} vs last week</div>
          </Surface>
        ))}
      </div>

      {/* Engagement chart + Department donut */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Surface className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-semibold">Employee engagement</h3>
              <p className="text-xs text-muted-foreground">Last 7 days · vs previous period</p>
            </div>
            <Badge color="blue">+12.4%</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="d" tickLine={false} axisLine={false} fontSize={11} stroke="currentColor" opacity={0.5} />
                <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="currentColor" opacity={0.5} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="p" stroke="#8B5CF6" strokeWidth={2} fill="url(#g2)" />
                <Area type="monotone" dataKey="v" stroke="#2563EB" strokeWidth={2.5} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Surface>

        <Surface className="p-5">
          <h3 className="font-semibold">Department overview</h3>
          <p className="text-xs text-muted-foreground">Headcount distribution</p>
          <div className="h-44 mt-2">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={departments} dataKey="count" nameKey="name" innerRadius={42} outerRadius={70} paddingAngle={3}>
                  {departments.map((d) => <Cell key={d.name} fill={d.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-1.5 mt-2">
            {departments.slice(0, 4).map((d) => (
              <li key={d.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
                  {d.name}
                </div>
                <span className="text-muted-foreground text-xs">{d.count}</span>
              </li>
            ))}
          </ul>
        </Surface>
      </div>

      {/* Lower grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Surface className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2"><Megaphone className="h-4 w-4 text-primary" /><h3 className="font-semibold">Latest announcements</h3></div>
            <button className="text-xs text-primary hover:underline">View all</button>
          </div>
          <div className="space-y-3">
            {announcements.slice(0, 3).map((a, i) => (
              <motion.div key={a.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
                className="group flex gap-3 rounded-2xl p-3 hover:bg-muted/50 transition cursor-pointer">
                <Avatar initials={a.avatar} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{a.author}</span> · {a.role} · {a.time}
                    {a.pinned && <Badge color="amber">Pinned</Badge>}
                  </div>
                  <p className="font-medium mt-0.5 group-hover:text-primary transition">{a.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">{a.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Surface>

        <Surface className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2"><CalIcon className="h-4 w-4 text-primary" /><h3 className="font-semibold">Upcoming events</h3></div>
          </div>
          <ul className="space-y-3">
            {events.slice(0, 4).map((e) => (
              <li key={e.id} className="flex gap-3 group cursor-pointer">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 grid place-items-center text-primary text-xs font-semibold leading-tight text-center">
                  <span>{e.date.split(" ")[1]}<br /><span className="text-[10px] uppercase opacity-70">{e.date.split(" ")[0]}</span></span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate group-hover:text-primary transition">{e.title}</p>
                  <p className="text-xs text-muted-foreground">{e.time} · {e.attending} attending</p>
                </div>
              </li>
            ))}
          </ul>
        </Surface>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Surface className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" /><h3 className="font-semibold">Recognition feed</h3></div>
          </div>
          <ul className="space-y-4">
            {recognitions.slice(0, 3).map((r) => (
              <li key={r.id} className="flex gap-3">
                <Avatar initials={r.to.split(" ").map((s) => s[0]).join("")} gradient="gradient-primary" />
                <div>
                  <p className="text-sm"><span className="font-semibold">{r.to}</span> received <Badge color="purple">{r.badge}</Badge></p>
                  <p className="text-xs text-muted-foreground mt-1">"{r.message}"</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Heart className="h-3 w-3" />{r.likes}</span>
                    <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{r.comments}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Surface>

        <Surface className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2"><MessageSquare className="h-4 w-4 text-primary" /><h3 className="font-semibold">Trending discussions</h3></div>
          </div>
          <ul className="space-y-3">
            {discussions.slice(0, 4).map((d) => (
              <li key={d.id} className="flex gap-3 cursor-pointer group">
                <div className="h-8 w-8 rounded-xl bg-muted grid place-items-center text-[10px] font-semibold">#{d.channel.slice(0, 2)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate group-hover:text-primary transition">{d.title}</p>
                  <p className="text-xs text-muted-foreground">{d.author} · {d.replies} replies {d.hot && "· 🔥"}</p>
                </div>
              </li>
            ))}
          </ul>
        </Surface>

        <Surface className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /><h3 className="font-semibold">Quick actions</h3></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Recognize", color: "from-blue-500 to-indigo-500" },
              { label: "Post update", color: "from-purple-500 to-pink-500" },
              { label: "Book room", color: "from-cyan-500 to-blue-500" },
              { label: "Request PTO", color: "from-emerald-500 to-teal-500" },
            ].map((a) => (
              <button key={a.label}
                className={`relative overflow-hidden rounded-2xl p-4 text-left text-white text-sm font-medium bg-gradient-to-br ${a.color} hover:scale-[1.02] transition-transform shadow-md`}>
                {a.label}
                <ArrowUpRight className="h-4 w-4 absolute top-3 right-3 opacity-80" />
              </button>
            ))}
          </div>
        </Surface>
      </div>
    </div>
  );
}
