"use client";

import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Cpu, Rocket, LineChart, Code } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const timelineData: TimelineItem[] = [
  {
    year: "2020",
    title: "Secondary Education",
    description: "Completed secondary school, laying a strong academic foundation. Score: 82.2%",
    icon: <BookOpen className="w-5 h-5" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    year: "2022",
    title: "Senior Secondary",
    description: "Specialized in Science & Mathematics with distinction. Score: 93.6%",
    icon: <GraduationCap className="w-5 h-5" />,
    color: "from-cyan-500 to-teal-500",
  },
  {
    year: "2023",
    title: "Joined IIIT Kota",
    description: "Admitted to Indian Institute of Information Technology Kota for B.Tech in Electronics & Communication Engineering.",
    icon: <Cpu className="w-5 h-5" />,
    color: "from-purple-500 to-indigo-500",
  },
  {
    year: "2025",
    title: "AI Workshops & Projects",
    description: "Conducted AI workshops training 200+ students, publishing an AI handbook, and building SIA agent prototype.",
    icon: <Rocket className="w-5 h-5" />,
    color: "from-indigo-500 to-pink-500",
  },
  {
    year: "2026",
    title: "Building AI Products",
    description: "Focusing on enterprise AI integrations, multi-agent frameworks, and data analytics dashboards.",
    icon: <LineChart className="w-5 h-5" />,
    color: "from-pink-500 to-orange-500",
  },
];

const passions = [
  { label: "Artificial Intelligence", icon: <Cpu className="w-4 h-4 text-primary" /> },
  { label: "Generative AI", icon: <Cpu className="w-4 h-4 text-secondary" /> },
  { label: "AI Agents", icon: <Rocket className="w-4 h-4 text-accent" /> },
  { label: "Data Analytics", icon: <LineChart className="w-4 h-4 text-primary" /> },
  { label: "Software Development", icon: <Code className="w-4 h-4 text-secondary" /> },
  { label: "Entrepreneurship", icon: <Rocket className="w-4 h-4 text-accent" /> },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-24 xl:px-32 relative overflow-hidden">
      {/* Glow shapes */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 h-96 w-96 rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Title */}
        <div className="text-center mb-16 space-y-2">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold font-display tracking-tight neon-text-secondary"
          >
            Who is Rishabh?
          </motion.h2>
          <p className="text-sm text-primary uppercase font-mono tracking-widest">
            A Story of Innovation & Intelligence
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-start">
          
          {/* Left Panel: Description & Passions */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel rounded-2xl p-8 space-y-6 border-white/5 relative overflow-hidden shadow-xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              
              <h3 className="text-2xl font-semibold font-display text-white">
                Undergrad at <span className="text-primary">IIIT Kota</span>
              </h3>
              <p className="text-muted-text leading-relaxed text-sm">
                As a B.Tech Electronics & Communication Engineering student at IIIT Kota, I bridge the gap between hardware architecture, advanced software frameworks, and cutting-edge GenAI implementations.
              </p>
              <p className="text-muted-text leading-relaxed text-sm">
                I thrive in builder-focused environments, designing automated tool chains, parsing structured databases, and deploying agentic systems that run continuously to drive tangible productivity gains.
              </p>
            </motion.div>

            {/* Passion Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-sm font-semibold font-mono uppercase tracking-wider text-muted-text">
                Areas of Focus
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {passions.map((passion, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl glass-panel border-white/5 hover:border-primary/20 hover:bg-white/5 transition-all group"
                  >
                    <div className="transition-transform group-hover:scale-110">
                      {passion.icon}
                    </div>
                    <span className="text-xs font-semibold text-white/80 group-hover:text-white transition-colors">
                      {passion.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Panel: Timeline */}
          <div className="lg:col-span-7 relative pl-8 md:pl-12">
            
            {/* Vertical timeline spine */}
            <div className="absolute left-2.5 md:left-4 top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary via-secondary to-accent opacity-30" />
            
            <div className="space-y-12">
              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex gap-6 md:gap-8 items-start group"
                >
                  
                  {/* Timeline Bullet node */}
                  <div className="absolute -left-8 md:-left-[42px] top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-dark-bg border-2 border-slate-700 group-hover:border-primary transition-colors duration-300 shadow shadow-black">
                    <div className="h-2 w-2 rounded-full bg-slate-500 group-hover:bg-primary transition-all duration-300 group-hover:scale-120 group-hover:shadow-[0_0_10px_#00E5FF]" />
                  </div>

                  {/* Date Badge */}
                  <div className="flex-shrink-0 text-left min-w-[70px]">
                    <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono font-bold text-primary group-hover:text-accent group-hover:border-accent/40 transition-colors">
                      {item.year}
                    </span>
                  </div>

                  {/* Milestone Card */}
                  <div className="glass-panel border-white/5 group-hover:border-secondary/20 rounded-xl p-5 md:p-6 flex-1 text-left relative overflow-hidden transition-all duration-300 group-hover:bg-white/[0.04]">
                    {/* Corner gradient tint */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/0 to-white/[0.02] -z-10" />

                    <div className="flex gap-4 items-center mb-2">
                      <div className="p-2 rounded bg-white/5 text-secondary border border-white/5 group-hover:text-primary transition-colors">
                        {item.icon}
                      </div>
                      <h4 className="text-base md:text-lg font-bold text-white group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs md:text-sm text-muted-text leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
