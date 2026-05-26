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
      router.push('/ideas');
    }
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-12 text-slate-800">
      <div className="w-11/12 max-w-4xl mx-auto bg-white border border-slate-200 p-6 md:p-10 rounded-3xl shadow-sm space-y-8">
        
        {/* Page Header */}
        <div className="border-b border-slate-100 pb-5 space-y-2">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
            Share Your Startup Concept
          </h1>
          <p className="text-slate-500 text-sm">
            Fill out the structured segments below to vault your idea and gather validation from the community.
          </p>
        </div>

        {/* Form  */}
        <form onSubmit={handleAddIdea} className="space-y-6">
          
          {/* Grid Container  */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Idea Title */}
            <div className="form-control w-full space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Idea Title <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="ideaTitle" 
                required
                placeholder="e.g., AI Crop Disease Detector" 
                className="input input-bordered w-full bg-slate-50 border-slate-200 focus:border-[#006eff] focus:bg-white text-sm rounded-xl"
              />
            </div>

            {/* 2. Category Dropdown */}
            <div className="form-control w-full space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Category <span className="text-red-500">*</span>
              </label>
              <select 
                name="category" 
                required
                defaultValue=""
                className="select select-bordered w-full bg-slate-50 border-slate-200 focus:border-[#006eff] focus:bg-white text-sm rounded-xl text-slate-600"
              >
                <option value="" disabled>Select</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Education">Education</option>
                <option value="FinTech">FinTech</option>
                <option value="Sustainability">Sustainability</option>
              </select>
            </div>

            {/* 3. Short Description */}
            <div className="form-control w-full space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Short Description <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="shortDescription" 
                required
                placeholder="A precise one-line punchline of your startup concept" 
                className="input input-bordered w-full bg-slate-50 border-slate-200 focus:border-[#006eff] focus:bg-white text-sm rounded-xl"
              />
            </div>

            {/* 4. Image URL */}
            <div className="form-control w-full space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Image URL <span className="text-red-500">*</span>
              </label>
              <input 
                type="url" 
                name="imageURL"
                required
                placeholder="https://example.com/image.jpg" 
                className="input input-bordered w-full bg-slate-50 border-slate-200 focus:border-[#006eff] focus:bg-white text-sm rounded-xl"
              />
            </div>

            {/* 5. Target Audience */}
            <div className="form-control w-full space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Target Audience <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="targetAudience" 
                required
                placeholder="e.g., Local Farmers, University Students" 
                className="input input-bordered w-full bg-slate-50 border-slate-200 focus:border-[#006eff] focus:bg-white text-sm rounded-xl"
              />
            </div>

            {/* 6. Estimated Budget */}
            <div className="form-control w-full space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Estimated Budget <span className="text-slate-400">(Optional)</span>
              </label>
              <input 
                type="text" 
                name="estimatedBudget" 
                placeholder="e.g., $5,000" 
                className="input input-bordered w-full bg-slate-50 border-slate-200 focus:border-[#006eff] focus:bg-white text-sm rounded-xl"
              />
            </div>

            {/* 7. Tags */}
            <div className="form-control w-full space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Tags <span className="text-slate-400">(Optional)</span>
              </label>
              <input 
                type="text" 
                name="tags" 
                placeholder="e.g., ai, agritech, automation" 
                className="input input-bordered w-full bg-slate-50 border-slate-200 focus:border-[#006eff] focus:bg-white text-sm rounded-xl"
              />
            </div>

            {/* 8. Problem Statement */}
            <div className="form-control w-full space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Problem Statement <span className="text-red-500">*</span>
              </label>
              <textarea 
                name="problemStatement"
                required
                rows="3"
                placeholder="Clearly describe the exact problem or paint point your audience is facing..." 
                className="textarea textarea-bordered w-full bg-slate-50 border-slate-200 focus:border-[#006eff] focus:bg-white text-sm rounded-xl leading-relaxed resize-none"
              />
            </div>

            {/* 9. Proposed Solution */}
            <div className="form-control w-full space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Proposed Solution <span className="text-red-500">*</span>
              </label>
              <textarea 
                name="proposedSolution" 
                required
                rows="3"
                placeholder="Detail how your concept addresses the problem seamlessly..." 
                className="textarea textarea-bordered w-full bg-slate-50 border-slate-200 focus:border-[#006eff] focus:bg-white text-sm rounded-xl leading-relaxed resize-none"
              />
            </div>

            {/* 10. Detailed Description */}
            <div className="form-control w-full space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Detailed Description <span className="text-red-500">*</span>
              </label>
              <textarea 
                name="detailedDescription" 
                required
                rows="4"
                placeholder="Provide a comprehensive operational roadmap of your startup concept..." 
                className="textarea textarea-bordered w-full bg-slate-50 border-slate-200 focus:border-[#006eff] focus:bg-white text-sm rounded-xl leading-relaxed resize-none"
              />
            </div>

          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button 
              type="submit" 
              className="btn bg-[#006eff] hover:bg-[#005fd8] text-white border-none px-8 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-600/20 w-full md:w-auto py-3.5 h-auto min-h-0"
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