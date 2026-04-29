"use client";

import { motion } from "framer-motion";

export default function InternshipSpotlight() {
  const photos = [
    "/photo1.jpeg",
    "/photo2.jpeg",
    "/photo3.jpeg",
    "/team.jpeg",
  ];

  return (
    <section className="py-20 px-5 md:px-8" id="experience">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left: Target Red Card */}
          <motion.div
            className="bg-[black] rounded-3xl p-8 sm:p-10 flex flex-col items-start justify-center min-h-[300px] sm:min-h-[420px] relative overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-[white] uppercase tracking-[0.35em] text-sm font-semibold mb-4" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
              Internship
            </div>
            <h3 className="text-white font-black text-[clamp(2rem,8vw,4.5rem)] leading-[0.9] mb-8 sm:mb-10" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
              Panthar InfoHub
            </h3>

            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-[16px] sm:border-[20px] border-white/25 flex items-center justify-center">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/80" />
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
            <h2 className="font-black text-[clamp(1.8rem,5vw,2.5rem)] text-[#111]" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
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
                className="absolute -bottom-6 right-4 bg-white rounded-xl p-3 shadow-xl flex flex-col items-center gap-1 w-20 sm:w-24 z-10"
                initial={{ y: 50, rotate: 0 }}
                whileInView={{ y: 0, rotate: 10 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
              >
                <div className="w-4 h-3 bg-[#cc0000] rounded-sm mx-auto mb-1" />
                <div className="w-full h-1 bg-[#cc0000] rounded-full mb-1" />
                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-cover bg-center"
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
