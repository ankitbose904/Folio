"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useInView } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import TransparentImage from "./TransparentImage";

/* ─────────────────────────────────────────────────────────────
   DRAGGABLE STICKY NOTE COMPONENT
   ───────────────────────────────────────────────────────────── */
function DraggableSticky({
  children,
  bgColor,
  initialRotate = 0,
  className = "",
}) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -80, bottom: 80 }}
      dragElastic={0.2}
      whileHover={{ scale: 1.05, rotate: initialRotate + 2 }}
      whileTap={{ scale: 0.96 }}
      initial={{ rotate: initialRotate }}
      className={`select-none cursor-grab active:cursor-grabbing p-3.5 sm:p-4 rounded-sm shadow-[0_12px_24px_-10px_rgba(19,35,58,0.22)] border border-black/5 text-[#13233A] ${className}`}
      style={{
        backgroundColor: bgColor,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN ABOUT SECTION (James Chugh In-View Progressive Reveal)
   ───────────────────────────────────────────────────────────── */
export default function AboutSection() {
  const statementRef = useRef(null);
  const isInView = useInView(statementRef, { once: true, margin: "-12% 0px -15% 0px" });
  const [autoProgress, setAutoProgress] = useState(0);

  // Scroll progress through the section
  const { scrollYProgress } = useScroll({
    target: statementRef,
    offset: ["start 80%", "end 30%"],
  });

  const [scrollP, setScrollP] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setScrollP(v);
    });
  }, [scrollYProgress]);

  // When section enters the viewport, smoothly advance progress over 2.4s (like James Chugh)
  useEffect(() => {
    if (!isInView) return;
    let start = null;
    let animId = null;
    const duration = 2400; // 2.4 seconds

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const p = Math.min(1, elapsed / duration);
      setAutoProgress(p);
      if (p < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isInView]);

  // Combined progress: whichever is further along wins!
  const progress = Math.min(1, Math.max(autoProgress, scrollP * 1.3));

  const isNote1 = progress >= 0.20;
  const isNote2 = progress >= 0.48;
  const isNote3 = progress >= 0.72;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  return (
    <section className="relative w-full bg-white" id="about">
      {/* ── 1. SECTION TITLE: "ABOUT ME" ── */}
      <div className="pt-16 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 md:px-8 max-w-[1240px] mx-auto flex items-center justify-center gap-2 md:gap-4 w-full overflow-hidden">
        <div className="h-0.5 flex-[0_1_30px] md:flex-[0_1_60px] bg-[#cc0000] shrink-0" />
        <Sparkles className="text-[#cc0000] shrink-0" size={20} fill="currentColor" />
        <motion.h2
          className="font-black tracking-wide text-[#e5e5e5] uppercase text-[clamp(2rem,6vw,4.5rem)] text-center select-none"
          style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          ABOUT ME
        </motion.h2>
        <Sparkles className="text-[#cc0000] shrink-0" size={20} fill="currentColor" />
        <div className="h-0.5 flex-[0_1_30px] md:flex-[0_1_60px] bg-[#cc0000] shrink-0" />
      </div>

      {/* ── 2. "HOW I GOT HERE" WARM PAPER CANVAS (James Chugh Style Word-by-Word In-View Reveal) ── */}
      <div
        ref={statementRef}
        className="relative w-full bg-[#FFF8EC] pt-14 sm:pt-20 pb-24 sm:pb-32 px-4 sm:px-6 md:px-8 border-t border-black/5"
      >
        <div className="max-w-[1140px] w-full mx-auto relative z-10">
          {/* Kicker label with spinning star icon */}
          <div className="flex items-center gap-2.5 mb-6 sm:mb-8 text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-[0.16em] select-none">
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-[#cc0000]"
              aria-hidden="true"
            >
              <path d="M12 1l2.2 7.1L21 5l-3.6 6.5L24 14l-7.1 1.3L19 22l-7-3.9L5 22l2.1-6.7L0 14l6.6-2.5L3 5l6.8 3.1z" />
            </motion.svg>
            <span>How I got here</span>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Words light up from 0.13 to 1.0 ink black */}
            <div className="lg:col-span-8 relative z-10">
              <p
                className="text-[#13233A] font-black text-[clamp(1.4rem,2.6vw,2.35rem)] leading-[1.38] tracking-tight select-none"
                style={{ fontFamily: 'var(--font-archivo), "Arial Black", sans-serif' }}
              >
                {/* Phrase 1: Tech & Code */}
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.03 ? "opacity-100" : "opacity-[0.13]"}`}>I</span>
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.06 ? "opacity-100" : "opacity-[0.13]"}`}>started</span>
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.09 ? "opacity-100" : "opacity-[0.13]"}`}>out</span>
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.12 ? "opacity-100" : "opacity-[0.13]"}`}>in</span>
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.15 ? "opacity-100" : "opacity-[0.13]"}`}>tech</span>

                {/* Light Blue Badge: writing code 💻 */}
                <span className="relative inline-block mr-[0.26em] align-baseline">
                  <span
                    className={`relative inline-block px-2.5 py-0.5 rounded-md shadow-xs transition-all duration-300 ${
                      progress >= 0.18
                        ? "bg-[#BAE6FD] text-[#0369A1] opacity-100 scale-100"
                        : "bg-transparent text-[#13233A] opacity-[0.13] scale-95"
                    }`}
                  >
                    writing code,
                    <span className="inline-block ml-1.5 text-sm sm:text-base align-middle">💻</span>
                  </span>
                </span>

                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.22 ? "opacity-100" : "opacity-[0.13]"}`}>figuring</span>
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.25 ? "opacity-100" : "opacity-[0.13]"}`}>out</span>
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.27 ? "opacity-100" : "opacity-[0.13]"}`}>how</span>

                {/* Hand-drawn Orange Oval around "things work." */}
                <span className="relative inline-block whitespace-nowrap px-2 mr-[0.26em] align-baseline">
                  <span className={`transition-opacity duration-200 ${progress >= 0.30 ? "opacity-100" : "opacity-[0.13]"}`}>
                    things work.
                  </span>
                  <svg
                    className="absolute -inset-x-3.5 -inset-y-2 w-[calc(100%+28px)] h-[calc(100%+16px)] pointer-events-none overflow-visible"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <ellipse
                      cx="50"
                      cy="50"
                      rx="48"
                      ry="44"
                      fill="none"
                      stroke="#ea580c"
                      strokeWidth="3.2"
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                      strokeDasharray={320}
                      strokeDashoffset={progress >= 0.33 ? 0 : 320}
                      className="transition-[stroke-dashoffset] duration-700 ease-out"
                      transform="rotate(-1.5 50 50)"
                    />
                  </svg>
                </span>

                {/* Phrase 2: Curiosity shift */}
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.36 ? "opacity-100" : "opacity-[0.13]"}`}>Then</span>
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.39 ? "opacity-100" : "opacity-[0.13]"}`}>I</span>
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.42 ? "opacity-100" : "opacity-[0.13]"}`}>got</span>
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.45 ? "opacity-100" : "opacity-[0.13]"}`}>far</span>
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.48 ? "opacity-100" : "opacity-[0.13]"}`}>more</span>
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.51 ? "opacity-100" : "opacity-[0.13]"}`}>curious</span>
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.54 ? "opacity-100" : "opacity-[0.13]"}`}>about</span>

                {/* Yellow Highlight & Squiggly Underline: why people actually use them. ✦ */}
                <span className="relative inline-block mr-[0.26em] align-baseline">
                  <span
                    className={`relative inline-block px-2.5 py-0.5 rounded-md shadow-xs transition-all duration-300 ${
                      progress >= 0.58
                        ? "bg-[#FEF08A] text-[#854D0E] opacity-100 scale-100"
                        : "bg-transparent text-[#13233A] opacity-[0.13] scale-95"
                    }`}
                  >
                    why people actually use them.
                    <svg
                      className="absolute left-0 -bottom-2 w-full h-2.5 pointer-events-none overflow-visible origin-left"
                      viewBox="0 0 100 10"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M 0 5 Q 12 0, 25 5 T 50 5 T 75 5 T 100 5"
                        fill="none"
                        stroke="#ca8a04"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeDasharray={120}
                        strokeDashoffset={progress >= 0.62 ? 0 : 120}
                        className="transition-[stroke-dashoffset] duration-700 ease-out"
                      />
                    </svg>
                    <span className="inline-block ml-1 text-xs sm:text-sm text-[#ca8a04]">✦</span>
                  </span>
                </span>

                {/* Phrase 3: Leap into UX */}
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.66 ? "opacity-100" : "opacity-[0.13]"}`}>So</span>
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.69 ? "opacity-100" : "opacity-[0.13]"}`}>I</span>
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.72 ? "opacity-100" : "opacity-[0.13]"}`}>took</span>
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.75 ? "opacity-100" : "opacity-[0.13]"}`}>the</span>
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.78 ? "opacity-100" : "opacity-[0.13]"}`}>leap</span>
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.81 ? "opacity-100" : "opacity-[0.13]"}`}>into</span>

                {/* Peach / Coral Badge: UX Design,* */}
                <span className="relative inline-block mr-[0.26em] align-baseline">
                  <span
                    className={`relative inline-block px-2.5 py-0.5 rounded-md shadow-xs transition-all duration-300 ${
                      progress >= 0.84
                        ? "bg-[#FECDD3] text-[#BE123C] opacity-100 scale-100"
                        : "bg-transparent text-[#13233A] opacity-[0.13] scale-95"
                    }`}
                  >
                    UX Design,*
                    <span className="inline-block ml-0.5 font-bold">*</span>
                  </span>
                </span>

                {/* Phrase 4: Fixing ugh moments */}
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.87 ? "opacity-100" : "opacity-[0.13]"}`}>and</span>
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.89 ? "opacity-100" : "opacity-[0.13]"}`}>I&apos;ve</span>
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.91 ? "opacity-100" : "opacity-[0.13]"}`}>been</span>
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.93 ? "opacity-100" : "opacity-[0.13]"}`}>fixing</span>
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.95 ? "opacity-100" : "opacity-[0.13]"}`}>the</span>

                {/* Lavender Badge with Double Underline: “ugh” moments */}
                <span className="relative inline-block mr-[0.26em] align-baseline">
                  <span
                    className={`relative inline-block px-2.5 py-0.5 rounded-md shadow-xs transition-all duration-300 ${
                      progress >= 0.97
                        ? "bg-[#DDD6FE] text-[#6D28D9] opacity-100 scale-100"
                        : "bg-transparent text-[#13233A] opacity-[0.13] scale-95"
                    }`}
                  >
                    &ldquo;ugh&rdquo; moments
                    <svg
                      className="absolute left-0 -bottom-2 w-full h-2.5 pointer-events-none overflow-visible origin-left"
                      viewBox="0 0 100 10"
                      preserveAspectRatio="none"
                    >
                      <path d="M 0 3 L 100 3" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" />
                      <path d="M 0 7 L 100 7" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                  </span>
                </span>

                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 0.99 ? "opacity-100" : "opacity-[0.13]"}`}>ever</span>
                <span className={`inline-block mr-[0.26em] transition-opacity duration-200 ${progress >= 1 ? "opacity-100" : "opacity-[0.13]"}`}>since.</span>
              </p>
            </div>

            {/* Right Column: 3 Draggable Sticky Notes (Stagger in like James Chugh) */}
            <div className="lg:col-span-4 relative flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-5 items-center lg:items-end justify-center pt-2 lg:pt-0">
              {/* "these notes move :)" curved arrow hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isNote1 ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="hidden lg:flex items-center gap-1.5 text-gray-400 font-medium text-xs select-none mb-1 mr-3"
              >
                <span style={{ fontFamily: 'var(--font-caveat), cursive' }} className="text-sm">
                  these notes move :)
                </span>
                <svg viewBox="0 0 40 28" className="w-7 h-4 stroke-current fill-none stroke-[1.8] stroke-linecap-round">
                  <path d="M4 20C12 10 22 8 34 12M34 12l-7-5M34 12l-6 6" />
                </svg>
              </motion.div>

              {/* Note 1: Yellow Post-It (Drops in at ~20%) */}
              <motion.div
                initial={{ opacity: 0, y: 24, rotate: 0 }}
                animate={{
                  opacity: isNote1 ? 1 : 0,
                  y: isNote1 ? 0 : 24,
                  rotate: isNote1 ? -4 : 0,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="w-full sm:w-auto"
              >
                <DraggableSticky
                  bgColor="#FFE98A"
                  initialRotate={-4}
                  className="w-48 sm:w-52"
                >
                  <p className="font-bold text-xs sm:text-sm leading-snug text-[#13233A]">
                    BCA grad btw.
                    <br />
                    Good with code too.
                  </p>
                  <small className="block mt-2 text-[9.5px] font-black uppercase tracking-widest text-[#13233A]/60 font-mono">
                    CLASS OF 2023
                  </small>
                </DraggableSticky>
              </motion.div>

              {/* Note 2: Peach / Coral Post-It (Drops in at ~48%) */}
              <motion.div
                initial={{ opacity: 0, y: 24, rotate: 0 }}
                animate={{
                  opacity: isNote2 ? 1 : 0,
                  y: isNote2 ? 0 : 24,
                  rotate: isNote2 ? 3 : 0,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="w-full sm:w-auto"
              >
                <DraggableSticky
                  bgColor="#FFD1C4"
                  initialRotate={3}
                  className="w-48 sm:w-52"
                >
                  <p className="font-bold text-xs sm:text-sm leading-snug text-[#13233A]">
                    2 years in the industry. Every one of them shipped.
                  </p>
                  <small className="block mt-2 text-[9.5px] font-black uppercase tracking-widest text-[#13233A]/60 font-mono">
                    PRODUCT DESIGN
                  </small>
                </DraggableSticky>
              </motion.div>

              {/* Note 3: Light Blue Post-It with Company Logos (Drops in at ~72%) */}
              <motion.div
                initial={{ opacity: 0, y: 24, rotate: 0 }}
                animate={{
                  opacity: isNote3 ? 1 : 0,
                  y: isNote3 ? 0 : 24,
                  rotate: isNote3 ? -2 : 0,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="w-full sm:w-auto"
              >
                <DraggableSticky
                  bgColor="#CFE7FF"
                  initialRotate={-2}
                  className="w-48 sm:w-52"
                >
                  <p className="font-bold text-[11px] uppercase tracking-wider text-[#13233A]/70 mb-1.5">
                    I&apos;ve worked with
                  </p>
                  <div className="flex items-center gap-2.5 mt-2">
                    {/* Panther logo badge */}
                    <div
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-black/10 shadow-xs flex items-center justify-center overflow-hidden p-1 hover:scale-110 transition-transform"
                      title="Panther"
                    >
                      <Image
                        src="/panther-logo-badge.png"
                        alt="Panther"
                        width={32}
                        height={32}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    {/* KavachX logo badge */}
                    <div
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black border border-black/10 shadow-xs flex items-center justify-center overflow-hidden p-1 hover:scale-110 transition-transform"
                      title="KavachX"
                    >
                      <Image
                        src="/kavachx-logo.png"
                        alt="KavachX"
                        width={32}
                        height={32}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </DraggableSticky>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── REALISTIC TORN PAPER BOTTOM EDGE ── */}
        <div className="absolute left-0 right-0 -bottom-1 w-full overflow-hidden leading-none pointer-events-none z-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1600"
            height="50"
            viewBox="0 0 1600 50"
            preserveAspectRatio="none"
            className="w-full h-8 sm:h-12 block"
          >
            <defs>
              <filter id="tornShadow" x="0" y="-40%" width="100%" height="200%">
                <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#281A0A" floodOpacity="0.14" />
              </filter>
            </defs>
            <path
              d="M0 0 L0 32 L16 35 L28 35 L36 24 L44 31 L53 33 L73 29 L94 35 L105 27 L116 26 L131 28 L146 28 L156 27 L167 29 L178 26 L189 29 L208 27 L229 34 L246 33 L254 28 L269 25 L286 28 L299 26 L313 21 L330 28 L348 32 L364 35 L374 27 L391 34 L404 19 L417 29 L436 25 L449 31 L469 34 L479 33 L494 26 L507 31 L528 27 L543 21 L563 26 L581 31 L589 22 L597 33 L609 28 L618 34 L626 25 L635 32 L647 34 L668 30 L676 34 L687 26 L694 24 L703 23 L717 24 L734 32 L744 26 L761 31 L780 24 L798 26 L808 29 L816 35 L826 27 L840 25 L860 31 L870 33 L886 25 L900 28 L908 28 L926 27 L935 26 L953 24 L966 24 L975 34 L995 26 L1014 24 L1026 29 L1033 24 L1047 25 L1066 26 L1077 32 L1092 32 L1101 25 L1114 29 L1127 25 L1142 23 L1155 27 L1173 33 L1190 29 L1204 29 L1213 29 L1224 26 L1239 27 L1252 28 L1266 27 L1280 30 L1297 25 L1308 29 L1327 34 L1340 34 L1348 28 L1367 33 L1384 34 L1404 33 L1417 30 L1435 33 L1450 31 L1461 21 L1476 24 L1488 28 L1495 24 L1516 34 L1524 26 L1532 30 L1551 32 L1571 29 L1579 34 L1592 34 L1600 32 L1600 0 Z"
              fill="#FFF8EC"
              filter="url(#tornShadow)"
            />
          </svg>
        </div>
      </div>

      {/* ── 3. BENTO GRID SECTION (Directly following the torn paper edge) ── */}
      <div className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-[1240px] mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 auto-rows-auto md:auto-rows-[200px] gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Card 1: Bio — spans 2 cols 2 rows */}
          <motion.div
            className="md:col-span-2 md:row-span-2 bg-[#111111] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-end min-h-[250px] md:min-h-0 border border-black/10 shadow-sm"
            variants={cardVariants}
          >
            <h3 className="font-black text-2xl sm:text-3xl mb-3" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
              Hi, I&apos;m Ankit.
            </h3>
            <p className="text-white/70 leading-relaxed text-sm">
              I am a product designer obsessed with bridging the gap between aesthetics and function.
              I love diving into complex problems and coming out the other side with elegant, easy-to-use digital experiences.
            </p>
          </motion.div>

          {/* Card 2: Location */}
          <motion.div
            className="bg-[#f5f5f5] rounded-3xl p-6 flex flex-col justify-center min-h-[150px] md:min-h-0 border border-black/5"
            variants={cardVariants}
          >
            <div className="text-2xl mb-2">📍</div>
            <div className="text-xs text-[#888] font-semibold uppercase tracking-wider">Based in</div>
            <div className="font-bold text-[#111] mt-1 text-sm">Jhansi, Uttar Pradesh</div>
          </motion.div>

          {/* Card 3: Photo — spans 1 col 2 rows */}
          <motion.div
            className="md:row-span-2 rounded-3xl overflow-hidden relative min-h-[300px] md:min-h-0 border border-black/10 shadow-sm"
            variants={cardVariants}
          >
            <Image
              src="/ankit.webp"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              style={{ objectFit: "cover" }}
              alt="Ankit"
            />
          </motion.div>

          {/* Card 4: Toolkit */}
          <motion.div
            className="bg-[#111111] rounded-3xl p-6 flex items-center justify-center relative overflow-hidden min-h-[150px] md:min-h-0 border border-black/10 shadow-sm"
            variants={cardVariants}
          >
            <div className="grid grid-cols-2 gap-8 z-10">
              {[
                { src: "/about-3d/figma.png", alt: "Figma" },
                { src: "/about-3d/framer.png", alt: "Framer" },
                { src: "/about-3d/openai.png", alt: "ChatGPT" },
                { src: "/about-3d/gemini.png", alt: "Gemini" },
              ].map((tool) => (
                <div
                  key={tool.alt}
                  className="w-16 h-16 flex items-center justify-center hover:scale-110 transition-transform duration-300"
                >
                  <TransparentImage
                    src={tool.src}
                    alt={tool.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.5))",
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 rounded-3xl pointer-events-none" />
          </motion.div>

          {/* Card 5: Stats */}
          <motion.div
            className="bg-[#cc0000] rounded-3xl p-6 flex flex-col items-center justify-center text-white min-h-[150px] md:min-h-0 shadow-sm"
            variants={cardVariants}
          >
            <span className="text-xs font-semibold uppercase tracking-widest opacity-80">Experience</span>
            <span className="text-5xl font-black my-1" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
              2+
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest opacity-80">Years</span>
          </motion.div>

          {/* Card 6: Design Quote — spans 2 cols */}
          <motion.div
            className="md:col-span-2 bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-center text-black text-center min-h-[200px] md:min-h-0 border border-black/10 shadow-sm"
            variants={cardVariants}
          >
            <div className="text-4xl sm:text-6xl mb-2 sm:mb-4">&ldquo;</div>
            <blockquote className="text-base sm:text-xl font-medium leading-relaxed mb-3 sm:mb-4">
              Design is not just what it looks like and feels like. Design is how it works.
            </blockquote>
            <cite className="text-[#cc0000] font-semibold text-sm sm:text-base">— Steve Jobs</cite>
          </motion.div>

          {/* Card 7: Fun Fact */}
          <motion.div
            className="bg-[#111111] rounded-3xl p-6 flex flex-col justify-center min-h-[150px] md:min-h-0 border border-black/10 shadow-sm"
            variants={cardVariants}
          >
            <div className="text-3xl mb-2">☕</div>
            <div className="font-semibold text-white text-sm leading-snug">
              Powered by ice coffee and good music.
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
