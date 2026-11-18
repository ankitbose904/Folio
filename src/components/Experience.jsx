"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ArrowLeft, ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   EXACT 9 STOPS DATA (From James Chugh's Portfolio)
   Mapped to normalized coordinates for 1000 x 780 viewBox
   ───────────────────────────────────────────────────────────── */
const STOPS = [
  {
    id: "Linkedin",
    when: "2023",
    place: "Jhansi",
    tag: "Chapter 01 · 2023",
    name: "Linkedin Marketing Insider",
    c: "#ffffffff",
    type: "Linkedin",
    title: "Linkedin Certified Marketing Insider.",
    txt: "",
    heading: -45,
    pos: { x: 372.7, y: 582.7 },
    fraction: 0.10,
    pillSide: "left",
  },
  {
    id: "Google cloud Arcade program",
    when: "December 2023",
    place: "Jhansi",
    tag: "Chapter 02 · Dec 2023",
    name: "Google cloud Arcade program",
    c: "#4285F4",
    type: "Google cloud Arcade program",
    title: "A failed app changed my life.",
    txt: "",
    // stats: [["1st", "Startup Built"], ["100%", "Self-Taught UX"]],
    heading: -15,
    pos: { x: 188.0, y: 399.4 },
    fraction: 0.233,
    pillSide: "left",
  },
  {
    id: "GDSC Member",
    when: "2023 - 2024",
    place: "Jhansi",
    tag: "Chapter 03 · 2023 – 2024 · Jhansi",
    name: "GDSC-SRGI Member",
    c: "#2E9E6B",
    type: "Google Developer Student Club",
    title: "Google Developer Student Club",
    txt: "",
    // stats: [["HCI", "Lab Research"], ["Night & Day", "Deep Practice"]],
    heading: 20,
    pos: { x: 300.4, y: 199.4 },
    fraction: 0.367,
    pillSide: "left",
  },
  {
    id: "MLSA",
    when: "2024",
    place: "Jhansi",
    tag: "Chapter 04 · 2024 · Jhansi",
    name: "Microsoft Learn Student Ambassadors",
    c: "#0078D4",
    type: "Microsoft Learn Student Ambassadors",
    title: "Microsoft Learn Student Ambassadors",
    txt: "",
    // stats: [["Millions", "Daily Readers"], ["Editorial", "Feed Redesign"]],
    heading: 86,
    pos: { x: 500.0, y: 322.1 },
    fraction: 0.50,
    pillSide: "top",
  },
  {
    id: "GDG",
    when: "Feb – June 2025",
    place: "Jhansi",
    tag: "Chapter 05 · Feb – June 2025",
    name: "Google Developer Group UI/UX Lead",
    c: "#ffffff",
    type: "GDG-UI/UX Lead",
    title: "Google Developer Group UI/UX Lead",
    txt: "",
    // stats: [["+41%", "Payment success"], ["300+", "Offers ranked"]],
    heading: 135,
    pos: { x: 699.6, y: 199.4 },
    fraction: 0.633,
    pillSide: "right",
  },
  {
    id: "KavachX",
    when: "Present",
    place: "Jhansi",
    tag: "Chapter 06 · Present · Jhansi",
    name: "KavachX Pvt.Ltd.",
    c: "#E4262C",
    type: "KavachX",
    title: "Senior UX designer",
    txt: "",
    // stats: [["4,500+", "Bookings a day"], ["16 → 35%", "Hotel response rate"]],
    heading: 165,
    pos: { x: 812.0, y: 399.4 },
    fraction: 0.767,
    pillSide: "right",
  },
  {
    id: "Panthar",
    when: "Present",
    place: "Jhansi",
    tag: "Chapter 07 · Present . Jhansi",
    name: "Panthar InfoHub Pvt. Ltd.",
    c: "#000000ff",
    type: "Panthar",
    title: "Design Head",
    txt: "",
    // stats: [["100K+", "Impressions"], ["Mentorship", "Community assets"]],
    heading: 210,
    pos: { x: 627.3, y: 582.7 },
    fraction: 0.90,
    pillSide: "right",
  },
];

/* ─────────────────────────────────────────────────────────────
   EXACT MATHEMATICAL HEART SVG PATH (Smooth cardioid, Length: 1975)
   ───────────────────────────────────────────────────────────── */
const HEART_D =
  "M 500 729.1 L 499.8 726.9 L 498.3 720.5 L 494.4 710.1 L 487 696.2 L 475.4 679.3 L 459.3 659.9 L 438.6 638.7 L 413.5 616 L 384.9 592.3 L 353.6 567.8 L 321 542.5 L 288.5 516.4 L 257.6 489.3 L 229.8 461.3 L 206.6 432.2 L 189 402.1 L 178.1 371.5 L 174.4 340.6 L 178.1 310.4 L 189 281.6 L 206.6 255.4 L 229.8 232.7 L 257.6 214.6 L 288.5 201.9 L 321 195.1 L 353.6 194.5 L 384.9 199.9 L 413.5 210.6 L 438.6 225.5 L 459.3 243.3 L 475.4 262.5 L 487 281.2 L 494.4 297.8 L 498.3 310.9 L 499.8 319.3 L 500 322.1 L 500.2 319.3 L 501.7 310.9 L 505.6 297.8 L 513 281.2 L 524.6 262.5 L 540.7 243.3 L 561.4 225.5 L 586.5 210.6 L 615.1 199.9 L 646.4 194.5 L 679 195.1 L 711.5 201.9 L 742.4 214.6 L 770.2 232.7 L 793.4 255.4 L 811 281.6 L 821.9 310.4 L 825.6 340.6 L 821.9 371.5 L 811 402.1 L 793.4 432.2 L 770.2 461.3 L 742.4 489.3 L 711.5 516.4 L 679 542.5 L 646.4 567.8 L 615.1 592.3 L 586.5 616 L 561.4 638.7 L 540.7 659.9 L 524.6 679.3 L 513 696.2 L 505.6 710.1 L 501.7 720.5 L 500.2 726.9 L 500 729.1 Z";

const TOTAL_PATH_LEN = 1975;

/* ─────────────────────────────────────────────────────────────
   TEARDROP PIN COMPONENT
   ───────────────────────────────────────────────────────────── */
function HeartPin({ stop, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className="absolute -translate-x-1/2 -translate-y-full cursor-pointer select-none group z-30"
      style={{
        left: `${(stop.pos.x / 1000) * 100}%`,
        top: `${(stop.pos.y / 780) * 100}%`,
      }}
    >
      <div className="relative flex flex-col items-center">
        {/* Pulsing Ripple on Active Pin */}
        {isActive && (
          <div
            className="absolute -top-3 w-12 h-12 rounded-full pointer-events-none animate-ping opacity-35"
            style={{ backgroundColor: stop.c }}
          />
        )}

        {/* Teardrop Pin Marker */}
        <div
          className={`w-7 h-9 sm:w-8.5 sm:h-11 relative flex items-center justify-center transition-all duration-300 ${isActive
              ? "scale-115 -translate-y-1 drop-shadow-[0_8px_18px_rgba(26,95,208,0.5)]"
              : "group-hover:scale-105 group-hover:-translate-y-0.5 drop-shadow-[0_4px_10px_rgba(19,35,58,0.18)]"
            }`}
          style={{
            background: stop.c,
            clipPath:
              "path('M 17 0 C 7.6 0, 0 7.6, 0 17 C 0 27, 9.5 36.5, 17 44 C 24.5 36.5, 34 27, 34 17 C 34 7.6, 26.4 0, 17 0 Z')",
          }}
        >
          {/* Circular Inner Badge */}
          <div className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 rounded-full bg-white flex items-center justify-center -mt-2.5 shadow-sm overflow-hidden">
            {(stop.type === "Linkedin" || stop.type === "linkedin") && (
              <div className="w-full h-full bg-[#0A66C2] flex items-center justify-center p-0.5">
                <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </div>
            )}
            {(stop.type === "google" || stop.type === "Google" || stop.type === "app" || stop.type === "Google cloud Arcade program" || stop.id === "Google cloud Arcade program" || stop.type === "GDG-UI/UX Lead" || stop.id === "GDG") && (
              <div className="w-full h-full bg-[#4285F4] flex items-center justify-center p-0.5">
                <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
            )}
            {(stop.type === "Google Developer Student Club" || stop.type === "gdsc" || stop.id === "GDSC Member") && (
              <div className="w-full h-full bg-white flex items-center justify-center p-0.5">
                <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M 9.5 6 L 4.5 12" stroke="#EA4335" />
                  <path d="M 4.5 12 L 9.5 18" stroke="#4285F4" />
                  <path d="M 14.5 6 L 19.5 12" stroke="#0F9D58" />
                  <path d="M 19.5 12 L 14.5 18" stroke="#FBBC04" />
                </svg>
              </div>
            )}
            {(stop.type === "mlsa" || stop.type === "MLSA" || stop.type === "Microsoft Learn Student Ambassadors" || stop.id === "MLSA") && (
              <div className="w-full h-full bg-white flex items-center justify-center p-0.5">
                <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true">
                  <rect x="2" y="2" width="9.2" height="9.2" fill="#F25022" rx="0.5" />
                  <rect x="12.8" y="2" width="9.2" height="9.2" fill="#7FBA00" rx="0.5" />
                  <rect x="2" y="12.8" width="9.2" height="9.2" fill="#00A4EF" rx="0.5" />
                  <rect x="12.8" y="12.8" width="9.2" height="9.2" fill="#FFB900" rx="0.5" />
                </svg>
              </div>
            )}
            {(stop.type === "Panthar" || stop.type === "panther" || stop.id === "Panthar") && (
              <div className="w-full h-full bg-white flex items-center justify-center p-0.5">
                <Image
                  src="/panther-logo-badge.png"
                  alt="Panthar InfoHub"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            {(stop.type === "KavachX" || stop.type === "kavachx" || stop.id === "KavachX") && (
              <div className="w-full h-full bg-white flex items-center justify-center p-0.5">
                <Image
                  src="/kavachx-logo.png"
                  alt="KavachX"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            {stop.type === "iit" && (
              <div className="w-full h-full bg-[#14532d] flex items-center justify-center">
                <span className="text-[7px] font-black text-white">IIT</span>
              </div>
            )}
            {stop.type === "ht" && (
              <div className="w-full h-full bg-[#1E7FC8] flex items-center justify-center font-serif">
                <span className="text-[8px] font-black text-white italic">HT</span>
              </div>
            )}
            {stop.type === "eazydiner" && (
              <div className="w-full h-full bg-[#EE5A2B] flex items-center justify-center px-0.5">
                <span className="text-[5px] font-bold text-white tracking-tighter leading-none text-center">
                  eazydiner
                </span>
              </div>
            )}
            {stop.type === "mmt" && (
              <div className="w-full h-full bg-[#E4262C] flex items-center justify-center font-serif">
                <span className="text-[8px] font-bold text-white italic">my</span>
              </div>
            )}
            {stop.type === "oyo" && (
              <div className="w-full h-full bg-[#DC402A] flex items-center justify-center">
                <span className="text-[7px] font-black text-white tracking-tight">OYO</span>
              </div>
            )}
            {stop.type === "eyes" && (
              <div className="w-full h-full bg-[#9A6A3E] flex items-center justify-center gap-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-white flex items-center justify-center">
                  <div className="w-0.5 h-0.5 rounded-full bg-black translate-x-0.5" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-white flex items-center justify-center">
                  <div className="w-0.5 h-0.5 rounded-full bg-black translate-x-0.5" />
                </div>
              </div>
            )}
            {stop.type === "camera" && (
              <div className="w-full h-full bg-[#E1306C] flex items-center justify-center text-white">
                <Camera size={10} strokeWidth={2.5} />
              </div>
            )}
          </div>
        </div>

        {/* Attached White Pill Badge (Turns Dark on Active Stop) */}
        <div
          className={`absolute whitespace-nowrap pointer-events-none transition-all z-20 ${
            stop.pillSide === "left" || (!stop.pillSide && stop.pos.x < 480)
              ? "right-[112%] top-0.5 pr-1.5 text-right"
              : stop.pillSide === "top" || (!stop.pillSide && stop.pos.x >= 480 && stop.pos.x <= 520)
              ? "bottom-[115%] left-1/2 -translate-x-1/2 pb-1.5 text-center"
              : "left-[112%] top-0.5 pl-1.5 text-left"
          }`}
        >
          <div
            className={`px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold transition-all shadow-sm border ${isActive
                ? "bg-[#13233A] text-white border-black scale-105 shadow-md"
                : "bg-white text-[#13233A] border-gray-200/80 group-hover:border-gray-300"
              }`}
          >
            {stop.name}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CHAPTER CARD COMPONENT (.jcard from jameschugh.com)
   ───────────────────────────────────────────────────────────── */
function ChapterCard({ stop, index, total, onPrev, onNext, className = "" }) {
  return (
    <motion.div
      key={stop.id}
      initial={{ opacity: 0, x: -16, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 16, scale: 0.98 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className={`bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_24px_50px_-16px_rgba(19,35,58,0.22)] border border-black/5 select-text ${className}`}
    >
      {/* Top Bar: Company Badge + Subtitle + Counter */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-xs overflow-hidden"
            style={{
              backgroundColor:
                (stop.type === "Linkedin" || stop.type === "linkedin")
                  ? "#0A66C2"
                  : (stop.type === "Google Developer Student Club" || stop.type === "gdsc" || stop.id === "GDSC Member" || stop.type === "mlsa" || stop.type === "MLSA" || stop.type === "Microsoft Learn Student Ambassadors" || stop.id === "MLSA" || stop.type === "Panthar" || stop.type === "panther" || stop.id === "Panthar" || stop.type === "KavachX" || stop.type === "kavachx" || stop.id === "KavachX")
                  ? "#ffffff"
                  : (stop.type === "google" || stop.type === "Google" || stop.type === "app" || stop.type === "Google cloud Arcade program" || stop.id === "Google cloud Arcade program" || stop.type === "GDG-UI/UX Lead" || stop.id === "GDG")
                  ? "#4285F4"
                  : stop.c,
              border:
                (stop.type === "Google Developer Student Club" || stop.type === "gdsc" || stop.id === "GDSC Member" || stop.type === "mlsa" || stop.type === "MLSA" || stop.type === "Microsoft Learn Student Ambassadors" || stop.id === "MLSA" || stop.type === "Panthar" || stop.type === "panther" || stop.id === "Panthar" || stop.type === "KavachX" || stop.type === "kavachx" || stop.id === "KavachX")
                  ? "1px solid rgba(0,0,0,0.08)"
                  : undefined,
            }}
          >
            {(stop.type === "Linkedin" || stop.type === "linkedin") ? (
              <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            ) : (stop.type === "google" || stop.type === "Google" || stop.type === "app" || stop.type === "Google cloud Arcade program" || stop.id === "Google cloud Arcade program" || stop.type === "GDG-UI/UX Lead" || stop.id === "GDG") ? (
              <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            ) : (stop.type === "Google Developer Student Club" || stop.type === "gdsc" || stop.id === "GDSC Member") ? (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M 9.5 6 L 4.5 12" stroke="#EA4335" />
                <path d="M 4.5 12 L 9.5 18" stroke="#4285F4" />
                <path d="M 14.5 6 L 19.5 12" stroke="#0F9D58" />
                <path d="M 19.5 12 L 14.5 18" stroke="#FBBC04" />
              </svg>
            ) : (stop.type === "mlsa" || stop.type === "MLSA" || stop.type === "Microsoft Learn Student Ambassadors" || stop.id === "MLSA") ? (
              <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" aria-hidden="true">
                <rect x="2" y="2" width="9.2" height="9.2" fill="#F25022" rx="0.8" />
                <rect x="12.8" y="2" width="9.2" height="9.2" fill="#7FBA00" rx="0.8" />
                <rect x="2" y="12.8" width="9.2" height="9.2" fill="#00A4EF" rx="0.8" />
                <rect x="12.8" y="12.8" width="9.2" height="9.2" fill="#FFB900" rx="0.8" />
              </svg>
            ) : (stop.type === "Panthar" || stop.type === "panther" || stop.id === "Panthar") ? (
              <div className="w-full h-full bg-white flex items-center justify-center p-1">
                <Image
                  src="/panther-logo-badge.png"
                  alt="Panthar InfoHub"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (stop.type === "KavachX" || stop.type === "kavachx" || stop.id === "KavachX") ? (
              <div className="w-full h-full bg-white flex items-center justify-center p-1">
                <Image
                  src="/kavachx-logo.png"
                  alt="KavachX"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              stop.name.slice(0, 2).toUpperCase()
            )}
          </div>
          <div>
            <h4
              className="font-black text-sm text-[#13233A] leading-tight"
              style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
            >
              {stop.name}
            </h4>
            <p className="text-[10.5px] text-gray-500 font-medium">
              {stop.when} · {stop.place}
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-gray-400">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-base sm:text-lg font-black text-[#13233A] tracking-tight mb-2 leading-tight"
        style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
      >
        {stop.title}
      </h3>

      {/* Story Text */}
      <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed mb-4">
        {stop.txt}
      </p>

      {/* Key Metric Stats */}
      {stop.stats && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {stop.stats.map(([num, lbl], sIdx) => (
            <div
              key={sIdx}
              className="rounded-xl p-2.5 text-center border border-black/5"
              style={{ backgroundColor: `${stop.c}0d` }}
            >
              <div className="text-base font-black text-[#13233A] leading-tight">{num}</div>
              <div className="text-[9.5px] font-bold text-gray-500 uppercase tracking-wider">{lbl}</div>
            </div>
          ))}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2.5 border-t border-gray-100 select-none">
        <button
          type="button"
          disabled={index === 0}
          onClick={onPrev}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-black disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          <ArrowLeft size={13} /> Previous
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex items-center gap-1.5 text-xs font-bold text-[#13233A] hover:text-[#2563EB] cursor-pointer transition-colors"
        >
          {index === total - 1 ? "Complete Path ✦" : "Next"} <ArrowRight size={13} />
        </button>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   EXPERIENCE SECTION (Sticky Walk-The-Path from jameschugh.com)
   ───────────────────────────────────────────────────────────── */
export default function Experience() {
  const trackRef = useRef(null);
  const heartPathRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [beaconPos, setBeaconPos] = useState({ x: 500, y: 729.1 });

  // Track sticky scroll position across the extended track
  const handleScroll = useCallback(() => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const scrollableDistance = rect.height - windowH;
    if (scrollableDistance <= 0) return;

    // rect.top is the distance from viewport top to top of the track.
    // When track reaches top of screen (rect.top <= 0), it stays pinned!
    const scrolled = -rect.top;
    const p = Math.max(0, Math.min(1, scrolled / scrollableDistance));
    setProgress(p);

    // Timeline mapping:
    // 0.00 -> 0.76 walks through 7 stops (stops 0 to 6)
    // 0.76 -> 0.90 draws the remaining path back to the tip (completed heart)
    // 0.90 -> 1.00 holds the completed heart stuck on screen before exit!
    if (p <= 0.76) {
      const stepProg = p / 0.76;
      const stopIdx = Math.min(STOPS.length - 1, Math.max(0, Math.floor(stepProg * STOPS.length)));
      setActiveIdx(stopIdx);
    } else {
      setActiveIdx(STOPS.length - 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Jump to specific stop on click
  const walkToStop = (idx) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const currentScrollY = window.scrollY;
    const trackTop = currentScrollY + rect.top;
    const scrollableDistance = rect.height - window.innerHeight;

    let targetProg = 0;
    if (idx < STOPS.length) {
      setActiveIdx(idx);
      targetProg = (idx / (STOPS.length - 1)) * 0.74;
    } else {
      // Complete path
      targetProg = 0.92;
    }

    const targetScrollY = trackTop + targetProg * scrollableDistance;
    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  const isCompleted = progress >= 0.90;
  const isWalking = progress > 0.01;
  const activeStop = STOPS[activeIdx] || STOPS[0];

  // Continuous smooth drawing of the heart path:
  // Starts at 0.00 (right at start flags at the bottom tip)
  // 0.00 -> 0.76 reaches fraction 0.90 (Panthar InfoHub)
  // 0.76 -> 0.90 reaches fraction 1.00 (Back to tip, 100% completed!)
  let pathDrawProgress = 0;
  if (progress <= 0.76) {
    const stepRatio = progress / 0.76;
    pathDrawProgress = Math.min(0.90, Math.max(0, stepRatio * 0.90));
  } else if (progress <= 0.90) {
    const compRatio = (progress - 0.76) / 0.14;
    pathDrawProgress = 0.90 + compRatio * 0.10;
  } else {
    pathDrawProgress = 1.0;
  }

  // Update beacon position in 100% mathematical unison with the tip of the drawn line
  useEffect(() => {
    if (!heartPathRef.current) return;
    try {
      const currentDist = TOTAL_PATH_LEN * Math.min(1, Math.max(0, pathDrawProgress));
      const pt = heartPathRef.current.getPointAtLength(currentDist);
      if (pt && !isNaN(pt.x) && !isNaN(pt.y)) {
        setBeaconPos({ x: pt.x, y: pt.y });
      }
    } catch {
      // fallback
    }
  }, [pathDrawProgress]);

  return (
    <section
      ref={trackRef}
      className="relative w-full h-[550vh] bg-[#FFF8EC] text-[#13233A] select-none"
      id="experience"
    >
      {/* ── STICKY PINNED VIEWPORT (Stays stuck till heart completes!) ── */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full flex flex-col justify-between py-6 sm:py-8 px-4 sm:px-8 overflow-hidden bg-[#FFF8EC]">
        {/* 1. Header (Centered at top) */}
        <div className="flex flex-col items-center text-center max-w-xl mx-auto z-20 shrink-0">
          <p className="text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center justify-center gap-1.5">
            <span>✦</span>
            <span>The journey</span>
          </p>

          <h2
            className="font-black text-[#13233A] text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.1] tracking-tight"
            style={{ fontFamily: 'var(--font-archivo), "Arial Black", sans-serif' }}
          >
            Engineer by degree,{" "}
            <span className="text-[#3b82f6]">designer by obsession.</span>
          </h2>

          <p className="text-xs text-gray-500 font-medium mt-1">
            Seven stops between 2023 and now. Scroll to walk the path.
          </p>
        </div>

        {/* 2. Working Compass (Top Right) */}
        <div
          className="absolute z-20 top-6 sm:top-8 right-4 sm:right-8 w-11 h-11 sm:w-13 sm:h-13 pointer-events-none select-none opacity-85"
          aria-hidden="true"
        >
          <svg viewBox="0 0 108 108" className="w-full h-full drop-shadow-[0_2px_8px_rgba(19,35,58,0.1)]">
            <circle cx="54" cy="54" r="50" fill="#FFFDF8" stroke="#13233A" strokeWidth="1.2" />
            <circle cx="54" cy="54" r="42" fill="none" stroke="#13233A" strokeWidth="0.8" strokeDasharray="1.5 4.1" />
            <g fontFamily="var(--font-archivo), sans-serif" fontSize="10" fontWeight="800" fill="#13233A" textAnchor="middle">
              <text x="54" y="20">N</text>
              <text x="54" y="96">S</text>
              <text x="91" y="58">E</text>
              <text x="17" y="58">W</text>
            </g>
            <g
              className="transition-transform duration-700 ease-out origin-center"
              style={{
                transformOrigin: "54px 54px",
                transform: `rotate(${isCompleted ? 0 : activeStop.heading}deg)`,
              }}
            >
              <path d="M54 26 L59 54 L54 58 L49 54Z" fill="#FF6B4A" />
              <path d="M54 82 L59 54 L54 50 L49 54Z" fill="#13233A" />
              <circle cx="54" cy="54" r="3" fill="#FFFDF8" stroke="#13233A" />
            </g>
          </svg>
        </div>

        {/* 3. Main Center Stage: Non-overlapping side card + Zoomed Heart Map */}
        <div className="relative w-full max-w-7xl mx-auto flex-1 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 xl:gap-12 px-2 sm:px-6 my-auto min-h-0">
          {/* Floating Chapter Card (Desktop: dedicated left column, never overlapping the heart map) */}
          <div className="hidden lg:flex w-[320px] xl:w-[350px] shrink-0 z-40 items-center justify-center pointer-events-auto">
            <AnimatePresence mode="wait">
              {isWalking && (
                isCompleted ? (
                  <motion.div
                    key="completed-card"
                    initial={{ opacity: 0, x: -20, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="w-full bg-white rounded-3xl p-6 shadow-[0_24px_50px_-16px_rgba(26,95,208,0.25)] border border-blue-100/80 select-text"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1A5FD0] animate-pulse" />
                      <span className="text-[11px] font-black uppercase tracking-wider text-[#1A5FD0]">
                        ✦ Path Completed · 2021 → NOW
                      </span>
                    </div>

                    <h3
                      className="text-lg xl:text-xl font-black text-[#13233A] tracking-tight mb-2 leading-tight"
                      style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
                    >
                      Heart loop completed.
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed mb-4">
                      Seven milestones between 2023 and now: scaling digital design, community leadership, and impactful product experiences.
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="rounded-xl p-2.5 text-center bg-blue-50/70 border border-blue-100">
                        <div className="text-base font-black text-[#1A5FD0]">7 Stops</div>
                        <div className="text-[9.5px] font-bold text-gray-500 uppercase">Shipped & Scaled</div>
                      </div>
                      <div className="rounded-xl p-2.5 text-center bg-blue-50/70 border border-blue-100">
                        <div className="text-base font-black text-[#1A5FD0]">2023 → NOW</div>
                        <div className="text-[9.5px] font-bold text-gray-500 uppercase">Always Building</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => walkToStop(0)}
                      className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-[#13233A] transition-colors cursor-pointer"
                    >
                      ↺ Walk the path again
                    </button>
                  </motion.div>
                ) : (
                  <ChapterCard
                    stop={activeStop}
                    index={activeIdx}
                    total={STOPS.length}
                    onPrev={() => walkToStop(Math.max(0, activeIdx - 1))}
                    onNext={() => {
                      if (activeIdx === STOPS.length - 1) {
                        walkToStop(STOPS.length);
                      } else {
                        walkToStop(activeIdx + 1);
                      }
                    }}
                    className="w-full"
                  />
                )
              )}
            </AnimatePresence>
          </div>

          {/* Centered Heart Map Canvas (With subtle cartographic zoom on enter) */}
          <div
            className={`relative flex-1 w-full max-w-[580px] xl:max-w-[660px] aspect-[1000/780] overflow-visible select-none mx-auto transition-transform duration-700 ease-out ${isWalking ? "scale-105 sm:scale-110" : "scale-100"
              }`}
          >
            {/* SVG Cartographic Artwork */}
            <svg viewBox="0 0 1000 780" className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <radialGradient id="expFadeMask" cx="50%" cy="50%" r="50%">
                  <stop offset="68%" stopColor="#fff" stopOpacity="1" />
                  <stop offset="98%" stopColor="#fff" stopOpacity="0" />
                </radialGradient>
                <mask id="expCityMask">
                  <rect width="1000" height="780" fill="url(#expFadeMask)" />
                </mask>
              </defs>

              {/* Faint Street Blocks & Cartographic Layout */}
              <g mask="url(#expCityMask)" opacity="0.82">
                {/* Soft City Building Rectangles */}
                <g fill="#EAE6DF">
                  {/* Delhi cluster */}
                  <rect x="80" y="240" width="22" height="30" rx="3" />
                  <rect x="110" y="230" width="34" height="24" rx="3" />
                  <rect x="152" y="245" width="28" height="35" rx="3" />
                  <rect x="190" y="220" width="36" height="40" rx="3" />
                  <rect x="236" y="240" width="42" height="28" rx="3" />
                  <rect x="290" y="235" width="30" height="36" rx="3" />
                  <rect x="330" y="250" width="45" height="30" rx="3" />
                  <rect x="385" y="235" width="38" height="42" rx="3" />

                  <rect x="95" y="320" width="26" height="34" rx="3" />
                  <rect x="130" y="310" width="38" height="28" rx="3" />
                  <rect x="180" y="330" width="32" height="38" rx="3" />
                  <rect x="220" y="315" width="45" height="45" rx="3" />
                  <rect x="280" y="325" width="35" height="35" rx="3" />
                  <rect x="325" y="310" width="40" height="30" rx="3" />
                  <rect x="375" y="330" width="42" height="38" rx="3" />

                  <rect x="115" y="420" width="35" height="32" rx="3" />
                  <rect x="160" y="415" width="40" height="42" rx="3" />
                  <rect x="210" y="430" width="32" height="28" rx="3" />
                  <rect x="255" y="410" width="48" height="40" rx="3" />
                  <rect x="315" y="425" width="38" height="35" rx="3" />
                  <rect x="365" y="415" width="42" height="44" rx="3" />

                  <rect x="190" y="510" width="36" height="34" rx="3" />
                  <rect x="235" y="505" width="42" height="40" rx="3" />
                  <rect x="290" y="520" width="38" height="30" rx="3" />
                  <rect x="340" y="500" width="44" height="46" rx="3" />
                  <rect x="395" y="520" width="35" height="36" rx="3" />

                  {/* Gurgaon cluster */}
                  <rect x="580" y="235" width="40" height="35" rx="3" />
                  <rect x="630" y="245" width="48" height="28" rx="3" />
                  <rect x="690" y="230" width="36" height="42" rx="3" />
                  <rect x="735" y="245" width="44" height="34" rx="3" />
                  <rect x="790" y="235" width="38" height="38" rx="3" />
                  <rect x="840" y="245" width="32" height="28" rx="3" />

                  <rect x="575" y="320" width="35" height="42" rx="3" />
                  <rect x="620" y="310" width="44" height="32" rx="3" />
                  <rect x="675" y="330" width="40" height="40" rx="3" />
                  <rect x="725" y="315" width="46" height="36" rx="3" />
                  <rect x="780" y="325" width="38" height="45" rx="3" />
                  <rect x="830" y="315" width="34" height="35" rx="3" />

                  <rect x="580" y="415" width="42" height="38" rx="3" />
                  <rect x="635" y="425" width="38" height="30" rx="3" />
                  <rect x="685" y="410" width="48" height="44" rx="3" />
                  <rect x="745" y="425" width="42" height="36" rx="3" />
                  <rect x="800" y="415" width="36" height="40" rx="3" />

                  <rect x="570" y="515" width="38" height="34" rx="3" />
                  <rect x="620" y="505" width="45" height="42" rx="3" />
                  <rect x="675" y="520" width="40" height="32" rx="3" />
                  <rect x="725" y="510" width="44" height="46" rx="3" />
                </g>

                {/* Street grid lines */}
                <g stroke="#E4DFD7" strokeWidth="2.5" strokeDasharray="18 10" opacity="0.6">
                  <line x1="120" y1="180" x2="120" y2="600" />
                  <line x1="200" y1="160" x2="200" y2="640" />
                  <line x1="280" y1="160" x2="280" y2="660" />
                  <line x1="360" y1="160" x2="360" y2="680" />
                  <line x1="640" y1="160" x2="640" y2="680" />
                  <line x1="720" y1="160" x2="720" y2="660" />
                  <line x1="800" y1="160" x2="800" y2="640" />
                  <line x1="880" y1="180" x2="880" y2="600" />

                  <line x1="60" y1="215" x2="940" y2="215" />
                  <line x1="60" y1="300" x2="940" y2="300" />
                  <line x1="60" y1="390" x2="940" y2="390" />
                  <line x1="60" y1="480" x2="940" y2="480" />
                </g>

                {/* Soft Green Parks */}
                <path
                  d="M 570 470 Q 640 435, 710 470 Q 745 505, 680 540 Q 610 550, 570 470 Z"
                  fill="#CDE8C4"
                  opacity="0.85"
                />
                <path
                  d="M 160 630 Q 220 595, 270 630 Q 300 665, 240 685 Q 170 695, 160 630 Z"
                  fill="#CDE8C4"
                  opacity="0.8"
                />
                <path
                  d="M 660 600 Q 710 570, 760 600 Q 780 635, 730 655 Q 670 655, 660 600 Z"
                  fill="#CDE8C4"
                  opacity="0.8"
                />

                {/* Blue Lake */}
                <ellipse cx="230" cy="495" rx="38" ry="18" fill="#AAD3F2" opacity="0.9" />

                {/* Central Blue River */}
                <path
                  d="M 500 0 Q 496 220, 502 360 Q 508 520, 498 640 Q 494 710, 502 780"
                  fill="none"
                  stroke="#AAD3F2"
                  strokeWidth="15"
                  strokeLinecap="round"
                />
                <path
                  d="M 500 0 Q 496 220, 502 360 Q 508 520, 498 640 Q 494 710, 502 780"
                  fill="none"
                  stroke="#86C1EA"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity="0.7"
                />

                {/* Horizontal Yellow Highway */}
                <line x1="30" y1="565" x2="970" y2="565" stroke="#FEF08A" strokeWidth="8" opacity="0.9" />
                <line x1="30" y1="565" x2="970" y2="565" stroke="#FACC15" strokeWidth="1.5" opacity="0.8" />

                {/* City Markers */}
                <text x="600" y="525" fill="#94A3B8" fontSize="9" fontWeight="bold" letterSpacing="2">
                  GURGAON
                </text>
                <text x="210" y="525" fill="#94A3B8" fontSize="8.5" fontWeight="bold" letterSpacing="1.5">
                  DELHI
                </text>

                {/* Central Focal Dot */}
                <circle cx="585" cy="385" r="5" fill="#0F172A" />
              </g>

              {/* 1. GHOST DOTTED HEART PATH */}
              <path
                d={HEART_D}
                fill="none"
                stroke="#B8D5F6"
                strokeWidth="2.5"
                strokeDasharray="2 7"
                strokeLinecap="round"
              />

              {/* 2. SOLID VIBRANT BLUE PATH (Carved smoothly with scroll from start to 100% completion) */}
              <path
                ref={heartPathRef}
                d={HEART_D}
                fill="none"
                stroke="#1A5FD0"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={TOTAL_PATH_LEN}
                strokeDashoffset={TOTAL_PATH_LEN * (1 - Math.min(1, Math.max(0, pathDrawProgress)))}
              />
              <path
                d={HEART_D}
                fill="none"
                stroke="#4285F4"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={TOTAL_PATH_LEN}
                strokeDashoffset={TOTAL_PATH_LEN * (1 - Math.min(1, Math.max(0, pathDrawProgress)))}
              />

              {/* Start & Finish Flags */}
              <g transform="translate(488, 725)">
                <rect x="0" y="0" width="1.8" height="15" fill="#64748B" />
                <polygon points="1.8,0 11,4 1.8,8" fill="#DC2626" />
                <rect x="22" y="0" width="1.8" height="15" fill="#64748B" />
                <polygon points="23.8,0 33,4 23.8,8" fill="#2563EB" />
              </g>
            </svg>

            {/* Active Moving Beacon Dot (Glued in 100% mathematical unison with the leading line tip) */}
            <div
              className={`absolute w-3.5 h-3.5 rounded-full border-2 border-white shadow-md z-40 pointer-events-none -translate-x-1/2 -translate-y-1/2 ${isCompleted ? "bg-[#2563EB] scale-125" : "bg-[#1A5FD0]"
                }`}
              style={{
                left: `${(beaconPos.x / 1000) * 100}%`,
                top: `${(beaconPos.y / 780) * 100}%`,
              }}
            />

            {/* The 9 Interactive Teardrop Map Pins */}
            {STOPS.map((stop, i) => (
              <HeartPin
                key={stop.id}
                stop={stop}
                isActive={!isCompleted && i === activeIdx}
                onClick={() => walkToStop(i)}
              />
            ))}
          </div>
        </div>

        {/* 4. Bottom Controls: Mobile Chapter Card & Timeline Dots */}
        <div className="w-full flex flex-col items-center gap-2.5 z-30 shrink-0">
          {/* Mobile / Tablet Chapter Card (Below Map) */}
          <div className="lg:hidden w-full max-w-md">
            <AnimatePresence mode="wait">
              {isWalking && (
                isCompleted ? (
                  <motion.div
                    key="completed-mobile"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="bg-white rounded-xl p-4 shadow-lg border border-blue-100 text-center"
                  >
                    <span className="text-[10px] font-black uppercase text-[#1A5FD0] tracking-wider block mb-1">
                      ✦ Path Completed · 2023 → NOW
                    </span>
                    <h4 className="font-black text-sm text-[#13233A] mb-1">
                      Full loop completed.
                    </h4>
                    <p className="text-[11px] text-gray-500 mb-2">
                      7 stops across shipping products and leading design.
                    </p>
                    <button
                      type="button"
                      onClick={() => walkToStop(0)}
                      className="px-3 py-1 rounded-lg bg-gray-100 text-xs font-bold text-[#13233A]"
                    >
                      ↺ Walk again
                    </button>
                  </motion.div>
                ) : (
                  <ChapterCard
                    stop={activeStop}
                    index={activeIdx}
                    total={STOPS.length}
                    onPrev={() => walkToStop(Math.max(0, activeIdx - 1))}
                    onNext={() => {
                      if (activeIdx === STOPS.length - 1) {
                        walkToStop(STOPS.length);
                      } else {
                        walkToStop(activeIdx + 1);
                      }
                    }}
                    className="p-3.5 sm:p-4 rounded-xl"
                  />
                )
              )}
            </AnimatePresence>
          </div>

          {/* Stepper Timeline Dots */}
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-gray-200/80">
            <button
              type="button"
              disabled={activeIdx === 0 && !isCompleted}
              onClick={() => walkToStop(Math.max(0, isCompleted ? STOPS.length - 1 : activeIdx - 1))}
              className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-gray-100 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer transition-all text-xs font-bold"
              aria-label="Previous stop"
            >
              ←
            </button>

            {/* 9 Stepper Dots */}
            <div className="flex items-center gap-1.5 px-1">
              {STOPS.map((st, idx) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => walkToStop(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${!isCompleted && idx === activeIdx ? "bg-[#13233A] scale-125" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  aria-label={st.name}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => walkToStop(STOPS.length)}
              className={`text-[10.5px] font-bold pl-1.5 border-l border-gray-200 transition-colors cursor-pointer ${isCompleted ? "text-[#1A5FD0] font-black" : "text-gray-500 hover:text-black"
                }`}
            >
              2021 → now {isCompleted && "✓"}
            </button>

            <button
              type="button"
              disabled={isCompleted}
              onClick={() => {
                if (activeIdx === STOPS.length - 1) {
                  walkToStop(STOPS.length);
                } else {
                  walkToStop(activeIdx + 1);
                }
              }}
              className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-gray-100 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer transition-all text-xs font-bold"
              aria-label="Next stop"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
