import Navbar from "@/components/Navbar.jsx";
import Hero from "@/components/Hero.jsx";
import ProjectGrid from "@/components/ProjectGrid.jsx";
import InternshipSpotlight from "@/components/InternshipSpotlight.jsx";
import AboutSection from "@/components/AboutSection.jsx";
import Experience from "@/components/Experience.jsx";
import Testimonials from "@/components/Testimonials.jsx";
import Footer from "@/components/Footer.jsx";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProjectGrid />
      <InternshipSpotlight />
      <AboutSection />
      <Experience />
      <Testimonials />
      <Footer />
    </main>
  );
}
