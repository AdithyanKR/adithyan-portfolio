import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Clients from "@/components/Clients";

export default function Home() {
  return (
    <main className="relative bg-[#121212] min-h-screen text-white font-sans selection:bg-white/20">
      <CustomCursor />
      <Navbar />
      <div id="myself" className="relative">
        <ScrollyCanvas />
        <Overlay />
      </div>
      <About />
      <Projects />
      <Clients />

      {/* Contact Section */}
      <footer id="contact" className="relative py-32 bg-[#121212] text-center z-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8">Let's create <br /> something <span className="text-white/30 italic">legendary.</span></h2>
          <a href="mailto:hello@adityan.com" className="text-xl md:text-3xl font-light underline underline-offset-8 hover:text-white/70 transition-colors">
            hello@adityan.com
          </a>
          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-sm font-mono tracking-widest uppercase">
            <p>&copy; 2026 Adityan K</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white">Instagram</a>
              <a href="#" className="hover:text-white">Behance</a>
              <a href="#" className="hover:text-white">Vimeo</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
