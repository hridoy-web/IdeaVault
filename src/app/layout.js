import {Inter, Geist_Mono} from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "IdeaVault – Startup Idea Sharing Platform",
  description: "A web-based platform where users can share innovative startup ideas, explore ideas posted by others, and engage through comments and discussions.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${interFont.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        
        <Navbar/>

       <main className="grow">
         {children}
       </main>
        
        <Footer/>
        </body>
    </html>
  );
}
