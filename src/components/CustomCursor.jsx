"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hasMouse, setHasMouse] = useState(false);

  // Position motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Snappy yet smooth spring physics
  const springConfig = { damping: 28, stiffness: 450, mass: 0.4 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show custom cursor on devices with fine pointer (mouse/trackpad)
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;

    const handlePointerMove = (e) => {
      setHasMouse(true);
      setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check if hovering clickable interactive element
      const target = e.target;
      if (target && target instanceof Element) {
        const isClickable = !!target.closest(
          'a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-clickable="true"]'
        );
        setIsPointer(isClickable);
      }
    };

    const handlePointerDown = () => setIsClicking(true);
    const handlePointerUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!hasMouse) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999] select-none"
      style={{
        x: smoothX,
        y: smoothY,
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        scale: isClicking ? 0.85 : isPointer ? 1.25 : 1,
        rotate: isClicking ? -10 : isPointer ? 8 : 0,
      }}
      transition={{
        scale: { type: "spring", stiffness: 400, damping: 25 },
        rotate: { type: "spring", stiffness: 350, damping: 20 },
      }}
    >
      {/* ── Neo-Brutalist Chunky Yellow Arrow Cursor Vector ── */}
      <svg
        width="38"
        height="42"
        viewBox="0 0 38 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="-translate-x-1 -translate-y-1 overflow-visible"
      >
        {/* Solid Black Offset 3D Drop Shadow */}
        <polygon
          points="6,6.5 35,23.5 20,25.5 15,39.5"
          fill="#000000"
          stroke="#000000"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Front Yellow Chunky Pointer with Heavy Black Outline */}
        <polygon
          points="3,3 32,20 17,22 12,36"
          fill="#facc15"
          stroke="#000000"
          strokeWidth="3.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Inner Subtle Specular Highlight */}
        <path
          d="M 6 7 L 18 15 L 14 16 L 10 24"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.65"
        />
      </svg>
    </motion.div>
  );
}
