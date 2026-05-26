"use client"
import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';

const ProfileUpdateModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const image = form.image.value;

        await authClient.updateUser({
            name,
            image
        })
        window.location.reload();
        setIsOpen(false);
    };

    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className="btn btn-outline btn-primary gap-2 shadow-sm mb-4"
            >
                <FaRegEdit /> Update Your Profile
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center ">
                    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 animate-in fade-in zoom-in duration-300">
                        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Update Profile</h3>

                        <form onSubmit={handleUpdate} className="space-y-5 text-left">
                            <div className="form-control w-full mb-4 text-gray-700">
                                <label className="label">
                                    <span className="label-text font-semibold">Full Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    className="input input-bordered focus:border-primary w-full"
                                    required
                                />
                            </div>

                            <div className="form-control w-full text-gray-700">
                                <label className="label">
                                    <span className="label-text font-semibold"> New Profile Photo URL</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="url"
                                        name="image"
                                        placeholder="Enter image URL"
                                        className="input input-bordered focus:border-primary w-full"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="btn btn-outline btn-primary btn-sm md:btn-md border-gray-300"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary btn-sm md:btn-md px-8 shadow-md">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileUpdateModal;