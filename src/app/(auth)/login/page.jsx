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

    const { error } = await signIn.email({
      ...loginData,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Successfully logged in!");
    window.location.href = "/";
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      toast.error("Google login failed!");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center py-12 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">

      <div className="w-11/12 max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-10 rounded-3xl shadow-sm space-y-6 transition-colors duration-300">

        <div className="text-center space-y-1.5">
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Welcome Back
          </h2>

          <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-bold">
            Log in to your IdeaVault account
          </p>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest">
          <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />
          <span className="px-3">Or email</span>
          <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              required
              placeholder="name@gmail.com"
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#006eff] outline-none text-sm"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">

            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Password
              </label>

              <button
                type="button"
                className="text-xs font-bold text-[#006eff] hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#006eff] outline-none text-sm"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-[#006eff] to-indigo-600 hover:from-[#005fd8] hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl py-3.5 transition-all shadow-md"
          >
            Sign In
          </button>

        </form>

        {/* Redirect */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 font-medium">
          New to IdeaVault?{" "}
          <Link
            href="/register"
            className="text-[#006eff] font-bold hover:underline"
          >
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;