"use client";

import { useCallback, useEffect, useState } from "react";
import Card from "@/components/UI/Card";
import SearchFilter from "@/components/ideas/SearchFilter";
import { fetchIdeas } from "@/lib/ideas/data";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { ImConfused } from "react-icons/im";

const AllIdeasPage = () => {
    const [ideas, setIdeas] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [loading, setLoading] = useState(false);

    const loadIdeas = useCallback(async () => {
        setLoading(true);
        const data = await fetchIdeas(search, category);
        setIdeas(data);
        setLoading(false);
    }, [search, category]);

    useEffect(() => {
        loadIdeas();
    }, [loadIdeas]);

    useEffect(() => {
        const timer = setTimeout(() => {
            loadIdeas();
        }, 500);

        return () => clearTimeout(timer);
    }, [search, category, loadIdeas]);

    return (
        <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen py-12 text-slate-800 dark:text-slate-200">

            <div className="w-11/12 max-w-7xl mx-auto space-y-10">

                {/* Title */}
                <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-5">

                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                        Startup Idea Vault
                    </h1>

                    <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
                        Browse, search, and discover innovative business concepts shared across various sectors.
                    </p>
                </div>

                {/* search and category components */}
                <SearchFilter
                    search={search}
                    setSearch={setSearch}
                    category={category}
                    setCategory={setCategory}
                />

                {/* Loading spinner*/}
                {loading && (
                    <LoadingSpinner />
                )}

                {ideas?.length === 0 ? (
                    <div className="text-center py-16 space-y-2">
                        <h2 className="flex items-center justify-center gap-2 text-2xl font-bold text-slate-700 dark:text-slate-200">
                            No Ideas Found <ImConfused/>
                        </h2>

                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            Try changing your search or category filter.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ideas?.map((idea) => (
                            <Card key={idea._id} idea={idea} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default AllIdeasPage;