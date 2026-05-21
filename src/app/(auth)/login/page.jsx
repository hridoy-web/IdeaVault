"use client";

import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const loginData = Object.fromEntries(formData.entries());

    const { data, error } = await signIn.email({
      ...loginData
    })

    if (error) {
      toast.error(error.message)
      return;
    }
    window.location.href = "/";
  };

  const handleGoogleLogin = () => {
    console.log("Google Login Triggered");
    // Google Sign-In Logic
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen flex items-center justify-center py-12 text-slate-800">
      <div className="w-11/12 max-w-md bg-white border border-slate-200 p-6 md:p-10 rounded-3xl shadow-sm space-y-6">

        {/* Header */}
        <div className="text-center space-y-1.5">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Welcome Back</h2>
          <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">Log in to your IdeaVault account</p>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="btn w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-2 normal-case h-auto py-3 min-h-0 text-sm shadow-xs transition-all"
        >
          <FcGoogle size={20} />
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center my-4 before:flex-1 before:border-t before:border-slate-200 after:flex-1 after:border-t after:border-slate-200 text-slate-400 text-xs font-bold uppercase tracking-widest px-2">
          <span className="mx-3">Or email</span>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
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
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Password</label>

              {/* Forget Password (UI) */}
              <button type="button" className="text-xs font-bold text-[#006eff] hover:underline">Forgot Password?</button>
            </div>

            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="input input-bordered w-full bg-slate-50 border-slate-200 focus:border-[#006eff] focus:bg-white text-sm rounded-xl"
            />
          </div>

          <button
            type="submit"
            className="btn bg-linear-to-r from-[#006eff] to-indigo-600 hover:from-[#005fd8] hover:to-indigo-700 text-white border-none w-full font-bold text-xs uppercase tracking-wider rounded-xl py-3.5 h-auto min-h-0 mt-2 transition-all shadow-md shadow-blue-500/10"
          >
            Sign In
          </button>
        </form>

        {/* Redirect Link */}
        <p className="text-center text-sm text-slate-500 font-medium">
          New to IdeaVault?{" "}
          <Link href="/register" className="text-[#006eff] font-bold hover:underline">
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;