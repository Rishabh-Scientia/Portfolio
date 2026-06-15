"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Copy, Check, Download, Send, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/social-icons";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("scientiarishabh@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus("sending");
    
    // Simulate API request trigger
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Revert status to idle after 4 seconds
      setTimeout(() => setFormStatus("idle"), 4000);
    }, 1800);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 xl:px-32 relative">
      <div className="absolute bottom-0 right-0 -z-10 h-96 w-96 rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-2">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold font-display tracking-tight neon-text-accent"
          >
            Get In Touch
          </motion.h2>
          <p className="text-sm text-accent uppercase font-mono tracking-widest">
            Let's Collaborate on the Future of AI
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-5xl items-stretch">
          
          {/* Left Panel: Contact Info & Copy Action */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 text-left">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-display text-white">
                Let's build <span className="text-accent">something intelligent</span> together.
              </h3>
              <p className="text-sm text-muted-text leading-relaxed font-sans">
                Whether you are looking to hire a GenAI Engineer, automate complex SaaS platforms using n8n workflows, deploy PostgreSQL architectures, or build interactive dashboards, I am ready to design and implement your solution.
              </p>
            </div>

            {/* Quick Cards */}
            <div className="space-y-4">
              
              {/* Copy Email Button Panel */}
              <div className="glass-panel rounded-2xl p-5 border-white/5 bg-white/[0.01] flex items-center justify-between group hover:border-primary/20 hover:bg-white/[0.03] transition-all">
                <div className="flex items-center gap-3.5">
                  <div className="p-3.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-muted-text uppercase">Email Address</div>
                    <div className="text-sm font-bold text-white mt-0.5">scientiarishabh@gmail.com</div>
                  </div>
                </div>
                
                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl border border-white/10 hover:border-primary text-muted-text hover:text-primary active:scale-90 transition-all cursor-pointer relative"
                  title="Copy Email to Clipboard"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Check className="w-4 h-4 text-accent" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Copy className="w-4 h-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              {/* Call Phone Card */}
              <div className="glass-panel rounded-2xl p-5 border-white/5 bg-white/[0.01] flex items-center justify-between group hover:border-secondary/20 hover:bg-white/[0.03] transition-all">
                <div className="flex items-center gap-3.5">
                  <div className="p-3.5 rounded-xl bg-secondary/10 text-secondary border border-secondary/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-muted-text uppercase">Phone Number</div>
                    <div className="text-sm font-bold text-white mt-0.5">+91-9389603320</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Social Icons Bar & Resume download */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
              <div className="flex gap-3">
                <a
                  href="https://linkedin.com/in/rishabh-scientia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-white/10 text-muted-text hover:text-white hover:border-accent hover:bg-accent/5 transition-all shadow"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/Rishabh-Scientia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-white/10 text-muted-text hover:text-white hover:border-primary hover:bg-primary/5 transition-all shadow"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
              </div>

              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-secondary to-primary text-black font-semibold text-xs hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow shadow-primary/20"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Get Resume</span>
              </a>
            </div>
          </div>

          {/* Right Panel: Interactive Message Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel-glow border-accent/20 rounded-3xl p-6 md:p-8 bg-black/40 text-left h-full flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl pointer-events-none" />

              <h4 className="text-xl font-bold font-display text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                <span>Transmit Agent Message</span>
              </h4>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-muted-text uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      disabled={formStatus === "sending" || formStatus === "success"}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-sm text-white focus:outline-none focus:border-accent disabled:opacity-55"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-muted-text uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="johndoe@gmail.com"
                      disabled={formStatus === "sending" || formStatus === "success"}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-sm text-white focus:outline-none focus:border-accent disabled:opacity-55"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-muted-text uppercase tracking-wider">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Generative AI Collaboration / Freelance Project"
                    disabled={formStatus === "sending" || formStatus === "success"}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-sm text-white focus:outline-none focus:border-accent disabled:opacity-55"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-muted-text uppercase tracking-wider">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello Rishabh, I'd love to connect and talk about building..."
                    disabled={formStatus === "sending" || formStatus === "success"}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-sm text-white focus:outline-none focus:border-accent resize-none disabled:opacity-55"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "sending" || formStatus === "success"}
                  className="w-full py-4.5 rounded-xl bg-gradient-to-r from-accent via-primary to-secondary text-black font-bold text-sm hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:brightness-75 disabled:scale-100"
                >
                  <AnimatePresence mode="wait">
                    {formStatus === "sending" && (
                      <motion.div
                        key="sending"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Packet...</span>
                      </motion.div>
                    )}

                    {formStatus === "success" && (
                      <motion.div
                        key="success"
                        className="flex items-center gap-2 text-black font-bold"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                      >
                        <Check className="w-5 h-5 text-black" />
                        <span>Packet Transmitted Successfully!</span>
                      </motion.div>
                    )}

                    {formStatus === "idle" && (
                      <motion.div
                        key="idle"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
