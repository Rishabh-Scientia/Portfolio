"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, MessageSquare, Workflow, HelpCircle, Activity, Send, Play, Terminal, Database, ArrowRight, User, Sparkles, Check, Info } from "lucide-react";

type PlaygroundTab = "chatbot" | "workflow" | "rag" | "analytics";

interface Message {
  sender: "user" | "bot";
  text: string;
  isStreaming?: boolean;
}

const presetQuestions = [
  "What is your background?",
  "Tell me about the SIA Agent.",
  "What services do you offer startups?",
  "How do we start working together?",
];

const botResponses: Record<string, string> = {
  "what is your background?": "I am a B.Tech student in Electronics & Communication at IIIT Kota (2023-2027), currently carrying a 7.85 CGPA. I build generative AI agents, design scalable database queries, and automate ETL workflows.",
  "tell me about the sia agent.": "SIA (Scientia Intelligent Assistant) is my flagship AI agent. Built on FastAPI, Gemini, and n8n, it handles calendar coordination, summary generation, database inserts, and notion integrations running 24/7 on Railway.",
  "what services do you offer startups?": "I help startups integrate LLMs, build custom LangGraph architectures, design interactive Streamlit analytics dashboards, map SQL/NoSQL schemas, and construct ETL/automation webhooks.",
  "how do we start working together?": "You can reach out via my contact section below or directly email me at scientiarishabh@gmail.com. I am open to freelance projects, AI developer internships, and collaborator opportunities!",
};

export default function AiPlayground() {
  const [activeTab, setActiveTab] = useState<PlaygroundTab>("chatbot");
  
  // Chatbot State
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hello! I am Rishabh's digital twin agent. Ask me anything about his technical projects, experiences, or background!" }
  ]);
  const [isBotThinking, setIsBotThinking] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Workflow State
  const [activeWorkflowNode, setActiveWorkflowNode] = useState(0);
  const [workflowRunning, setWorkflowRunning] = useState(false);
  
  // Analytics State
  const [tokensProcessed, setTokensProcessed] = useState(2459000);
  const [queriesProcessed, setQueriesProcessed] = useState(12804);
  const [currentLatency, setCurrentLatency] = useState(1.15);
  const [analyticsHistory, setAnalyticsHistory] = useState<number[]>([1.2, 1.4, 0.95, 1.1, 1.25, 1.05, 1.15]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBotThinking]);

  // Analytics updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTokensProcessed((prev) => prev + Math.floor(Math.random() * 800) + 150);
      setQueriesProcessed((prev) => prev + (Math.random() > 0.7 ? 1 : 0));
      
      const newLatency = parseFloat((0.85 + Math.random() * 0.6).toFixed(2));
      setCurrentLatency(newLatency);
      setAnalyticsHistory((prev) => {
        const next = [...prev.slice(1), newLatency];
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Workflow auto execution loop
  useEffect(() => {
    if (!workflowRunning) return;
    const interval = setInterval(() => {
      setActiveWorkflowNode((prev) => {
        if (prev === 4) {
          setWorkflowRunning(false);
          return 0;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [workflowRunning]);

  // Handle chatbot messaging submissions
  const handleChatSend = (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setChatInput("");
    setIsBotThinking(true);

    const questionKey = text.toLowerCase().trim();
    const answer = botResponses[questionKey] || "That's an interesting question! Rishabh is highly skilled in Python, LangChain, n8n, and Data Analytics. For specific details on this, feel free to drop him an email directly at scientiarishabh@gmail.com.";

    setTimeout(() => {
      setIsBotThinking(false);
      
      // Simulate streaming response text
      setMessages((prev) => [...prev, { sender: "bot", text: "", isStreaming: true }]);
      
      let currentLen = 0;
      const streamInterval = setInterval(() => {
        currentLen += 5;
        if (currentLen >= answer.length) {
          clearInterval(streamInterval);
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last && last.isStreaming) {
              last.text = answer;
              last.isStreaming = false;
            }
            return next;
          });
        } else {
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last && last.isStreaming) {
              last.text = answer.substring(0, currentLen);
            }
            return next;
          });
        }
      }, 30);

    }, 1200);
  };

  const startWorkflowSimulation = () => {
    setActiveWorkflowNode(0);
    setWorkflowRunning(true);
  };

  return (
    <section id="playground" className="py-24 px-6 md:px-12 lg:px-24 xl:px-32 relative">
      <div className="absolute bottom-1/4 left-0 -z-10 h-96 w-96 rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Title */}
        <div className="text-center mb-16 space-y-2">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold font-display tracking-tight neon-text-accent"
          >
            AI Playground
          </motion.h2>
          <p className="text-sm text-accent uppercase font-mono tracking-widest">
            Rishabh's Signature Interactive Sandbox Space
          </p>
        </div>

        {/* Workspace Card */}
        <div className="w-full glass-panel-glow border-accent/20 rounded-3xl overflow-hidden shadow-2xl bg-black/40 flex flex-col min-h-[550px]">
          
          {/* Workspace Tabs Header Bar */}
          <div className="flex flex-wrap border-b border-white/5 bg-white/[0.02] p-2 gap-1.5 md:p-3 items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs text-accent px-2">
              <Brain className="w-4 h-4 animate-pulse" />
              <span className="font-bold tracking-wider">SCIENTIA_ENGINE_V1.0.3</span>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {[
                { id: "chatbot", label: "Digital Twin", icon: <MessageSquare className="w-3.5 h-3.5" /> },
                { id: "workflow", label: "Agent Workflow", icon: <Workflow className="w-3.5 h-3.5" /> },
                { id: "rag", label: "RAG Architecture", icon: <HelpCircle className="w-3.5 h-3.5" /> },
                { id: "analytics", label: "Live Stats Sim", icon: <Activity className="w-3.5 h-3.5" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as PlaygroundTab)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-accent/15 text-accent border border-accent/30 font-bold"
                      : "border border-transparent text-muted-text hover:text-white"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Tab Panel Contents */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              
              {/* Tab 1: Chatbot */}
              {activeTab === "chatbot" && (
                <motion.div
                  key="chatbot"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col flex-1 gap-6 justify-between h-[400px]"
                >
                  {/* Messages container */}
                  <div className="flex-1 overflow-y-auto max-h-[300px] space-y-4 pr-2 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
                    {messages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex gap-3 text-left items-start ${
                          msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        {/* Avatar */}
                        <div
                          className={`flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center border text-[10px] ${
                            msg.sender === "user"
                              ? "bg-secondary/10 border-secondary/30 text-secondary"
                              : "bg-primary/10 border-primary/30 text-primary"
                          }`}
                        >
                          {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Brain className="w-3.5 h-3.5" />}
                        </div>
                        
                        {/* Text bubble */}
                        <div
                          className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm leading-relaxed border ${
                            msg.sender === "user"
                              ? "bg-secondary/5 border-secondary/10 text-white rounded-tr-none"
                              : "bg-white/[0.02] border-white/5 text-slate-100 rounded-tl-none"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    
                    {/* Bot thinking bubble */}
                    {isBotThinking && (
                      <div className="flex gap-3 text-left items-start">
                        <div className="flex-shrink-0 h-7 w-7 rounded-full bg-primary/10 border border-primary/30 text-primary flex items-center justify-center">
                          <Brain className="w-3.5 h-3.5 animate-pulse" />
                        </div>
                        <div className="px-4 py-2.5 rounded-2xl bg-white/[0.02] border border-white/5 text-muted-text text-xs font-mono flex items-center gap-1.5 rounded-tl-none">
                          <div className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
                          <span>Streaming agent response...</span>
                        </div>
                      </div>
                    )}
                    <div ref={chatBottomRef} />
                  </div>

                  {/* Typing input bar */}
                  <div className="space-y-3 border-t border-white/5 pt-4">
                    {/* Preset buttons */}
                    <div className="flex flex-wrap gap-2 justify-start">
                      {presetQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleChatSend(q)}
                          className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-white/70 hover:text-white hover:border-accent/40 hover:bg-accent/5 transition-all cursor-pointer"
                        >
                          {q}
                        </button>
                      ))}
                    </div>

                    {/* Chat input box */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleChatSend(chatInput);
                      }}
                      className="flex gap-2 w-full"
                    >
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Type standard prompt like: Tell me about SIA..."
                        className="flex-1 px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-sm focus:outline-none focus:border-accent text-white"
                      />
                      <button
                        type="submit"
                        className="p-3 bg-accent text-black rounded-xl hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}

              {/* Tab 2: Workflow Visualizer */}
              {activeTab === "workflow" && (
                <motion.div
                  key="workflow"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col flex-1 justify-between h-[400px] text-left"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-bold font-display text-white">n8n / LangGraph Workflow Sim</h4>
                        <p className="text-xs text-muted-text">Simulated routing and execution pipeline of SIA.</p>
                      </div>
                      <button
                        onClick={startWorkflowSimulation}
                        disabled={workflowRunning}
                        className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer active:scale-95 transition-all ${
                          workflowRunning
                            ? "bg-slate-800 text-slate-500 border border-slate-700"
                            : "bg-accent text-black hover:brightness-110"
                        }`}
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>{workflowRunning ? "EXECUTING..." : "TRIGGER FLOW"}</span>
                      </button>
                    </div>

                    {/* Nodes flow graphical panel */}
                    <div className="glass-panel border-white/5 rounded-2xl p-6 relative overflow-hidden bg-black/20 flex flex-col md:flex-row justify-between items-center gap-6 py-10">
                      {[
                        { title: "User Query", label: "NL Request", icon: <User className="w-4 h-4" />, color: "border-primary" },
                        { title: "n8n Webhook", label: "API Router", icon: <Workflow className="w-4 h-4" />, color: "border-secondary" },
                        { title: "Gemini 1.5", label: "LLM Orchestrator", icon: <Brain className="w-4 h-4" />, color: "border-accent" },
                        { title: "Notion & DB", label: "Tool Execution", icon: <Database className="w-4 h-4" />, color: "border-primary" },
                        { title: "JSON Response", label: "User Output", icon: <Check className="w-4 h-4" />, color: "border-accent" },
                      ].map((node, i) => (
                        <div key={i} className="flex flex-col md:flex-row items-center gap-6 relative w-full md:w-auto">
                          
                          {/* Node Box */}
                          <div
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 w-32 h-24 text-center transition-all duration-300 relative ${
                              activeWorkflowNode === i && workflowRunning
                                ? "bg-accent/15 border-accent scale-105 shadow-[0_0_15px_rgba(0,255,178,0.3)]"
                                : "glass-panel border-white/10"
                            }`}
                          >
                            <div className={`p-1.5 rounded bg-white/5 mb-1.5 text-slate-300 ${activeWorkflowNode === i && workflowRunning ? "text-accent" : ""}`}>
                              {node.icon}
                            </div>
                            <span className="text-[10px] font-bold text-white uppercase tracking-wider">{node.title}</span>
                            <span className="text-[9px] text-muted-text font-mono mt-0.5">{node.label}</span>
                          </div>

                          {/* SVG Connector Line */}
                          {i < 4 && (
                            <div className="w-1 md:w-12 h-6 md:h-1 flex items-center justify-center relative">
                              <div className="absolute inset-0 bg-white/10 md:h-[2px] md:w-full w-[2px] h-full" />
                              {activeWorkflowNode === i && workflowRunning && (
                                <motion.div
                                  initial={{ left: 0, top: 0 }}
                                  animate={{ left: "100%", top: "100%" }}
                                  transition={{ duration: 2, ease: "linear" }}
                                  className="absolute h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_#00FFB2]"
                                  style={{
                                    left: "auto",
                                    top: "auto",
                                  }}
                                />
                              )}
                            </div>
                          )}

                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Terminal Execution logs */}
                  <div className="bg-black/90 rounded-xl border border-white/10 font-mono text-[9px] p-3 h-20 overflow-y-auto">
                    <div className="flex items-center gap-1.5 text-primary mb-1">
                      <Terminal className="w-3 h-3" />
                      <span>SIA_WORKFLOW_ENGINE_STDOUT</span>
                    </div>
                    {workflowRunning ? (
                      <div className="text-accent space-y-0.5">
                        {activeWorkflowNode >= 0 && <div>[INFO] Executing step 1: Parsed NL Query request successfully.</div>}
                        {activeWorkflowNode >= 1 && <div>[INFO] Executing step 2: Route webhook webhook URL: Active (200 OK)</div>}
                        {activeWorkflowNode >= 2 && <div>[INFO] Executing step 3: Invoking Gemini Flash model structure...</div>}
                        {activeWorkflowNode >= 3 && <div>[INFO] Executing step 4: Writing transaction update SQL records...</div>}
                        {activeWorkflowNode >= 4 && <div>[INFO] Executing step 5: Finalized response packet successfully.</div>}
                      </div>
                    ) : (
                      <div className="text-muted-text">Engine Idle. Click "TRIGGER FLOW" to start execution trace...</div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Tab 3: RAG Architecture */}
              {activeTab === "rag" && (
                <motion.div
                  key="rag"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col flex-1 justify-between h-[400px] text-left"
                >
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-bold font-display text-white">RAG (Retrieval-Augmented Generation) Loop</h4>
                      <p className="text-xs text-muted-text">How we augment database items with vector indexing queries.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                      {[
                        { step: "01", title: "Query Embedding", desc: "User prompt query is parsed into dimensional embeddings using Gemini models." },
                        { step: "02", title: "Vector Search", desc: "Semantic indexing matching against PostgreSQL / pgvector DB schemas." },
                        { step: "03", title: "Context Augment", desc: "Found database snippets are injected into LLM context window." },
                        { step: "04", title: "Response Gen", desc: "The generator creates structured, factual answers, avoiding hallucination." },
                      ].map((step, idx) => (
                        <div key={idx} className="glass-panel border-white/5 rounded-xl p-4 space-y-2 relative hover:border-primary/20 hover:bg-white/[0.02] transition-all">
                          <span className="absolute top-2 right-3 font-mono font-bold text-lg text-primary/30">{step.step}</span>
                          <h5 className="font-bold text-xs text-white uppercase tracking-wider">{step.title}</h5>
                          <p className="text-[10px] text-muted-text leading-relaxed">{step.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 px-4 py-3 rounded-xl bg-primary/5 border border-primary/20 items-start">
                    <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] text-muted-text leading-relaxed">
                      <strong className="text-white">Rishabh's RAG Tuning:</strong> By optimizing recursive text chunking and matching indices using advanced prompt-filtering strategies, search latencies drop by 30% while retaining schema relations.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Tab 4: Live Stats Simulation */}
              {activeTab === "analytics" && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col flex-1 justify-between h-[400px] text-left"
                >
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-bold font-display text-white">Live System Analytics Simulation</h4>
                      <p className="text-xs text-muted-text">Simulating real-time throughput metrics of Rishabh's local deployments.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="glass-panel border-white/5 rounded-xl p-4 text-center">
                        <div className="text-[9px] text-muted-text uppercase font-mono">Tokens Processed</div>
                        <div className="text-xl font-bold text-accent mt-1">{tokensProcessed.toLocaleString()}</div>
                        <div className="text-[7px] text-accent/60 font-mono mt-0.5">+1,200 t/sec</div>
                      </div>
                      <div className="glass-panel border-white/5 rounded-xl p-4 text-center">
                        <div className="text-[9px] text-muted-text uppercase font-mono">Agent Requests</div>
                        <div className="text-xl font-bold text-primary mt-1">{queriesProcessed.toLocaleString()}</div>
                        <div className="text-[7px] text-primary/60 font-mono mt-0.5">99.9% success rate</div>
                      </div>
                      <div className="glass-panel border-white/5 rounded-xl p-4 text-center">
                        <div className="text-[9px] text-muted-text uppercase font-mono">Avg LLM Latency</div>
                        <div className="text-xl font-bold text-secondary mt-1">{currentLatency}s</div>
                        <div className="text-[7px] text-secondary/60 font-mono mt-0.5">Gemini Flash API</div>
                      </div>
                      <div className="glass-panel border-white/5 rounded-xl p-4 text-center">
                        <div className="text-[9px] text-muted-text uppercase font-mono">Cost Per 1K Tokens</div>
                        <div className="text-xl font-bold text-white mt-1">$0.00015</div>
                        <div className="text-[7px] text-muted-text font-mono mt-0.5">Highly Optimized</div>
                      </div>
                    </div>
                  </div>

                  {/* Simulated Line Graph */}
                  <div className="glass-panel border-white/5 rounded-2xl p-4 flex flex-col justify-between h-32 relative">
                    <div className="flex justify-between items-center text-[9px] text-muted-text font-mono">
                      <span>API LATENCY LOG (LAST 7 REQUESTS)</span>
                      <span>SEC / RUN</span>
                    </div>
                    
                    {/* Line Graph Render */}
                    <div className="flex items-end justify-between h-16 px-6 pt-4">
                      {analyticsHistory.map((val, idx) => {
                        const heightPct = Math.min((val / 2.0) * 100, 100);
                        return (
                          <div key={idx} className="flex flex-col items-center gap-1.5 flex-1 relative">
                            <span className="text-[8px] font-mono text-accent absolute -top-4">{val}s</span>
                            <div className="w-2 bg-gradient-to-t from-primary to-accent rounded-t" style={{ height: `${heightPct}%`, minHeight: "10%" }} />
                            <span className="text-[7px] font-mono text-muted-text">Q{idx+1}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
