"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaPaperPlane,
  FaPen,
  FaTrash,
  FaRegCircleUser,
  FaCheck,
  FaXmark,
} from "react-icons/fa6";

import {
  addComment,
  fetchComments,
  updateComment,
  deleteComment,
} from "@/lib/ideas/data";

const CommentsSection = ({ ideaId, session }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // fetch comments
  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await fetchComments(ideaId);

        if (Array.isArray(data)) {
          setComments(data);
        } else {
          setComments([]);
        }
      } catch (error) {
        toast.error("Failed to load comments");
      } finally {
        setLoading(false);
      }
    };

    if (ideaId) {
      loadComments();
    }
  }, [ideaId]);

 // add comment
  const handleAddComment = async () => {
    if (!commentText.trim()) {
      return toast.error("Write something first");
    }

    try {
      const commentData = {
        ideaId,
        userName: session?.user?.name || "Anonymous",
        userEmail: session?.user?.email || "",
        userImage: session?.user?.image || "",
        text: commentText,
        createdAt: new Date(),
      };

      const res = await addComment(commentData);

      if (res?.insertedId || res?.acknowledged) {
        const newComment = {
          _id: res?.insertedId,
          ...commentData,
        };

        setComments((prev) => [newComment, ...prev]);

        setCommentText("");

        toast.success("Comment added");
      } else {
        toast.error("Failed to add comment");
      }
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

// delete comment
  const handleDelete = async (id) => {
    try {
      const res = await deleteComment(id);

      if (res?.deletedCount > 0 || res?.success) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== id)
        );

        toast.success("Comment deleted");
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

// edit comment
  const handleEditStart = (comment) => {
    setEditId(comment._id);
    setEditText(comment.text);
  };

 // edit save
  const handleSaveEdit = async (id) => {
    if (!editText.trim()) {
      return toast.error("Comment cannot be empty");
    }

    try {
      const res = await updateComment(id, {
        text: editText,
      });

      if (
        res?.modifiedCount > 0 ||
        res?.matchedCount > 0 ||
        res?.success
      ) {
        setComments((prev) =>
          prev.map((comment) =>
            comment._id === id
              ? {
                  ...comment,
                  text: editText,
                }
              : comment
          )
        );

        setEditId(null);
        setEditText("");

        toast.success("Comment updated");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-4 md:p-5 space-y-5 sticky top-24">

      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg md:text-xl font-black text-slate-900">
            Discussion & Feedback
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Share thoughts and suggestions
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 text-[#006eff] text-[11px] font-bold px-3 py-1.5 rounded-xl min-w-[75px] text-center">
          {comments.length} Comments
        </div>
      </div>

      {/* comment box */}
      <div className="space-y-4">

        <div className="flex gap-3">

          {/* icon */}
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
            <FaRegCircleUser size={15} />
          </div>

          {/* text input */}
          <div className="flex-1">
            <textarea
              rows={4}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your feedback..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 resize-none outline-none focus:border-[#006eff] focus:ring-4 focus:ring-blue-100 transition"
            />
          </div>

        </div>

        {/* btn */}
        <button
          onClick={handleAddComment}
          className="w-full flex items-center justify-center gap-2 bg-[#006eff] hover:bg-[#0057d1] text-white text-sm font-bold py-3 rounded-2xl transition"
        >
          <FaPaperPlane size={12} />
          Post Comment
        </button>

      </div>

      {/* comments */}
      <div className="space-y-4">

        {/* loading text*/}
        {loading && (
          <div className="text-center py-8 text-sm text-slate-400">
            Loading comments...
          </div>
        )}

        {/* empty message */}
        {!loading && comments.length === 0 && (
          <div className="border border-dashed border-slate-200 rounded-3xl py-10 px-4 bg-slate-50 text-center flex flex-col items-center">

            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
              <FaRegCircleUser size={20} />
            </div>

            <h3 className="text-base font-black text-slate-700">
              No Comments Yet
            </h3>

            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-[220px] leading-relaxed">
              Be the first person to share feedback.
            </p>

          </div>
        )}

        {/* comment card */}
        {comments.map((comment) => {
          const isOwner =
            session?.user?.email === comment?.userEmail;

          return (
            <div
              key={comment._id}
              className="border border-slate-200 rounded-3xl p-4 hover:shadow-sm transition"
            >

              <div className="flex items-start justify-between gap-3">

                {/*  */}
                <div className="flex gap-3 flex-1 min-w-0">

                  {/* user icon */}
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#006eff] flex items-center justify-center shrink-0">
                    <FaRegCircleUser size={15} />
                  </div>

                  {/* content */}
                  <div className="flex-1 min-w-0 space-y-2">

                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-black text-sm text-slate-800">
                        {comment.userName}
                      </h4>

                      <span className="text-[11px] text-slate-400">
                        Comment
                      </span>
                    </div>

                    {/* edit */}
                    {editId === comment._id ? (
                      <div className="space-y-3">

                        <textarea
                          rows={3}
                          value={editText}
                          onChange={(e) =>
                            setEditText(e.target.value)
                          }
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 resize-none outline-none focus:border-[#006eff] focus:ring-4 focus:ring-blue-100 transition"
                        />

                        <div className="flex items-center gap-2">

                          <button
                            onClick={() =>
                              handleSaveEdit(comment._id)
                            }
                            className="w-9 h-9 rounded-xl bg-green-100 hover:bg-green-200 text-green-600 flex items-center justify-center transition"
                          >
                            <FaCheck size={12} />
                          </button>

                          <button
                            onClick={() => {
                              setEditId(null);
                              setEditText("");
                            }}
                            className="w-9 h-9 rounded-xl bg-red-100 hover:bg-red-200 text-red-500 flex items-center justify-center transition"
                          >
                            <FaXmark size={12} />
                          </button>

                        </div>

                      </div>
                    ) : (
                      <p className="text-sm text-slate-600 leading-relaxed break-words">
                        {comment.text}
                      </p>
                    )}

                  </div>

                </div>

                {/* action btn */}
                {isOwner && editId !== comment._id && (
                  <div className="flex items-center gap-2 shrink-0">

                    <button
                      onClick={() => handleEditStart(comment)}
                      className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-[#006eff] text-slate-500 flex items-center justify-center transition"
                    >
                      <FaPen size={11} />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(comment._id)
                      }
                      className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-500 text-slate-500 flex items-center justify-center transition"
                    >
                      <FaTrash size={11} />
                    </button>

                  </div>
                )}

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default CommentsSection;