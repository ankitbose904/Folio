"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Plane } from "lucide-react";

import TransparentImage from "./TransparentImage";
export default function Hero() {
    return (
        <section className="hero-bg relative min-h-[95vh] md:min-h-screen overflow-hidden flex items-center justify-center p-4 md:p-8 rounded-[20px] m-2 md:m-4 mt-20 md:mt-4">

            {/* Floating 3D Assets */}
            {[
                { src: "/hero-3d/airplane.png", alt: "3D Airplane", style: { top: "10%", left: "5%", width: "250px", transform: "rotate(-15deg)" }, y: [0, -10, 0], dur: 4 },
                { src: "/hero-3d/controller.png", alt: "3D Gaming Controller", style: { top: "5%", right: "15%", width: "220px", transform: "rotate(25deg)" }, y: [0, 10, 0], dur: 5 },
                { src: "/hero-3d/camera.png", alt: "3D Camera", style: { bottom: "15%", right: "20%", width: "180px", transform: "rotate(15deg)" }, y: [0, 5, 0], dur: 3.5 },
                { src: "/hero-3d/palette.png", alt: "3D Painter's Palette", style: { bottom: "5%", right: "5%", width: "220px", transform: "rotate(-5deg)" }, y: [0, -5, 0], dur: 6 },
                { src: "/hero-3d/headphones.png", alt: "3D Headphones", style: { top: "35%", left: "15%", width: "200px", transform: "rotate(35deg)" }, y: [0, 12, 0], dur: 4.2 },
                { src: "/hero-3d/skier.png", alt: "3D Skier", style: { bottom: "10%", left: "5%", width: "200px", transform: "rotate(-10deg)" }, y: [0, -10, 0], dur: 4.8 },
                { src: "/hero-3d/cricket.png", alt: "3D Cricket Bat", style: { bottom: "5%", left: "30%", width: "140px", transform: "rotate(20deg)" }, y: [0, 5, 0], dur: 3 },
            ].map(({ src, alt, style, y, dur }, i) => (
                <motion.div
                    key={i}
                    className="absolute select-none z-[1] hidden lg:block"
                    style={{ ...style }}
                    animate={{ y }}
                    transition={{ repeat: Infinity, duration: dur }}
                >
                    <TransparentImage
                        src={src}
                        alt={alt}
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            filter: 'drop-shadow(0px 20px 30px rgba(0,0,0,0.4))'
                        }}
                    />
                </motion.div>
            ))}

            {/* Boarding Pass */}
            {/* <motion.div
                className="absolute bottom-[10%] left-[12%] bg-white rounded-2xl p-6 flex items-center gap-5 shadow-[0_20px_40px_rgba(0,0,0,0.3)] z-[5] text-[#111] hidden lg:flex"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, rotate: -6 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                <div className="flex flex-col items-start">
                    <span className="text-[0.7rem] text-[#888] font-semibold uppercase tracking-wider">Ahmedabad</span>
                    <span className="text-[2.2rem] font-black leading-none my-1" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>AMD</span>
                    <span className="text-[0.75rem] font-semibold text-[#555]">9:20 pm</span>
                </div>
                <div className="pass-divider relative flex items-center w-[70px]">
                    <Plane className="relative z-[2] mx-auto text-[#888] bg-white px-1.5" size={20} />
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-[0.7rem] text-[#888] font-semibold uppercase tracking-wider">Bengaluru</span>
                    <span className="text-[2.2rem] font-black leading-none my-1" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>BLR</span>
                    <span className="text-[0.75rem] font-semibold text-[#555]">11:05 pm</span>
                </div>
            </motion.div> */}

            {/* Center Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-3xl mx-auto">
                {/* Sticky Notes */}
                <div className="flex justify-center items-center mb-0 sm:mb-4 relative scale-[0.65] sm:scale-75 md:scale-100 origin-bottom" style={{ minHeight: '110px' }}>
                    <motion.div
                        className="text-[#111] p-4 sm:p-6 shadow-[2px_8px_20px_rgba(0,0,0,0.15)] w-[130px] sm:w-[170px] text-center text-[1.8rem] sm:text-[2.2rem] leading-tight bg-[#84d2ff] z-[2] rotate-[-8deg]"
                        style={{ fontFamily: 'var(--font-caveat), cursive' }}
                        initial={{ opacity: 0, y: -50, rotate: -15 }}
                        animate={{ opacity: 1, y: 0, rotate: -10 }}
                        transition={{ duration: 0.6 }}
                    >
                        UI/UX<br />Designer
                    </motion.div>
                    <motion.div
                        className="text-[#111] p-4 sm:p-6 shadow-[2px_8px_20px_rgba(0,0,0,0.15)] w-[130px] sm:w-[170px] text-center text-[1.8rem] sm:text-[2.2rem] leading-tight bg-[#fff68f] z-[3] rotate-[8deg] -ml-[25px] sm:-ml-[35px]"
                        style={{ fontFamily: 'var(--font-caveat), cursive' }}
                        initial={{ opacity: 0, y: -50, rotate: 15 }}
                        animate={{ opacity: 1, y: 0, rotate: 10 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Product<br />Designer
                    </motion.div>
                </div>

                {/* Main Title */}
                <motion.h1
                    className="text-white font-black uppercase leading-[1.05] tracking-tight mb-6 md:mb-8 text-[clamp(1.8rem,7vw,4rem)]"
                    style={{ fontFamily: 'var(--font-archivo), "Arial Black", sans-serif', textShadow: '3px 3px 0px rgba(0,0,0,0.15)' }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    WELCOME TO<br />ANKIT&apos;S PORTFOLIO
                </motion.h1>

                {/* CTA */}
                <Link href="/projects">
                    <motion.button
                        className="bg-white text-[#111] font-bold text-sm sm:text-base px-7 sm:px-10 py-3 sm:py-[1.1rem] rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:bg-[#f0f0f0] hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(0,0,0,0.25)] transition-all duration-300"
                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View Projects
                    </motion.button>
                </Link>
            </div>
        </section>
    );
}
