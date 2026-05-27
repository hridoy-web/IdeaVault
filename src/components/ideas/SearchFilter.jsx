"use client";

const SearchFilter = ({ search, setSearch, category, setCategory, }) => {

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 md:p-6 rounded-2xl shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">

            {/* Search Input */}
            <div className="w-full md:max-w-md">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by title or problem keyword..."
                    className="input input-bordered w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 focus:border-[#006eff] focus:bg-white dark:focus:bg-slate-900 text-sm rounded-xl"
                />
            </div>

            {/* Category Filter */}
            <div className="w-full md:w-auto flex items-center space-x-3 justify-end">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 hidden sm:inline">
                    Select:
                </span>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="select select-bordered bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 focus:border-[#006eff] focus:bg-white dark:focus:bg-slate-900 text-sm rounded-xl w-full md:w-56"
                >
                    <option value="All">All Categories</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="AI">AI</option>
                    <option value="Education">Education</option>
                    <option value="FinTech">FinTech</option>
                    <option value="Sustainability">Sustainability</option>
                    <option value="Others">Others</option>
                </select>
            </div>
        </div>
    );
};

export default SearchFilter;