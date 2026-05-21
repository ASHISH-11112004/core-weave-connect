export const employees = [
  { id: "1", name: "Aarav Mehta", role: "Senior Product Designer", dept: "Design", skills: ["Figma", "Design Systems", "Prototyping"], status: "online", avatar: "AM" },
  { id: "2", name: "Sofia Romano", role: "Engineering Manager", dept: "Engineering", skills: ["React", "Leadership", "Architecture"], status: "online", avatar: "SR" },
  { id: "3", name: "Liam Carter", role: "Staff Backend Engineer", dept: "Engineering", skills: ["Go", "Kubernetes", "Postgres"], status: "busy", avatar: "LC" },
  { id: "4", name: "Hana Tanaka", role: "People Operations Lead", dept: "HR", skills: ["Hiring", "Culture", "L&D"], status: "online", avatar: "HT" },
  { id: "5", name: "Noah Williams", role: "Data Scientist", dept: "Analytics", skills: ["Python", "ML", "SQL"], status: "away", avatar: "NW" },
  { id: "6", name: "Priya Kapoor", role: "Marketing Director", dept: "Marketing", skills: ["Brand", "Growth", "Content"], status: "online", avatar: "PK" },
  { id: "7", name: "Mateo Alvarez", role: "Customer Success", dept: "CX", skills: ["Onboarding", "Retention"], status: "offline", avatar: "MA" },
  { id: "8", name: "Yuki Sato", role: "Frontend Engineer", dept: "Engineering", skills: ["TypeScript", "Animations"], status: "online", avatar: "YS" },
  { id: "9", name: "Elena Petrova", role: "Finance Partner", dept: "Finance", skills: ["FP&A", "Modeling"], status: "online", avatar: "EP" },
  { id: "10", name: "Daniel Okafor", role: "Security Engineer", dept: "Engineering", skills: ["AppSec", "Cloud"], status: "busy", avatar: "DO" },
  { id: "11", name: "Maya Chen", role: "Chief of Staff", dept: "Leadership", skills: ["Strategy", "Ops"], status: "online", avatar: "MC" },
  { id: "12", name: "Omar Haddad", role: "Recruiter", dept: "HR", skills: ["Sourcing", "Interviews"], status: "online", avatar: "OH" },
];

export const departments = [
  { name: "Engineering", count: 142, color: "#2563EB" },
  { name: "Design", count: 38, color: "#8B5CF6" },
  { name: "Marketing", count: 27, color: "#38BDF8" },
  { name: "Sales", count: 64, color: "#10B981" },
  { name: "HR", count: 19, color: "#F59E0B" },
  { name: "Finance", count: 22, color: "#EF4444" },
];

export const announcements = [
  {
    id: "a1",
    pinned: true,
    author: "Maya Chen",
    role: "Chief of Staff",
    avatar: "MC",
    time: "2h",
    title: "Q3 All-Hands — Thursday at 4pm",
    body: "Join leadership for the quarterly business update. We'll cover roadmap, hiring, and a special product announcement.",
    tag: "Company",
    reactions: 248,
    comments: 32,
    image: true,
  },
  {
    id: "a2",
    pinned: false,
    author: "Hana Tanaka",
    role: "People Ops",
    avatar: "HT",
    time: "1d",
    title: "New parental leave policy effective June 1",
    body: "We're expanding paid parental leave to 20 weeks globally. Read the full policy in the Knowledge Hub.",
    tag: "HR",
    reactions: 412,
    comments: 86,
  },
  {
    id: "a3",
    pinned: false,
    author: "Sofia Romano",
    role: "Engineering Manager",
    avatar: "SR",
    time: "3d",
    title: "Platform v4 ships next sprint",
    body: "After 6 months of work, the new Platform v4 is going live. Huge thanks to the entire infra team.",
    tag: "Product",
    reactions: 198,
    comments: 24,
  },
  {
    id: "a4",
    pinned: false,
    author: "Priya Kapoor",
    role: "Marketing Director",
    avatar: "PK",
    time: "5d",
    title: "Brand refresh — assets available",
    body: "Our refreshed brand system is live. Grab the new logo, colors, and templates from the Media Gallery.",
    tag: "Brand",
    reactions: 156,
    comments: 18,
  },
];

export const recognitions = [
  { id: "r1", to: "Yuki Sato", from: "Sofia Romano", badge: "Innovator", message: "Shipped the new animation engine in record time — flawless DX!", likes: 84, comments: 12, time: "4h" },
  { id: "r2", to: "Daniel Okafor", from: "Liam Carter", badge: "Guardian", message: "Caught a critical vulnerability before launch. Saved our quarter.", likes: 142, comments: 28, time: "1d" },
  { id: "r3", to: "Elena Petrova", from: "Maya Chen", badge: "Strategist", message: "Built the most thoughtful FY26 model I've ever seen.", likes: 96, comments: 14, time: "2d" },
  { id: "r4", to: "Hana Tanaka", from: "Aarav Mehta", badge: "Culture Champion", message: "Made our onboarding the warmest experience in tech.", likes: 220, comments: 41, time: "3d" },
  { id: "r5", to: "Noah Williams", from: "Priya Kapoor", badge: "Insight Hero", message: "Your churn analysis reshaped our entire roadmap.", likes: 73, comments: 9, time: "5d" },
  { id: "r6", to: "Mateo Alvarez", from: "Sofia Romano", badge: "Customer Hero", message: "Turned a frustrated enterprise account into our biggest advocate.", likes: 118, comments: 22, time: "1w" },
];

export const events = [
  { id: "e1", title: "Q3 All-Hands", date: "May 23", time: "4:00 PM", type: "Company", attending: 1284 },
  { id: "e2", title: "Design Critique", date: "May 24", time: "11:00 AM", type: "Design", attending: 42 },
  { id: "e3", title: "Engineering Demo Day", date: "May 27", time: "3:00 PM", type: "Engineering", attending: 186 },
  { id: "e4", title: "New Hire Welcome", date: "May 28", time: "10:00 AM", type: "HR", attending: 28 },
  { id: "e5", title: "Wellness Workshop", date: "May 30", time: "2:00 PM", type: "Wellbeing", attending: 94 },
];

export const discussions = [
  { id: "d1", title: "What's everyone's favorite VS Code extension this year?", author: "Yuki Sato", replies: 84, channel: "engineering", hot: true },
  { id: "d2", title: "Hybrid work — best practices that actually worked for you?", author: "Hana Tanaka", replies: 142, channel: "culture", hot: true },
  { id: "d3", title: "Show & tell: side projects from our team", author: "Aarav Mehta", replies: 56, channel: "general", hot: false },
  { id: "d4", title: "Anyone going to Config 2026?", author: "Sofia Romano", replies: 32, channel: "design", hot: false },
];

export const kpis = [
  { label: "Active Today", value: "2,418", delta: "+8.2%", trend: "up" },
  { label: "Engagement Score", value: "92", delta: "+3 pts", trend: "up" },
  { label: "Open Roles", value: "47", delta: "+5", trend: "up" },
  { label: "Recognitions", value: "318", delta: "+24%", trend: "up" },
];

export const engagementSeries = [
  { d: "Mon", v: 62, p: 48 },
  { d: "Tue", v: 71, p: 55 },
  { d: "Wed", v: 78, p: 60 },
  { d: "Thu", v: 84, p: 66 },
  { d: "Fri", v: 92, p: 72 },
  { d: "Sat", v: 48, p: 30 },
  { d: "Sun", v: 41, p: 28 },
];

export const leaderboard = employees.slice(0, 8).map((e, i) => ({
  ...e,
  points: 3200 - i * 240 + (i % 3) * 80,
  rank: i + 1,
}));

export const media = [
  { id: "m1", title: "Company Retreat — Lisbon", count: 124 },
  { id: "m2", title: "Brand Refresh Reveal", count: 38 },
  { id: "m3", title: "Hack Week '26", count: 96 },
  { id: "m4", title: "New Office Tour", count: 52 },
  { id: "m5", title: "Diversity Summit", count: 84 },
  { id: "m6", title: "Customer Awards Night", count: 41 },
];

export const knowledge = [
  { id: "k1", title: "Engineering Handbook", category: "Engineering", reads: "12.4k" },
  { id: "k2", title: "How we run product reviews", category: "Product", reads: "8.1k" },
  { id: "k3", title: "Brand & Voice Guidelines", category: "Marketing", reads: "5.6k" },
  { id: "k4", title: "Benefits & Compensation FAQ", category: "HR", reads: "18.2k" },
  { id: "k5", title: "Security policies (2026)", category: "Security", reads: "9.7k" },
  { id: "k6", title: "Remote work toolkit", category: "People", reads: "7.3k" },
];

export const notifications = [
  { id: "n1", title: "Sofia mentioned you in #design-system", time: "2m" },
  { id: "n2", title: "Your recognition got 24 new likes", time: "1h" },
  { id: "n3", title: "Q3 All-Hands starts in 2 days", time: "5h" },
  { id: "n4", title: "New policy: Parental Leave updated", time: "1d" },
];
