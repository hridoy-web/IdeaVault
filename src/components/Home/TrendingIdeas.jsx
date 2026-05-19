"use client";

import Link from "next/link";
import { FaRegLightbulb } from "react-icons/fa6";
import Card from "../UI/Card";

const TrendingIdeas = () => {
   
    const trendingIdeas = [
        {
            _id: "1",
            title: "AI Crop Disease Detector",
            category: "Artificial Intelligence",
            problem: "Local farmers face massive crop loss due to delayed disease identification.",
            budget: "$5,000",
            audience: "Local Farmers & Agri-Dealers",
        },
        {
            _id: "2",
            title: "Micro-Investing App for Students",
            category: "FinTech",
            problem: "University students lack accessible and automated micro-investment habits.",
            budget: "$3,500",
            audience: "College & University Students",
        },
        {
            _id: "3",
            title: "Smart Waste Management Ecosystem",
            category: "Sustainability",
            problem: "Urban areas suffer from unorganized recycling and zero resident rewards.",
            budget: "$8,000",
            audience: "Municipalities & Smart Citizens",
        },
        {
            _id: "4",
            title: "Decentralized Medical Record Ledger",
            category: "Healthcare",
            problem: "Patients face severe security risks while sharing health histories across hospitals.",
            budget: "$12,000",
            audience: "Hospitals & Private Patients",
        },
        {
            _id: "5",
            title: "Gamified Language Learning App",
            category: "Education",
            problem: "Indigenous languages are dying out due to lack of interactive learning tools.",
            budget: "$2,500",
            audience: "Language Enthusiasts & Kids",
        },
        {
            _id: "6",
            title: "IoT Autonomous Water Grid Tester",
            category: "Hardware & Tech",
            problem: "Rural communities consume contaminated water due to lack of real-time testing.",
            budget: "$9,500",
            audience: "NGOs & Rural Communities",
        },
    ];

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
                        trendingIdeas.map((idea) => <Card  key={idea._id} idea={idea} /> )}
                </div>

            </div>
        </section>
    );
};

export default TrendingIdeas;