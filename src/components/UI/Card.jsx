import Link from "next/link";

const Card = ({ idea }) => {
    return (
        <div
            className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:bg-white hover:border-[#006eff]/30 hover:-translate-y-1 group"
        >
            <div className="space-y-4">
                
                {/* 1. Category */}
                <span className="inline-block bg-blue-50 border border-blue-100 text-[#006eff] px-3 py-1 rounded-lg text-xs font-bold tracking-wide">
                    {idea.category}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug group-hover:text-[#006eff] transition-colors line-clamp-1">
                    {idea.title}
                </h3>

                {/* Info  section*/}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                    {/*Problem description */}
                    <div className="space-y-1">
                        <span className="text-[11px] uppercase tracking-wider font-black text-slate-400 block">The Problem</span>
                        <p className="text-sm text-slate-700 leading-relaxed line-clamp-2">
                            {idea.problem}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-1">

                        {/* Budget */}
                        <div>
                            <span className="text-[10px] uppercase tracking-wider font-black text-slate-400 block">Est. Budget</span>
                            <span className="text-sm font-bold text-slate-800">{idea.budget}</span>
                        </div>

                        {/* Audience */}
                        <div>
                            <span className="text-[10px] uppercase tracking-wider font-black text-slate-400 block">Target Audience</span>
                            <span className="text-sm font-bold text-slate-800 truncate block">{idea.audience}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* card btn */}
            <div className="pt-6 mt-6 border-t border-slate-100">
                <Link
                    href={`/ideas/${idea._id}`}
                   className="btn bg-slate-100 border-none text-slate-700 hover:bg-[#006eff] hover:text-white font-bold w-full rounded-2xl duration-200 transition-colors"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default Card;