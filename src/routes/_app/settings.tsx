import { createFileRoute } from "@tanstack/react-router";
import { Surface, PageHeader, Avatar } from "@/components/widgets/Card";
import { useTheme } from "@/lib/theme";
import { Moon, Sun, Bell, Lock, Globe, User } from "lucide-react";

export const Route = createFileRoute("/_app/settings")({ component: Page });

function Page() {
  const { theme, toggle } = useTheme();
  const sections = [
    { icon: User, label: "Profile", desc: "Name, role, and avatar" },
    { icon: Bell, label: "Notifications", desc: "Mentions, replies, summaries" },
    { icon: Lock, label: "Privacy", desc: "Visibility and data" },
    { icon: Globe, label: "Language", desc: "English (US)" },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader title="Settings" subtitle="Personalize your Aurora experience" />

      <Surface className="p-5 flex items-center gap-4">
        <Avatar initials="MC" className="h-14 w-14 text-lg" />
        <div className="flex-1">
          <p className="font-semibold">Maya Chen</p>
          <p className="text-xs text-muted-foreground">Chief of Staff · Leadership</p>
        </div>
        <button className="rounded-xl bg-muted px-4 py-2 text-sm hover:bg-muted/70">
          Edit profile
        </button>
      </Surface>

      <Surface className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-primary/10 grid place-items-center text-primary">
              {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </div>
            <div>
              <p className="font-medium">Appearance</p>
              <p className="text-xs text-muted-foreground">Switch between light and dark mode</p>
            </div>
          </div>
          <button
            onClick={toggle}
            className={`relative h-7 w-12 rounded-full transition ${theme === "dark" ? "bg-primary" : "bg-muted"}`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${theme === "dark" ? "left-6" : "left-1"}`}
            />
          </button>
        </div>
      </Surface>

      <Surface className="divide-y divide-border">
        {sections.map((s) => (
          <div
            key={s.label}
            className="p-5 flex items-center gap-3 hover:bg-muted/30 transition cursor-pointer"
          >
            <div className="h-10 w-10 rounded-2xl bg-muted grid place-items-center">
              <s.icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </div>
            <span className="text-muted-foreground">›</span>
          </div>
        ))}
      </Surface>
    </div>
  );
}
