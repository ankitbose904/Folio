"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";

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
    <section className="py-20 px-8" id="about">
      {/* Header */}
      <div className="mb-16 flex items-center justify-center gap-4 w-full max-w-[1200px] mx-auto">
        <div className="h-0.5 flex-[0_1_60px] bg-[#cc0000]" />
        <Sparkles className="text-[#cc0000]" size={24} fill="currentColor" />
        <motion.h2
          className="font-black tracking-wide text-[#e5e5e5] uppercase whitespace-nowrap text-[clamp(2.5rem,5vw,4.5rem)]"
          style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          ABOUT ME
        </motion.h2>
        <Sparkles className="text-[#cc0000]" size={24} fill="currentColor" />
        <div className="h-0.5 flex-[0_1_60px] bg-[#cc0000]" />
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4 max-w-[1200px] mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Card 1: Bio — spans 2 cols 2 rows */}
        <motion.div
          className="md:col-span-2 md:row-span-2 bg-[black] text-white rounded-3xl p-8 flex flex-col justify-end"
          variants={cardVariants}
        >
          <h3 className="font-black text-3xl mb-3" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>Hi, I&apos;m Ankit.</h3>
          <p className="text-white/70 leading-relaxed text-sm">
            I am a product designer obsessed with bridging the gap between aesthetics and function.
            I love diving into complex problems and coming out the other side with elegant, easy-to-use digital experiences.
          </p>
        </motion.div>

        {/* Card 2: Location */}
        <motion.div className="bg-[#f5f5f5] rounded-3xl p-6 flex flex-col justify-center" variants={cardVariants}>
          <div className="text-2xl mb-2">📍</div>
          <div className="text-xs text-[#888] font-semibold uppercase tracking-wider">Based in</div>
          <div className="font-bold text-[#111] mt-1 text-sm">Jhansi, Uttar Pradesh</div>
        </motion.div>

        {/* Card 3: Photo — spans 1 col 2 rows */}
        <motion.div className="md:row-span-2 rounded-3xl overflow-hidden relative" variants={cardVariants}>
          <Image
            src="/ankit.webp"
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            style={{ objectFit: "cover" }}
            alt="Ankit"
          />
        </motion.div>

        {/* Card 4: Toolkit */}
        <motion.div className="bg-[black] rounded-3xl p-6 flex items-center justify-center" variants={cardVariants}>
          <div className="grid grid-cols-2 gap-8">
            {[
              { src: "https://cdn.simpleicons.org/figma", alt: "Figma" },
              { src: "https://cdn.simpleicons.org/framer", alt: "Framer" },
              { src: "https://cdn.simpleicons.org/chatgpt", alt: "ChatGPT" },
              { src: "https://cdn.simpleicons.org/googlegemini/8E75B2", alt: "Gemini" },
            ].map((tool) => (
              <div key={tool.alt} className="w-12 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                <img src={tool.src} alt={tool.alt} className="w-10 h-10 object-contain" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card 5: Stats */}
        <motion.div className="bg-[#cc0000] rounded-3xl p-6 flex flex-col items-center justify-center text-white" variants={cardVariants}>
          <span className="text-xs font-semibold uppercase tracking-widest opacity-80">Experience</span>
          <span className="text-5xl font-black my-1" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>1.5+</span>
          <span className="text-xs font-semibold uppercase tracking-widest opacity-80">Years</span>
        </motion.div>

        {/* Card 6: Design Quote — spans 2 cols */}
        <motion.div
          className="md:col-span-2 bg-gradient-to-br from-[white] to-[white] rounded-3xl p-8 flex flex-col justify-center text-black text-center"
          variants={cardVariants}
        >
          <div className="text-6xl mb-4">"</div>
          <blockquote className="text-xl font-medium leading-relaxed mb-4">
            Design is not just what it looks like and feels like. Design is how it works.
          </blockquote>
          <cite className="text-[#cc0000] font-semibold">— Steve Jobs</cite>
        </motion.div>

        {/* Card 7: Fun Fact */}
        <motion.div className="bg-[black] rounded-3xl p-6 flex flex-col justify-center" variants={cardVariants}>
          <div className="text-3xl mb-2">☕</div>
          <div className="font-semibold text-[white] text-sm leading-snug">Powered by iced coffee and good music.</div>
        </motion.div>

      </motion.div>
    </section>
  );
}
