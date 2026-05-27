"use client";

import ProfileUpdateModal from "@/components/Ui/ProfileUpdateModal";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const ProfilePage = () => {
  const userData = authClient.useSession();
  const user = userData.data?.user;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-10 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

      <div className="bg-white dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl flex flex-col items-center w-full max-w-md transition-colors duration-300">

        {/* Avatar */}
        <div className="mb-6 avatar online shadow-lg border-2 border-blue-600 rounded-full p-1">

          <div className="w-32 h-32 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">

            {user?.image ? (
              <Image
                src={user.image}
                alt={user?.name}
                width={128}
                height={128}
                className="aspect-square object-cover"
              />
            ) : (
              <span className="text-4xl font-bold uppercase text-slate-800 dark:text-slate-200">
                {user?.name?.charAt(0)}
              </span>
            )}

          </div>

        </div>

        {/* Info */}
        <div className="space-y-2.5 mb-8 text-center">

          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Name:{" "}
            <span className="text-slate-600 dark:text-slate-300 text-lg font-semibold">
              {user?.name}
            </span>
          </h3>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Email:{" "}
            <span className="text-slate-600 dark:text-slate-300 text-lg font-semibold">
              {user?.email}
            </span>
          </h3>

        </div>

        {/* Update Button */}
        <ProfileUpdateModal />

      </div>

    </div>
  );
};

export default ProfilePage;