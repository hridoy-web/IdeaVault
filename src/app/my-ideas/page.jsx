"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import {
  FaPen,
  FaTrash,
  FaFolderOpen,
  FaLightbulb,
} from "react-icons/fa6";

import { authClient } from "@/lib/auth-client";
import {
  fetchMyIdeas,
  updateIdea,
  deleteIdea,
} from "@/lib/ideas/data";

import Link from "next/link";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

const MyIdeasPage = () => {
  const { data: session, isPending } =
    authClient.useSession();

  const [myIdeas, setMyIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedIdea, setSelectedIdea] =
    useState(null);

  const [isUpdateOpen, setIsUpdateOpen] =
    useState(false);

  const [isDeleteOpen, setIsDeleteOpen] =
    useState(false);

  const [actionLoading, setActionLoading] =
    useState(false);

  // Fetch data
  useEffect(() => {
    if (isPending) return;

    const load = async () => {
      try {
        if (!session?.user?.email) {
          return setLoading(false);
        }

        const data = await fetchMyIdeas(
          session.user.email
        );

        setMyIdeas(Array.isArray(data) ? data : []);
      } catch (err) {
        toast.error("Failed to load ideas");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [session, isPending]);

  // Update idea
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedIdea?._id) return;

    try {
      setActionLoading(true);

      const payload = {
        ideaTitle: selectedIdea.ideaTitle,
        category: selectedIdea.category,
        estimatedBudget:
          selectedIdea.estimatedBudget,
        shortDescription:
          selectedIdea.shortDescription,
        targetAudience:
          selectedIdea.targetAudience,
      };

      const res = await updateIdea(
        selectedIdea._id,
        payload
      );

      if (!res || res.error) {
        toast.error("Update failed");
        return;
      }

      const updated = res?.data || {
        ...selectedIdea,
        ...payload,
      };

      setMyIdeas((prev) =>
        prev.map((item) =>
          item._id === selectedIdea._id
            ? updated
            : item
        )
      );

      toast.success("Idea updated successfully");

      setIsUpdateOpen(false);
      setSelectedIdea(null);
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setActionLoading(false);
    }
  };

  // Delete idea
  const handleDelete = async () => {
    if (!selectedIdea?._id) return;

    try {
      setActionLoading(true);

      const res = await deleteIdea(
        selectedIdea._id
      );

      if (res?.error) {
        toast.error("Delete failed");
        return;
      }

      setMyIdeas((prev) =>
        prev.filter(
          (item) => item._id !== selectedIdea._id
        )
      );

      toast.success("Idea deleted successfully");

      setIsDeleteOpen(false);
      setSelectedIdea(null);
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 transition-colors duration-300">

      <div className="max-w-6xl mx-auto px-4">

        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            My Ideas
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Manage and update your startup ideas.
          </p>
        </div>

        {/* Loading */}
        {loading && <LoadingSpinner />}

        {/* Empty message */}
        {!loading && myIdeas.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center transition-colors duration-300">

            <div className="text-slate-300 dark:text-slate-600 text-5xl mb-4">
              <FaFolderOpen />
            </div>

            <h2 className="text-xl font-black text-slate-800 dark:text-white">
              No Ideas Found
            </h2>

            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-md leading-relaxed">
              You have not added any startup ideas
              yet. Start building your first idea
              and share it with the world.
            </p>

            <Link
              href={"/add-idea"}
              className="mt-6 flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition"
            >
              <FaLightbulb />
              Add New Idea
            </Link>
          </div>
        ) : (
          !loading && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden transition-colors duration-300">

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-slate-100 dark:bg-slate-800/70">

                    <tr className="text-slate-700 dark:text-slate-300 text-sm">

                      <th className="p-4 text-left font-bold">
                        Title
                      </th>

                      <th className="p-4 text-left font-bold">
                        Category
                      </th>

                      <th className="p-4 text-left font-bold">
                        Budget
                      </th>

                      <th className="p-4 text-right font-bold">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {myIdeas.map((idea) => (
                      <tr
                        key={idea._id}
                        className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                      >

                        {/* Title */}
                        <td className="p-4">

                          <p className="font-bold text-slate-900 dark:text-white">
                            {idea.ideaTitle}
                          </p>

                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                            {idea.shortDescription}
                          </p>
                        </td>

                        {/* Category */}
                        <td className="p-4">

                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {idea.category}
                          </span>
                        </td>

                        {/* Budget */}
                        <td className="p-4">

                          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                            $
                            {idea.estimatedBudget ||
                              "N/A"}
                          </span>
                        </td>

                        <td className="p-4">

                          <div className="flex justify-end gap-2">

                            {/* Edit */}
                            <button
                              onClick={() => {
                                setSelectedIdea({
                                  ...idea,
                                });

                                setIsUpdateOpen(true);
                              }}
                              className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-600 flex items-center justify-center transition"
                            >
                              <FaPen size={13} />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => {
                                setSelectedIdea(
                                  idea
                                );

                                setIsDeleteOpen(true);
                              }}
                              className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-500 flex items-center justify-center transition"
                            >
                              <FaTrash size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        )}

        {/* update modal*/}
        {isUpdateOpen && selectedIdea && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-xl p-6 rounded-3xl shadow-2xl transition-colors duration-300">

              <h2 className="text-2xl font-black mb-6 text-slate-900 dark:text-white">
                Update Idea
              </h2>

              <form
                onSubmit={handleUpdate}
                className="space-y-5"
              >

                {/* Title */}
                <div>
                  <label className="text-sm font-bold text-slate-600 dark:text-slate-300">
                    Idea Title
                  </label>

                  <input
                    name="ideaTitle"
                    value={selectedIdea.ideaTitle}
                    onChange={(e) =>
                      setSelectedIdea({
                        ...selectedIdea,
                        ideaTitle: e.target.value,
                      })
                    }
                    placeholder="Enter idea title"
                    className="w-full mt-2 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 outline-none focus:border-[#006eff] transition"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-bold text-slate-600 dark:text-slate-300">
                    Category
                  </label>

                  <input
                    name="category"
                    value={selectedIdea.category}
                    onChange={(e) =>
                      setSelectedIdea({
                        ...selectedIdea,
                        category: e.target.value,
                      })
                    }
                    placeholder="Enter category"
                    className="w-full mt-2 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 outline-none focus:border-[#006eff] transition"
                  />
                </div>

                {/* Budget */}
                <div>
                  <label className="text-sm font-bold text-slate-600 dark:text-slate-300">
                    Estimated Budget
                  </label>

                  <input
                    name="estimatedBudget"
                    value={
                      selectedIdea.estimatedBudget
                    }
                    onChange={(e) =>
                      setSelectedIdea({
                        ...selectedIdea,
                        estimatedBudget:
                          e.target.value,
                      })
                    }
                    placeholder="e.g. 5000"
                    className="w-full mt-2 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 outline-none focus:border-[#006eff] transition"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-bold text-slate-600 dark:text-slate-300">
                    Short Description
                  </label>

                  <textarea
                    rows={4}
                    name="shortDescription"
                    value={
                      selectedIdea.shortDescription
                    }
                    onChange={(e) =>
                      setSelectedIdea({
                        ...selectedIdea,
                        shortDescription:
                          e.target.value,
                      })
                    }
                    placeholder="Write short description..."
                    className="w-full mt-2 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 outline-none resize-none focus:border-[#006eff] transition"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-2">

                  <button
                    type="button"
                    onClick={() =>
                      setIsUpdateOpen(false)
                    }
                    className="px-5 py-3 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold transition"
                  >
                    Cancel
                  </button>

                  <button
                    disabled={actionLoading}
                    className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition"
                  >
                    {actionLoading
                      ? "Updating..."
                      : "Update Idea"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete modal */}
        {isDeleteOpen && selectedIdea && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl w-full max-w-sm text-center transition-colors duration-300">

              <h2 className="text-xl font-black text-red-500">
                Delete Idea?
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                Are you sure you want to delete
                <span className="font-bold text-slate-800 dark:text-white">
                  {" "}
                  {selectedIdea.ideaTitle}
                </span>
                ?
              </p>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() =>
                    setIsDeleteOpen(false)
                  }
                  className="w-1/2 py-3 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  disabled={actionLoading}
                  className="w-1/2 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold transition"
                >
                  {actionLoading
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyIdeasPage;