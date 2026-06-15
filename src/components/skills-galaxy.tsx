"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Cpu, Database, Layout, Sparkles, Terminal, Settings } from "lucide-react";

interface Skill {
  name: string;
  category: "ai" | "data" | "lang" | "db" | "dev" | "tools";
  level: number; // 0-100
  desc: string;
}

const skillsData: Skill[] = [
  // AI & Agentic AI
  { name: "LangChain", category: "ai", level: 90, desc: "Building complex chains and integrations with multiple LLMs." },
  { name: "LangGraph", category: "ai", level: 85, desc: "Designing stateful multi-agent workflows and feedback loops." },
  { name: "n8n", category: "ai", level: 92, desc: "Creating autonomous automation workflows and AI integrations." },
  { name: "LangSmith", category: "ai", level: 80, desc: "Debugging, testing, and evaluating agentic architectures." },
  { name: "Gemini", category: "ai", level: 95, desc: "Leveraging Google's multimodal models for generation and reasoning." },
  { name: "LLMs", category: "ai", level: 90, desc: "Prompt optimization, agentic reasoning, and model tuning." },
  { name: "RAG", category: "ai", level: 88, desc: "Designing retrieval networks with Vector Databases & chunking." },
  { name: "Prompt Engineering", category: "ai", level: 95, desc: "Crafting structured system prompts and chain-of-thought instructions." },
  
  // Data Analytics
  { name: "SQL", category: "data", level: 92, desc: "Analyzing tabular data, CTEs, subqueries, and execution tuning." },
  { name: "Power BI", category: "data", level: 85, desc: "Creating visual survey dashboards and complex DAX measures." },
  { name: "Excel", category: "data", level: 88, desc: "Advanced reporting, pivot tools, VLOOKUP/XLOOKUP, and macro logic." },
  { name: "Pandas", category: "data", level: 90, desc: "Cleaning datasets, grouping operations, and ETL processes in Python." },
  { name: "NumPy", category: "data", level: 82, desc: "Mathematical array logic, scientific computing, and indexing." },
  { name: "Matplotlib", category: "data", level: 80, desc: "Plotting line graphs, bar charts, and data distributions." },
  { name: "Plotly", category: "data", level: 85, desc: "Creating responsive, interactive data visual charts." },
  
  // Programming Languages
  { name: "Python", category: "lang", level: 95, desc: "Primary language for GenAI agent development, databases, and scripts." },
  { name: "C", category: "lang", level: 75, desc: "Low-level system logic, pointer mechanics, and hardware coding." },
  { name: "C++", category: "lang", level: 80, desc: "Object-oriented program designs, memory structures, and DSA." },
  
  // Development
  { name: "FastAPI", category: "dev", level: 88, desc: "Deploying production APIs with fast serialization and Pydantic validation." },
  { name: "Git", category: "dev", level: 88, desc: "Version branch controls, merging, conflict resolves, and staging." },
  { name: "GitHub", category: "dev", level: 90, desc: "Collaborations, actions CI/CD, and open source repository hosting." },
  { name: "DSA", category: "dev", level: 85, desc: "Data Structures & Algorithms. Solving complex engineering problems." },
  { name: "OOP", category: "dev", level: 88, desc: "Object-Oriented Programming principles for modular design." },

  // Databases
  { name: "PostgreSQL", category: "db", level: 85, desc: "Relational database operations, user schemas, and indexing optimization." },
  { name: "SQL Server", category: "db", level: 88, desc: "Enterprise database storage, T-SQL scripting, and database configuration." },
  { name: "ETL", category: "db", level: 85, desc: "Extract, Transform, Load workflows to pipeline data into warehouses." },
  { name: "Normalization", category: "db", level: 90, desc: "Refining logical schemas to third normal form, reducing redundancies." },

  // Tools
  { name: "VS Code", category: "tools", level: 95, desc: "Primary coding environment with customized system extensions." },
  { name: "Jupyter", category: "tools", level: 90, desc: "Notebook research for data cleaning, visualization, and exploratory scripts." },
  { name: "Google Colab", category: "tools", level: 88, desc: "Cloud GPU environments for fine-tuning models and fast prototyping." },
  { name: "Streamlit", category: "tools", level: 92, desc: "Building fast web GUI applications for AI tools and SQL models." },
  { name: "Kaggle", category: "tools", level: 80, desc: "Competing in data science tasks and analyzing community notebooks." },
  { name: "Canva", category: "tools", level: 85, desc: "Creative design for presentations, banners, and digital imagery." },
];

const categoryMeta = {
  all: { label: "All Skills", icon: <Sparkles className="w-4 h-4" /> },
  ai: { label: "AI & Agents", icon: <Brain className="w-4 h-4 text-primary" /> },
  data: { label: "Data Analytics", icon: <Database className="w-4 h-4 text-accent" /> },
  lang: { label: "Languages", icon: <Terminal className="w-4 h-4 text-secondary" /> },
  db: { label: "Database", icon: <Settings className="w-4 h-4 text-primary" /> },
  dev: { label: "Development", icon: <Cpu className="w-4 h-4 text-accent" /> },
  tools: { label: "Tools", icon: <Layout className="w-4 h-4 text-secondary" /> },
};

export default function SkillsGalaxy() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<keyof typeof categoryMeta>("all");
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  // Filters the skill dataset based on the active selection category
  const filteredSkills = skillsData.filter(
    (s) => activeCategory === "all" || s.category === activeCategory
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let radius = 180;
    
    // Tag class inside canvas closure to manage calculations
    class Tag {
      name: string;
      x: number = 0;
      y: number = 0;
      z: number = 0;
      cx: number = 0;
      cy: number = 0;
      scale: number = 0;
      alpha: number = 0;
      size: number;
      skill: Skill;

      constructor(skill: Skill, theta: number, phi: number) {
        this.skill = skill;
        this.name = skill.name;
        // Map 2D angles to 3D sphere positions
        this.x = radius * Math.sin(theta) * Math.cos(phi);
        this.y = radius * Math.sin(theta) * Math.sin(phi);
        this.z = radius * Math.cos(theta);
        
        // Random size offsets
        this.size = Math.random() * 2 + 12;
      }

      // Rotate point using 3D transformation matrices
      rotate(angleX: number, angleY: number) {
        // Rotate X
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const y1 = this.y * cosX - this.z * sinX;
        const z1 = this.z * cosX + this.y * sinX;

        // Rotate Y
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const x2 = this.x * cosY - z1 * sinY;
        const z2 = z1 * cosY + this.x * sinY;

        this.x = x2;
        this.y = y1;
        this.z = z2;

        // Project 3D onto 2D viewport
        const focalLength = 320;
        this.scale = focalLength / (focalLength + this.z);
        this.alpha = (this.scale - 0.5) * 1.5; // Transparency based on depth
        this.alpha = Math.min(Math.max(this.alpha, 0.1), 1.0);

        this.cx = canvas!.width / 2 + this.x * this.scale;
        this.cy = canvas!.height / 2 + this.y * this.scale;
      }

      draw() {
        if (!ctx) return;
        
        // Determine theme colors based on skill category
        let color = "rgba(255, 255, 255, "; // fallback
        if (this.skill.category === "ai") color = "rgba(0, 229, 255, "; // Primary Cyan
        else if (this.skill.category === "data") color = "rgba(0, 255, 178, "; // Accent Green
        else if (this.skill.category === "lang") color = "rgba(123, 97, 255, "; // Secondary Purple
        else if (this.skill.category === "db") color = "rgba(0, 229, 255, ";
        else if (this.skill.category === "dev") color = "rgba(0, 255, 178, ";
        else color = "rgba(123, 97, 255, ";

        ctx.save();
        ctx.font = `bold ${Math.round(this.size * this.scale)}px var(--font-display), sans-serif`;
        ctx.fillStyle = `${color}${this.alpha})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        // Glow effect for items at the foreground (close Z index)
        if (this.z < 0) {
          ctx.shadowColor = this.skill.category === "ai" ? "#00E5FF" : this.skill.category === "data" ? "#00FFB2" : "#7B61FF";
          ctx.shadowBlur = 8 * this.scale;
        }

        ctx.fillText(this.name, this.cx, this.cy);
        ctx.restore();
      }
    }

    let tags: Tag[] = [];
    const buildTags = () => {
      tags = [];
      const count = filteredSkills.length;
      for (let i = 0; i < count; i++) {
        // Distribute points evenly using Fibonacci Sphere algorithm
        const theta = Math.acos(-1 + (2 * i) / count);
        const phi = Math.sqrt(count * Math.PI) * theta;
        tags.push(new Tag(filteredSkills[i], theta, phi));
      }
    };

    buildTags();

    let angleX = 0.003;
    let angleY = 0.003;
    let targetAngleX = 0.003;
    let targetAngleY = 0.003;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left - rect.width / 2;
      mouseY = e.clientY - rect.top - rect.height / 2;
      
      // Control rotation speeds based on mouse offsets
      targetAngleY = (mouseX / rect.width) * 0.03;
      targetAngleX = -(mouseY / rect.height) * 0.03;

      // Hover check calculations: find nearest item to cursor
      let closestTag: Tag | null = null;
      let minDistance = 35; // Hover range
      
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      tags.forEach((tag) => {
        const dx = tag.cx - cx;
        const dy = tag.cy - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Hover only items on the front side (Z index < 0)
        if (dist < minDistance && tag.z < 0) {
          minDistance = dist;
          closestTag = tag;
        }
      });

      if (closestTag) {
        setHoveredSkill((closestTag as Tag).skill);
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    const resizeCanvas = () => {
      canvas.width = Math.min(window.innerWidth - 32, 500);
      canvas.height = Math.min(window.innerWidth - 32, 500);
      radius = canvas.width / 2.6;
      buildTags();
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const loop = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Damp/lerp rotation speeds
      angleX += (targetAngleX - angleX) * 0.08;
      angleY += (targetAngleY - angleY) * 0.08;

      // Rotate and draw tags sorting by Z depth (draw background items first)
      tags.forEach((t) => t.rotate(angleX, angleY));
      const sortedTags = [...tags].sort((a, b) => b.z - a.z);
      
      sortedTags.forEach((t) => t.draw());

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [activeCategory, filteredSkills]);

  return (
    <section id="skills" className="py-24 px-6 md:px-12 lg:px-24 xl:px-32 relative">
      <div className="absolute top-1/4 right-0 -z-10 h-80 w-80 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header Title */}
        <div className="text-center mb-16 space-y-2">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold font-display tracking-tight neon-text-primary"
          >
            Skill Galaxy
          </motion.h2>
          <p className="text-sm text-secondary uppercase font-mono tracking-widest">
            Drag mouse to spin • Hover node to explore details
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl">
          {Object.entries(categoryMeta).map(([key, value]) => (
            <button
              key={key}
              onClick={() => {
                setActiveCategory(key as keyof typeof categoryMeta);
                setHoveredSkill(null);
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all border cursor-pointer active:scale-95 ${
                activeCategory === key
                  ? "bg-primary text-black border-primary font-bold shadow-md shadow-primary/25"
                  : "glass-panel border-white/5 text-muted-text hover:text-white hover:border-white/10"
              }`}
            >
              {value.icon}
              <span>{value.label}</span>
            </button>
          ))}
        </div>

        {/* Display Orbit Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-5xl">
          
          {/* Left panel: 3D Orbiting Spherical Canvas */}
          <div className="lg:col-span-7 flex justify-center items-center relative min-h-[400px]">
            {/* Ambient circular tracks under canvas */}
            <div className="absolute h-80 w-80 border border-dashed border-white/5 rounded-full -z-10 pointer-events-none" />
            <div className="absolute h-96 w-96 border border-dashed border-white/5 rounded-full -z-10 pointer-events-none scale-125" />
            
            <canvas
              ref={canvasRef}
              className="cursor-grab active:cursor-grabbing max-w-full"
            />
          </div>

          {/* Right panel: Hover Detail Card */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {hoveredSkill ? (
                <motion.div
                  key={hoveredSkill.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel rounded-2xl p-6 border-primary/20 bg-primary/[0.01] shadow-xl text-left space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-1 rounded bg-primary/10 border border-primary/20 text-[10px] font-mono text-primary uppercase font-bold tracking-wider">
                      {hoveredSkill.category.toUpperCase()}
                    </span>
                    <span className="font-mono text-xs text-muted-text">
                      Proficiency
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-display text-white">
                    {hoveredSkill.name}
                  </h3>

                  <p className="text-sm text-muted-text leading-relaxed">
                    {hoveredSkill.desc}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted-text">Experience Level</span>
                      <span className="text-primary font-bold">{hoveredSkill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${hoveredSkill.level}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-panel rounded-2xl p-8 border-white/5 text-center text-muted-text space-y-3"
                >
                  <Brain className="w-10 h-10 text-primary mx-auto opacity-40 animate-pulse" />
                  <p className="text-sm leading-relaxed">
                    Move your cursor over the galaxy of skills to inspect Rishabh's experience, proficiency levels, and tech stacks.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
