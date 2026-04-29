"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import ResumeModal from "./ResumeModal";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { label: "Work", href: "/projects" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <motion.nav
        className="fixed top-4 md:top-8 left-0 w-full flex justify-center z-[100] pointer-events-none px-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between bg-white rounded-full px-6 md:px-8 py-3 md:py-4 w-full max-w-3xl pointer-events-auto shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
          <div className="font-black text-[1rem] md:text-lg tracking-wide text-[#111]" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
            <Link href="/" className="transition-opacity duration-300 hover:opacity-70" onClick={() => setIsMobileMenuOpen(false)}>
              DESIGNED BY <span className="text-[#cc0000]">ANKIT</span>
            </Link>
          </div>
          
          {/* Desktop Links */}
          <ul className="hidden md:flex gap-8 items-center">
            {navLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-[0.95rem] font-semibold text-[#666] hover:text-[#111] transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="text-[0.95rem] font-semibold text-[#666] hover:text-[#111] transition-colors duration-300"
              >
                Resume
              </button>
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-[#111] p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] bg-white/95 backdrop-blur-md flex flex-col items-center justify-center pt-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col gap-8 items-center text-center w-full px-8">
              {navLinks.map((item) => (
                <li key={item.label} className="w-full">
                  <Link
                    href={item.href}
                    className="text-3xl font-black text-[#111] block py-2 border-b border-gray-200"
                    style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="w-full mt-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsResumeModalOpen(true);
                  }}
                  className="bg-[#cc0000] text-white text-xl font-bold w-full py-4 rounded-full shadow-lg"
                >
                  View Resume
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </>
  );
}
