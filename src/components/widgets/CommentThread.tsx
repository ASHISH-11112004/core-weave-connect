import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Edit2, Trash2, Heart, MessageSquare } from "lucide-react";
import { Avatar, Badge } from "./Card";

interface Comment {
  id: string;
  author: string;
  role: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
}

export function CommentThread({ comments: initialComments }: { comments: Comment[] }) {
  const [comments, setComments] = useState(initialComments);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleEdit = (id: string, content: string) => {
    setEditingId(id);
    setEditText(content);
  };

  const handleSaveEdit = (id: string) => {
    setComments(comments.map((c) => (c.id === id ? { ...c, content: editText } : c)));
    setEditingId(null);
    setEditText("");
  };

  const handleDelete = (id: string) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `c${Date.now()}`,
      author: "You",
      role: "Chief of Staff",
      avatar: "MC",
      content: newComment,
      time: "now",
      likes: 0,
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <div className="mt-4 border-t border-border pt-4 space-y-4">
      <button
        onClick={() => setShowComments(!showComments)}
        className="text-sm text-primary hover:underline"
      >
        {showComments ? "Hide" : "Show"} {comments.length} comment{comments.length !== 1 ? "s" : ""}
      </button>

      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {/* Comment Input */}
            <div className="flex gap-3">
              <Avatar initials="MC" />
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment…"
                  className="w-full h-20 p-3 rounded-lg bg-muted/50 border border-border focus:border-primary/50 focus:bg-background outline-none text-sm resize-none transition"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => setNewComment("")}
                    className="h-8 px-3 rounded-lg border border-border hover:bg-muted text-sm font-medium transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="h-8 px-3 rounded-lg gradient-primary text-white text-sm font-medium hover:brightness-110 disabled:opacity-50 transition"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-3 mt-4">
              {comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex gap-3 p-3 rounded-lg bg-muted/30"
                >
                  <Avatar initials={comment.avatar} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-medium text-sm">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">
                        {comment.role} · {comment.time}
                      </span>
                    </div>

                    {editingId === comment.id ? (
                      <div>
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full h-16 p-2 rounded-lg bg-background border border-border focus:border-primary/50 outline-none text-sm resize-none"
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => setEditingId(null)}
                            className="h-7 px-2 text-xs rounded border border-border hover:bg-muted transition"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveEdit(comment.id)}
                            className="h-7 px-2 text-xs rounded gradient-primary text-white hover:brightness-110 transition"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-foreground">{comment.content}</p>
                    )}

                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-background/50 transition">
                        <Heart className="h-3.5 w-3.5" /> {comment.likes}
                      </button>
                      {comment.author === "You" && (
                        <>
                          <button
                            onClick={() => handleEdit(comment.id, comment.content)}
                            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-background/50 transition text-primary"
                          >
                            <Edit2 className="h-3.5 w-3.5" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(comment.id)}
                            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-background/50 transition text-red-600"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
