"use client";

import { useState } from "react";
import Image from "next/image";
import { FaRegComment, FaTrash, FaPen, FaCalendarDays, FaUser,  } from "react-icons/fa6";

const IdeaDetailsPage = () => {
  // static data
  const idea = {
    _id: "1",
    title: "AI-Powered Crop Disease Detector",
    category: "Artificial Intelligence",
    shortDesc: "A smart mobile application helping local farmers detect crop infections instantly.",
    detailedDesc: "This platform uses advanced machine learning models trained on thousands of agricultural datasets. Farmers can simply upload a picture of an infected leaf, and the system identifies the disease, suggests immediate organic remedies, and connects them with nearby agro-experts to prevent widespread crop failures.",
    problem: "Local farmers face massive crop loss due to delayed disease identification, traditional diagnostic delays, and lack of expert availability in rural zones.",
    solution: "An instant, AI-driven mobile scanner that functions offline and online, offering localized language support and low-cost immediate bio-solutions.",
    budget: "$5,000",
    audience: "Local Farmers, Agri-Dealers & NGOs",
    imageUrl: "https://images.unsplash.com/photo-1581291518655-9523c932dedf?q=80&w=1200&auto=format&fit=crop",
    tags: "ai, agritech, automation, sustainability",
  };

  // 2. Comments State Management (UI Layer for Mocking Add, Edit, Delete)
  const [comments, setComments] = useState([
    {
      id: "c1",
      userName: "Hridoy Chowdhury",
      text: "This is a game-changer for farmers in Bangladesh! Would love to see an offline mode feature.",
      timestamp: "May 18, 2026, 04:30 PM",
    },
    {
      id: "c2",
      userName: "Anik Das",
      text: "The budget seems realistic. Are you planning to implement cross-platform frameworks like React Native?",
      timestamp: "May 19, 2026, 09:12 AM",
    },
  ]);

  const [commentInput, setCommentInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Add Comment Handler
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      userName: "Current User", 
      text: commentInput,
      timestamp: new Date().toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true, month: "short", day: "numeric", year: "numeric" }),
    };

    setComments([newComment, ...comments]);
    setCommentInput("");
  };

  // Edit Comment 
  const startEdit = (comment) => {
    setEditingId(comment.id);
    setEditText(comment.text);
  };

  // Save Edited Comment
  const handleSaveEdit = (id) => {
    if (!editText.trim()) return;
    setComments(comments.map(c => c.id === id ? { ...c, text: editText } : c));
    setEditingId(null);
    setEditText("");
  };

  // Delete Comment Handler
  const handleDeleteComment = (id) => {
    setComments(comments.filter(c => c.id !== id));
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-12 text-slate-800">
      <div className="w-11/12 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs p-6 md:p-8 space-y-6">
            
            {/* Image */}
            <div className="w-full h-64 md:h-96 relative rounded-2xl overflow-hidden bg-slate-100">
              <Image 
                src={idea.imageUrl} 
                alt={idea.title} 
                fill 
                priority
                className="object-cover"
              />
            </div>

            {/* Title & Category */}
            <div className="space-y-3">
              <span className="inline-block bg-blue-50 border border-blue-100 text-[#006eff] px-3 py-1 rounded-lg text-xs font-bold tracking-wide">
                {idea.category}
              </span>
              <h1 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                {idea.title}
              </h1>
              <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed border-l-4 border-[#006eff] pl-3">
                {idea.shortDesc}
              </p>
            </div>

            {/* content */}
            <div className="space-y-6 pt-4 border-t border-slate-100">
              <div className="space-y-1.5">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">The Problem Statement</h3>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 border border-slate-200/60 p-4 rounded-xl">{idea.problem}</p>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Proposed Solution</h3>
                <p className="text-sm text-slate-700 leading-relaxed bg-blue-50/30 border border-blue-100 p-4 rounded-xl">{idea.solution}</p>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Detailed Roadmap</h3>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{idea.detailedDesc}</p>
              </div>
            </div>

            {/* Tags */}
            {idea.tags && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                {idea.tags.split(",").map((tag, i) => (
                  <span key={i} className="text-xs text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md font-medium">
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side column */}
        <div className="space-y-8">
          
          {/*  */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">Ecosystem Specs</h3>
            
            <div className="space-y-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-black text-slate-400 block">Est. Budget</span>
                <span className="text-base font-black text-slate-800">{idea.budget || "Not Specified"}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-black text-slate-400 block">Target Audience</span>
                <span className="text-sm font-bold text-slate-700">{idea.audience}</span>
              </div>
            </div>
          </div>

          {/* Comment System  */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs space-y-6">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-4">
              <FaRegComment size={16} className="text-[#006eff]" />
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
                Discussions ({comments.length})
              </h3>
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="space-y-3">
              <textarea
                rows="2"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Provide constructive feedback or validate concept..."
                className="textarea textarea-bordered w-full bg-slate-50 border-slate-200 focus:border-[#006eff] focus:bg-white text-sm rounded-xl leading-relaxed resize-none p-3 text-slate-700"
              />
              <button
                type="submit"
                className="btn bg-[#006eff] hover:bg-[#005fd8] text-white border-none w-full font-bold text-xs uppercase tracking-wider rounded-xl py-2.5 h-auto min-h-0"
              >
                Post Feedback
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-slate-50 border border-slate-200/70 p-4 rounded-xl space-y-2 group/btn">
                  
                  {/*  */}
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <div className="flex items-center space-x-1.5 font-bold text-slate-600">
                      <FaUser size={10} className="text-slate-400" />
                      <span>{comment.userName}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaCalendarDays size={10} />
                      <span>{comment.timestamp}</span>
                    </div>
                  </div>

                  {/* Comment Text Edit */}
                  {editingId === comment.id ? (
                    <div className="space-y-2 pt-1">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="input input-bordered input-sm w-full bg-white text-xs text-slate-800 rounded-lg border-slate-300"
                      />
                      <div className="flex space-x-2 justify-end">
                        <button onClick={() => setEditingId(null)} className="btn btn-ghost btn-xs text-slate-400 font-bold uppercase text-[10px]">Cancel</button>
                        <button onClick={() => handleSaveEdit(comment.id)} className="btn bg-emerald-600 hover:bg-emerald-700 border-none text-white btn-xs font-bold uppercase text-[10px]">Save</button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {comment.text}
                    </p>
                  )}

                  {/* Edit & Delete buttons  */}
                  {editingId !== comment.id && (
                    <div className="flex justify-end space-x-3 pt-1 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200">
                      <button 
                        onClick={() => startEdit(comment)}
                        className="text-slate-400 hover:text-blue-600 flex items-center space-x-1 text-[10px] font-bold uppercase tracking-wider"
                      >
                        <FaPen size={10} />
                        <span>Edit</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-slate-400 hover:text-red-500 flex items-center space-x-1 text-[10px] font-bold uppercase tracking-wider"
                      >
                        <FaTrash size={10} />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}

                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default IdeaDetailsPage;