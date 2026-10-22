"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePortfolioStore } from "../../stores/usePortfolioStore";
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
  Radio
} from "lucide-react";

export const JarvisAssistant: React.FC = () => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isJarvisOpen = usePortfolioStore((s) => s.isJarvisOpen);
  const setJarvisOpen = usePortfolioStore((s) => s.setJarvisOpen);
  const isVoiceMuted = usePortfolioStore((s) => s.isVoiceMuted);
  const setVoiceMuted = usePortfolioStore((s) => s.setVoiceMuted);
  const isSpeaking = usePortfolioStore((s) => s.isSpeaking);
  const isListening = usePortfolioStore((s) => s.isListening);
  const setIsListening = usePortfolioStore((s) => s.setIsListening);
  const messages = usePortfolioStore((s) => s.messages);
  const sendJarvisMessage = usePortfolioStore((s) => s.sendJarvisMessage);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendJarvisMessage(input.trim());
    setInput("");
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
    "What are Ali's core skills?",
    "Show me ivanalexx case study",
    "Switch theme to Cyberpunk",
    "Launch 2.5D Biosphere canvas",
    "How can I contact Ali?"
  ];

  return (
    <>
      {/* Floating Trigger Button (when closed) */}
      {!isJarvisOpen && (
        <button
          onClick={() => setJarvisOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-2xl bg-[var(--accent-primary)] text-slate-950 shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 font-mono text-xs font-black shadow-[var(--hud-glow)]"
          title="Open JARVIS AI Assistant"
        >
          <Bot className="w-5 h-5 animate-pulse" />
          <span className="hidden sm:inline">J.A.R.V.I.S.</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        </button>
      )}

      {/* Floating Collapsible Window */}
      {isJarvisOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] hud-panel rounded-3xl flex flex-col justify-between shadow-2xl border-2 border-[var(--border-glow)] overflow-hidden select-none animate-in slide-in-from-bottom-4 duration-300">
          {/* Header Bar */}
          <div className="p-4 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/90 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-left">
              <div className="relative w-8 h-8 rounded-lg bg-[var(--badge-bg)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-primary)] font-black text-xs">
                <Bot className="w-4 h-4" />
                {isSpeaking && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[var(--accent-secondary)] animate-ping" />
                )}
              </div>
              <div>
                <div className="text-xs font-black font-mono text-[var(--text-primary)] flex items-center gap-1.5">
                  <span>J.A.R.V.I.S. INTERFACE</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                    ONLINE
                  </span>
                </div>
                <div className="text-[10px] text-[var(--text-muted)] font-mono">
                  Autonomous Assistant for Muhammad Ali
                </div>
              </div>
            </div>

            {/* Voice Mute & Close */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setVoiceMuted(!isVoiceMuted)}
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                title={isVoiceMuted ? "Enable Voice Response" : "Mute Voice Response"}
              >
                {isVoiceMuted ? (
                  <VolumeX className="w-4 h-4 text-rose-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-[var(--accent-primary)]" />
                )}
              </button>
              <button
                onClick={() => setJarvisOpen(false)}
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-left font-mono text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                    m.sender === "user"
                      ? "bg-[var(--accent-primary)] text-slate-950 font-semibold rounded-br-none"
                      : "bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-bl-none shadow-md"
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-[var(--text-muted)] mt-1 px-1">
                  {m.sender === "user" ? "YOU" : "JARVIS"} • {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-4 py-2 border-t border-[var(--border-color)]/60 bg-[var(--bg-secondary)]/40 overflow-x-auto flex gap-1.5 no-scrollbar">
            {samplePrompts.map((sp) => (
              <button
                key={sp}
                onClick={() => sendJarvisMessage(sp)}
                className="shrink-0 text-[10px] font-mono px-2.5 py-1 rounded-full bg-[var(--badge-bg)] text-[var(--accent-primary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-all"
              >
                {sp}
              </button>
            ))}
          </div>

          {/* Input & Voice Controls */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-[var(--border-color)] bg-[var(--bg-secondary)] flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2.5 rounded-xl border transition-all ${
                isListening
                  ? "bg-rose-500 text-white border-rose-400 animate-pulse"
                  : "bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
              title={isListening ? "Listening... (Click to stop)" : "Speak voice command"}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask JARVIS about Ali's work or say 'switch theme'..."
              className="flex-1 px-3 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs font-mono focus:outline-none focus:border-[var(--accent-primary)]"
            />

            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-[var(--accent-primary)] text-slate-950 font-bold hover:opacity-90 active:scale-95 disabled:opacity-40 transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
