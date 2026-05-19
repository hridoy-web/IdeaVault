"use client";

import { useState } from "react";
import Card from "@/components/UI/Card"; 

const AllIdeasPage = () => {
    
    const allIdeas = [
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

    // Search and Filter 
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    //  filtering logic
    const filteredIdeas = allIdeas.filter((idea) => {
        const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            idea.problem.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || idea.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="w-full bg-slate-50 min-h-screen py-12 text-slate-800">
            <div className="w-11/12 max-w-7xl mx-auto space-y-10">

                {/* title*/}
                <div className="space-y-2 border-b border-slate-200 pb-5">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
                        Startup Idea Vault
                    </h1>
                    <p className="text-slate-500 text-sm md:text-base">
                        Browse, search, and discover innovative business concepts shared across various sectors.
                    </p>
                </div>

                {/* Search & Filter  */}
                <div className="bg-white border border-slate-200 p-4 md:p-6 rounded-2xl shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">

                    {/* Search Input Box */}
                    <div className="w-full md:max-w-md">
                        <input
                            type="text"
                            placeholder="Search by title or problem keyword..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input input-bordered w-full bg-slate-50 border-slate-200 focus:border-[#006eff] focus:bg-white text-sm rounded-xl"
                        />
                    </div>

                    {/* Category Filter Dropdown */}
                    <div className="w-full md:w-auto flex items-center space-x-3 justify-end">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 hidden sm:inline">
                            Select:
                        </span>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="select select-bordered bg-slate-50 border-slate-200 focus:border-[#006eff] focus:bg-white text-sm rounded-xl text-slate-700 w-full md:w-56"
                        >
                            <option value="All">All Categories</option>
                            <option value="Technology">Technology</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                            <option value="Education">Education</option>
                            <option value="FinTech">FinTech</option>
                            <option value="Sustainability">Sustainability</option>
                        </select>
                    </div>

                </div>

                {/* card grid layout */}
                {filteredIdeas.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredIdeas.map((idea) => (
                            <Card key={idea._id} idea={idea} />
                        ))}
                    </div>
                ) : (
                    /* Empty box */
                    <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl space-y-3">
                        <span className="text-4xl">🔍</span>
                        <h3 className="text-lg font-bold text-slate-900">No Ideas Found</h3>
                        <p className="text-slate-400 text-sm max-w-xs mx-auto">
                            We couldnt find any concepts matching your current search parameters. Try adjusting your filters.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AllIdeasPage;