"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";


const projects = [
  {
    id: 1,
    title: "Aura Skin",
    category: "Branding",
    color: "#d1d1d1",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop",
    link: "#",
    description: "Minimalist branding for a premium skincare line focusing on natural ingredients and elegant aesthetics."
  },
  {
    id: 2,
    title: "Velox Finance",
    category: "UI/UX",
    color: "#1a1a1a",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    link: "#",
    description: "A high-performance financial dashboard featuring glassmorphism elements and intuitive data visualization."
  },
  {
    id: 3,
    title: "Terra Coffee",
    category: "Packaging Design",
    color: "#b58d67",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1200&auto=format&fit=crop",
    link: "#",
    description: "Eco-friendly packaging solution for a sustainable coffee roastery, using recycled materials and earthy tones."
  },
  {
    id: 4,
    title: "Capsule",
    category: "Packaging Design",
    color: "#ff5722",
    image: "https://images.unsplash.com/photo-1628191081698-1411da94efb7?q=80&w=600&auto=format&fit=crop",
    link: "#",
    description: "Bold and vibrant packaging design for a modern supplement brand."
  },
  {
    id: 5,
    title: "Shelf Life",
    category: "Packaging Design",
    color: "#e0e0e0",
    image: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?q=80&w=600&auto=format&fit=crop",
    link: "#",
    description: "Minimalist shelf-ready packaging for high-end organic groceries."
  },
  {
    id: 6,
    title: "Vivid Motion",
    category: "Motion",
    color: "#ffcc00",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    link: "#",
    description: "Dynamic brand identity through fluid motion graphics and rhythmic storytelling."
  }
];

export default function ProjectsContent() {
  return (
    <section className="min-h-screen py-32 px-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-20 text-center">
        <motion.div
          className="flex items-center justify-center gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-0.5 w-12 bg-[#ff3b30]" />
          <Sparkles className="text-[#ff3b30]" size={20} fill="currentColor" />
          <span className="text-[#ff3b30] font-bold tracking-widest uppercase text-sm">Portfolio</span>
          <Sparkles className="text-[#ff3b30]" size={20} fill="currentColor" />
          <div className="h-0.5 w-12 bg-[#ff3b30]" />
        </motion.div>

        <motion.h1
          className="text-[clamp(3rem,8vw,6rem)] font-black text-white leading-none mb-8"
          style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          SELECTED <br /> <span className="text-[#ff3b30]">WORKS</span>
        </motion.h1>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
      >
        <AnimatePresence mode="popLayout">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#1a1a1a] cursor-pointer">
                <motion.div
                  className="absolute inset-0 z-10 bg-black/0 group-hover:bg-black/40 transition-colors duration-500"
                />

                {/* Image */}
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 z-20 p-8 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#ff3b30] text-[#111] text-[10px] font-black uppercase mb-4">
                    {project.category}
                  </span>
                  <h3 className="text-3xl font-black text-white mb-2 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-6 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider">
                    View Project <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
                  </div>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="-rotate-45 text-white" size={20} />
                </div>
              </div>

              {/* Bottom Info (Visible by default on mobile) */}
              <div className="mt-6 md:hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <p className="text-white/50 text-sm">{project.category}</p>
                  </div>
                  <ArrowRight className="text-[#ff3b30]" size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>


    </section>
  );
}
