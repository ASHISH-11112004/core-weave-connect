import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Surface, Avatar, Badge, PageHeader } from "@/components/widgets/Card";
import { announcements } from "@/lib/data";
import { Heart, MessageSquare, Share2, Pin, ImageIcon, Bookmark } from "lucide-react";
import { CommentThread } from "@/components/widgets/CommentThread";

export const Route = createFileRoute("/_app/announcements")({ component: Page });

const sampleComments = [
  {
    id: "c1",
    author: "Sofia Romano",
    role: "Engineering Manager",
    avatar: "SR",
    content: "Great update! Looking forward to the all-hands.",
    time: "1h",
    likes: 12,
  },
  {
    id: "c2",
    author: "Noah Williams",
    role: "Data Scientist",
    avatar: "NW",
    content: "This sounds exciting. Thanks for the heads up!",
    time: "45m",
    likes: 5,
  },
];

function Page() {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<string | null>(null);
  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Announcements"
        subtitle="Company-wide updates, policies, and stories"
        action={
          <button className="rounded-2xl gradient-primary text-white text-sm px-4 py-2.5 shadow-lg shadow-blue-500/20">
            New post
          </button>
        }
      />

      {/* Composer */}
      <Surface className="p-4 mb-4">
        <div className="flex gap-3">
          <Avatar initials="MC" />
          <input
            placeholder="Share something with the company…"
            className="flex-1 bg-muted/50 rounded-2xl px-4 text-sm outline-none focus:bg-card border border-transparent focus:border-primary/40 transition"
          />
        </div>
      </Surface>

      <div className="space-y-4">
        {announcements.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Surface className="overflow-hidden">
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <Avatar initials={a.avatar} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm">{a.author}</span>
                      <span className="text-xs text-muted-foreground">
                        · {a.role} · {a.time} ago
                      </span>
                      <Badge color="blue">{a.tag}</Badge>
                      {a.pinned && (
                        <Badge color="amber">
                          <Pin className="h-3 w-3" /> Pinned
                        </Badge>
                      )}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold leading-snug">{a.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{a.body}</p>
                  </div>
                  <button className="text-muted-foreground hover:text-primary">
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
                {a.image && (
                  <div className="mt-4 rounded-2xl h-56 gradient-mesh border border-border relative overflow-hidden">
                    <div className="absolute inset-0 grid place-items-center text-muted-foreground">
                      <ImageIcon className="h-8 w-8" />
                    </div>
                  </div>
                )}
              </div>
              <div className="border-t border-border px-5 py-3 flex items-center gap-1 text-sm text-muted-foreground">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-muted transition">
                  <Heart className="h-4 w-4" /> {a.reactions}
                </button>
                <button
                  onClick={() =>
                    setSelectedAnnouncement(selectedAnnouncement === a.id ? null : a.id)
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-muted transition"
                >
                  <MessageSquare className="h-4 w-4" /> {a.comments}
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-muted transition">
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </div>

              {/* Comment Thread */}
              {selectedAnnouncement === a.id && (
                <div className="border-t border-border px-5 py-4 bg-muted/20">
                  <CommentThread comments={sampleComments} />
                </div>
              )}
            </Surface>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
