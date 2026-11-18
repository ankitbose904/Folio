"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   TYPEWRITER WORDS LIST
   ───────────────────────────────────────────────────────────── */
const TYPEWRITER_WORDS = [
  "UI/UX DESIGNER",
  "PRODUCT DESIGNER",
  "PRODUCTION CRAFT",
  "INTERACTION CRAFT",
];

/* ─────────────────────────────────────────────────────────────
   DECORATIVE STICKERS & ICONS (Exact match to reference)
   ───────────────────────────────────────────────────────────── */

/** 1. Top-Left Spiky Starburst Sticker */
function SpikyStarburst({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <polygon
        points="
          50,0 59,25 85,15 75,40 100,50 75,60 85,85 59,75
          50,100 41,75 15,85 25,60 0,50 25,40 15,15 41,25
        "
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 2. Top-Right Orange 12-Lobed Flower Badge */
function OrangeFlowerBadge({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <path
        d="M 50 5
           C 57 5, 62 14, 68 18 C 74 22, 84 22, 88 29 C 92 36, 88 45, 90 53
           C 92 61, 98 69, 95 76 C 92 83, 82 85, 76 90 C 70 95, 64 102, 56 101
           C 48 100, 44 91, 37 89 C 30 87, 20 89, 15 83 C 10 77, 15 68, 13 60
           C 11 52, 3 45, 5 37 C 7 29, 17 29, 22 23 C 27 17, 31 7, 39 6
           C 43 5, 46 5, 50 5 Z"
        fill="#ff5500"
      />
    </svg>
  );
}

/** 3. Three Green Crescent D-Shapes */
function GreenCrescentShapes({ className = "" }) {
  return (
    <div className={`inline-flex items-center gap-0.5 sm:gap-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <svg key={i} viewBox="0 0 40 60" className="w-3.5 sm:w-4.5 md:w-5.5 h-6 sm:h-7.5 md:h-9">
          <path
            d="M 6 4 L 6 56 C 26 56, 38 44, 38 30 C 38 16, 26 4, 6 4 Z"
            fill="#16a34a"
            stroke="#16a34a"
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );
}

/** 4. Red/Orange Wireframe Perspective Globe */
function WireframeGlobe({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      {/* Base orange sphere */}
      <circle cx="50" cy="50" r="46" fill="#ea580c" />
      {/* Outer border */}
      <circle cx="50" cy="50" r="46" fill="none" stroke="#000000" strokeWidth="3" />
      {/* Horizontal latitude lines */}
      <line x1="4" y1="50" x2="96" y2="50" stroke="#000000" strokeWidth="2.5" />
      <ellipse cx="50" cy="50" rx="46" ry="24" fill="none" stroke="#000000" strokeWidth="2.5" />
      <ellipse cx="50" cy="50" rx="46" ry="10" fill="none" stroke="#000000" strokeWidth="2" />
      {/* Vertical meridian lines */}
      <ellipse cx="50" cy="50" rx="24" ry="46" fill="none" stroke="#000000" strokeWidth="2.5" />
      <line x1="50" y1="4" x2="50" y2="96" stroke="#000000" strokeWidth="2.5" />
    </svg>
  );
}

/** 5. Funky Yellow Cartoon Pointer Arrow */
function YellowCursor({ className = "" }) {
  return (
    <svg viewBox="0 0 40 45" className={className}>
      <polygon
        points="4,4 34,20 18,22 14,36"
        fill="#facc15"
        stroke="#000000"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 6. Embedded Pink Character Block with Sleepy/Chill Eyes */
function PinkSleepyCharacter({ eyeOffset = { x: 0, y: 0 } }) {
  return (
    <motion.div
      drag
      dragSnapToOrigin
      dragElastic={0.2}
      whileHover={{ scale: 1.08, rotate: 3 }}
      whileTap={{ scale: 0.94 }}
      className="inline-flex items-center justify-center bg-[#ff9ebd] border-2 sm:border-[2.5px] border-black rounded-xl sm:rounded-2xl px-1.5 sm:px-2 py-0.5 sm:py-1 shadow-[2px_2.5px_0px_#000] cursor-grab active:cursor-grabbing align-middle mx-1 sm:mx-1.5"
    >
      <div className="flex items-center gap-1">
        {/* Left Eye */}
        <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-white rounded-full border-[1.5px] sm:border-2 border-black relative overflow-hidden flex items-center justify-center">
          {/* Sleepy purple eyelid covering top 45% */}
          <div className="absolute top-0 left-0 right-0 h-[48%] bg-[#4f46e5] border-b-[1.5px] border-black z-10" />
          {/* Pupil with cursor tracking */}
          <div
            className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-black transition-transform duration-75 relative z-0 mt-0.5"
            style={{
              transform: `translate(${eyeOffset.x * 0.6}px, ${eyeOffset.y * 0.4}px)`,
            }}
          />
        </div>

        {/* Right Eye */}
        <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-white rounded-full border-[1.5px] sm:border-2 border-black relative overflow-hidden flex items-center justify-center">
          {/* Sleepy purple eyelid covering top 45% */}
          <div className="absolute top-0 left-0 right-0 h-[48%] bg-[#4f46e5] border-b-[1.5px] border-black z-10" />
          {/* Pupil with cursor tracking */}
          <div
            className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-black transition-transform duration-75 relative z-0 mt-0.5"
            style={{
              transform: `translate(${eyeOffset.x * 0.6}px, ${eyeOffset.y * 0.4}px)`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TIGRANZ-STYLE DRAGGABLE PHOTO CARDS (Neo-Brutalist)
   ───────────────────────────────────────────────────────────── */

/** Card 1: Yellow Talent Card (Top Right) */
function YellowTalentCard() {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -120, right: 120, top: -100, bottom: 100 }}
      dragElastic={0.2}
      whileHover={{ scale: 1.05, rotate: 10 }}
      whileTap={{ scale: 0.95 }}
      initial={{ rotate: 7 }}
      className="absolute top-[12%] right-[4%] md:right-[7%] lg:right-[9%] z-20 select-none cursor-grab active:cursor-grabbing hidden sm:block"
    >
      <div className="w-24 sm:w-28 md:w-32 bg-[#facc15] border-[2.5px] border-black rounded-2xl p-2.5 pb-2 shadow-[4px_5px_0px_#000]">
        {/* Headshot container */}
        <div className="w-full aspect-square rounded-xl bg-white border-2 border-black overflow-hidden relative mb-2">
          <Image
            src="/ankit.webp"
            alt="Ankit Bose"
            fill
            sizes="128px"
            className="object-cover grayscale contrast-125"
          />
        </div>
        {/* Name pill */}
        <div className="w-full bg-[#16a34a] border-2 border-black rounded-lg py-1 text-center">
          <span className="text-[10px] sm:text-[11px] font-black uppercase text-white tracking-wider">
            ANKIT BOSE
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/** Card 2: Signature Crimson Card with Pinned Flower Badge (Bottom Left) */
function PinkTalentCard() {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.2}
      whileHover={{ scale: 1.05, rotate: -8 }}
      whileTap={{ scale: 0.95 }}
      initial={{ rotate: -6 }}
      className="absolute bottom-[10%] left-[3%] md:left-[6%] lg:left-[8%] z-20 select-none cursor-grab active:cursor-grabbing hidden sm:block"
    >
      <div className="relative w-24 sm:w-28 md:w-32 bg-[#cc0000] border-[2.5px] border-black rounded-2xl p-2.5 pb-2 shadow-[4px_5px_0px_#000]">
        {/* Pinned Orange Flower Sticker on top right */}
        <div className="absolute -top-3.5 -right-3.5 w-8 h-8 z-30">
          <OrangeFlowerBadge className="w-full h-full drop-shadow-[1px_2px_0px_#000]" />
        </div>

        {/* Headshot container */}
        <div className="w-full aspect-square rounded-xl bg-white border-2 border-black overflow-hidden relative mb-2">
          <Image
            src="/photo2.jpeg"
            alt="Interface Prototyping"
            fill
            sizes="128px"
            className="object-cover grayscale contrast-125"
          />
        </div>
        {/* Name pill */}
        <div className="w-full bg-black border-2 border-black rounded-lg py-1 text-center">
          <span className="text-[10px] sm:text-[11px] font-black uppercase text-white tracking-wider">
            INTERFACES
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/** Card 3: Arch Obsidian Black Card with Sparkle Star (Bottom Right) */
function VioletTalentCard() {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.2}
      whileHover={{ scale: 1.05, rotate: 6 }}
      whileTap={{ scale: 0.95 }}
      initial={{ rotate: 3 }}
      className="absolute bottom-[8%] right-[4%] md:right-[7%] lg:right-[9%] z-20 select-none cursor-grab active:cursor-grabbing hidden sm:block"
    >
      <div className="w-24 sm:w-28 md:w-32 bg-[#111111] border-[2.5px] border-black rounded-t-full rounded-b-2xl p-2.5 pt-3 pb-2 shadow-[4px_5px_0px_#000] flex flex-col items-center">
        {/* Top 4-point sparkle star in arch */}
        <div className="text-[#facc15] text-xs mb-1.5 font-bold select-none">✦</div>

        {/* Headshot container */}
        <div className="w-full aspect-square rounded-xl bg-white border-2 border-black overflow-hidden relative mb-2">
          <Image
            src="/photo1.jpeg"
            alt="Product Craft"
            fill
            sizes="128px"
            className="object-cover grayscale contrast-125"
          />
        </div>
        {/* Name pill */}
        <div className="w-full bg-[#cc0000] border-2 border-black rounded-lg py-1 text-center">
          <span className="text-[10px] sm:text-[11px] font-black uppercase text-white tracking-wider">
            PROTOTYPES
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN HERO COMPONENT
   ───────────────────────────────────────────────────────────── */
export default function Hero({
  ctaHref = "/#work",
}) {
  const containerRef = useRef(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  // Typewriter effect state
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TYPEWRITER_WORDS[wordIndex];
    let timer;

    if (!isDeleting && displayText === currentWord) {
      // Pause at full word before backspacing
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayText === "") {
      // Switch to next word after a brief pause
      timer = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % TYPEWRITER_WORDS.length);
      }, 350);
    } else {
      // Typing or backspacing speed
      const speed = isDeleting ? 40 : 85;
      timer = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting
            ? currentWord.substring(0, prev.length - 1)
            : currentWord.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex]);

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      setEyeOffset({
        x: Math.max(-5, Math.min(5, dx * 5)),
        y: Math.max(-4, Math.min(4, dy * 4)),
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Hero"
      className="relative w-full min-h-screen bg-[#fdfdfd] text-[#111111] flex flex-col justify-between overflow-hidden select-none px-4 sm:px-8 md:px-12 pt-20 sm:pt-28 pb-8"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
      }}
    >
      {/* ── Floating Interactive Neo-Brutalist Sticker Cards ── */}
      <YellowTalentCard />
      <PinkTalentCard />
      <VioletTalentCard />

      {/* Floating Yellow Cartoon Pointer Arrow (Far Left) */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-2, 4, -2] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-[28%] left-[2%] sm:left-[4%] z-10 pointer-events-none hidden sm:block"
      >
        <YellowCursor className="w-7 h-7 sm:w-9 sm:h-9 drop-shadow-[2px_3px_0px_#000]" />
      </motion.div>

      {/* ── Main Centerpiece Headline ── */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center my-auto w-full max-w-4xl mx-auto py-4 sm:py-6">
        {/* Line 1: BUILD YOUR + Spiky Starburst + Orange Flower */}
        <div className="relative inline-flex items-center justify-center">
          {/* Top-Left Spiky Starburst */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="absolute -top-7 sm:-top-11 -left-6 sm:-left-10 w-9 sm:w-13 h-9 sm:h-13 pointer-events-none z-10"
          >
            <SpikyStarburst className="w-full h-full drop-shadow-[2px_3px_0px_#000]" />
          </motion.div>

          <h1
            className="font-black text-black tracking-tight uppercase text-[clamp(1.75rem,5.2vw,4.2rem)] leading-[0.94] select-none"
            style={{ fontFamily: 'var(--font-archivo), "Arial Black", sans-serif' }}
          >
            BUILD YOUR
          </h1>

          {/* Top-Right Orange Flower Sticker */}
          <motion.div
            animate={{ rotate: [0, -360] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute -top-6 sm:-top-9 -right-6 sm:-right-9 w-8 sm:w-12 h-8 sm:h-12 pointer-events-none z-10"
          >
            <OrangeFlowerBadge className="w-full h-full drop-shadow-[2px_3px_0px_#000]" />
          </motion.div>
        </div>

        {/* Line 2: DREAM PRODUCT [Pink Character] WITH */}
        <div className="inline-flex items-center justify-center flex-wrap gap-1 sm:gap-1.5 mt-1 sm:mt-1.5">
          <span
            className="font-black text-black tracking-tight uppercase text-[clamp(1.75rem,5.2vw,4.2rem)] leading-[0.94] select-none"
            style={{ fontFamily: 'var(--font-archivo), "Arial Black", sans-serif' }}
          >
            DREAM PRODUCT
          </span>

          {/* Pink Sleepy Character embedded right between words */}
          <PinkSleepyCharacter eyeOffset={eyeOffset} />

          <span
            className="font-black text-black tracking-tight uppercase text-[clamp(1.75rem,5.2vw,4.2rem)] leading-[0.94] select-none"
            style={{ fontFamily: 'var(--font-archivo), "Arial Black", sans-serif' }}
          >
            WITH
          </span>
        </div>

        {/* Line 3: [Green D-Shapes] [Wireframe Globe] UI/UX DESIGNER */}
        <div className="inline-flex items-center justify-center gap-2 sm:gap-3 mt-1.5 sm:mt-2.5 flex-wrap">
          {/* Green Crescent Shapes */}
          <GreenCrescentShapes className="drop-shadow-[1.5px_2px_0px_#000]" />

          {/* Orange Wireframe Globe */}
          <div className="w-7 sm:w-9 md:w-11 h-7 sm:h-9 md:h-11 drop-shadow-[1.5px_2px_0px_#000]">
            <WireframeGlobe className="w-full h-full" />
          </div>

          {/* UI/UX DESIGNER with typewriter typing & backspacing animation */}
          <div className="relative inline-flex items-center min-h-[1.1em]">
            <span
              className="font-black tracking-tight uppercase text-[clamp(1.85rem,5.5vw,4.5rem)] leading-[0.92] select-none text-[#cc0000] drop-shadow-[2px_3px_0px_rgba(0,0,0,0.16)]"
              style={{
                fontFamily: 'var(--font-archivo), "Arial Rounded MT Bold", sans-serif',
              }}
            >
              {displayText}
            </span>

            {/* Blinking Red Cursor Bar */}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.75, ease: "linear" }}
              className="inline-block w-1 sm:w-1.5 h-[0.82em] bg-[#cc0000] ml-1 sm:ml-1.5 align-middle rounded-sm shadow-[1px_2px_0px_rgba(0,0,0,0.2)]"
            />
          </div>
        </div>

        {/* Subtext Statement: Tailored to UI/UX & Product Design */}
        <p className="text-[#4b5563] text-xs sm:text-sm md:text-base max-w-lg mt-4 sm:mt-5 font-medium leading-relaxed">
          Crafting intuitive digital interfaces, playful interactions &amp; high-impact product experiences for visionary teams.
        </p>

        {/* Main CTA Button: GET IN TOUCH [IN 2 MINS] */}
        <div className="mt-5 sm:mt-6 flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
          <Link href="/#contact" className="focus:outline-none inline-block">
            <button
              type="button"
              className="group flex items-center gap-2 bg-white hover:bg-neutral-50 text-black border-2 border-black rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-black uppercase tracking-wider shadow-[3px_4px_0px_#000] hover:shadow-[5px_6px_0px_#000] hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-[1px_2px_0px_#000] transition-all cursor-pointer"
            >
              <span>GET IN TOUCH</span>
              {/* Yellow Highlight Badge */}
              <span className="px-2 py-0.5 rounded-full bg-[#fde047] border border-black text-[9px] sm:text-[11px] font-black text-black">
                IN 2 MINS
              </span>
            </button>
          </Link>

          <Link href={ctaHref} className="focus:outline-none inline-block">
            <button
              type="button"
              className="flex items-center gap-1.5 bg-transparent hover:bg-black/5 text-black border-2 border-black rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-black uppercase tracking-wider shadow-[3px_4px_0px_#000] hover:shadow-[5px_6px_0px_#000] hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-[1px_2px_0px_#000] transition-all cursor-pointer"
            >
              <span>EXPLORE WORK ↓</span>
            </button>
          </Link>
        </div>
      </div>

      {/* ── Bottom Bar / Footer Minimal ── */}
      <footer className="relative z-20 w-full flex items-center justify-between text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 pt-2">
        <span className="hidden sm:inline">ANKIT BOSE · PORTFOLIO</span>
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
          <span className="text-[11px] text-neutral-700 font-bold">SCROLL FOR 3D WORK GALLERY</span>
        </div>
        <span className="hidden sm:inline">FOLIO 2025</span>
      </footer>
    </section>
  );
}
