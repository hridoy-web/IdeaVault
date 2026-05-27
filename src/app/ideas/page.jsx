import Card from "@/components/UI/Card";
import { fetchIdeas } from "@/lib/ideas/data";

const AllIdeasPage = async () => {
  const ideas = await fetchIdeas();

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen py-12 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      <div className="w-11/12 max-w-7xl mx-auto space-y-10">

        {/* Title */}
        <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-5">
          
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Startup Idea Vault
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
            Browse, search, and discover innovative business concepts shared across various sectors.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 md:p-6 rounded-2xl shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between transition-colors duration-300">

          {/* Search Input */}
          <div className="w-full md:max-w-md">
            
            <input
              type="text"
              placeholder="Search by title or problem keyword..."
              className="input input-bordered w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 focus:border-[#006eff] focus:bg-white dark:focus:bg-slate-900 text-sm rounded-xl text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-auto flex items-center space-x-3 justify-end">

            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 hidden sm:inline">
              Select:
            </span>

            <select
              className="select select-bordered bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 focus:border-[#006eff] focus:bg-white dark:focus:bg-slate-900 text-sm rounded-xl text-slate-700 dark:text-slate-200 w-full md:w-56"
            >
              <option value="All">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="Education">Education</option>
              <option value="FinTech">FinTech</option>
              <option value="Sustainability">Sustainability</option>
            </select>
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ideas?.map((idea) => (
            <Card key={idea._id} idea={idea} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default AllIdeasPage;