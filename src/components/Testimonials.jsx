"use client";

import { motion } from "framer-motion";
import { UniqueTestimonial } from "@/components/ui/unique-testimonial";
import { Sparkles } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-24 px-8 bg-[#f8f8f8] overflow-hidden relative">
      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <div className="mb-20 flex flex-col items-center text-center">
          <motion.div 
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="h-px w-12 bg-[#ff3b30]" />
            <Sparkles className="text-[#ff3b30]" size={20} fill="currentColor" />
            <span className="text-[#ff3b30] font-black tracking-[0.2em] uppercase text-xs">Kind Words</span>
            <Sparkles className="text-[#ff3b30]" size={20} fill="currentColor" />
            <div className="h-px w-12 bg-[#ff3b30]" />
          </motion.div>
          <motion.h2 
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-black text-[#111] uppercase leading-none mb-4"
            style={{ fontFamily: 'var(--font-archivo), sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            TRUSTED BY <span className="text-[#ff3b30]">EXPERTS</span>
          </motion.h2>
          <p className="text-[#666] font-bold uppercase tracking-[0.3em] text-[10px] mt-4 select-none">Select a profile to view their testimony</p>
        </div>

        <div className="flex justify-center">
          <UniqueTestimonial />
        </div>
      </div>
    </section>
  );
}
