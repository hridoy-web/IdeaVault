"use client"

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiLightBulb } from "react-icons/hi";
import { MdOutlineLightMode } from "react-icons/md";

const Navbar = () => {
  const pathName = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const navLinkStyles = <>
    <li className={`font-bold transition-all duration-300 ${pathName === '/' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}>
      <Link href={'/'}>Home</Link>
    </li>
    <li className={`font-bold transition-all duration-300 ${pathName === '/ideas' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}>
      <Link href={'/ideas'}>Ideas</Link>
    </li>
    {user && (
      <>
        <li className={`font-bold transition-all duration-300 ${pathName === '/add-idea' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}>
          <Link href={'/add-idea'}>Add Idea</Link>
        </li>
        <li className={`font-bold transition-all duration-300 ${pathName === '/my-ideas' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}>
          <Link href={'/my-ideas'}>My Ideas</Link>
        </li>
        <li className={`font-bold transition-all duration-300 ${pathName === '/my-interactions' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}>
          <Link href={'/my-interactions'}>My Interactions</Link>
        </li>
      </>
    )}
  </>

  const handleLogOut = async () => {
    await authClient.signOut();
    router.push('/login')
  }

  return (

    <div className="w-full bg-white/70 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 shadow-[0_2px_20px_rgba(0,0,0,0.03)]">
      <div className="navbar w-11/12 mx-auto h-16">

        {/* Navbar Start Section */}
        <div className="navbar-start gap-2 md:gap-0">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="lg:hidden pr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white/95 backdrop-blur-md rounded-xl z-50 mt-3 w-52 p-2 shadow-xl border border-slate-200">
              {navLinkStyles}
            </ul>
          </div>

          {/* Logo */}
          <Link href={'/'} className="flex items-center space-x-2 font-black text-xl md:text-2xl tracking-tight text-slate-900 group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shrink-0">
              <HiLightBulb className="text-lg" />
            </div>
            <span>IDEA<span className="font-medium text-slate-500 group-hover:text-blue-600 transition-colors">Vault</span></span>
          </Link>
        </div>

        {/* Navbar link Center for Desktop */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {navLinkStyles}
          </ul>
        </div>

        {/* Navbar End Section */}
        <div className="navbar-end gap-2">
          {/* Theme Toggle */}
          <button className="text-xl text-slate-600 hover:text-slate-900 transition-colors p-2 rounded-xl bg-slate-100 hover:bg-slate-200/70 border border-slate-200 mr-1 w-9 h-9 flex items-center justify-center shrink-0" aria-label="Toggle Theme">
            <MdOutlineLightMode />
          </button>

          {/* Conditional Login/SignUp buttons */}
          {!user && (
            <div className="flex items-center gap-2">
              <Link href={'/login'} className="btn btn-sm md:btn-md btn-primary btn-outline rounded-xl font-bold">Login</Link>
              <Link href={'/register'} className="btn btn-sm md:btn-md btn-primary rounded-xl font-bold text-white">SignUp</Link>
            </div>
          )}

          {/* User Profile Dropdown */}
          {user && (
            <div className="dropdown dropdown-end relative">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online shadow-md border-2 border-blue-600 transition-transform duration-200 active:scale-95">
                <div className="w-10 rounded-full bg-slate-100 text-neutral-content flex items-center justify-center overflow-hidden">
                  {user?.image ? (
                    <Image
                      src={user?.image}
                      alt={user?.name || "User"}
                      width={48}
                      height={48}
                      className="aspect-square object-cover"
                      priority
                    />
                  ) : (
                    <span className="text-lg font-bold uppercase text-slate-800">
                      {user?.name?.charAt(0)}
                    </span>
                  )}
                </div>
              </div>

              {/* Dropdown content*/}
              <div tabIndex={0} className="dropdown-content z-[100] mt-3 w-56 bg-white border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-xl p-4 right-0 left-auto origin-top-right transition-all duration-200">
                <div className="mb-3 pb-3 border-b border-slate-100 text-left">
                  <p className="font-bold text-sm text-slate-900 truncate" title={user?.name}>{user?.name}</p>
                  <p className="text-xs text-slate-500 truncate" title={user?.email}>{user?.email}</p>
                </div>

                <div className="space-y-2">
                  <Link href={'/profile'} className="flex w-full">
                    <button className="w-full py-2 px-3 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-center">
                      My Profile
                    </button>
                  </Link>

                  <button
                    onClick={handleLogOut}
                    className="w-full py-2 px-3 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-center"
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