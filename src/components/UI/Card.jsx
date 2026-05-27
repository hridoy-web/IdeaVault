import Link from "next/link";
import Image from "next/image";

const Card = ({ idea }) => {
  const {
    ideaTitle,
    category,
    imageURL,
    estimatedBudget,
    targetAudience,
    problemStatement,
  } = idea;

  return (
    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:bg-white dark:hover:bg-slate-800 hover:border-[#006eff]/30 hover:-translate-y-1 group overflow-hidden">

      <div>

        {/* Image */}
        <div className="w-full h-48 bg-slate-200 dark:bg-slate-800 relative overflow-hidden shrink-0">

          <Image
            src={
              imageURL ||
              "https://i.ibb.co.com/bgS6dHSp/gpt-image-2-A-realistic-wide-angle-cinematic-photo-of-a-startup-team-conducting-a-serious-bu-0.jpg"
            }
            alt={ideaTitle}
            fill
            sizes="(max-width: 1200px) 33vw, (max-width: 768px) 50vw, 100vw"
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Category badge */}
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-700 text-[#006eff] px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wide shadow-sm z-10">

            <span className="w-1.5 h-1.5 rounded-full bg-[#006eff] animate-pulse"></span>

            {category}
          </span>

        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-4">

          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-[#006eff] transition-colors line-clamp-1">
            {ideaTitle}
          </h3>

          {/* Info */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800/60">

            {/* Problem */}
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider font-black text-slate-400 dark:text-slate-500 block">
                The Problem
              </span>

              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-2">
                {problemStatement}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-1">

              {/* Budget */}
              <div>
                <span className="text-[10px] uppercase tracking-wider font-black text-slate-400 dark:text-slate-500 block">
                  Est. Budget
                </span>

                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {estimatedBudget ? `$${estimatedBudget}` : "N/A"}
                </span>
              </div>

              {/* Audience */}
              <div>
                <span className="text-[10px] uppercase tracking-wider font-black text-slate-400 dark:text-slate-500 block">
                  Target Audience
                </span>

                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate block">
                  {targetAudience}
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="px-6 pb-6 md:px-8 md:pb-8">

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60">

          <Link
            href={`/ideas/${idea._id}`}
            className="w-full inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-[#006eff] to-indigo-600 hover:from-[#005fd8] hover:to-indigo-700 text-white font-bold py-3 transition-all duration-300 uppercase text-xs tracking-wide border-0 shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 focus:outline-none focus:ring-0"
          >
            View Details
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Card;