"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar } from "lucide-react";

interface EducationItem {
  institution: string;
  degree: string;
  grade: string;
  duration: string;
  description: string;
  color: string;
}

const educationData: EducationItem[] = [
  {
    institution: "IIIT Kota",
    degree: "B.Tech in Electronics & Communication Engineering",
    grade: "CGPA: 7.85",
    duration: "2023 - 2027",
    description: "Specializing in hardware-software interfaces, core signal networks, advanced algorithmic systems, and custom database structures.",
    color: "from-primary/20 to-primary/5 border-primary/20",
  },
  {
    institution: "CBSE Senior Secondary",
    degree: "Class XII (Science & Mathematics Stream)",
    grade: "Score: 93.6%",
    duration: "2022",
    description: "Completed higher secondary education with a focus on physics, chemistry, mathematics, and programming fundamentals.",
    color: "from-secondary/20 to-secondary/5 border-secondary/20",
  },
  {
    institution: "CBSE Secondary",
    degree: "Class X",
    grade: "Score: 82.2%",
    duration: "2020",
    description: "Gained core fundamentals in general sciences, mathematics, and primary communication languages.",
    color: "from-accent/20 to-accent/5 border-accent/20",
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 md:px-12 lg:px-24 xl:px-32 relative">
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 -z-10 h-80 w-80 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-2">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold font-display tracking-tight neon-text-primary"
          >
            Education Timeline
          </motion.h2>
          <p className="text-sm text-primary uppercase font-mono tracking-widest">
            Academic Background & Achievements
          </p>
        </div>

        {/* Horizontal/Vertical Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`glass-panel rounded-2xl p-6 border bg-gradient-to-br ${edu.color} hover:glass-panel-glow hover:scale-102 hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between min-h-[280px] shadow-lg`}
            >
              <div className="space-y-4">
                {/* Duration and Icon */}
                <div className="flex justify-between items-center text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-muted-text">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{edu.duration}</span>
                  </div>
                  <div className="p-2 rounded bg-white/5 border border-white/5 text-slate-300">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                </div>

                {/* Institution & Degree */}
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold font-display text-white">
                    {edu.institution}
                  </h3>
                  <p className="text-sm text-primary font-semibold font-sans">
                    {edu.degree}
                  </p>
                </div>

                <p className="text-xs text-muted-text leading-relaxed">
                  {edu.description}
                </p>
              </div>

              {/* Score bar */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-muted-text">Score Indicator</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-accent" />
                  <span>{edu.grade}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
