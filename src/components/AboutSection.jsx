"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import TransparentImage from "./TransparentImage";

export default function AboutSection() {

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  return (
    <section className="py-20 px-5 md:px-8" id="about">
      {/* Header */}
      <div className="mb-12 md:mb-16 flex items-center justify-center gap-2 md:gap-4 w-full max-w-[1200px] mx-auto overflow-hidden">
        <div className="h-0.5 flex-[0_1_30px] md:flex-[0_1_60px] bg-[#cc0000] shrink-0" />
        <Sparkles className="text-[#cc0000] shrink-0" size={20} fill="currentColor" />
        <motion.h2
          className="font-black tracking-wide text-[#e5e5e5] uppercase text-[clamp(2rem,6vw,4.5rem)] text-center"
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

      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 auto-rows-auto md:auto-rows-[200px] gap-4 max-w-[1200px] mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Card 1: Bio — spans 2 cols 2 rows */}
        <motion.div
          className="md:col-span-2 md:row-span-2 bg-[black] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-end min-h-[250px] md:min-h-0"
          variants={cardVariants}
        >
          <h3 className="font-black text-2xl sm:text-3xl mb-3" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>Hi, I&apos;m Ankit.</h3>
          <p className="text-white/70 leading-relaxed text-sm">
            I am a product designer obsessed with bridging the gap between aesthetics and function.
            I love diving into complex problems and coming out the other side with elegant, easy-to-use digital experiences.
          </p>
        </motion.div>

        {/* Card 2: Location */}
        <motion.div className="bg-[#f5f5f5] rounded-3xl p-6 flex flex-col justify-center min-h-[150px] md:min-h-0" variants={cardVariants}>
          <div className="text-2xl mb-2">📍</div>
          <div className="text-xs text-[#888] font-semibold uppercase tracking-wider">Based in</div>
          <div className="font-bold text-[#111] mt-1 text-sm">Jhansi, Uttar Pradesh</div>
        </motion.div>

        {/* Card 3: Photo — spans 1 col 2 rows */}
        <motion.div className="md:row-span-2 rounded-3xl overflow-hidden relative min-h-[300px] md:min-h-0" variants={cardVariants}>
          <Image
            src="/ankit.webp"
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            style={{ objectFit: "cover" }}
            alt="Ankit"
          />
        </motion.div>

        {/* Card 4: Toolkit */}
        <motion.div className="bg-[black] rounded-3xl p-6 flex items-center justify-center relative overflow-hidden min-h-[150px] md:min-h-0" variants={cardVariants}>
          <div className="grid grid-cols-2 gap-8 z-10">
            {[
              { src: "/about-3d/figma.png", alt: "Figma" },
              { src: "/about-3d/framer.png", alt: "Framer" },
              { src: "/about-3d/openai.png", alt: "ChatGPT" },
              { src: "/about-3d/gemini.png", alt: "Gemini" },
            ].map((tool) => (
              <div key={tool.alt} className="w-16 h-16 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <TransparentImage
                  src={tool.src}
                  alt={tool.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.5))' }}
                />
              </div>
            ))}
          </div>
          {/* Subtle glow effect behind icons */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 rounded-3xl pointer-events-none"></div>
        </motion.div>

        {/* Card 5: Stats */}
        <motion.div className="bg-[#cc0000] rounded-3xl p-6 flex flex-col items-center justify-center text-white min-h-[150px] md:min-h-0" variants={cardVariants}>
          <span className="text-xs font-semibold uppercase tracking-widest opacity-80">Experience</span>
          <span className="text-5xl font-black my-1" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>1.5+</span>
          <span className="text-xs font-semibold uppercase tracking-widest opacity-80">Years</span>
        </motion.div>

        {/* Card 6: Design Quote — spans 2 cols */}
        <motion.div
          className="md:col-span-2 bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-center text-black text-center min-h-[200px] md:min-h-0"
          variants={cardVariants}
        >
          <div className="text-4xl sm:text-6xl mb-2 sm:mb-4">&ldquo;</div>
          <blockquote className="text-base sm:text-xl font-medium leading-relaxed mb-3 sm:mb-4">
            Design is not just what it looks like and feels like. Design is how it works.
          </blockquote>
          <cite className="text-[#cc0000] font-semibold text-sm sm:text-base">— Steve Jobs</cite>
        </motion.div>

        {/* Card 7: Fun Fact */}
        <motion.div className="bg-[black] rounded-3xl p-6 flex flex-col justify-center min-h-[150px] md:min-h-0" variants={cardVariants}>
          <div className="text-3xl mb-2">☕</div>
          <div className="font-semibold text-[white] text-sm leading-snug">Powered by ice coffee and good music.</div>
        </motion.div>

      </motion.div>
    </section>
  );
}
