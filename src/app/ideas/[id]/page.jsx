import CommentsSection from "@/components/UI/CommentsSection";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

export const singleIdeas = async (id, token) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas/${id}`, {
    headers: {
      authorization: `Bearer ${token}` || "",
    },
  });

  const data = await res.json();
  return data || {};
};

const IdeaDetailsPage = async ({ params }) => {
  const { id } = await params;

  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const token = tokenData?.token || tokenData;

  const idea = await singleIdeas(id, token);

  const {
    ideaTitle,
    shortDescription,
    detailedDescription,
    category,
    tags,
    imageURL,
    estimatedBudget,
    targetAudience,
    problemStatement,
    proposedSolution,
  } = idea;

  return (
    <div className="w-full bg-white dark:bg-slate-950 text-black dark:text-white min-h-screen py-12 antialiased transition-colors duration-300">
      
      <div className="w-11/12 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs p-6 md:p-8 space-y-6 transition-colors duration-300">

            {/* Image Section */}
            <div className="w-full h-64 md:h-96 relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              
              <Image
                src={
                  imageURL ||
                  "https://images.unsplash.com/photo-1607799279861-4dd421887fb3"
                }
                alt={ideaTitle || "Startup Idea"}
                fill
                priority
                unoptimized
                className="object-cover"
              />
            </div>

            {/* Title & Category */}
            <div className="space-y-4">

              <div>
                <span className="inline-block bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-[#006eff] px-3 py-1 rounded-lg text-xs font-black tracking-wider uppercase">
                  {category || "Uncategorized"}
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                {ideaTitle || "No Title Provided"}
              </h1>

              <p className="text-slate-600 dark:text-slate-300 font-medium text-sm md:text-base leading-relaxed border-l-4 border-[#006eff] pl-4 bg-slate-50 dark:bg-slate-800 py-1.5 rounded-r-xl">
                {shortDescription || "No short description provided."}
              </p>
            </div>

            {/* Content */}
            <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800">

              {/* Problem Statement */}
              <div className="space-y-2">

                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  The Problem Statement
                </h3>

                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 p-4 rounded-xl font-medium">
                  {problemStatement || "No problem statement defined."}
                </p>
              </div>

              {/* Proposed Solution */}
              <div className="space-y-2">

                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Proposed Solution
                </h3>

                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-blue-50/20 dark:bg-blue-500/5 border border-blue-100/70 dark:border-blue-500/20 p-4 rounded-xl font-medium">
                  {proposedSolution || "No solution proposed yet."}
                </p>
              </div>

              {/* Detailed Roadmap */}
              <div className="space-y-2">

                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Detailed Roadmap
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line bg-white dark:bg-slate-900 p-2 rounded-xl">
                  {detailedDescription ||
                    "No detailed operational roadmap available."}
                </p>
              </div>
            </div>

            {/* Tags */}
            {tags && (
              <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-100 dark:border-slate-800">

                <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-2">
                  Tags:
                </h2>

                {typeof tags === "string"
                  ? tags.split(",").map(
                      (tag, index) =>
                        tag.trim() && (
                          <span
                            key={index}
                            className="text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/70 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700 px-3 py-1 rounded-lg font-medium transition-colors"
                          >
                            #{tag.trim()}
                          </span>
                        )
                    )
                  : Array.isArray(tags) &&
                    tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/70 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700 px-3 py-1 rounded-lg font-medium transition-colors"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side Column */}
        <div className="space-y-8">

          {/* Ecosystem Specs */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-3xl shadow-xs space-y-5 transition-colors duration-300">

            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              Ecosystem Specs
            </h3>

            <div className="space-y-4">

              {/* Budget */}
              <div className="bg-slate-50/60 dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700">

                <span className="text-[10px] uppercase tracking-wider font-black text-slate-400 dark:text-slate-500 block mb-0.5">
                  Est. Budget
                </span>

                <span className="text-base font-black text-slate-900 dark:text-white">
                  {estimatedBudget
                    ? `$${estimatedBudget}`
                    : "Not Specified"}
                </span>
              </div>

              {/* Target Audience */}
              <div className="bg-slate-50/60 dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700">

                <span className="text-[10px] uppercase tracking-wider font-black text-slate-400 dark:text-slate-500 block mb-0.5">
                  Target Audience
                </span>

                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {targetAudience || "Not Specified"}
                </span>
              </div>
            </div>
          </div>

          {/* Comments */}
          <CommentsSection ideaId={id} session={session} />
          
        </div>
      </div>
    </div>
  );
};

export default IdeaDetailsPage;