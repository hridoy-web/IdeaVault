"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowRight, FaRegCommentDots, FaClock } from "react-icons/fa6";
import { fetchMyInteractions } from "@/lib/ideas/data";
import { authClient } from "@/lib/auth-client";

const MyInteractionsPage = () => {
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session?.user?.email) {
      fetchMyInteractions(session.user.email)
        .then((data) => {
          setInteractions(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [session]);

  if (loading) return <div className="text-center py-20 text-slate-500 animate-pulse">Loading interactions...</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">My Interactions</h1>
          <p className="text-slate-500">Your recent comments activity</p>
        </div>

        {interactions.length > 0 ? (
          <div className="relative border-l-2 border-slate-200 ml-3 space-y-12">
            {interactions.map((activity) => (
              <div key={activity._id} className="relative pl-8">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-sm" />
                
                {/* Content Card */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-blue-400 transition-colors">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
                    <FaClock />
                    <span>{new Date(activity.createdAt).toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-start gap-3 mb-4">
                    <FaRegCommentDots className="text-blue-500 mt-1" />
                    <p className="text-slate-700 leading-relaxed font-medium">
                      {activity.text}
                    </p>
                  </div>

                  <Link 
                    href={`/ideas/${activity.ideaId}`} 
                    className="text-blue-600 font-bold text-sm flex items-center gap-2 hover:text-blue-800"
                  >
                    View Conversation <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-400">No activity found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInteractionsPage;