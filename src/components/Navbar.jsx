"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiLightBulb, HiMenu, HiX } from "react-icons/hi";
import { MdOutlineLightMode } from "react-icons/md";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Ideas", href: "/ideas" },
  ];

  const privateLinks = [
    { name: "Add Idea", href: "/add-idea" },
    { name: "My Ideas", href: "/my-ideas" },
    { name: "My Interactions", href: "/my-interactions" },
  ];

  const allLinks = isLoggedIn ? [...navLinks, ...privateLinks] : navLinks;

  return (
    <nav className="w-full bg-white/70 backdrop-blur-xl border-b border-slate-200/80 sticky top-0 z-50 shadow-[0_2px_20px_rgba(0,0,0,0.03)] text-slate-600">

      {/* Container */}
      <div className="w-11/12 mx-auto box-border">
        <div className="flex items-center justify-between h-16 w-full">
          
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
                <HiLightBulb className="text-xl" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 ">
                IDEA<span className="font-medium text-slate-500 group-hover:text-blue-600 transition-colors duration-200">Vault</span>
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-semibold">
            {allLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-colors duration-200 text-base-content block group/link ${
                    isActive ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover/link:w-full"
                    }`}
                  ></span>
                </Link>
              );
            })}
          </div>

         
          <div className="flex items-center gap-2 space-x-2 sm:space-x-3 shrink-0">
            
            {/* Theme Toggle Button */}
            <button className="text-xl text-slate-600 hover:text-slate-900 transition-colors p-2 rounded-xl bg-slate-100 hover:bg-slate-200/70 border border-slate-200 shrink-0 w-9 h-9 flex items-center justify-center" aria-label="Toggle Theme">
              <MdOutlineLightMode />
            </button>

            {/* Profile Section */}
            {isLoggedIn ? (
              <div className="dropdown dropdown-end shrink-0">
                <div tabIndex={0} role="button" className="flex items-center focus:outline-none cursor-pointer">
                  <div className="w-9 h-9 rounded-full ring-2 ring-blue-600/20 overflow-hidden bg-slate-100 flex items-center justify-center text-slate-800 font-bold border border-slate-200">
                    U
                  </div>
                </div>
                
                <ul tabIndex={0} className="dropdown-content menu z-50 mt-3 p-2 shadow-xl bg-white border border-slate-200 rounded-xl w-48 space-y-1">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-sm font-bold text-slate-900 truncate">User Name</p>
                    <p className="text-xs text-slate-400 truncate">user@email.com</p>
                  </div>
                  <li>
                    <Link 
                      href="/profile"
                      className="text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-medium py-2 rounded-lg"
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={() => setIsLoggedIn(false)} 
                      className="text-red-500 hover:bg-red-50 hover:text-red-600 font-medium py-2 rounded-lg"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link href="/login" className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-600/10 shrink-0">
                Login
              </Link>
            )}

            {/* Mobile Hamburger Menu Button */}
            <div className="flex md:hidden items-center shrink-0">
              <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-slate-600 hover:text-slate-900 p-1 focus:outline-none w-9 h-9 flex items-center justify-center bg-slate-100 hover:bg-slate-200/70 border border-slate-200 rounded-xl transition-colors" aria-label="Toggle Menu">
                {isOpen ? <HiX /> : <HiMenu />}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200 px-4 pt-2 pb-4 space-y-2 text-base font-semibold shadow-lg w-full box-border">
          {allLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;