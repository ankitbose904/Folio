"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";

function PhotoCard({ card }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="card-scene w-full aspect-[3/4] relative cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        whileHover={!isFlipped ? { y: -8 } : {}}
      >
        {/* Front */}
        <div className="card-front absolute inset-0 rounded-3xl overflow-hidden border border-gray-100">
          <Image
            src={card.image}
            alt={card.company}
            fill
            quality={100}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />

          <div className="absolute bottom-6 left-6 right-6">
            <div className="inline-block px-4 py-2 bg-black/80 backdrop-blur-md rounded-xl border border-white/10">
              <h3 className="text-white font-black text-xl" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>{card.company}</h3>
            </div>
          </div>

        </div>

        {/* Back */}
        <div className="card-back absolute inset-0 rounded-3xl bg-gray-50 p-8 flex flex-col justify-center gap-3 border border-gray-100">
          <div className="w-full h-1 rounded-full mb-2" style={{ background: card.accentColor }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: card.accentColor }}>{card.backTag}</span>
          <h3 className="text-black font-black text-2xl" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>{card.role}</h3>
          <p className="text-gray-600 text-sm leading-relaxed mt-2">{card.description}</p>

          <div className="mt-6 space-y-1">
            <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Timeline</div>
            <div className="text-black font-bold text-sm">{card.date}</div>
          </div>

          <div className="mt-2 space-y-1">
            <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Duration</div>
            <div className="text-black font-bold text-sm">{card.duration}</div>
          </div>

        </div>
      </motion.div>

      {/* Tap Hint Sticker */}
      {card.hasSticky && (
        <motion.div
          className="absolute -top-6 -left-6 w-24 h-24 bg-[#FFEA00] shadow-lg flex items-center justify-center p-2 z-20"
          style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%)', rotate: '-5deg' }}
          whileHover={{ rotate: '-10deg', scale: 1.1 }}
        >
          <span
            className="text-[#333] font-bold text-center leading-tight text-lg"
            style={{ fontFamily: 'var(--font-caveat), cursive' }}
          >
            tap to flip!
          </span>
          {/* Sticky note fold effect */}
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-black/5 clip-path-fold" />
        </motion.div>
      )}
    </div>
  );
}

export default function Experience() {
  const cards = [
    {
      tag: "Job · 2025",
      company: "UI/UX Designer",
      role: "UI/UX Design Intern",
      image: "/panther-logo.png",
      accentColor: "#cc0000",
      backTag: "UX Research",
      description: "Conducted extensive user research and usability testing to refine the digital advertising platform. Developed a comprehensive UI design system that improved designer-to-developer handoff speed by 40%.",
      date: "May – August 2024",
      duration: "4 months",
      hasSticky: false,
    },
    {
      tag: "Freelance · Ongoing",
      company: "UI/UX Lead",
      role: "Lead Product Designer",
      image: "/gdg-team.png",
      accentColor: "#111",
      backTag: "User Experience",
      description: "Designing end-to-end user journeys for high-growth startups. Specializing in conversion rate optimization (CRO) and accessibility-first interfaces that drive engagement and retention.",
      date: "2023 – Present",
      duration: "Ongoing",
      hasSticky: false,
    },
    {
      tag: "Community Lead · 2025",
      company: "MLSA",
      role: "Community Lead",
      image: "/MLSA.jpeg",
      accentColor: "#0078d4",
      backTag: "Visual UI",
      description: "Collaborated on the redesign of several e-commerce platforms. Focused on creating responsive, high-fidelity prototypes and motion-rich interfaces that tell a brand's story through interaction.",
      date: "May – August 2024",
      duration: "4 months",
      hasSticky: true,
    },
  ];

  return (
    <section className="py-24 px-8 bg-white overflow-hidden" id="experience">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-14 flex items-center justify-center gap-4 w-full">
          <div className="h-0.5 flex-[0_1_60px] bg-[#cc0000]" />
          <Sparkles className="text-[#cc0000]" size={24} fill="currentColor" />
          <motion.h2
            className="font-black tracking-wide text-[#e5e5e5] uppercase whitespace-nowrap text-[clamp(2.5rem,5vw,4.5rem)]"
            style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            EXPERIENCE
          </motion.h2>
          <Sparkles className="text-[#cc0000]" size={24} fill="currentColor" />
          <div className="h-0.5 flex-[0_1_60px] bg-[#cc0000]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.15 * index }}
            >
              <PhotoCard card={card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
