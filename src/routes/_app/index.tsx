import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Surface, Avatar, Badge, SectionTitle } from "@/components/widgets/Card";
import {
  Sparkles, TrendingUp, Calendar as CalIcon, Award, Megaphone, Plus,
  ArrowUpRight, MessageSquare, Heart, Users, Zap, Play,
} from "lucide-react";
import {
  kpis, announcements, events, recognitions, discussions, departments, engagementSeries,
} from "@/lib/data";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell,
} from "recharts";

export const Route = createFileRoute("/_app/")({ component: Dashboard });

function Dashboard() {
  const total = departments.reduce((a, b) => a + b.count, 0);

  return (
    <div className="space-y-5 sm:space-y-6 max-w-[1480px] mx-auto">
      {/* Greeting row */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-end sm:justify-between gap-3 sm:gap-4">
        <div>
          <p className="text-[12px] text-muted-foreground">Thursday, May 21</p>
          <h1 className="text-[22px] sm:text-[26px] md:text-[32px] font-semibold tracking-tight mt-1">
            Good morning, <span className="gradient-text">Maya</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button className="inline-flex items-center gap-1.5 h-9 px-3 sm:px-3.5 rounded-lg bg-card border border-border text-[12.5px] font-medium hover:bg-muted transition">
            <Plus className="h-3.5 w-3.5" strokeWidth={2.25} /> Share update
          </button>
          <button className="inline-flex items-center gap-1.5 h-9 px-3 sm:px-3.5 rounded-lg gradient-primary text-white text-[12.5px] font-medium shadow-md shadow-blue-600/25 hover:brightness-110 transition">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2.25} /> Ask Aurora
          </button>
        </div>
      </div>

      {/* Hero / Leadership */}
      <Surface elevated className="relative overflow-hidden p-5 sm:p-7 md:p-9">
        <div className="absolute inset-0 gradient-mesh pointer-events-none" />
        <div className="absolute inset-0 grid-dots opacity-60 pointer-events-none" />
        <div className="relative flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-8 justify-between">
          <div className="max-w-2xl">
            <Badge color="purple"><Sparkles className="h-3 w-3" /> Leadership message</Badge>
            <h2 className="mt-3 sm:mt-4 text-[18px] sm:text-[22px] md:text-[28px] font-semibold tracking-tight leading-snug">
              "We're entering our most ambitious quarter yet — thank you for the energy you bring."
            </h2>
            <div className="mt-4 flex items-center gap-2.5">
              <Avatar initials="EP" className="h-8 w-8 text-[11px]" gradient="gradient-primary" />
              <div className="text-[12.5px]">
                <span className="font-medium">Elena Petrova</span>
                <span className="text-muted-foreground"> · CEO · 2h ago</span>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-lg gradient-primary text-white text-[12.5px] font-medium px-3.5 h-9 shadow-md shadow-blue-600/25 hover:brightness-110 transition">
                <Play className="h-3 w-3 fill-current" /> Watch the video
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-lg bg-card/70 backdrop-blur border border-border text-[12.5px] px-3.5 h-9 hover:bg-card transition">
                Read transcript <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full lg:w-auto lg:min-w-[300px]">
            {[
              { label: "Today's check-in", value: "92%", icon: Zap, delta: "+4%" },
              { label: "Active rooms", value: "38", icon: MessageSquare, delta: "+6" },
            ].map((s) => (
              <div key={s.label} className="frost rounded-2xl border border-border/80 p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary grid place-items-center"><s.icon className="h-3.5 w-3.5" /></div>
                  <span className="text-[10px] text-emerald-400 font-medium">{s.delta}</span>
                </div>
                <div className="mt-2.5 sm:mt-3 text-[20px] sm:text-[24px] font-semibold tabular tracking-tight">{s.value}</div>
                <div className="text-[11px] text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Surface>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {kpis.map((k, i) => (
          <Surface key={k.label} delay={i * 0.04} hover className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11.5px] text-muted-foreground tracking-tight">{k.label}</span>
              <span className="h-5 px-1.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-medium inline-flex items-center gap-0.5 tabular">
                <TrendingUp className="h-2.5 w-2.5" /> {k.delta}
              </span>
            </div>
            <div className="mt-2.5 text-[22px] sm:text-[26px] md:text-[28px] font-semibold tracking-tight tabular leading-none">{k.value}</div>
            <div className="mt-1.5 text-[10.5px] text-muted-foreground">vs previous period</div>
          </Surface>
        ))}
      </div>

      {/* Engagement chart + Department donut */}
      <div className="grid lg:grid-cols-3 gap-4 sm:gap-5">
        <Surface className="lg:col-span-2 p-4 sm:p-6" delay={0.05}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-[14.5px] tracking-tight">Employee engagement</h3>
              <p className="text-[11.5px] text-muted-foreground mt-0.5">Daily active sessions · last 7 days</p>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <Legend label="Current" color="#3B82F6" />
              <Legend label="Previous" color="#A78BFA" />
            </div>
          </div>
          <div className="h-52 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementSeries} margin={{ top: 10, right: 6, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.42} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A78BFA" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#A78BFA" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="d" tickLine={false} axisLine={false} fontSize={11} stroke="currentColor" opacity={0.45} dy={6} />
                <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="currentColor" opacity={0.45} />
                <Tooltip cursor={{ stroke: "currentColor", strokeOpacity: 0.1 }}
                  contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12, boxShadow: "var(--shadow-elevated)" }} />
                <Area type="monotone" dataKey="p" stroke="#A78BFA" strokeWidth={1.5} fill="url(#g2)" />
                <Area type="monotone" dataKey="v" stroke="#3B82F6" strokeWidth={2.25} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Surface>

        <Surface className="p-4 sm:p-6" delay={0.1}>
          <h3 className="font-semibold text-[14.5px] tracking-tight">Departments</h3>
          <p className="text-[11.5px] text-muted-foreground mt-0.5">Headcount distribution</p>
          <div className="relative h-40 sm:h-44 mt-3">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={departments} dataKey="count" nameKey="name" innerRadius={50} outerRadius={72} paddingAngle={2} stroke="none">
                  {departments.map((d) => <Cell key={d.name} fill={d.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 grid place-items-center pointer-events-none">
              <div className="text-center">
                <div className="text-[22px] font-semibold tabular leading-none">{total}</div>
                <div className="text-[10px] text-muted-foreground mt-1">Total people</div>
              </div>
            </div>
          </div>
          <ul className="space-y-1.5 mt-3">
            {departments.slice(0, 4).map((d) => (
              <li key={d.name} className="flex items-center justify-between text-[12.5px]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
                  {d.name}
                </div>
                <span className="text-muted-foreground text-[11px] tabular">{d.count}</span>
              </li>
            ))}
          </ul>
        </Surface>
      </div>

      {/* Announcements + Events */}
      <div className="grid lg:grid-cols-3 gap-4 sm:gap-5">
        <Surface className="lg:col-span-2 p-4 sm:p-6" delay={0.05}>
          <SectionTitle icon={Megaphone} action={<button className="text-[11.5px] text-muted-foreground hover:text-primary transition">View all</button>}>
            Latest announcements
          </SectionTitle>
          <div className="-mx-2">
            {announcements.slice(0, 3).map((a, i) => (
              <motion.div key={a.id}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
                className="group flex gap-3 rounded-xl px-2 py-3 hover:bg-muted/40 transition cursor-pointer">
                <Avatar initials={a.avatar} className="h-9 w-9 text-[11px]" gradient="gradient-accent" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="font-medium text-foreground text-[12px]">{a.author}</span>
                    <span>· {a.role} · {a.time}</span>
                    {a.pinned && <Badge color="amber">Pinned</Badge>}
                  </div>
                  <p className="font-medium text-[13.5px] mt-1 group-hover:text-primary transition">{a.title}</p>
                  <p className="text-[12.5px] text-muted-foreground line-clamp-1 mt-0.5">{a.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Surface>

        <Surface className="p-4 sm:p-6" delay={0.1}>
          <SectionTitle icon={CalIcon}>Upcoming events</SectionTitle>
          <ul className="space-y-3.5">
            {events.slice(0, 4).map((e) => (
              <li key={e.id} className="flex gap-3 group cursor-pointer">
                <div className="h-11 w-11 rounded-xl bg-primary/10 grid place-items-center text-primary text-[10.5px] font-semibold leading-tight text-center">
                  <span>{e.date.split(" ")[1]}<br /><span className="text-[9px] uppercase opacity-70 tracking-wider">{e.date.split(" ")[0]}</span></span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12.5px] font-medium truncate group-hover:text-primary transition">{e.title}</p>
                  <p className="text-[11px] text-muted-foreground tabular">{e.time} · {e.attending} attending</p>
                </div>
              </li>
            ))}
          </ul>
        </Surface>
      </div>

      {/* Recognition, discussions, quick actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        <Surface className="p-4 sm:p-6" delay={0.05}>
          <SectionTitle icon={Award}>Recognition feed</SectionTitle>
          <ul className="space-y-4">
            {recognitions.slice(0, 3).map((r) => (
              <li key={r.id} className="flex gap-3">
                <Avatar initials={r.to.split(" ").map((s) => s[0]).join("")} className="h-9 w-9 text-[11px]" gradient="gradient-primary" />
                <div className="min-w-0">
                  <p className="text-[12.5px]"><span className="font-semibold">{r.to}</span> — <Badge color="purple">{r.badge}</Badge></p>
                  <p className="text-[11.5px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">"{r.message}"</p>
                  <div className="flex items-center gap-3 mt-2 text-[10.5px] text-muted-foreground tabular">
                    <span className="flex items-center gap-1"><Heart className="h-2.5 w-2.5" />{r.likes}</span>
                    <span className="flex items-center gap-1"><MessageSquare className="h-2.5 w-2.5" />{r.comments}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Surface>

        <Surface className="p-4 sm:p-6" delay={0.1}>
          <SectionTitle icon={MessageSquare}>Trending discussions</SectionTitle>
          <ul className="space-y-3.5">
            {discussions.slice(0, 4).map((d) => (
              <li key={d.id} className="flex gap-3 cursor-pointer group">
                <div className="h-8 w-8 rounded-lg bg-muted grid place-items-center text-[9.5px] font-semibold text-muted-foreground">#{d.channel.slice(0, 2)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12.5px] font-medium truncate group-hover:text-primary transition">{d.title}</p>
                  <p className="text-[11px] text-muted-foreground tabular">{d.author} · {d.replies} replies {d.hot && "· 🔥"}</p>
                </div>
              </li>
            ))}
          </ul>
        </Surface>

        <Surface className="p-4 sm:p-6 md:col-span-2 lg:col-span-1" delay={0.15}>
          <SectionTitle icon={Users}>Quick actions</SectionTitle>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: "Recognize", desc: "Send kudos" },
              { label: "Post update", desc: "Share news" },
              { label: "Book room", desc: "Reserve space" },
              { label: "Request PTO", desc: "Time off" },
            ].map((a) => (
              <button key={a.label}
                className="group relative rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 p-3 text-left transition">
                <div className="text-[12.5px] font-medium">{a.label}</div>
                <div className="text-[10.5px] text-muted-foreground mt-0.5">{a.desc}</div>
                <ArrowUpRight className="h-3.5 w-3.5 absolute top-3 right-3 text-muted-foreground group-hover:text-primary transition" />
              </button>
            ))}
          </div>
        </Surface>
      </div>
    </div>
  );
}

function Legend({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      {label}
    </div>
  );
}
