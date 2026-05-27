"use client";

import { signUp, signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { name, email, image, password } =
      Object.fromEntries(formData.entries());

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("Password must include at least one uppercase letter!");
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error("Password must include at least one lowercase letter!");
      return;
    }

    const { error } = await signUp.email({
      name,
      email,
      password,
      image,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Registration successful!");
    router.push("/");
  };

  const handleGoogleRegister = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      toast.error("Google registration failed!");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center py-12 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">

      <div className="w-11/12 max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-10 rounded-3xl shadow-sm space-y-6 transition-colors duration-300">

        <div className="text-center space-y-1.5">
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Join IdeaVault
          </h2>

          <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-bold">
            Start sharing Your Unique Startup Idea
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">

          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              required
              placeholder="Hridoy Chowdhury"
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#006eff] outline-none text-sm"
            />
          </div>

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

          {/* Image */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Photo URL
            </label>

            <input
              type="url"
              name="image"
              required
              placeholder="https://example.com/profile.jpg"
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#006eff] outline-none text-sm"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Password
            </label>

            <input
              type="password"
              name="password"
              required
              placeholder="Type strong password"
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#006eff] outline-none text-sm"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-[#006eff] to-indigo-600 hover:from-[#005fd8] hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl py-3.5 transition-all shadow-md"
          >
            Register Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest">
          <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />
          <span className="px-3">Or</span>
          <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
        >
          <FcGoogle size={20} />
          Sign up with Google
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 font-medium">
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