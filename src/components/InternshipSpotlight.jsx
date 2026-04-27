"use client";

import { motion } from "framer-motion";

export default function InternshipSpotlight() {
  const photos = [
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=400&auto=format&fit=crop",
  ];

  return (
    <section className="py-20 px-8" id="experience">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left: Target Red Card */}
          <motion.div
            className="bg-[#cc0000] rounded-3xl p-10 flex flex-col items-start justify-center min-h-[420px] relative overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-[#ffb3b3] uppercase tracking-[0.35em] text-sm font-semibold mb-4" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
              Internship @ Target
            </div>
            <h3 className="text-white font-black text-[4.5rem] leading-[0.85] mb-10" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
              Panthar
            </h3>

            <div className="w-40 h-40 rounded-full border-[20px] border-white/25 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/80" />
            </div>
          </motion.div>

          {/* Right: Content + Photo Scroll */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-black text-4xl text-[#111]" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
              Internship Spotlight
            </h2>
            <p className="text-[#555] leading-relaxed text-base">
             My internship at Panthar Infohub Pvt. Ltd. helped me grow as a UI/UX designer through hands-on work on real projects. I focused on improving user flows, designing intuitive interfaces, and collaborating with developers to build effective solutions.

This experience strengthened my skills in Figma, design systems, and problem-solving, while also helping me understand how to align user needs with business goals.
            </p>

            {/* Scrolling Photos */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <div className="flex gap-4 w-max animate-scroll-photos">
                  {[...photos, ...photos].map((src, i) => (
                    <div
                      key={i}
                      className="w-48 h-32 rounded-xl flex-shrink-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${src}')` }}
                    />
                  ))}
                </div>
              </div>

              {/* ID Badge */}
              <motion.div
                className="absolute -bottom-6 right-4 bg-white rounded-xl p-3 shadow-xl flex flex-col items-center gap-1 w-24 z-10"
                initial={{ y: 50, rotate: 0 }}
                whileInView={{ y: 0, rotate: 10 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
              >
                <div className="w-4 h-3 bg-[#cc0000] rounded-sm mx-auto mb-1" />
                <div className="w-full h-1 bg-[#cc0000] rounded-full mb-1" />
                <div
                  className="w-16 h-16 rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: "url('/ankit.webp')" }}
                />
                <span className="text-xs font-bold text-[#111]">Ankit</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
