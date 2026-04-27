"use client";

import { motion } from "framer-motion";

const brands = [
  { id: 1, name: "CLOROX", color: "#0047b3" },
  { id: 2, name: "Campbell's", color: "#e31837" },
  { id: 3, name: "STARBUCKS", color: "#00704a" },
  { id: 4, name: "NERDS", color: "#e81c7f" },
  { id: 5, name: "KISS", color: "#333333" },
];

export default function Logofolio() {
  return (
    <section className="py-16 pb-32 bg-[#fdfdfd]">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-[0.85rem] font-bold tracking-[0.15em] text-[#999] uppercase">
            PARTNER BRANDS I WORKED WITH
          </h2>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-16">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              className="flex items-center justify-center cursor-default"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, opacity: 0.8 }}
            >
              <span
                className="font-black text-[2rem] tracking-tight"
                style={{ color: brand.color, fontFamily: 'var(--font-archivo), sans-serif' }}
              >
                {brand.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
