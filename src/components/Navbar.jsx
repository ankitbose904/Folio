"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import ResumeModal from "./ResumeModal";

export default function Navbar() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <>
      <motion.nav
      className="fixed top-8 left-0 w-full flex justify-center z-[100] pointer-events-none"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center justify-between bg-white rounded-full px-8 py-4 w-[90%] max-w-3xl pointer-events-auto shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
        <div className="font-black text-lg tracking-wide text-[#111]" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
          <Link href="/" className="transition-opacity duration-300 hover:opacity-70">
            DESIGNED BY <span className="text-[#cc0000]">ANKIT</span>
          </Link>
        </div>
        <ul className="hidden md:flex gap-8 items-center">
          <li>
            <Link
              href="/projects"
              className="text-[0.95rem] font-semibold text-[#666] hover:text-[#111] transition-colors duration-300"
            >
              Work
            </Link>
          </li>
          {["About", "Contact"].map((item) => (
            <li key={item}>
              <Link
                href={`/#${item.toLowerCase()}`}
                className="text-[0.95rem] font-semibold text-[#666] hover:text-[#111] transition-colors duration-300"
              >
                {item}
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
      </div>
    </motion.nav>

    <ResumeModal
      isOpen={isResumeModalOpen}
      onClose={() => setIsResumeModalOpen(false)}
    />
    </>
  );
}
