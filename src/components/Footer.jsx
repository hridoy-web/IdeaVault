import Link from "next/link";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { HiLightBulb } from "react-icons/hi";
import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
    return (
        <footer className="w-full bg-[#0B0F19] text-[#94A3B8] border-t border-[#1E293B] mt-auto">
      <div className="w-11/12 mx-auto py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="flex flex-col space-y-3">
            <Link href="/" className="flex items-center space-x-2 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <HiLightBulb className="text-xl" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                IDEA<span className="font-medium text-slate-400 group-hover:text-blue-500 transition-colors duration-200">Vault</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs pt-1">
              A secure web-based platform for sharing, exploring, and validating innovative startup ideas through community interaction.
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Platform Links</h4>
            <div className="flex flex-col space-y-2 text-sm">
              <Link href="/" className="hover:text-white transition-colors duration-200 w-fit">Home</Link>
              <Link href="/ideas" className="hover:text-white transition-colors duration-200 w-fit">Ideas</Link>
              <Link href="/categories" className="hover:text-white transition-colors duration-200 w-fit">Categories</Link>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Contact Info</h4>
            <div className="text-sm space-y-1.5 wrap-break-word">
              <p><span className="text-[#64748B]">Email:</span> chowdhuryhridoy902@gmail.com</p>
              <p><span className="text-[#64748B]">Phone:</span> +880 1234-567890</p>
              <p><span className="text-[#64748B]">Location:</span> Chittagong, Bangladesh</p>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Social Links</h4>
            <div className="flex items-center space-x-4 pt-1">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1E293B] text-white hover:bg-blue-600 transition-all duration-200" aria-label="Facebook">
                <FaFacebookF className="text-sm" />
              </a>
              <a href="https://x.chttps://x.com/hridoyChyWebDevom" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1E293B] text-white hover:bg-white hover:text-black transition-all duration-200" aria-label="X">
                <RiTwitterXFill className="text-sm" />
              </a>
              <a href="https://linkehttps://www.linkedin.com/in/hridoy-chowdhury-webdev/din.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1E293B] text-white hover:bg-blue-700 transition-all duration-200" aria-label="LinkedIn">
                <FaLinkedinIn className="text-sm" />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-[#1E293B] mt-10 pt-6 text-center text-xs text-[#64748B] tracking-wide">
          <p>&copy; {new Date().getFullYear()} IdeaVault. All rights reserved.</p>
        </div>
      </div>
    </footer>
    );
};

export default Footer;