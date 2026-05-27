"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaRegCommentDots,
  FaClock,
  FaMoon,
  FaSun,
} from "react-icons/fa6";
import { fetchMyInteractions } from "@/lib/ideas/data";
import { authClient } from "@/lib/auth-client";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { MdCommentsDisabled } from "react-icons/md";

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

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">

        <div className="mb-10 text-center relative">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
            My Interactions
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Your recent activity
          </p>
        </div>

        {interactions.length > 0 ? (
          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 space-y-12">
            {interactions.map((activity) => (
              <div key={activity._id} className="relative pl-8">

                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-slate-950 shadow-sm" />

                {/* Content Card */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-400 transition-colors">
                  <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs mb-3">
                    <FaClock />
                    <span>
                      {new Date(activity.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 mb-4">
                    <FaRegCommentDots className="text-blue-500 mt-1" />
                    <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
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
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className=" flex items-center gap-2 justify-center text-slate-400 dark:text-slate-500">
              <MdCommentsDisabled />
              No activity found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInteractionsPage;