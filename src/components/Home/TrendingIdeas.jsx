

import Link from "next/link";
import { FaRegLightbulb } from "react-icons/fa6";
import Card from "../UI/Card";
import { fetchTrendingIdeas } from "@/lib/ideas/data";

const TrendingIdeas = async () => {

    const trendingIdeas = await fetchTrendingIdeas();
    // console.log(trendingIdeas);

    return (
        <section className="w-full bg-white py-16 text-slate-800">
            <div className="w-11/12 max-w-7xl mx-auto space-y-12">

                {/* container */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
                    <div className="space-y-2">
                        <div className="inline-flex items-center space-x-2 text-[#006eff] text-xs font-bold uppercase tracking-wider">
                            <FaRegLightbulb size={14} className="animate-pulse" />
                            <span>Ecosystem Hotspots</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
                            Trending Startup Ideas
                        </h2>
                        <p className="text-slate-500 max-w-xl text-sm md:text-base">
                            Explore the top 6 highly validated innovative concepts shared by our creator community.
                        </p>
                    </div>

                    <div>
                        <Link
                            href="/ideas"
                            className="inline-flex items-center space-x-2 text-[#006eff] hover:text-[#005fd8] font-bold text-sm uppercase tracking-wide transition-all group"
                        >
                            <span>Browse All Ideas</span>
                            <span className="transition-transform group-hover:translate-x-1"> →</span>
                        </Link>
                    </div>
                </div>

                {/* Ideas card Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        trendingIdeas?.map(idea => <Card key={idea._id} idea={idea} />)
                    }
                </div>

            </div>
        </section>
    );
};

export default TrendingIdeas;