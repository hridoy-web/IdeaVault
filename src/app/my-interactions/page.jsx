"use client";

import { useState } from "react";
import Link from "next/link";
import { FaRegComment, FaArrowRight, FaClock } from "react-icons/fa6";

const MyInteractionsPage = () => {
  
  const [interactions, setInteractions] = useState([
    {
      _id: "int-01",
      ideaId: "1",
      ideaTitle: "AI-Powered Crop Disease Detector",
      category: "Artificial Intelligence",
      myComment: "This is a game-changer for farmers in Bangladesh! Would love to see an offline mode feature.",
      commentedAt: "May 18, 2026, 04:30 PM",
    },
    {
      _id: "int-02",
      ideaId: "2",
      ideaTitle: "Micro-Investing App for Students",
      category: "FinTech",
      myComment: "The budget seems realistic. Are you planning to implement cross-platform frameworks like React Native?",
      commentedAt: "May 19, 2026, 09:12 AM",
    }
  ]);

  return (
    <div className="w-full bg-slate-50 min-h-screen py-12 text-slate-800">
      <div className="w-11/12 max-w-4xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="border-b border-slate-200 pb-5 space-y-2">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
            My Interactions
          </h1>
          <p className="text-slate-500 text-sm">
            Review and track your recent discussions, feedback, and concept validations across the community.
          </p>
        </div>

        {/* Interactions Feed */}
        {interactions.length > 0 ? (
          <div className="space-y-4">
            {interactions.map((activity) => (
              <div 
                key={activity._id}
                className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-[#006eff]/30 transition-all duration-200 space-y-4"
              >
                {/*  Idea Info */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider font-black text-slate-400 block">
                      Commented On
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm md:text-base">
                      {activity.ideaTitle}
                    </h3>
                  </div>
                  <span className="inline-block bg-blue-50 border border-blue-100 text-[#006eff] px-2.5 py-0.5 rounded-md text-xs font-bold">
                    {activity.category}
                  </span>
                </div>

                {/* Comment Box */}
                <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl space-y-3">
                  <div className="flex items-center space-x-2 text-slate-500">
                    <FaRegComment size={12} className="text-[#006eff]" />
                    <span className="text-xs font-bold uppercase tracking-wider">Your Feedback</span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                    {activity.myComment}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <div className="flex items-center space-x-1.5 text-slate-400 font-medium">
                    <FaClock size={11} />
                    <span>{activity.commentedAt}</span>
                  </div>
                  
                  <Link
                    href={`/ideas/${activity.ideaId}`}
                    className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-[#006eff] hover:text-[#005fd8] transition-colors"
                  >
                    <span>View Conversation</span>
                    <FaArrowRight size={10} />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty text*/
          <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl space-y-3">
            {/* <span className="text-4xl">💬</span> */}
            <h3 className="text-lg font-bold text-slate-900">No Interactions Record</h3>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">
              You are not participated in any startup discussions yet. Share your insights on trending ideas!
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyInteractionsPage;