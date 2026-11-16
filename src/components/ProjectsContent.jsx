"use client";

import { Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";


const projects = [
  {
    id: 1,
    title: "Velvet Investment",
    category: "Fintech",
    color: "#d1d1d1",
    image: "/velvet.png",
    link: "https://www.behance.net/gallery/248370891/Velvet",
    description: "Velvet is a fintech investment app that simplifies wealth creation by offering curated investment options, smart portfolio management, and an intuitive user experience. It helps users invest in assets like mutual funds and other financial instruments with data-driven insights, making investing more accessible, transparent, and goal-oriented."
  },
  {
    id: 2,
    title: "Sweet & Sour",
    category: "E-Commerce",
    color: "#1a1a1a",
    image: "/sweet&sour.png",
    link: "https://www.sweetnsour.in/",
    description: "Sweet & Sour is an e-commerce platform offering a wide variety of homemade and traditional pickles, delivering authentic flavors with convenient online ordering and doorstep delivery."
  },
  {
    id: 3,
    title: "Fito Fitness & Calorie Tracker",
    category: "Fitness",
    color: "#b58d67",
    image: "/fito.png",
    link: "https://www.behance.net/gallery/248371425/Fito",
    description: "Fito is a fitness and calorie-tracking app that helps users monitor daily nutrition, track workouts, and stay on top of their health goals with personalized insights and easy-to-use features."
  },
  {
    id: 4,
    title: "Spotify on Apple Vision Pro",
    category: "AR/VR",
    color: "#ff5722",
    image: "/spotify-vision-pro.png",
    link: "https://www.behance.net/gallery/197518471/Spotify-design-on-Apple-Vision-Pro",
    description: "Immersive AR/VR interface design for Spotify on Apple Vision Pro."
  },
  {
    id: 5,
    title: "JP Interio",
    category: "Interior Design Company Website",
    color: "#e0e0e0",
    image: "/JP Interio Warm Interior Showcase.png",
    link: "https://jp-interio.vercel.app/",
    description: "JP Interio is an interior design company website that helps users find the perfect interior design for their homes by offering a wide selection, virtual try-on features, and personalized recommendations for a seamless shopping experience."
  },
  // {
  //   id: 6,
  //   title: "Vivid Motion",
  //   category: "Motion",
  //   color: "#ffcc00",
  //   image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
  //   link: "#",
  //   description: "Dynamic brand identity through fluid motion graphics and rhythmic storytelling."
  // }
];

export default function ProjectsContent() {
  return (
    <section className="min-h-screen pt-28 md:pt-32 pb-16 md:pb-20 px-5 md:px-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-20 text-center">
        <div
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="h-0.5 w-12 bg-[#cc0000]" />
          <Sparkles className="text-[#cc0000]" size={20} fill="currentColor" />
          <span className="text-[#cc0000] font-bold tracking-widest uppercase text-sm">Portfolio</span>
          <Sparkles className="text-[#cc0000]" size={20} fill="currentColor" />
          <div className="h-0.5 w-12 bg-[#cc0000]" />
        </div>

        <h1
          className="text-[clamp(2.5rem,10vw,6rem)] font-black text-white leading-none mb-8"
          style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
        >
          SELECTED <br /> <span className="text-[#cc0000]">WORKS</span>
        </h1>
      </div>

      {/* Filter Buttons */}
      

      {/* Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
      >
        {projects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div
                className="group"
              >
              <div className="relative aspect-video overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] cursor-pointer border border-white/5 group-hover:border-white/10 transition-all duration-500">
                <div
                  className="absolute inset-0 z-10 bg-black/0 group-hover:bg-black/60 transition-all duration-500"
                />

                {/* Image */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  quality={100}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={project.id <= 3}
                />

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 z-20 p-5 md:p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#cc0000] text-[#111] text-[10px] font-black uppercase mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-1.5 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
                    View Project <ArrowRight size={14} className="transition-transform group-hover:translate-x-2" />
                  </div>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ArrowRight className="-rotate-45 text-white" size={18} />
                </div>
              </div>

              {/* Bottom Info (Visible by default on mobile) */}
              <div className="mt-6 md:hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <p className="text-white/50 text-sm">{project.category}</p>
                  </div>
                  <ArrowRight className="text-[#cc0000]" size={20} />
                </div>
              </div>
              </div>
            </a>
          ))}
        </div>


    </section>
  );
}
