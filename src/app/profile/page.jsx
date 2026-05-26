"use client"
import ProfileUpdateModal from "@/components/Ui/ProfileUpdateModal";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const ProfilePage = () => {
    const userData = authClient.useSession();
    const user = userData.data?.user;

    console.log(user);

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center py-10">
            <div className="bg-base-200 p-8 border border-gray-200 rounded-3xl shadow-xl flex flex-col items-center w-full max-w-md">

          
                <div className="mb-6 avatar online shadow-lg border-2 border-primary rounded-full p-1">
                    <div className="w-32 h-32 rounded-full bg-neutral text-neutral-content flex items-center justify-center overflow-hidden">
                        {user?.image ? (
                            <Image
                                src={user?.image}
                                alt={user?.name}
                                width={128}
                                height={128}
                                className="aspect-square object-cover"
                            />
                        ) : (
                            <span className="text-4xl font-bold uppercase">
                                {user?.name?.charAt(0)}
                            </span>
                        )}
                    </div>
                </div>

                <div className="space-y-2.5 mb-8 text-center text-gray-800">
                    <h3 className="text-xl font-bold">
                        Name: <span className="text-gray-600 text-lg font-semibold">{user?.name}</span>
                    </h3>
                    <h3 className="text-xl font-bold">
                        Email: <span className="text-gray-600 text-lg font-semibold">{user?.email}</span>
                    </h3>
                </div>

                <ProfileUpdateModal />
            </div>
        </div>
    );
};

export default ProfilePage;