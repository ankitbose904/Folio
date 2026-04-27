"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#111] text-white pt-32 pb-8 px-8 rounded-tl-[40px] rounded-tr-[40px] mt-20">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-32">

        {/* CTA */}
        <motion.div
          className="flex flex-col items-center text-center gap-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="font-bold tracking-tight max-w-3xl leading-[1.1] text-[clamp(3rem,6vw,5rem)]"
            style={{ letterSpacing: "-0.04em" }}
          >
            Let&apos;s talk about your next project.
          </h2>
          <a
            href="mailto:hello@ankit.com"
            className="bg-[#ff7b00] text-white text-xl font-semibold px-10 py-4 rounded-full flex items-center gap-2 hover:scale-105 hover:bg-[#ff8c1a] transition-all duration-300"
          >
            Get in touch <ArrowUpRight size={20} />
          </a>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-white/10 gap-8">
          <div className="flex flex-wrap gap-8">
            {["Twitter", "LinkedIn", "Dribbble", "Behance"].map((link) => (
              <a key={link} href="#" className="font-medium opacity-80 hover:opacity-100 transition-opacity duration-300">
                {link}
              </a>
            ))}
          </div>
          <div className="opacity-60 text-sm">
            © {new Date().getFullYear()} Ankit. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
