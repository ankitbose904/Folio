"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#111] text-white pt-20 md:pt-32 pb-8 px-5 md:px-8 rounded-tl-[40px] rounded-tr-[40px] mt-20">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-16 md:gap-32">

        {/* CTA */}
        <motion.div
          className="flex flex-col items-center text-center gap-6 sm:gap-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="font-bold tracking-tight max-w-3xl leading-[1.1] text-[clamp(2rem,7vw,5rem)]"
            style={{ letterSpacing: "-0.04em" }}
          >
            Let&apos;s talk about your next project.
          </h2>
          <a
            href="mailto:hello@ankit.com"
            className="bg-[#ff7b00] text-white text-base sm:text-xl font-semibold px-7 sm:px-10 py-3 sm:py-4 rounded-full flex items-center gap-2 hover:scale-105 hover:bg-[#ff8c1a] transition-all duration-300"
          >
            Get in touch <ArrowUpRight size={18} />
          </a>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-white/10 gap-4 md:gap-8">
          <div className="flex flex-wrap gap-4 sm:gap-8">
            {[
              // { label: "Twitter",   href: "https://twitter.com/ankitbose904" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/ankitbose904/" },
              { label: "Instagram", href: "https://www.instagram.com/_ankitbose_002/" },
              { label: "Behance", href: "https://www.behance.net/ankitbose8" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                suppressHydrationWarning
                className="font-medium opacity-80 hover:opacity-100 transition-opacity duration-300"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="opacity-60 text-sm" suppressHydrationWarning>
            © {new Date().getFullYear()} Ankit. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
