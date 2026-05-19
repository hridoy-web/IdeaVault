"use client";

import { useState } from "react";
import { FaPen, FaTrash, FaTriangleExclamation } from "react-icons/fa6";

const MyIdeasPage = () => {
  // 1. Mock data representing ideas created by the logged-in user
  const [myIdeas, setMyIdeas] = useState([
    {
      _id: "1",
      title: "AI Crop Disease Detector",
      category: "Artificial Intelligence",
      budget: "$5,000",
      audience: "Local Farmers",
      shortDesc: "A smart mobile application helping local farmers detect crop infections instantly.",
    },
    {
      _id: "2",
      title: "Micro-Investing App for Students",
      category: "FinTech",
      budget: "$3,500",
      audience: "College Students",
      shortDesc: "An automated investment platform designed tailored for student budgets.",
    },
  ]);

  // States for handling Modals
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Trigger Update Modal
  const openUpdateModal = (idea) => {
    setSelectedIdea({ ...idea });
    setIsUpdateOpen(true);
  };

  // Trigger Delete Modal
  const openDeleteModal = (idea) => {
    setSelectedIdea(idea);
    setIsDeleteOpen(true);
  };

  // Save Update Function
  const handleSaveUpdate = (e) => {
    e.preventDefault();
    setMyIdeas(myIdeas.map(item => item._id === selectedIdea._id ? selectedIdea : item));
    setIsUpdateOpen(false);
    setSelectedIdea(null);
  };

  // Delete Function
  const handleDeleteConfirm = () => {
    setMyIdeas(myIdeas.filter(item => item._id !== selectedIdea._id));
    setIsDeleteOpen(false);
    setSelectedIdea(null);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-12 text-slate-800">
      <div className="w-11/12 max-w-6xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="border-b border-slate-200 pb-5 space-y-2">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
            My Submitted Ideas
          </h1>
          <p className="text-slate-500 text-sm">
            Manage, update, or analyze the performance and feedback of your posted startup concepts.
          </p>
        </div>

        {/* Ideas Table Container */}
        {myIdeas.length > 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table w-full text-slate-700">

                {/* Table Head */}
                <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-4 pl-6">Idea Concept</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Est. Budget</th>
                    <th className="p-4 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                
                {/* Table Body */}
                <tbody className="divide-y divide-slate-100">
                  {myIdeas.map((idea) => (
                    <tr key={idea._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 pl-6 max-w-xs md:max-w-md">
                        <div className="space-y-1">
                          <span className="font-bold text-slate-900 text-sm block truncate">{idea.title}</span>
                          <span className="text-xs text-slate-400 block truncate font-medium">{idea.shortDesc}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-block bg-blue-50 border border-blue-100 text-[#006eff] px-2.5 py-0.5 rounded-md text-xs font-bold">
                          {idea.category}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-sm text-slate-800">{idea.budget}</td>
                      <td className="p-4 text-right pr-6">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            type="button"
                            onClick={() => openUpdateModal(idea)}
                            className="btn btn-square btn-sm bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-[#006eff] border-none rounded-lg transition-colors"
                          >
                            <FaPen size={12} />
                          </button>
                          <button 
                            type="button"
                            onClick={() => openDeleteModal(idea)}
                            className="btn btn-square btn-sm bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-500 border-none rounded-lg transition-colors"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Empty text */
          <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl space-y-3">
            <span className="text-4xl">💡</span>
            <h3 className="text-lg font-bold text-slate-900">No Concepts Vaulted Yet</h3>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">
              You are not submitted any startup ideas yet. Start sharing your vision today!
            </p>
          </div>
        )}

        {/*update modal*/}
        {isUpdateOpen && selectedIdea && (
          <div className="modal modal-open bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="modal-box bg-white border border-slate-200 rounded-3xl max-w-xl p-6 md:p-8 text-slate-800 shadow-xl relative">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3">
                Update Concept Specifications
              </h3>
              
              <form onSubmit={handleSaveUpdate} className="space-y-4 pt-4">
                <div className="form-control w-full space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Idea Title</label>
                  <input 
                    type="text" 
                    value={selectedIdea.title} 
                    onChange={(e) => setSelectedIdea({ ...selectedIdea, title: e.target.value })}
                    required
                    className="input input-bordered w-full bg-slate-50 border-slate-200 focus:border-[#006eff] text-sm rounded-xl"
                  />
                </div>

                <div className="form-control w-full space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Short Description</label>
                  <input 
                    type="text" 
                    value={selectedIdea.shortDesc} 
                    onChange={(e) => setSelectedIdea({ ...selectedIdea, shortDesc: e.target.value })}
                    required
                    className="input input-bordered w-full bg-slate-50 border-slate-200 focus:border-[#006eff] text-sm rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control w-full space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Budget</label>
                    <input 
                      type="text" 
                      value={selectedIdea.budget} 
                      onChange={(e) => setSelectedIdea({ ...selectedIdea, budget: e.target.value })}
                      className="input input-bordered w-full bg-slate-50 border-slate-200 focus:border-[#006eff] text-sm rounded-xl"
                    />
                  </div>
                  <div className="form-control w-full space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Target Audience</label>
                    <input 
                      type="text" 
                      value={selectedIdea.audience} 
                      onChange={(e) => setSelectedIdea({ ...selectedIdea, audience: e.target.value })}
                      required
                      className="input input-bordered w-full bg-slate-50 border-slate-200 focus:border-[#006eff] text-sm rounded-xl"
                    />
                  </div>
                </div>

                <div className="modal-action pt-4 border-t border-slate-100 flex justify-end space-x-3">
                  <button 
                    type="button" 
                    onClick={() => { setIsUpdateOpen(false); setSelectedIdea(null); }}
                    className="btn btn-ghost text-slate-500 font-bold text-xs uppercase tracking-wider rounded-xl px-5"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn bg-linear-to-r from-[#006eff] to-indigo-600 hover:from-[#005fd8] hover:to-indigo-700 text-white border-none font-bold text-xs uppercase tracking-wider rounded-xl px-6 h-auto min-h-0 py-3"
                  >
                    Save Modifications
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* delete confirmation modal */}
        {isDeleteOpen && selectedIdea && (
          <div className="modal modal-open bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="modal-box bg-white border border-slate-200 rounded-2xl max-w-sm p-6 text-center space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto">
                <FaTriangleExclamation size={24} className="text-red-500 animate-bounce" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">Confirm Concept Deletion</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">
                  Are you absolutely sure you want to delete <span className="font-bold text-slate-700">{selectedIdea.title}</span>? This action is permanent.
                </p>
              </div>
              <div className="flex space-x-3 pt-2">
                <button 
                  type="button"
                  onClick={() => { setIsDeleteOpen(false); setSelectedIdea(null); }}
                  className="btn btn-ghost text-slate-500 font-bold text-xs uppercase tracking-wider rounded-xl w-1/2"
                >
                  No, Keep it
                </button>
                <button 
                  type="button"
                  onClick={handleDeleteConfirm}
                  className="btn bg-red-600 hover:bg-red-700 text-white border-none font-bold text-xs uppercase tracking-wider rounded-xl w-1/2"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyIdeasPage;