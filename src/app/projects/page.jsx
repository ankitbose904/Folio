import Navbar from "@/components/Navbar.jsx";
import ProjectsContent from "@/components/ProjectsContent.jsx";
import Footer from "@/components/Footer.jsx";

export const metadata = {
  title: "Projects | Designed by Ankit",
  description: "A showcase of all my selected projects in design and development.",
};

export default function ProjectsPage() {
  return (
    <main className="bg-[#111111] hero-bg relative">
      <Navbar />
      <ProjectsContent />
      <Footer />
    </main>
  );
}
