"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { HiLightBulb } from "react-icons/hi";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "./UI/ThemeToggle";

const Navbar = () => {
  const pathName = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  const linkClass = (path) =>
    `font-bold transition-all duration-300 ${
      pathName === path
        ? "text-blue-600"
        : "text-slate-600 dark:text-slate-300 hover:text-blue-500"
    }`;

  const navLinks = (
    <>
      <li className={linkClass("/")}>
        <Link href="/">Home</Link>
      </li>

      <li className={linkClass("/ideas")}>
        <Link href="/ideas">Ideas</Link>
      </li>

      {user && (
        <>
          <li className={linkClass("/add-idea")}>
            <Link href="/add-idea">Add Idea</Link>
          </li>

          <li className={linkClass("/my-ideas")}>
            <Link href="/my-ideas">My Ideas</Link>
          </li>

          <li className={linkClass("/my-interactions")}>
            <Link href="/my-interactions">My Interactions</Link>
          </li>
        </>
      )}

      <div className="lg:hidden mt-3 border-t border-slate-200 dark:border-slate-700 pt-3 space-y-2">

        <ThemeToggle />

        {!user ? (
          <>
            <Link
              href="/login"
              className="block text-center px-4 py-2 rounded-xl font-bold text-sm border border-blue-600 text-blue-600"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="block text-center px-4 py-2 rounded-xl font-bold text-sm bg-blue-600 text-white"
            >
              SignUp
            </Link>
          </>
        ) : (
          <>
            <Link href="/profile">
              <button className="w-full py-2 text-sm font-bold text-blue-600 bg-blue-50 rounded-lg">
                My Profile
              </button>
            </Link>

            <button
              onClick={handleLogOut}
              className="w-full py-2 text-sm font-bold text-red-600 bg-red-50 rounded-lg"
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </>
  );

  return (
    <div className="w-full bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/60 sticky top-0 z-50 shadow-[0_2px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.4)] transition-colors duration-300">

      <div className="navbar w-11/12 mx-auto min-h-16 flex items-center justify-between">

        {/* LEFT */}
        <div className="navbar-start gap-2">

          {/* Mobile menu */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="lg:hidden pr-2 text-slate-700 dark:text-slate-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul className="menu menu-sm dropdown-content bg-white dark:bg-slate-900 backdrop-blur-md rounded-xl mt-3 w-52 p-3 shadow-xl border border-slate-200 dark:border-slate-800">
              {navLinks}
            </ul>
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 font-black text-xl md:text-2xl tracking-tight text-slate-900 dark:text-white group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md">
              <HiLightBulb className="text-lg" />
            </div>

            <span>
              IDEA
              <span className="font-medium text-slate-500 dark:text-slate-400 group-hover:text-blue-600 transition-colors">
                Vault
              </span>
            </span>
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {navLinks}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end gap-2 hidden lg:flex">

          <ThemeToggle />

          {!user && (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl font-bold text-sm border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-4 py-2 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                SignUp
              </Link>
            </div>
          )}

          {/* USER */}
          {user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border-2 border-blue-600"
              >
                <div className="w-10 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={40}
                      height={40}
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase">
                      {user?.name?.charAt(0)}
                    </span>
                  )}
                </div>
              </div>

              <div className="dropdown-content mt-3 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-xl p-4">

                <div className="mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <p className="font-bold text-sm text-slate-900 dark:text-white truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {user?.email}
                  </p>
                </div>

                <div className="space-y-2">

                  <Link href="/profile" className="block">
                    <button className="w-full py-2 px-3 text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 rounded-lg transition">
                      My Profile
                    </button>
                  </Link>

                  <button
                    onClick={handleLogOut}
                    className="w-full py-2 px-3 text-xs font-bold text-red-600 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg transition"
                  >
                    Log Out
                  </button>

                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Navbar;