"use client";

import Image from "next/image";
import { FaAward, FaLightbulb } from "react-icons/fa6";

const TopContributors = () => {
  const contributors = [
    {
      id: 1,
      name: "Anik Rahman",
      role: "AI Researcher",
      ideasCount: 8,
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Sujana Kabir",
      role: "FinTech Entrepreneur",
      ideasCount: 6,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Tanvir Ahmed",
      role: "Software Architect",
      ideasCount: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Nabila Islam",
      role: "EdTech Visionary",
      ideasCount: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
    },
  ];

  return (
    <section className="w-full bg-slate-50 py-16 md:py-20 border-t border-slate-200 text-slate-800">
      <div className="w-11/12 max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-amber-500 text-xs font-bold uppercase tracking-wider">
            <FaAward size={14} />
            <span>Leaderboard</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
            Top Contributors
          </h2>
          <p className="text-slate-500 text-sm">
            Meet the innovative minds sharing the highest number of validated startup concepts in our ecosystem.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contributors.map((user) => (
            <div 
              key={user.id}
              className="bg-white border border-slate-200 p-6 rounded-2xl flex items-center space-x-4 transition-all duration-300 hover:shadow-xl hover:border-[#006eff]/20"
            >
              {/* Profile Image */}
              <Image
                src={user.image} 
                alt={user.name}
                width={20}
                height={20}
                className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 shadow-sm"
              />
              
              {/* User Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-slate-900 truncate tracking-tight">
                  {user.name}
                </h3>
                <p className="text-xs text-slate-400 font-medium truncate">
                  {user.role}
                </p>
                
                {/* ideas Count */}
                <div className="flex items-center space-x-1 text-[#006eff] mt-1.5">
                  <FaLightbulb size={12} />
                  <span className="text-xs font-bold">{user.ideasCount} Ideas Shared</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TopContributors;