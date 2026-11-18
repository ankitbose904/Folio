"use client";

import CylindricalWorkShowcase, { SHOWCASE_PROJECTS } from "./CylindricalWorkShowcase";

export default function ProjectsContent() {
  return (
    <div className="relative w-full min-h-screen bg-black">
      <CylindricalWorkShowcase
        projects={SHOWCASE_PROJECTS}
        sectionTitle="SELECTED WORKS"
        viewMode="carousel"
      />
    </div>
  );
}
