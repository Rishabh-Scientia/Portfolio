"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Download, Mail, Terminal, Cpu, Database, Brain } from "lucide-react";
import Image from "next/image";

const roles = [
  "GenAI Engineer",
  "AI Agent Developer",
  "Data Analyst",
  "Problem Solver",
  "Builder",
];

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Normalize coordinates (range -1 to 1) and scale down tilt strength
    const rotateX = -(y / (box.height / 2)) * 12; // tilt max 12deg
    const rotateY = (x / (box.width / 2)) * 12;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center py-20 lg:py-32 px-6 md:px-12 lg:px-24 xl:px-32 linear-grid">
      {/* Background soft ambient glows */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full max-w-7xl mx-auto">
        
        {/* Left side text contents */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* Tag Pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Introducing Rishabh Scientia</span>
          </motion.div>

          {/* Heading */}
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight font-display bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400"
            >
              Rishabh Yadav
            </motion.h1>

            {/* Subtitle Rotator */}
            <div className="h-[48px] md:h-[60px] flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentRoleIndex}
                  initial={{ y: 30, opacity: 0, filter: "blur(5px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -30, opacity: 0, filter: "blur(5px)" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="text-2xl md:text-4xl font-semibold font-display bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent"
                >
                  {roles[currentRoleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-muted-text max-w-xl leading-relaxed font-sans"
          >
            I build AI-powered systems, intelligent agents, data analytics solutions, and automation workflows that solve real-world problems.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-semibold text-sm hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-lg shadow-primary/20"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            <a
              href="/resume.pdf"
              download
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-panel text-white hover:bg-white/5 active:scale-95 transition-all text-sm font-semibold border-white/10 hover:border-primary/30 shadow-md"
            >
              <Download className="w-4 h-4 text-primary" />
              <span>Download Resume</span>
            </a>

            <button
              onClick={() => scrollToSection("contact")}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-panel text-white hover:bg-white/5 active:scale-95 transition-all text-sm font-semibold border-white/10 hover:border-secondary/30 shadow-md cursor-pointer"
            >
              <Mail className="w-4 h-4 text-secondary" />
              <span>Contact Me</span>
            </button>
          </motion.div>
        </div>

        {/* Right side Holographic Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center items-center relative py-10"
        >
          {/* Subtle neural net connections floating backgrounds */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
            <div className="w-64 h-64 border border-dashed border-primary/20 rounded-full animate-orbit-cw absolute" />
            <div className="w-80 h-80 border border-dashed border-secondary/15 rounded-full animate-orbit-ccw absolute" />
            
            {/* Tiny code snippet cards floating */}
            <div className="absolute top-4 left-0 glass-panel border-white/5 p-2 rounded text-[10px] font-mono text-accent opacity-55 animate-bounce shadow">
              {"const SIA = new Agent();"}
            </div>
            <div className="absolute bottom-6 right-0 glass-panel border-white/5 p-2 rounded text-[10px] font-mono text-primary opacity-55 animate-pulse shadow">
              {"db.query(NL_to_SQL);"}
            </div>
          </div>

          {/* Interactive Tilt Holographic Container */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            style={{
              transformStyle: "preserve-3d",
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
            className="relative w-80 h-[400px] rounded-2xl glass-panel-glow border-primary/30 p-4 flex flex-col justify-between cursor-pointer scanlines overflow-hidden shadow-2xl group"
          >
            {/* Interactive hover glow following cursor inside card */}
            <div className="absolute inset-0 bg-radial from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Header info */}
            <div className="flex justify-between items-center z-10">
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-primary">
                <Terminal className="w-3.5 h-3.5" />
                <span>RISHABH_SYS_V1.0</span>
              </div>
              <div className="h-2 w-2 rounded-full bg-accent animate-ping" />
            </div>

            {/* Profile Image Wrapper */}
            <div 
              style={{ transform: "translateZ(30px)" }}
              className="relative w-full h-64 rounded-xl border border-white/10 overflow-hidden bg-black/40 group-hover:border-primary/40 transition-colors"
            >
              <Image
                src="/profile.jpg"
                alt="Rishabh Yadav"
                fill
                priority
                className="object-cover object-top opacity-85 group-hover:opacity-100 transition-opacity duration-500 scale-105 group-hover:scale-100"
              />
              
              {/* Scanline overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80" />
              
              {/* Tech details card overlay */}
              <div className="absolute bottom-2 left-2 right-2 flex gap-1.5 flex-wrap z-10">
                <span className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[9px] font-mono text-white flex items-center gap-1">
                  <Brain className="w-2.5 h-2.5 text-primary" /> GenAI
                </span>
                <span className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[9px] font-mono text-white flex items-center gap-1">
                  <Cpu className="w-2.5 h-2.5 text-secondary" /> Agentic AI
                </span>
                <span className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[9px] font-mono text-white flex items-center gap-1">
                  <Database className="w-2.5 h-2.5 text-accent" /> Data
                </span>
              </div>
            </div>

            {/* Footer details */}
            <div 
              style={{ transform: "translateZ(15px)" }}
              className="flex flex-col gap-1.5 font-mono text-left z-10"
            >
              <div className="text-xs font-bold text-white tracking-wider flex justify-between">
                <span>NAME: RISHABH YADAV</span>
                <span className="text-primary text-[10px]">93.6% SEC_SR</span>
              </div>
              <div className="text-[10px] text-muted-text flex justify-between">
                <span>ORG: IIIT KOTA</span>
                <span>CGPA: 7.85</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-1 border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "78.5%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
