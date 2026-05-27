"use client";

import { createIdea } from "@/lib/ideas/data";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AddIdeaPage = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleAddIdea = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const ideaData = Object.fromEntries(formData.entries());

    ideaData.userEmail = session?.user?.email;
    ideaData.userName = session?.user?.name;

    const result = await createIdea(ideaData);
    if (result) {
      toast.success("Your idea added successfully!");
      e.target.reset();
      router.push("/ideas");
    }
  };

  return (
    <div className="w-full min-h-screen py-12 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      <div className="w-11/12 max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-10 rounded-3xl shadow-sm space-y-8 transition-colors duration-300">
        
        <div className="border-b border-slate-100 dark:border-slate-800 pb-5 space-y-2">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Share Your Startup Concept
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Fill out the structured segments below to vault your idea and gather validation from the community.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleAddIdea} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Idea Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Idea Title <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="ideaTitle"
                required
                placeholder="e.g., AI Crop Disease Detector"
                className="w-full input input-bordered bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 focus:border-[#006eff] text-sm rounded-xl"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Category <span className="text-red-500">*</span>
              </label>

              <select
                name="category"
                required
                defaultValue=""
                className="w-full select select-bordered bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 focus:border-[#006eff] text-sm rounded-xl text-slate-600 dark:text-slate-300"
              >
                <option value="" disabled>Select</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Artificial Intelligence">AI</option>
                <option value="Education">Education</option>
                <option value="FinTech">FinTech</option>
                <option value="Sustainability">Sustainability</option>
              </select>
            </div>

            {/* Short Description */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Short Description <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="shortDescription"
                required
                placeholder="A precise one-line punchline"
                className="w-full input input-bordered bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 focus:border-[#006eff] text-sm rounded-xl"
              />
            </div>

            {/* Image URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Image URL
              </label>

              <input
                type="url"
                name="imageURL"
                placeholder="https://example.com/image.jpg"
                className="w-full input input-bordered bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 focus:border-[#006eff] text-sm rounded-xl"
              />
            </div>

            {/* Target Audience */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Target Audience <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="targetAudience"
                required
                placeholder="e.g., Students, Farmers"
                className="w-full input input-bordered bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 focus:border-[#006eff] text-sm rounded-xl"
              />
            </div>

            {/* Budget */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Estimated Budget (Optional)
              </label>

              <input
                type="text"
                name="estimatedBudget"
                placeholder="e.g., 5000"
                className="w-full input input-bordered bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 focus:border-[#006eff] text-sm rounded-xl"
              />
            </div>

            {/* Tags */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Tags (Optional)
              </label>

              <input
                type="text"
                name="tags"
                placeholder="ai, startup, tech"
                className="w-full input input-bordered bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 focus:border-[#006eff] text-sm rounded-xl"
              />
            </div>

            {/* Problem */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Problem Statement <span className="text-red-500">*</span>
              </label>

              <textarea
                name="problemStatement"
                required
                rows={3}
                className="textarea textarea-bordered w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 focus:border-[#006eff] text-sm rounded-xl"
              />
            </div>

            {/* Solution */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Proposed Solution <span className="text-red-500">*</span>
              </label>

              <textarea
                name="proposedSolution"
                required
                rows={3}
                className="textarea textarea-bordered w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 focus:border-[#006eff] text-sm rounded-xl"
              />
            </div>

            {/* Details */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Detailed Description <span className="text-red-500">*</span>
              </label>

              <textarea
                name="detailedDescription"
                required
                rows={4}
                className="textarea textarea-bordered w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 focus:border-[#006eff] text-sm rounded-xl"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 rounded-xl font-bold text-white bg-[#006eff] hover:bg-[#005fd8] transition shadow-md"
            >
              Submit Concept
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIdeaPage;