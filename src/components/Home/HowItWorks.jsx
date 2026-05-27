"use client";

import { FaUserPlus, FaLightbulb, FaComments } from "react-icons/fa6";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaUserPlus className="text-2xl text-[#006eff]" />,
      title: "Join the Community",
      desc: "Create your account or sign in with Google to unlock all private features and join global innovators.",
    },
    {
      id: 2,
      icon: <FaLightbulb className="text-2xl text-amber-500" />,
      title: "Share Your Concept",
      desc: "Submit your startup ideas with problem statements, proposed solutions, and budget estimations through a clean form.",
    },
    {
      id: 3,
      icon: <FaComments className="text-2xl text-emerald-500" />,
      title: "Validate & Engage",
      desc: "Receive real community feedback through our interactive comment system to refine and upgrade your startup vision.",
    },
  ];

  return (
    <section className="w-full bg-white dark:bg-slate-950 py-16 md:py-20 border-t border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      <div className="w-11/12 max-w-7xl mx-auto space-y-12">

        <div className="text-center max-w-2xl mx-auto space-y-3">
          
          <span className="text-[#006eff] text-xs font-bold uppercase tracking-widest bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-md">
            Workflow
          </span>

          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            How IdeaVault Works
          </h2>

          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
            Three simple steps to transition your raw business ideas into community-validated startup concepts.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">

          {steps.map((step, idx) => (
            <div
              key={step.id}
              className="relative bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl space-y-4 text-center group transition-all duration-300 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-black/20"
            >

              {/* Step Number Badge */}
              <div className="absolute top-4 right-6 text-4xl font-black text-slate-200/80 dark:text-slate-700 group-hover:text-[#006eff]/10 select-none transition-colors">
                0{step.id}
              </div>

              {/* Icon Container */}
              <div className="w-14 h-14 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                {step.icon}
              </div>

              {/* Text */}
              <div className="space-y-2">

                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>

              {/* Line Effect */}
              {idx < 2 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-slate-300 dark:bg-slate-700 z-0 pointer-events-none" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;