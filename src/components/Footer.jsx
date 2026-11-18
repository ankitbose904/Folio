"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CONTACT_EMAIL = "ankitbose904@gmail.com";

const SOCIAL_LINKS = [
  {
    name: "X (Twitter)",
    url: "https://twitter.com/ankitbose904",
    icon: (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ankitbose904/",
    icon: (
      <svg viewBox="0 0 24 24" className="w-[19px] h-[19px] fill-current" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback((e) => {
    e?.stopPropagation?.();
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    const timer = setTimeout(() => setCopied(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <footer
      id="contact"
      className="relative w-full bg-white text-black pt-28 sm:pt-36 pb-14 sm:pb-18 px-4 sm:px-8 overflow-x-clip select-none"
    >
      <div className="max-w-[720px] mx-auto flex flex-col items-center">
        {/* Kicker with ample headroom so open flap never collides */}
        <p className="text-[12px] sm:text-[13px] font-medium tracking-[0.2em] text-neutral-500 uppercase mb-20 sm:mb-28 text-center">
          LET&apos;S WORK TOGETHER
        </p>

        {/* ── 3D INTERACTIVE CONTACT ENVELOPE (Abhishek Bariya Style) ── */}
        <div
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          aria-label="Contact envelope: click to open and copy email"
          className="relative w-full max-w-[500px] sm:max-w-[580px] aspect-[667.5/532.125] cursor-pointer mb-20 sm:mb-24 outline-none focus-visible:ring-2 focus-visible:ring-[#EFD070] rounded-[28px] sm:rounded-[36px]"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          onClick={() => setIsOpen((prev) => !prev)}
          onKeyDown={handleKeyDown}
          style={{ perspective: "1400px" }}
        >
          {/* Main Envelope Body */}
          <div
            className="relative w-full h-full rounded-[28px] sm:rounded-[36px] bg-[#EFD070] shadow-[0_24px_50px_-10px_rgba(235,204,106,0.45)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* 1. Interior Pocket Backing with Warm Depth Gradient */}
            <div className="absolute inset-0 rounded-[28px] sm:rounded-[36px] bg-[#EFD070] overflow-hidden z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/5" />
            </div>

            {/* 2. Top Flap with Hardware-Accelerated 3D Hinge */}
            <motion.div
              initial={false}
              animate={{
                rotateX: isOpen ? 180 : 0,
                zIndex: isOpen ? 5 : 35,
              }}
              transition={{
                rotateX: {
                  duration: isOpen ? 0.48 : 0.42,
                  delay: isOpen ? 0 : 0.18, // When closing, waits for the letter to tuck inside first
                  ease: [0.25, 1, 0.5, 1],
                },
                zIndex: {
                  delay: isOpen ? 0.20 : 0.38, // Flips z-index cleanly edge-on at 90 degrees
                },
              }}
              style={{
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
                willChange: "transform",
                zIndex: isOpen ? 5 : 35,
              }}
              className="absolute left-0 right-0 top-0 w-full h-[54%] pointer-events-none"
            >
              <svg
                viewBox="0 0 667.5 288"
                className="w-full h-full block"
                preserveAspectRatio="none"
                style={{ backfaceVisibility: "visible" }}
              >
                <defs>
                  <filter id="topFlapShadow" x="-10%" y="-10%" width="120%" height="140%">
                    <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="rgba(195, 155, 55, 0.45)" />
                  </filter>
                </defs>
                {/* Flap path with precise rounded corners at top base and sharp peak at bottom */}
                <path
                  d="M 0 36 A 36 36 0 0 1 36 0 L 631.5 0 A 36 36 0 0 1 667.5 36 L 341.25 277.5 C 337.2 281.5 330.3 281.5 326.25 277.5 Z"
                  fill="rgb(246, 227, 167)"
                  filter="url(#topFlapShadow)"
                />
              </svg>
            </motion.div>

            {/* 3. Sliding White Letter with Ruled Lines & Cursive Action */}
            <motion.div
              initial={false}
              animate={{
                y: isOpen ? "-36%" : "0%",
                rotate: isOpen ? -3.0 : 0,
                scale: isOpen ? 1 : 0.96,
              }}
              transition={{
                duration: isOpen ? 0.50 : 0.36,
                delay: isOpen ? 0.16 : 0, // Slides out after flap opens, drops in FIRST when closing
                ease: [0.25, 1, 0.5, 1],
              }}
              onClick={handleCopy}
              style={{
                willChange: "transform",
                zIndex: 10,
              }}
              className="absolute left-[8%] right-[8%] top-[12%] h-[74%] bg-white rounded-[16px] sm:rounded-[20px] shadow-[0_12px_28px_-6px_rgba(0,0,0,0.14)] flex flex-col justify-center items-center px-6 py-6 border border-black/5 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              {/* Notebook Faint Ruled Lines */}
              <div className="w-full space-y-4 sm:space-y-5 pointer-events-none opacity-30 select-none">
                <div className="w-full h-px bg-gray-400" />
                <div className="w-full h-px bg-gray-400" />
                <div className="w-full h-px bg-gray-400" />
                <div className="w-full h-px bg-gray-400" />
              </div>

              {/* Centered Cursive Copy Action */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="bg-transparent border-none outline-none cursor-pointer select-none text-black transition-opacity hover:opacity-80"
                  style={{
                    fontFamily: 'var(--font-caveat), "Caveat", cursive',
                    fontSize: "clamp(26px, 4.5vw, 38px)",
                    fontWeight: 400,
                    lineHeight: "1em",
                  }}
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="copied"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="text-emerald-700 block whitespace-nowrap"
                      >
                        mail copied!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="prompt"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="text-neutral-800 hover:text-black block whitespace-nowrap"
                      >
                        write me a mail
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </motion.div>

            {/* 4. Front Pocket Flaps (Left, Right, Bottom Overlays) */}
            <div className="absolute inset-0 rounded-[28px] sm:rounded-[36px] overflow-hidden pointer-events-none z-20">
              {/* Left Flap SVG */}
              <svg
                viewBox="0 0 333.75 532.125"
                className="absolute left-0 top-0 bottom-0 h-full w-[50%] block"
                preserveAspectRatio="none"
              >
                <defs>
                  <filter id="leftFlapShadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="3" dy="6" stdDeviation="6" floodColor="rgba(235, 204, 106, 0.75)" />
                  </filter>
                </defs>
                <path
                  d="M 0 0 L 0 532.125 L 333.75 288 Z"
                  fill="rgb(246, 227, 167)"
                  filter="url(#leftFlapShadow)"
                />
              </svg>

              {/* Right Flap SVG */}
              <svg
                viewBox="0 0 333.75 532.125"
                className="absolute right-0 top-0 bottom-0 h-full w-[50%] block"
                preserveAspectRatio="none"
              >
                <defs>
                  <filter id="rightFlapShadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="-3" dy="6" stdDeviation="6" floodColor="rgba(235, 204, 106, 0.75)" />
                  </filter>
                </defs>
                <path
                  d="M 333.75 0 L 0 288 L 333.75 532.125 Z"
                  fill="rgb(246, 227, 167)"
                  filter="url(#rightFlapShadow)"
                />
              </svg>

              {/* Bottom Flap SVG */}
              <svg
                viewBox="0 0 667.5 244.125"
                className="absolute left-0 right-0 bottom-0 w-full h-[46%] block"
                preserveAspectRatio="none"
              >
                <defs>
                  <filter id="bottomFlapShadow" x="-5%" y="-20%" width="110%" height="140%">
                    <feDropShadow dx="0" dy="-4" stdDeviation="6" floodColor="rgba(235, 204, 106, 0.6)" />
                  </filter>
                </defs>
                <path
                  d="M 0 244.125 L 333.75 0 L 667.5 244.125 Z"
                  fill="rgb(246, 227, 167)"
                  filter="url(#bottomFlapShadow)"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* ── FOOTER BAR (Clean, Semantic, Accessible) ── */}
        <div className="w-full flex flex-row items-center justify-between pt-6 border-t border-neutral-100">
          {/* Left: Designer info */}
          <div>
            <h4 className="text-[17px] sm:text-[19px] font-bold text-neutral-900 tracking-tight leading-tight">
              Ankit Bose
            </h4>
            <p className="text-[12px] sm:text-[13px] text-neutral-500 font-normal mt-0.5">
              Builder, Designer & Framer Expert
            </p>
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center gap-4 sm:gap-5">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                className="text-neutral-500 hover:text-black transition-colors"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
