import Image from "next/image";

export const singleIdeas = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas/${id}`);
  const data = await res.json();
  return data || {};
};

const IdeaDetailsPage = async ({ params }) => {
  const { id } = await params;
  const idea = await singleIdeas(id);

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
    proposedSolution
  } = idea;

  return (
    <div className="w-full bg-slate-50 min-h-screen py-12 text-slate-800 antialiased">
      <div className="w-11/12 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* left */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xs p-6 md:p-8 space-y-6">

            {/* Image */}
            <div className="w-full h-64 md:h-96 relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
              <Image
                src={imageURL || "https://images.unsplash.com/photo-1607799279861-4dd421887fb3"}
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
                <span className="inline-block bg-blue-50 border border-blue-100 text-[#006eff] px-3 py-1 rounded-lg text-xs font-black tracking-wider uppercase">
                  {category}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                {ideaTitle}
              </h1>
              <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed border-l-4 border-[#006eff] pl-4 bg-slate-50/50 py-1.5 rounded-r-xl">
                {shortDescription}
              </p>
            </div>


            <div className="space-y-6 pt-6 border-t border-slate-100">
              {/* Problem Statement */}
              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">The Problem Statement</h3>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 border border-slate-200/60 p-4 rounded-xl font-medium">
                  {problemStatement}
                </p>
              </div>

              {/* Proposed Solution */}
              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Proposed Solution</h3>
                <p className="text-sm text-slate-700 leading-relaxed bg-blue-50/20 border border-blue-100/70 p-4 rounded-xl font-medium">
                  {proposedSolution}
                </p>
              </div>

              {/* Detailed Roadmap */}
              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Detailed Roadmap</h3>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line bg-white p-2 rounded-xl">
                  {detailedDescription}
                </p>
              </div>
            </div>

            {/* Tags  */}
            {tags && (
              <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-100">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 mr-2">Tags:</h2>
                {
                  tags?.map((tag, index) => <span key={index} className="text-xs text-slate-600 bg-slate-100 hover:bg-slate-200/70 border border-slate-200/60 px-3 py-1 rounded-lg font-medium transition-colors"
                  >#{tag.trim()}</span>)
                }
              </div>
            )}

          </div>

          {/* comment section */}

        </div>

        {/* right side column */}
        <div className="space-y-8">
          <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-xs space-y-5">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
              Ecosystem Specs
            </h3>

            <div className="space-y-4">
              <div className="bg-slate-50/60 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-[10px] uppercase tracking-wider font-black text-slate-400 block mb-0.5">Est. Budget</span>
                <span className="text-base font-black text-slate-900">{estimatedBudget || "Not Specified"}</span>
              </div>

              <div className="bg-slate-50/60 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-[10px] uppercase tracking-wider font-black text-slate-400 block mb-0.5">Target Audience</span>
                <span className="text-sm font-bold text-slate-700">{targetAudience || "Not Specified"}</span>
              </div>
            </div>
          </div>

          {/*  */}
        </div>

      </div>
    </div>
  );
};

export default IdeaDetailsPage;