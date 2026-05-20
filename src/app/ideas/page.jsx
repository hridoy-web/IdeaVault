
import Card from "@/components/UI/Card";
import { fetchIdeas } from "@/lib/ideas/data";

const AllIdeasPage = async () => {

    const ideas = await fetchIdeas();
    // console.log(ideas);

    // // Search and Filter 
    // const [searchQuery, setSearchQuery] = useState("");
    // const [selectedCategory, setSelectedCategory] = useState("All");

    // //  filtering logic
    // const filteredIdeas = allIdeas.filter((idea) => {
    //     const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         idea.problem.toLowerCase().includes(searchQuery.toLowerCase());
    //     const matchesCategory = selectedCategory === "All" || idea.category === selectedCategory;
    //     return matchesSearch && matchesCategory;
    // });

    return (
        <div className="w-full bg-slate-50 min-h-screen py-12 text-slate-800">
            <div className="w-11/12 max-w-7xl mx-auto space-y-10">

                {/* title*/}
                <div className="space-y-2 border-b border-slate-200 pb-5">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
                        Startup Idea Vault
                    </h1>
                    <p className="text-slate-500 text-sm md:text-base">
                        Browse, search, and discover innovative business concepts shared across various sectors.
                    </p>
                </div>

                {/* Search & Filter  */}
                <div className="bg-white border border-slate-200 p-4 md:p-6 rounded-2xl shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">

                    {/* Search Input Box */}
                    <div className="w-full md:max-w-md">
                        <input
                            type="text"
                            placeholder="Search by title or problem keyword..."
                            // value={searchQuery}
                            // onChange={(e) => setSearchQuery(e.target.value)}
                            className="input input-bordered w-full bg-slate-50 border-slate-200 focus:border-[#006eff] focus:bg-white text-sm rounded-xl"
                        />
                    </div>

                    {/* Category Filter Dropdown */}
                    <div className="w-full md:w-auto flex items-center space-x-3 justify-end">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 hidden sm:inline">
                            Select:
                        </span>
                        <select
                            // value={selectedCategory}
                            // onChange={(e) => setSelectedCategory(e.target.value)}
                            className="select select-bordered bg-slate-50 border-slate-200 focus:border-[#006eff] focus:bg-white text-sm rounded-xl text-slate-700 w-full md:w-56"
                        >
                            <option value="All">All Categories</option>
                            <option value="Technology">Technology</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                            <option value="Education">Education</option>
                            <option value="FinTech">FinTech</option>
                            <option value="Sustainability">Sustainability</option>
                        </select>
                    </div>

                </div>

                {/* card grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        ideas?.map(idea => <Card key={idea._id} idea={idea} />)
                    }
                </div>

            </div>
        </div>
    );
};

export default AllIdeasPage;