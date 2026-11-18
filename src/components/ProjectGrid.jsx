"use client";

import CylindricalWorkShowcase from "./CylindricalWorkShowcase";

export default function ProjectGrid() {
  return (
    <section
      id="work"
      aria-label="Work"
      className="relative w-full overflow-hidden bg-black"
      style={{
        background: "#000000",
      }}
    >
      <CylindricalWorkShowcase sectionLabel="SELECTED WORKS" />
    </section>
  );
}
