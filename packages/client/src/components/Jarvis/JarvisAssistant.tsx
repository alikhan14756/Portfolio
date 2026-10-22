"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePortfolioStore } from "../../stores/usePortfolioStore";
import { PORTFOLIO_DATA } from "../../data/portfolioData";
import {
  Bot,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Command,
  Compass,
  MessageSquare,
  Radio,
  Maximize2,
  Minimize2,
  Trash2,
  Copy,
  Check,
  Shield,
  AlertCircle,
  HelpCircle,
  Loader2,
  ExternalLink,
  FileText,
  Palette,
  ArrowUpRight
} from "lucide-react";

export const JarvisAssistant: React.FC = () => {
  const [input, setInput] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isJarvisOpen = usePortfolioStore((s) => s.isJarvisOpen);
  const setJarvisOpen = usePortfolioStore((s) => s.setJarvisOpen);
  const isVoiceMuted = usePortfolioStore((s) => s.isVoiceMuted);
  const setVoiceMuted = usePortfolioStore((s) => s.setVoiceMuted);
  const masterMute = usePortfolioStore((s) => s.masterMute);
  const isSpeaking = usePortfolioStore((s) => s.isSpeaking);
  const setIsSpeaking = usePortfolioStore((s) => s.setIsSpeaking);
  const isListening = usePortfolioStore((s) => s.isListening);
  const setIsListening = usePortfolioStore((s) => s.setIsListening);
  const isAiGenerating = usePortfolioStore((s) => s.isAiGenerating);
  const messages = usePortfolioStore((s) => s.messages);
  const sendJarvisMessage = usePortfolioStore((s) => s.sendJarvisMessage);
  const clearConversation = usePortfolioStore((s) => s.clearConversation);
  const openCaseStudy = usePortfolioStore((s) => s.openCaseStudy);

  const handleSpeakText = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.slice(0, 300));
    utterance.rate = 1.05;
    utterance.pitch = 0.95;
    setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiGenerating]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isAiGenerating) return;
    sendJarvisMessage(input.trim());
    setInput("");
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Web Speech API Voice Recognition (STT)
  const toggleListening = () => {
    if (typeof window === "undefined") return;

    const SpeechRec =
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRec) {
      alert("Voice speech recognition is not supported in this browser engine.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          sendJarvisMessage(transcript);
        }
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const samplePrompts = [
    "👋 Assalam-o-Alaikum",
    "💼 Tell me about client projects",
    "🛍️ What was Ali's role on Nexcurex?",
    "🎥 Tell me about Ivana Studio",
    "💰 What are Ali's website pricing rates?",
    "⚡ How fast can Ali deliver a site?",
    "⏰ What time is it?",
    "💡 Can you explain WordPress simply?",
    "🎨 Switch theme to Cyberpunk",
    "📄 Make it lighter",
    "📱 How can I contact Ali directly?"
  ];

  return (
    <>
      {/* Floating Trigger Button (when closed) */}
      {!isJarvisOpen && (
        <button
          onClick={() => setJarvisOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-2xl bg-[var(--accent-primary)] text-slate-950 font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 shadow-[var(--hud-glow)] group"
          title="Open ALI JARVIS AI Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="text-xs font-mono tracking-wider font-extrabold hidden sm:inline">
            TALK TO ALI JARVIS
          </span>
        </button>
      )}

      {/* Main Assistant Panel */}
      {isJarvisOpen && (
        <div
          role="region"
          aria-label="ALI JARVIS AI Command Panel"
          className={`fixed z-50 hud-panel rounded-3xl shadow-2xl flex flex-col transition-all duration-300 ${
            isMaximized
              ? "inset-4 sm:inset-8"
              : "bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-32px)] sm:w-[460px] h-[640px] max-h-[88vh]"
          }`}
        >
          {/* Header Bar */}
          <div className="p-4 sm:px-6 border-b border-[var(--border-color)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Dynamic Status Orb */}
              <div className="relative w-8 h-8 rounded-xl bg-[var(--badge-bg)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-primary)]">
                {isListening ? (
                  <Mic className="w-4 h-4 text-rose-400 animate-pulse" />
                ) : isSpeaking ? (
                  <Volume2 className="w-4 h-4 text-emerald-400 animate-bounce" />
                ) : isAiGenerating ? (
                  <Loader2 className="w-4 h-4 text-[var(--accent-primary)] animate-spin" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[var(--bg-primary)] ${
                    isListening
                      ? "bg-rose-400"
                      : isSpeaking
                      ? "bg-emerald-400"
                      : isAiGenerating
                      ? "bg-amber-400 animate-ping"
                      : "bg-sky-400"
                  }`}
                />
              </div>

              <div>
                <div className="text-xs font-mono font-black text-[var(--text-primary)] flex items-center gap-1.5">
                  <span>ALI JARVIS // PORTFOLIO COPILOT</span>
                </div>
                <div className="text-[10px] font-mono text-[var(--text-muted)]">
                  {isListening
                    ? "LISTENING TO MICROPHONE..."
                    : isSpeaking
                    ? "SYNTHESIZING SPEECH..."
                    : isAiGenerating
                    ? "THINKING & EXECUTING..."
                    : "STANDBY // READY FOR QUERY"}
                </div>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
              <button
                onClick={() => setShowPrivacyNotice(!showPrivacyNotice)}
                className="p-1.5 rounded-lg hover:text-[var(--text-primary)] transition-colors"
                title="Privacy & AI Notice"
              >
                <HelpCircle className="w-4 h-4" />
              </button>

              <button
                onClick={clearConversation}
                className="p-1.5 rounded-lg hover:text-[var(--text-primary)] transition-colors"
                title="Clear Conversation"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setVoiceMuted(!isVoiceMuted)}
                className={`p-1.5 rounded-lg transition-colors ${
                  isVoiceMuted || masterMute ? "text-rose-400" : "hover:text-[var(--text-primary)]"
                }`}
                title={isVoiceMuted || masterMute ? "Voice Muted" : "Voice Speaking Active"}
              >
                {isVoiceMuted || masterMute ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="hidden sm:inline-block p-1.5 rounded-lg hover:text-[var(--text-primary)] transition-colors"
                title={isMaximized ? "Restore Size" : "Full Screen Command Center"}
              >
                {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setJarvisOpen(false)}
                className="p-1.5 rounded-lg hover:text-[var(--text-primary)] transition-colors"
                title="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Privacy & AI Disclosure Banner */}
          {showPrivacyNotice && (
            <div className="p-3.5 bg-[var(--badge-bg)] border-b border-[var(--border-color)] text-[11px] font-mono text-[var(--text-secondary)] space-y-1 text-left animate-in slide-in-from-top-2">
              <div className="flex items-center justify-between font-bold text-[var(--accent-primary)]">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  PRIVACY &amp; AUTONOMOUS AI NOTICE
                </span>
                <button onClick={() => setShowPrivacyNotice(false)}>
                  <X className="w-3 h-3" />
                </button>
              </div>
              <p>
                Responses are generated to assist visitors with Muhammad Ali&apos;s verified portfolio content. Voice recording is only active on user button press and is never stored permanently.
              </p>
            </div>
          )}

          {/* Conversation Message List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-left font-mono">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed relative group ${
                    msg.sender === "user"
                      ? "bg-[var(--accent-primary)] text-slate-950 font-medium"
                      : "bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)]"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Action Pill if Action Tag present */}
                  {msg.sender === "jarvis" && msg.actionTag && (
                    <div className="mt-2.5 pt-2 border-t border-[var(--border-color)]/50 flex flex-wrap items-center gap-1.5">
                      {msg.actionTag.startsWith("PROJECT_") && (() => {
                        const idMap: Record<string, string> = {
                          PROJECT_IVANALEXX: "ivanalexx",
                          PROJECT_NEXCUREX: "nexcurex",
                          PROJECT_ARSHAD: "arshad",
                          PROJECT_VET: "vet",
                          PROJECT_SHAH_SWEET: "shah-sweet",
                          PROJECT_AETHERIA: "aetheria-ecosystem"
                        };
                        const projId = idMap[msg.actionTag] || msg.actionTag.replace("PROJECT_", "").toLowerCase();
                        const proj = PORTFOLIO_DATA.projects.find((p) => p.id === projId);
                        if (!proj) return null;
                        return (
                          <button
                            type="button"
                            onClick={() => openCaseStudy(proj)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--badge-bg)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-slate-950 text-[10px] font-bold transition-all"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>View {proj.title} Case Study</span>
                          </button>
                        );
                      })()}

                      {msg.actionTag.startsWith("THEME_") && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--badge-bg)] text-[var(--text-secondary)] text-[10px]">
                          <Palette className="w-3 h-3 text-[var(--accent-primary)]" />
                          <span>Theme: {msg.actionTag.replace("THEME_", "").toUpperCase()}</span>
                        </span>
                      )}

                      {msg.actionTag === "DOWNLOAD_CV" && (
                        <a
                          href="/Muhammad_Ali_CV.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--badge-bg)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-slate-950 text-[10px] font-bold transition-all"
                        >
                          <FileText className="w-3 h-3" />
                          <span>Download CV (PDF)</span>
                        </a>
                      )}

                      {msg.actionTag === "NAV_CONTACT" && (
                        <a
                          href="https://wa.me/923055389967"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 text-[10px] font-bold transition-all"
                        >
                          <ArrowUpRight className="w-3 h-3" />
                          <span>WhatsApp (+92 305 5389967)</span>
                        </a>
                      )}
                    </div>
                  )}

                  {/* Actions for Bot Messages: Copy & Speak */}
                  {msg.sender === "jarvis" && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => handleSpeakText(msg.text)}
                        className="p-1 rounded-md bg-[var(--badge-bg)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                        title="Read aloud"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopyMessage(msg.id, msg.text)}
                        className="p-1 rounded-md bg-[var(--badge-bg)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                        title="Copy response"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-[var(--text-muted)] mt-1 px-1 flex items-center gap-2">
                  <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  {msg.sender === "jarvis" && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-[var(--badge-bg)] text-[var(--accent-primary)]">
                      {msg.isAiGenerated ? "AI GENERATED" : "VERIFIED CATALOG"}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {isAiGenerating && (
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-primary)] p-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>ALI JARVIS analyzing query parameters...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Chips Bar */}
          <div className="px-4 py-2 border-t border-[var(--border-color)]/60 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono no-scrollbar">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => sendJarvisMessage(p)}
                className="px-2.5 py-1 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all whitespace-nowrap shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSend} className="p-4 border-t border-[var(--border-color)] flex items-center gap-2">
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2.5 rounded-xl border transition-all ${
                isListening
                  ? "bg-rose-500/20 text-rose-400 border-rose-500 animate-pulse"
                  : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-[var(--border-color)]"
              }`}
              title={isListening ? "Listening... click to stop" : "Speak to ALI JARVIS"}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask ALI JARVIS about projects, skills, pricing, or commands..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
            />

            <button
              type="submit"
              disabled={!input.trim() || isAiGenerating}
              className="p-2.5 rounded-xl bg-[var(--accent-primary)] text-slate-950 font-bold hover:opacity-90 active:scale-95 transition-all disabled:opacity-40"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
