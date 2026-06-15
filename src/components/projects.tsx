"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Terminal, Database, LineChart, Code, Sparkles, Check, Server } from "lucide-react";
import { GithubIcon } from "@/components/social-icons";

interface Project {
  title: string;
  subtitle: string;
  github: string;
  link?: string;
  tech: string[];
  highlights: string[];
  category: string;
}

const projectsData: Project[] = [
  {
    title: "SIA – Scientia Intelligent Assistant",
    subtitle: "AI Personal Assistant & Automation Orchestrator",
    github: "https://github.com/Rishabh-Scientia/SIA-Scientia-Intelligent-Agent-",
    link: "https://sia-scientia-intelligent-agent-production.up.railway.app/",
    tech: ["Python", "FastAPI", "Gemini API", "n8n", "Railway"],
    highlights: [
      "AI Personal Assistant",
      "Productivity Automation",
      "Multi-tool orchestration",
      "Real-time task execution",
      "24/7 deployment",
    ],
    category: "AI Agent",
  },
  {
    title: "AI-Powered SQL Assistant",
    subtitle: "Natural Language to Schema-Aware SQL",
    github: "https://github.com/Rishabh-Scientia/AI-Powered-SQL-Assistant",
    link: "https://updated-sql-assistant-8khjsi7uyxh76w4if8gwhk.streamlit.app/",
    tech: ["LangChain", "Python", "Streamlit", "SQL Server", "Pandas"],
    highlights: [
      "Natural Language to SQL",
      "Schema-aware query generation",
      "Database workflow automation",
    ],
    category: "LLM Utility",
  },
  {
    title: "Data Professional Survey Dashboard",
    subtitle: "Salary Analytics & Professional EDA Dashboard",
    github: "https://github.com/Rishabh-Scientia/Data-Professional-Survey-Dashboard-Power-BI-Data-Analytics-Project",
    tech: ["Power BI", "Excel", "Power Query", "EDA"],
    highlights: [
      "Salary analytics",
      "Interactive dashboard",
      "Data visualization",
      "ETL workflows",
    ],
    category: "Data Analytics",
  },
];

// Interactive mini-console widgets inside cards for premium storytelling

function SiaConsole() {
  const [logs, setLogs] = useState<string[]>([]);
  const logSteps = [
    "[SYSTEM] Loading SIA core modules...",
    "[SYSTEM] Handshake with Gemini API: OK",
    "[AGENT] Query: Summarize emails and push task to n8n.",
    "[COMPILER] Tool execution: FetchInbox()",
    "[GEMINI] Parsing 3 unread messages...",
    "[N8N] Webhook triggered. Syncing Notion...",
    "[SYSTEM] Action execution finished successfully.",
    "[AGENT] Response: Done! Tasks added to Notion dashboard.",
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setLogs((prev) => {
        const next = [...prev, logSteps[index]];
        if (next.length > 5) next.shift(); // keep last 5 logs
        return next;
      });
      index = (index + 1) % logSteps.length;
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-36 bg-black/85 rounded-xl border border-white/10 font-mono text-[9px] p-3 overflow-hidden text-left relative">
      <div className="flex items-center gap-1.5 border-b border-white/5 pb-1.5 mb-2 text-primary">
        <Terminal className="w-3.5 h-3.5" />
        <span>SIA_AGENT_DAEMON.log</span>
      </div>
      <div className="space-y-1.5">
        {logs.map((log, i) => (
          <div
            key={i}
            className={`${
              log.includes("SYSTEM")
                ? "text-muted-text"
                : log.includes("AGENT")
                ? "text-primary font-semibold"
                : log.includes("GEMINI")
                ? "text-secondary"
                : "text-accent"
            }`}
          >
            {log}
          </div>
        ))}
      </div>
      <div className="absolute bottom-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20 text-[8px] text-primary">
        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
        <span>24/7 ACTIVE</span>
      </div>
    </div>
  );
}

function SqlCompiler() {
  const [queryState, setQueryState] = useState(0);
  const queries = [
    {
      nl: "Find average salary of Data Scientists",
      sql: "SELECT AVG(salary) FROM survey WHERE job_title = 'Data Scientist';",
      status: "EXECUTING QUERY...",
      result: "Avg Salary: $118,500.00",
    },
    {
      nl: "Show top 3 countries by responses count",
      sql: "SELECT country, COUNT(*) FROM survey GROUP BY country ORDER BY 2 DESC LIMIT 3;",
      status: "EXECUTING QUERY...",
      result: "1. US (1,230)  2. India (450)  3. UK (320)",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQueryState((prev) => (prev + 1) % queries.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const active = queries[queryState];

  return (
    <div className="w-full h-36 bg-black/85 rounded-xl border border-white/10 font-mono text-[9px] p-3 text-left relative flex flex-col justify-between">
      <div className="flex items-center gap-1.5 border-b border-white/5 pb-1.5 text-accent">
        <Database className="w-3.5 h-3.5" />
        <span>SQL_TRANSLATION_ENGINE</span>
      </div>
      
      <div className="space-y-1 my-1">
        <div className="text-muted-text">
          <span className="text-white font-bold">NL: </span>
          {active.nl}
        </div>
        <div className="text-secondary overflow-x-auto whitespace-nowrap">
          <span className="text-white font-bold">SQL: </span>
          {active.sql}
        </div>
        <div className="text-accent text-[8px] animate-pulse">
          {active.status}
        </div>
        <div className="text-primary font-bold">
          <span className="text-white font-bold">RES: </span>
          {active.result}
        </div>
      </div>

      <div className="flex justify-between items-center text-[7px] text-muted-text border-t border-white/5 pt-1 mt-1">
        <span>SCHEMA-AWARE COMPILER</span>
        <span className="text-accent flex items-center gap-0.5">
          <Check className="w-2.5 h-2.5" /> COMPILED
        </span>
      </div>
    </div>
  );
}

function PowerBiDashboard() {
  const [dataGlow, setDataGlow] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDataGlow((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-36 bg-black/85 rounded-xl border border-white/10 font-mono p-3 text-left relative flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
        <div className="flex items-center gap-1.5 text-secondary text-[9px]">
          <LineChart className="w-3.5 h-3.5" />
          <span>DATA_ANALYTICS_DASHBOARD</span>
        </div>
        <span className="text-[8px] bg-secondary/15 text-secondary border border-secondary/20 px-1 rounded">
          EDA
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 my-1.5">
        <div className="bg-white/5 border border-white/5 p-1.5 rounded text-center">
          <div className="text-[7px] text-muted-text">RESPONSES</div>
          <div className="text-xs font-bold text-white">2.5K+</div>
        </div>
        <div className="bg-white/5 border border-white/5 p-1.5 rounded text-center">
          <div className="text-[7px] text-muted-text">AVG SALARY</div>
          <div className="text-xs font-bold text-accent">$98K</div>
        </div>
        <div className="bg-white/5 border border-white/5 p-1.5 rounded text-center">
          <div className="text-[7px] text-muted-text">US RATIO</div>
          <div className="text-xs font-bold text-primary">63.4%</div>
        </div>
      </div>

      {/* Simulated vertical bar charts */}
      <div className="flex items-end justify-around h-10 px-4 bg-white/[0.02] border border-white/5 rounded p-1">
        <div className="w-3.5 bg-gradient-to-t from-secondary to-primary rounded-t transition-all duration-1000" style={{ height: dataGlow ? "75%" : "60%" }} />
        <div className="w-3.5 bg-gradient-to-t from-primary to-accent rounded-t transition-all duration-1000" style={{ height: dataGlow ? "45%" : "80%" }} />
        <div className="w-3.5 bg-gradient-to-t from-accent to-secondary rounded-t transition-all duration-1000" style={{ height: dataGlow ? "85%" : "50%" }} />
        <div className="w-3.5 bg-gradient-to-t from-secondary to-primary rounded-t transition-all duration-1000" style={{ height: dataGlow ? "30%" : "70%" }} />
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-24 xl:px-32 relative">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-2">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold font-display tracking-tight neon-text-accent"
          >
            Featured Projects
          </motion.h2>
          <p className="text-sm text-accent uppercase font-mono tracking-widest">
            Production-Ready AI Agentics & Data analytics Solutions
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group flex flex-col justify-between glass-panel hover:glass-panel-glow hover:border-primary/20 rounded-2xl p-6 border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 shadow-xl overflow-hidden relative"
            >
              {/* Soft visual card hover gradient background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 group-hover:bg-primary/10 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />

              <div className="space-y-5">
                
                {/* Header widget */}
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono font-bold text-muted-text group-hover:text-primary group-hover:border-primary/20 transition-colors">
                    {project.category}
                  </span>
                  <div className="flex gap-2.5">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-text hover:text-white transition-colors"
                      title="View GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-text hover:text-white transition-colors"
                        title="View Live Deploy"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Info Text */}
                <div className="text-left space-y-1.5">
                  <h3 className="text-xl font-bold font-display text-white group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-text leading-relaxed">
                    {project.subtitle}
                  </p>
                </div>

                {/* Simulated Interactive Widgets */}
                <div className="pt-2">
                  {index === 0 && <SiaConsole />}
                  {index === 1 && <SqlCompiler />}
                  {index === 2 && <PowerBiDashboard />}
                </div>

                {/* Highlights Bullet List */}
                <div className="text-left space-y-2 pt-2 border-t border-white/5">
                  <div className="text-[10px] font-mono text-muted-text uppercase tracking-wider">
                    Key Deliverables
                  </div>
                  <ul className="grid grid-cols-1 gap-1.5 text-xs text-muted-text font-sans">
                    {project.highlights.map((hl, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Technologies footer bar */}
              <div className="flex flex-wrap gap-1.5 pt-6 mt-6 border-t border-white/5 justify-start">
                {project.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-white/5 border border-white/5 font-mono text-[9px] text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
