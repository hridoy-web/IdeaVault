import Link from "next/link";
import { HiHome, HiArrowLeft } from "react-icons/hi";

const NotFoundPage = () => {
    return (
        <div className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center bg-slate-50 text-slate-600">
            <div className="w-11/12  mx-auto text-center space-y-6 box-border">

                {/* Animated 404 */}
                <div className="relative inline-block">
                    <h1 className="text-9xl font-black tracking-tight bg-linear-to-tr from-blue-600 to-indigo-500 bg-clip-text text-transparent select-none animate-pulse">
                        404
                    </h1>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                        Page Not Found
                    </div>
                </div>

                {/* text */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                        Oops! You are in the wrong place.
                    </h2>
                    <p className="text-sm text-slate-500 max-w-sm mx-auto">
                        The page you are looking for does not exist!
                    </p>
                </div>

                {/* btn */}
                <div className="flex justify-center pt-2">
                    <Link
                        href="/"
                        className="btn bg-[#006eff] text-white border-[#005fd8] hover:bg-[#005fd8]"
                    >
                        <HiHome className="text-lg" />
                        <span>Back to Home</span>
                    </Link>

                    
                </div>

            </div>
        </div>
    );
};

export default NotFoundPage;