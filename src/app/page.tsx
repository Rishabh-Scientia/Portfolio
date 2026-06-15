"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Terminal, Brain, Menu, X, ArrowUp } from "lucide-react";
import Hero from "@/components/hero";
import About from "@/components/about";
import SkillsGalaxy from "@/components/skills-galaxy";
import Projects from "@/components/projects";
import AiPlayground from "@/components/ai-playground";
import Achievements from "@/components/achievements";
import Education from "@/components/education";
import Contact from "@/components/contact";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Framer Motion scroll progress indicator calculation
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative selection:bg-primary/30 selection:text-white">
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-secondary to-accent z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Premium Header Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-dark-bg/40 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo brand */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 font-mono text-sm tracking-widest cursor-pointer group"
          >
            <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform duration-300">
              <Brain className="w-3.5 h-3.5 text-black animate-pulse" />
            </div>
            <span className="font-bold text-white group-hover:text-primary transition-colors">
              RISHABH <span className="text-secondary">SCIENTIA</span>
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: "About", id: "about" },
              { label: "Skills", id: "skills" },
              { label: "Projects", id: "projects" },
              { label: "Playground", id: "playground" },
              { label: "Credentials", id: "education" },
              { label: "Contact", id: "contact" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold text-muted-text hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile hamburger menu toggler */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-muted-text hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-30 bg-dark-bg/95 border-b border-white/5 backdrop-blur-lg px-6 py-8 flex flex-col gap-4 text-left md:hidden shadow-2xl"
          >
            {[
              { label: "About Rishabh", id: "about" },
              { label: "Skill Galaxy", id: "skills" },
              { label: "Projects Grid", id: "projects" },
              { label: "AI Playground", id: "playground" },
              { label: "Education Details", id: "education" },
              { label: "Contact Me", id: "contact" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="w-full py-2.5 px-4 rounded-xl text-sm font-mono text-left font-bold text-muted-text hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Layout Sections */}
      <main className="flex-grow pt-16">
        <Hero />
        <About />
        <SkillsGalaxy />
        <Projects />
        <Achievements />
        <AiPlayground />
        <Education />
        <Contact />
      </main>

      {/* Premium Footer Bar */}
      <footer className="py-12 px-6 md:px-12 border-t border-white/5 bg-black/60 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
            <span className="font-mono text-xs text-white font-bold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-primary" /> RISHABH YADAV
            </span>
            <span className="text-[10px] text-muted-text">
              Building intelligent agentics, database workflows, and generative structures.
            </span>
          </div>

          <div className="text-[10px] font-mono text-muted-text">
            © {new Date().getFullYear()} Rishabh Scientia. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full glass-panel-glow border-accent/20 text-accent hover:bg-accent/10 cursor-pointer active:scale-90 transition-all shadow-xl shadow-accent/10"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
