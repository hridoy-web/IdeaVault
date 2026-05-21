"use client"
import { signUp } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const RegisterPage = () => {

    const handleRegister = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const registration = Object.fromEntries(formData.entries());

        const { name, email, photoUrl, password } = registration;
        // console.log(registration);

        const { data, error } = await signUp.email({
            email,
            password,
            name,
            photoUrl
        })

        if (error) {
            toast.error(error.message)
            return;
        }
        window.location.href = "/";
    };

    const handleGoogleRegister = () => {
        console.log("Google Registration Triggered");
        //  Google Auth Integration
    };

    return (
        <div className="w-full bg-slate-50 min-h-screen flex items-center justify-center py-12 text-slate-800">
            <div className="w-11/12 max-w-md bg-white border border-slate-200 p-6 md:p-10 rounded-3xl shadow-sm space-y-6">

                {/* Header */}
                <div className="text-center space-y-1.5">
                    <h2 className="text-2xl font-black tracking-tight text-slate-900">Join IdeaVault</h2>
                    <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">Start sharing Your Unique StartUp Idea</p>
                </div>


                {/* Custom Error Alert */}
                {/* {errorMsg && (
                    <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl text-xs font-semibold leading-relaxed">
                        {errorMsg}
                    </div>
                )} */}

                {/* Form */}
                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="form-control w-full space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Hridoy Chowdhury"
                            className="input input-bordered w-full bg-slate-50 border-slate-200 focus:border-[#006eff] focus:bg-white text-sm rounded-xl"
                        />
                    </div>

                    <div className="form-control w-full space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="name@gmail.com"
                            className="input input-bordered w-full bg-slate-50 border-slate-200 focus:border-[#006eff] focus:bg-white text-sm rounded-xl"
                        />
                    </div>

                    <div className="form-control w-full space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Photo URL</label>
                        <input
                            type="url"
                            name="photoUrl"
                            required
                            placeholder="https://example.com/profile.jpg"
                            className="input input-bordered w-full bg-slate-50 border-slate-200 focus:border-[#006eff] focus:bg-white text-sm rounded-xl"
                        />
                    </div>

                    <div className="form-control w-full space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Type strong password"
                            className="input input-bordered w-full bg-slate-50 border-slate-200 focus:border-[#006eff] focus:bg-white text-sm rounded-xl"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn bg-linear-to-r from-[#006eff] to-indigo-600 hover:from-[#005fd8] hover:to-indigo-700 text-white border-none w-full font-bold text-xs uppercase tracking-wider rounded-xl py-3.5 h-auto min-h-0 mt-2 transition-all shadow-md shadow-blue-500/10"
                    >
                        Register Account
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-slate-200 after:flex-1 after:border-t after:border-slate-200 text-slate-400 text-xs font-bold uppercase tracking-widest px-2">
                    <span className="mx-3">Or</span>
                </div>

                {/* Google Registration Button */}
                <button
                    onClick={handleGoogleRegister}
                    type="button"
                    className="btn w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-2 normal-case h-auto py-3 min-h-0 text-sm shadow-xs transition-all"
                >
                    <FcGoogle size={20} />
                    <span>Sign up with Google</span>
                </button>


                {/* Redirect Link */}
                <p className="text-center text-sm text-slate-500 font-medium">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#006eff] font-bold hover:underline">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default RegisterPage;