"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";

const tracks = [
  { id: 1, title: "Your Song 1", artist: "Artist Name", src: "/music/song1.mp3" },
  { id: 2, title: "Your Song 2", artist: "Artist Name", src: "/music/song2.mp3" },
  { id: 3, title: "Your Song 3", artist: "Artist Name", src: "/music/song3.mp3" },
  { id: 4, title: "Your Song 4", artist: "Artist Name", src: "/music/song4.mp3" },
];

export default function AboutSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const playTrack = (idx) => { setCurrentIdx(idx); setIsPlaying(true); };
  const togglePlay = () => setIsPlaying((p) => !p);
  const prevTrack = () => playTrack((currentIdx - 1 + tracks.length) % tracks.length);
  const nextTrack = () => playTrack((currentIdx + 1) % tracks.length);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const src = tracks[currentIdx].src;
    const isPlaceholder = ["song1", "song2", "song3", "song4"].some(s => src.includes(s));
    if (!isPlaceholder) {
      audio.src = src;
      isPlaying ? audio.play().catch(() => setIsPlaying(false)) : audio.pause();
    } else {
      audio.pause();
      if (isPlaying) setIsPlaying(false);
    }
  }, [currentIdx, isPlaying]);

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
        <div className="h-0.5 flex-[0_1_60px] bg-[#ff3b30]" />
        <Sparkles className="text-[#ff3b30]" size={24} fill="currentColor" />
        <motion.h2
          className="font-black tracking-wide text-[#e5e5e5] uppercase whitespace-nowrap text-[clamp(2.5rem,5vw,4.5rem)]"
          style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          ABOUT ME
        </motion.h2>
        <Sparkles className="text-[#ff3b30]" size={24} fill="currentColor" />
        <div className="h-0.5 flex-[0_1_60px] bg-[#ff3b30]" />
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
          className="md:col-span-2 md:row-span-2 bg-[#111] text-white rounded-3xl p-8 flex flex-col justify-end"
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
            src="https://media.licdn.com/dms/image/v2/D5603AQHnA1qHFepktg/profile-displayphoto-crop_800_800/B56Z2xAsAnHkAI-/0/1776791245051?e=1778716800&v=beta&t=c7sr79VvcF6YipkrhztuV0csXDFASvoeDFpJZDRWvzk"
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            style={{ objectFit: "cover" }}
            alt="Ankit"
          />
        </motion.div>

        {/* Card 4: Toolkit */}
        <motion.div className="bg-[#1a1a1a] rounded-3xl p-6 flex items-center justify-center" variants={cardVariants}>
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

        {/* Card 6: Music Player — spans 2 cols */}
        <motion.div
          className="md:col-span-2 bg-[#111] rounded-3xl p-6 flex gap-6 text-white"
          variants={cardVariants}
        >
          <audio ref={audioRef} onEnded={nextTrack} />
          {/* Left */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-[#222] flex items-center justify-center text-2xl flex-shrink-0">🎵</div>
            <div className="flex flex-col">
              <span className="text-[0.65rem] text-white/50 uppercase tracking-widest font-semibold">On Repeat</span>
              <span className="font-bold text-sm">{tracks[currentIdx].title}</span>
              <span className="text-xs text-white/60">{tracks[currentIdx].artist}</span>
            </div>
          </div>
          {/* Right */}
          <div className="flex-1 flex flex-col justify-between">
            <ul className="flex flex-col gap-1">
              {tracks.map((track, idx) => (
                <li
                  key={track.id}
                  className={`flex items-center gap-3 px-2 py-1 rounded-lg cursor-pointer text-xs transition-colors ${idx === currentIdx ? "bg-white/10 text-white" : "text-white/50 hover:text-white/80"}`}
                  onClick={() => playTrack(idx)}
                >
                  <span className="w-4 text-center">{isPlaying && idx === currentIdx ? "▶" : idx + 1}</span>
                  <span className="flex-1 truncate font-medium">{track.title}</span>
                  <span className="truncate">{track.artist}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3 mt-2">
              <button onClick={prevTrack} className="text-white/60 hover:text-white transition-colors">⏮</button>
              <button
                onClick={togglePlay}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${isPlaying ? "bg-white text-black" : "bg-white/20 text-white"}`}
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
              <button onClick={nextTrack} className="text-white/60 hover:text-white transition-colors">⏭</button>
              <span className="ml-auto text-white/30 text-xs">♫</span>
            </div>
          </div>
        </motion.div>

        {/* Card 7: Fun Fact */}
        <motion.div className="bg-[#fff68f] rounded-3xl p-6 flex flex-col justify-center" variants={cardVariants}>
          <div className="text-3xl mb-2">☕</div>
          <div className="font-semibold text-[#111] text-sm leading-snug">Powered by iced coffee and good music.</div>
        </motion.div>

      </motion.div>
    </section>
  );
}
