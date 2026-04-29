"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Spotify on Apple Vision Pro",
    category: "AR/VR Experience",
    color: "#cc0000",
    image: "/spotify-vision-pro.png",
    link: "https://www.behance.net/gallery/197518471/Spotify-design-on-Apple-Vision-Pro ",
  },
  {
    id: 2,
    title: "Frame Finder",
    category: "Eyeware E-Commerce ",
    color: "#e0e0e0",
    image: "/frame.png",
    link: "https://www.behance.net/gallery/248371029/Frame-Finder",
  },
];

export default function ProjectGrid() {
  return (
    <section id="work" className="py-20 px-5 md:px-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-12 md:mb-16 flex items-center justify-center gap-2 md:gap-4 w-full overflow-hidden">
        <div className="h-0.5 flex-[0_1_20px] md:flex-[0_1_60px] bg-[#cc0000] shrink-0" />
        <Sparkles className="text-[#cc0000] shrink-0" size={20} fill="currentColor" />
        <h2
          className="font-black tracking-wide text-[#e5e5e5] uppercase text-[clamp(1.8rem,5.5vw,4.5rem)] text-center"
          style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
        >
          FEATURED PROJECTS
        </h2>
        <Sparkles className="text-[#cc0000] shrink-0" size={20} fill="currentColor" />
        <div className="h-0.5 flex-[0_1_20px] md:flex-[0_1_60px] bg-[#cc0000] shrink-0" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="flex flex-col"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10 }}
          >
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex flex-col no-underline">
              <div className="flex flex-col gap-5 cursor-pointer">
                <div
                  className="aspect-[4/3] w-full rounded-[20px] overflow-hidden relative flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.05)]"
                  style={{
                    backgroundColor: project.color,
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    quality={100}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>
                <div className="flex flex-col gap-1 px-2">
                  <h3 className="text-[1.4rem] font-extrabold text-[#111] tracking-tight">{project.title}</h3>
                  <p className="text-[#777] text-[1.05rem] font-medium">{project.category}</p>
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-20 flex justify-center">
        <Link href="/projects">
          <motion.button
            className="group flex items-center gap-3 bg-[#111] text-white font-black uppercase tracking-widest px-10 py-5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.35)] transition-all duration-300 text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Projects
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
          </motion.button>
        </Link>
      </div>
    </section>
  );
}
