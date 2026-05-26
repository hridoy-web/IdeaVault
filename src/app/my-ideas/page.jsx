"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaPen, FaTrash, FaFolderOpen, FaLightbulb } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import { fetchMyIdeas, updateIdea, deleteIdea } from "@/lib/ideas/data";
import Link from "next/link";

const MyIdeasPage = () => {
  const { data: session, isPending } = authClient.useSession();

  const [myIdeas, setMyIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedIdea, setSelectedIdea] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // data fetch
  useEffect(() => {
    if (isPending) return;

    const load = async () => {
      try {
        if (!session?.user?.email) return setLoading(false);

        const data = await fetchMyIdeas(session.user.email);
        setMyIdeas(Array.isArray(data) ? data : []);
      } catch (err) {
        toast.error("Failed to load ideas");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [session, isPending]);

  //  data update
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedIdea?._id) return;

    try {
      setActionLoading(true);

      const payload = {
        ideaTitle: selectedIdea.ideaTitle,
        category: selectedIdea.category,
        estimatedBudget: selectedIdea.estimatedBudget,
        shortDescription: selectedIdea.shortDescription,
        targetAudience: selectedIdea.targetAudience,
      };

      const res = await updateIdea(selectedIdea._id, payload);

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
          item._id === selectedIdea._id ? updated : item
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

  // data delete
  const handleDelete = async () => {
    if (!selectedIdea?._id) return;

    try {
      setActionLoading(true);

      const res = await deleteIdea(selectedIdea._id);

      if (res?.error) {
        toast.error("Delete failed");
        return;
      }

      setMyIdeas((prev) =>
        prev.filter((item) => item._id !== selectedIdea._id)
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
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4">


        <h1 className="text-3xl font-bold mb-6 text-slate-900">
          My Ideas
        </h1>

        {/* Loading spinner text*/}
        {loading && (
          <div className="text-center py-10 text-slate-500">
            Loading ideas...
          </div>
        )}

        {/* empty box - for no data */}
        {!loading && myIdeas.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-12 text-center flex flex-col items-center">

            <div className="text-slate-300 text-5xl mb-4">
              <FaFolderOpen />
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              No Ideas Found
            </h2>

            <p className="text-slate-500 mt-2 text-sm max-w-md">
              You are not added any startup ideas yet. Start building your first idea and share it with the world.
            </p>

            <Link href={"/add-idea"}
              className="mt-6 flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FaLightbulb />
              Add New Idea
            </Link>

          </div>
        ) : (
          !loading && (
            <div className="bg-white rounded-2xl shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-100 text-left">
                  <tr>
                    <th className="p-3">Title</th>
                    <th>Category</th>
                    <th>Budget</th>
                    <th className="text-right p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {myIdeas.map((idea) => (
                    <tr key={idea._id} className="border-t">
                      <td className="p-3">
                        <p className="font-semibold">{idea.ideaTitle}</p>
                        <p className="text-xs text-slate-500">
                          {idea.shortDescription}
                        </p>
                      </td>

                      <td className="p-3">{idea.category}</td>
                      <td className="p-3">
                        {idea.estimatedBudget || "N/A"}
                      </td>

                      <td className="p-3 flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedIdea({ ...idea });
                            setIsUpdateOpen(true);
                          }}
                          className="p-2 bg-blue-100 rounded"
                        >
                          <FaPen />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedIdea(idea);
                            setIsDeleteOpen(true);
                          }}
                          className="p-2 bg-red-100 rounded"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}

        {/* update modal */}
        {isUpdateOpen && selectedIdea && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[95%] max-w-xl p-6 rounded-2xl shadow-xl">

              <h2 className="text-xl font-bold mb-6 text-slate-800">
                Update Idea
              </h2>

              <form onSubmit={handleUpdate} className="space-y-4">

                {/* Title */}
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Idea Title
                  </label>
                  <input
                    name="ideaTitle"
                    className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedIdea.ideaTitle}
                    onChange={(e) =>
                      setSelectedIdea({
                        ...selectedIdea,
                        ideaTitle: e.target.value,
                      })
                    }
                    placeholder="Enter idea title"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Category
                  </label>
                  <input
                    name="category"
                    className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedIdea.category}
                    onChange={(e) =>
                      setSelectedIdea({
                        ...selectedIdea,
                        category: e.target.value,
                      })
                    }
                    placeholder="Enter category"
                  />
                </div>

                {/* Budget */}
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Estimated Budget
                  </label>
                  <input
                    name="estimatedBudget"
                    className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedIdea.estimatedBudget}
                    onChange={(e) =>
                      setSelectedIdea({
                        ...selectedIdea,
                        estimatedBudget: e.target.value,
                      })
                    }
                    placeholder="e.g. $5000"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Short Description
                  </label>
                  <textarea
                    name="shortDescription"
                    rows={4}
                    className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedIdea.shortDescription}
                    onChange={(e) =>
                      setSelectedIdea({
                        ...selectedIdea,
                        shortDescription: e.target.value,
                      })
                    }
                    placeholder="Write short description..."
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsUpdateOpen(false)}
                    className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                  >
                    Cancel
                  </button>

                  <button
                    disabled={actionLoading}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    {actionLoading ? "Updating..." : "Update Idea"}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* delete modal*/}
        {isDeleteOpen && selectedIdea && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-[350px] text-center">

              <h2 className="text-lg font-bold text-red-600">
                Delete Idea?
              </h2>

              <p className="text-sm mt-2">
                {selectedIdea.ideaTitle}
              </p>

              <div className="flex gap-3 mt-5">

                <button
                  onClick={() => setIsDeleteOpen(false)}
                  className="w-1/2 bg-gray-200 py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  disabled={actionLoading}
                  className="w-1/2 bg-red-600 text-white py-2 rounded"
                >
                  {actionLoading ? "Deleting..." : "Delete"}
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