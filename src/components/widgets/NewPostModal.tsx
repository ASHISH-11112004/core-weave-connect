import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Image, Smile, Send } from "lucide-react";
import { toast } from "sonner";

export function NewPostModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!content.trim()) return;

    setLoading(true);
    // Simulate post submission
    setTimeout(() => {
      setLoading(false);
      setContent("");
      toast.success("Post created successfully!", {
        description: "Your update has been shared with the team.",
      });
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.currentTarget === e.target && onClose()}
          >
            <div className="w-full max-w-2xl rounded-3xl border border-border bg-card shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-semibold">Create a new post</h2>
                <button
                  onClick={onClose}
                  className="h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full gradient-accent text-white flex items-center justify-center text-sm font-semibold">
                    MC
                  </div>
                  <div>
                    <p className="font-medium text-sm">Maya Chen</p>
                    <p className="text-xs text-muted-foreground">Chief of Staff</p>
                  </div>
                </div>

                {/* Text Area */}
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your thoughts, updates, or announcements..."
                  className="w-full min-h-32 p-4 rounded-lg bg-muted/50 border border-border focus:border-primary/50 focus:bg-background outline-none resize-none text-sm transition"
                />

                {/* Character count */}
                <div className="text-xs text-muted-foreground text-right">
                  {content.length} characters
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      className="h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition"
                      title="Add image"
                    >
                      <Image className="h-4 w-4" />
                    </button>
                    <button
                      className="h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition"
                      title="Add emoji"
                    >
                      <Smile className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={onClose}
                      className="h-9 px-4 rounded-lg border border-border hover:bg-muted text-sm font-medium transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlePost}
                      disabled={loading || !content.trim()}
                      className="h-9 px-4 rounded-lg gradient-primary text-white text-sm font-medium flex items-center gap-2 hover:brightness-110 disabled:opacity-50 transition"
                    >
                      {loading ? (
                        "Posting..."
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" /> Post
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
