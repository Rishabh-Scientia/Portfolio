"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, BookOpen, Users, Compass, Globe, ShoppingCart } from "lucide-react";

interface CounterProps {
  end: number;
  duration?: number;
}

function Counter({ end, duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6 md:px-12 lg:px-24 xl:px-32 relative">
      <div className="absolute top-1/3 left-1/4 -z-10 h-80 w-80 rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-2">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold font-display tracking-tight neon-text-secondary"
          >
            Achievements & Metrics
          </motion.h2>
          <p className="text-sm text-secondary uppercase font-mono tracking-widest">
            A Track Record of Teaching, Writing, & Engineering
          </p>
        </div>

        {/* Counters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mb-16">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-panel hover:glass-panel-glow hover:border-primary/20 rounded-2xl p-6 text-center border-white/5 bg-white/[0.01] transition-all relative overflow-hidden"
          >
            <div className="text-primary text-4xl md:text-5xl font-bold font-display tracking-tight mb-2">
              <Counter end={100} />+
            </div>
            <div className="text-xs font-mono text-muted-text uppercase tracking-widest">
              DSA & SQL Problems Solved
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel hover:glass-panel-glow hover:border-secondary/20 rounded-2xl p-6 text-center border-white/5 bg-white/[0.01] transition-all relative overflow-hidden"
          >
            <div className="text-secondary text-4xl md:text-5xl font-bold font-display tracking-tight mb-2">
              <Counter end={200} />+
            </div>
            <div className="text-xs font-mono text-muted-text uppercase tracking-widest">
              Students Trained in AI
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel hover:glass-panel-glow hover:border-accent/20 rounded-2xl p-6 text-center border-white/5 bg-white/[0.01] transition-all relative overflow-hidden"
          >
            <div className="text-accent text-4xl md:text-5xl font-bold font-display tracking-tight mb-2">
              2025
            </div>
            <div className="text-xs font-mono text-muted-text uppercase tracking-widest">
              Smart India Hackathon Qualifier
            </div>
          </motion.div>

        </div>

        {/* Extracurricular Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          
          {/* Card 1: Book */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel hover:glass-panel-glow hover:border-primary/20 rounded-2xl p-6 md:p-8 border-white/5 bg-white/[0.01] flex flex-col md:flex-row gap-6 text-left items-start relative overflow-hidden"
          >
            {/* Ambient Background Circle */}
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/5 blur-xl pointer-events-none" />
            
            <div className="p-3.5 rounded bg-primary/10 border border-primary/20 text-primary">
              <BookOpen className="w-6 h-6" />
            </div>

            <div className="space-y-4 flex-1">
              <div>
                <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">
                  Published Author
                </span>
                <h3 className="text-xl font-bold font-display text-white mt-1">
                  Intro to AI for Junior Class
                </h3>
              </div>
              <p className="text-xs text-muted-text leading-relaxed">
                An introductory handbook designed to teach fundamentals of artificial intelligence, machine learning structures, and neural reasoning basics to junior class students in plain English.
              </p>
              
              <a
                href="https://www.amazon.in/-/hi/RISHABH-YADAV-ebook/dp/B0CW16SJT3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-black font-semibold text-xs hover:brightness-110 transition-all cursor-pointer"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Buy Book on Amazon</span>
              </a>
            </div>
          </motion.div>

          {/* Card 2: AI Workshop */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel hover:glass-panel-glow hover:border-secondary/20 rounded-2xl p-6 md:p-8 border-white/5 bg-white/[0.01] flex flex-col md:flex-row gap-6 text-left items-start relative overflow-hidden"
          >
            {/* Ambient Background Circle */}
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-secondary/5 blur-xl pointer-events-none" />

            <div className="p-3.5 rounded bg-secondary/10 border border-secondary/20 text-secondary">
              <Users className="w-6 h-6" />
            </div>

            <div className="space-y-4 flex-1">
              <div>
                <span className="text-[10px] font-mono text-secondary font-bold uppercase tracking-wider">
                  Community Engagement
                </span>
                <h3 className="text-xl font-bold font-display text-white mt-1">
                  Conducted 20-Day AI Workshop
                </h3>
              </div>
              <p className="text-xs text-muted-text leading-relaxed font-sans">
                Successfully organized and trained 200+ school students at Oxford School Mainpuri. Governed core modules of prompts engineering, Python scripts, and agent logic.
              </p>
              
              <div className="grid grid-cols-2 gap-3 text-[10px] font-mono text-muted-text border-t border-white/5 pt-3">
                <div className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-secondary" />
                  <span>Mainpuri, India</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-secondary" />
                  <span>200+ Students</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
