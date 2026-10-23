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
  Maximize2,
  Minimize2,
  Trash2,
  Copy,
  Check,
  Shield,
  HelpCircle,
  Loader2,
  ExternalLink,
  FileText,
  Palette,
  ArrowUpRight,
  KeyRound
} from "lucide-react";

export const JarvisAssistant: React.FC = () => {
  const [input, setInput] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [hasCustomKey, setHasCustomKey] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const k = localStorage.getItem("gemini_api_key");
      setHasCustomKey(!!k);
      if (k) setApiKeyInput(k);
    }
  }, []);

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      if (apiKeyInput.trim()) {
        localStorage.setItem("gemini_api_key", apiKeyInput.trim());
        setHasCustomKey(true);
      } else {
        localStorage.removeItem("gemini_api_key");
        setHasCustomKey(false);
      }
    }
    setShowKeyModal(false);
  };

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

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isJarvisOpen) {
        setJarvisOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isJarvisOpen, setJarvisOpen]);

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
    "👋 Assalamu Alaikum",
    "😊 How are you?",
    "🤖 What is your name?",
    "👨‍💻 Who made you?",
    "🎨 What is your favorite theme?",
    "✨ Switch to Vaporwave",
    "🌿 Switch to Organic Biophilic",
    "💼 Tell me about client projects",
    "💰 What are Ali's website pricing rates?",
    "📱 How can I contact Ali directly?"
  ];

  return (
    <>
      {/* Floating Trigger Button (when closed) */}
      {!isJarvisOpen && (
        <button
          onClick={() => setJarvisOpen(true)}
          className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-[9990] p-3 sm:p-4 style-btn-primary shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
          title="Open Ali AI Assistant"
          aria-label="Open Ali AI Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="text-xs font-mono tracking-wider font-extrabold hidden sm:inline">
            TALK TO ALI AI
          </span>
        </button>
      )}

      {/* Main Assistant Panel (Strictly bounded horizontally on mobile) */}
      {isJarvisOpen && (
        <div
          role="region"
          aria-label="Ali AI Assistant Panel"
          className={`fixed z-[9999] style-assistant shadow-2xl flex flex-col transition-all duration-300 overflow-hidden ${
            isMaximized
              ? "inset-2 sm:inset-6 max-w-[calc(100vw-16px)] sm:max-w-none"
              : "left-2 right-2 bottom-2 sm:left-auto sm:right-6 sm:bottom-6 w-auto sm:w-[440px] max-w-[calc(100vw-16px)] sm:max-w-[440px] h-[min(620px,calc(100dvh-16px))] max-h-[calc(100dvh-16px)]"
          }`}
        >
          {/* Header Bar */}
          <div className="shrink-0 px-3 py-2.5 sm:px-5 sm:py-3 border-b border-[var(--border-color)] flex items-center justify-between gap-2 min-w-0 w-full max-w-full">
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
              {/* Dynamic Status Orb */}
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[var(--badge-bg)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-primary)] shrink-0">
                {isListening ? (
                  <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400 animate-pulse" />
                ) : isSpeaking ? (
                  <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 animate-bounce" />
                ) : isAiGenerating ? (
                  <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--accent-primary)] animate-spin" />
                ) : (
                  <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                )}
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border-2 border-[var(--bg-primary)] ${
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

              <div className="min-w-0 flex-1">
                <div className="text-xs font-mono font-black text-[var(--text-primary)] flex items-center gap-1.5 truncate">
                  <span className="truncate">ALI AI // ASSISTANT</span>
                </div>
                <div className="text-[10px] font-mono text-[var(--text-muted)] truncate">
                  {isListening
                    ? "LISTENING..."
                    : isSpeaking
                    ? "SPEAKING..."
                    : isAiGenerating
                    ? "THINKING..."
                    : "ONLINE // READY"}
                </div>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-0.5 sm:gap-1 text-[var(--text-secondary)] shrink-0">
              <button
                onClick={() => setShowPrivacyNotice(!showPrivacyNotice)}
                className="hidden sm:inline-flex p-1.5 rounded-lg hover:text-[var(--text-primary)] transition-colors"
                title="Privacy & AI Notice"
                aria-label="Privacy & AI Notice"
              >
                <HelpCircle className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowKeyModal(!showKeyModal)}
                className={`p-1.5 rounded-lg transition-colors relative ${
                  hasCustomKey ? "text-emerald-400" : "hover:text-[var(--text-primary)]"
                }`}
                title={hasCustomKey ? "Gemini AI Connected (Local Browser)" : "Connect Gemini AI Key"}
                aria-label="Connect Gemini AI Key"
              >
                <KeyRound className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {hasCustomKey && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400" />
                )}
              </button>

              <button
                onClick={clearConversation}
                className="p-1.5 rounded-lg hover:text-[var(--text-primary)] transition-colors"
                title="Clear Conversation"
                aria-label="Clear Conversation"
              >
                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <button
                onClick={() => setVoiceMuted(!isVoiceMuted)}
                className={`p-1.5 rounded-lg transition-colors ${
                  isVoiceMuted || masterMute ? "text-rose-400" : "hover:text-[var(--text-primary)]"
                }`}
                title={isVoiceMuted || masterMute ? "Voice Muted" : "Voice Speaking Active"}
                aria-label="Toggle Voice"
              >
                {isVoiceMuted || masterMute ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              </button>

              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="hidden sm:inline-block p-1.5 rounded-lg hover:text-[var(--text-primary)] transition-colors"
                title={isMaximized ? "Restore Size" : "Full Screen Command Center"}
                aria-label="Toggle Fullscreen"
              >
                {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setJarvisOpen(false)}
                className="p-1.5 rounded-lg hover:text-[var(--text-primary)] transition-colors"
                title="Close Assistant"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Privacy & AI Disclosure Banner */}
          {showPrivacyNotice && (
            <div className="shrink-0 p-3 sm:p-3.5 bg-[var(--badge-bg)] border-b border-[var(--border-color)] text-[11px] font-mono text-[var(--text-secondary)] space-y-1 text-left animate-in slide-in-from-top-2 w-full max-w-full">
              <div className="flex items-center justify-between font-bold text-[var(--accent-primary)]">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 shrink-0" />
                  PRIVACY &amp; AUTONOMOUS AI NOTICE
                </span>
                <button onClick={() => setShowPrivacyNotice(false)}>
                  <X className="w-3 h-3" />
                </button>
              </div>
              <p className="leading-relaxed">
                Responses are generated to assist visitors with Muhammad Ali&apos;s verified portfolio content. Voice recording is only active on user button press and is never stored permanently.
              </p>
            </div>
          )}

          {/* Gemini AI Key Settings Modal */}
          {showKeyModal && (
            <form onSubmit={handleSaveApiKey} className="shrink-0 p-3 sm:p-3.5 bg-[var(--badge-bg)] border-b border-[var(--border-color)] text-xs font-mono space-y-2 text-left animate-in slide-in-from-top-2 w-full max-w-full">
              <div className="flex items-center justify-between font-bold text-[var(--accent-primary)]">
                <span className="flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 shrink-0" />
                  CONNECT GOOGLE GEMINI AI KEY
                </span>
                <button type="button" onClick={() => setShowKeyModal(false)}>
                  <X className="w-3 h-3" />
                </button>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Saved in your personal browser&apos;s local storage only. Never exposed in public git repositories. Enables universal real-time AI responses to ANY question (Meta glasses, tech, science, coding).
              </p>
              <div className="flex items-center gap-1.5">
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="Paste your Gemini API key (AQ...)"
                  className="flex-1 min-w-0 px-2.5 py-1.5 style-input text-xs font-mono placeholder-[var(--surface-input-placeholder)]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 style-btn-primary font-bold text-xs shrink-0"
                >
                  Save
                </button>
                {hasCustomKey && (
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        localStorage.removeItem("gemini_api_key");
                        setApiKeyInput("");
                        setHasCustomKey(false);
                      }
                    }}
                    className="px-2 py-1.5 text-rose-400 hover:bg-rose-500/10 rounded text-xs shrink-0"
                    title="Disconnect key"
                  >
                    Remove
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Conversation Message List */}
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-3 sm:p-4 space-y-3.5 text-left font-mono overscroll-contain w-full max-w-full">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`w-full max-w-full flex flex-col min-w-0 ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                {/* Message Bubble (Strictly wrap text, prevent right-side overflow) */}
                <div
                  className={`max-w-[86%] sm:max-w-[80%] p-3 sm:p-3.5 rounded-2xl text-xs leading-relaxed relative overflow-hidden break-words [overflow-wrap:anywhere] [word-break:break-word] ${
                    msg.sender === "user"
                      ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-semibold shadow-md ml-auto"
                      : "bg-[var(--surface-input)] border border-[var(--surface-input-border)] text-[var(--text-primary)] shadow-sm mr-auto"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word]">{msg.text}</p>

                  {/* Action Pill if Action Tag present */}
                  {msg.sender === "jarvis" && msg.actionTag && (
                    <div className="mt-2.5 pt-2 border-t border-[var(--border-color)]/50 flex flex-wrap items-center gap-1.5 w-full max-w-full min-w-0">
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
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--badge-bg)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-[var(--btn-primary-text)] text-[10px] font-bold transition-all max-w-full"
                          >
                            <ExternalLink className="w-3 h-3 shrink-0" />
                            <span className="truncate">View {proj.title} Case Study</span>
                          </button>
                        );
                      })()}

                      {msg.actionTag.startsWith("THEME_") && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[var(--badge-bg)] text-[var(--text-secondary)] text-[10px] max-w-full">
                          <Palette className="w-3 h-3 text-[var(--accent-primary)] shrink-0" />
                          <span className="truncate">Theme: {msg.actionTag.replace("THEME_", "").toUpperCase()}</span>
                        </span>
                      )}

                      {msg.actionTag === "DOWNLOAD_CV" && (
                        <a
                          href="/Muhammad_Ali_CV.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--badge-bg)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-[var(--btn-primary-text)] text-[10px] font-bold transition-all max-w-full"
                        >
                          <FileText className="w-3 h-3 shrink-0" />
                          <span className="truncate">Download CV (PDF)</span>
                        </a>
                      )}

                      {msg.actionTag === "NAV_CONTACT" && (
                        <a
                          href="https://wa.me/923055389967"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-[var(--btn-primary-text)] text-[10px] font-bold transition-all max-w-full"
                        >
                          <ArrowUpRight className="w-3 h-3 shrink-0" />
                          <span className="truncate">WhatsApp (+92 305 5389967)</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Metadata & Actions row (Clean, accessible on touch, strictly bounded) */}
                <div
                  className={`w-full max-w-[86%] sm:max-w-[80%] text-[10px] text-[var(--text-muted)] mt-1 px-1 flex items-center justify-between gap-1.5 min-w-0 ${
                    msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  <div className="flex items-center gap-1.5 min-w-0 truncate">
                    <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    {msg.sender === "jarvis" && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-[var(--badge-bg)] text-[var(--accent-primary)] font-bold shrink-0">
                        {msg.isAiGenerated ? "AI" : "VERIFIED"}
                      </span>
                    )}
                  </div>

                  {msg.sender === "jarvis" && (
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleSpeakText(msg.text)}
                        className="p-1 rounded hover:text-[var(--text-primary)] text-[var(--text-muted)] transition-colors"
                        title="Read aloud"
                        aria-label="Read message aloud"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopyMessage(msg.id, msg.text)}
                        className="p-1 rounded hover:text-[var(--text-primary)] text-[var(--text-muted)] transition-colors"
                        title="Copy response"
                        aria-label="Copy response text"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isAiGenerating && (
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-primary)] p-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                <span>Ali AI thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Chips Bar */}
          <div className="shrink-0 px-2.5 sm:px-4 py-2 border-t border-[var(--border-color)]/60 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono no-scrollbar w-full max-w-full min-w-0">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => sendJarvisMessage(p)}
                className="px-2.5 sm:px-3 py-1.5 style-chip text-xs font-mono whitespace-nowrap shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSend}
            className="shrink-0 p-2 sm:p-3.5 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] border-t border-[var(--border-color)] flex items-center gap-1.5 sm:gap-2 bg-[var(--surface-assistant)] w-full max-w-full min-w-0"
          >
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2 sm:p-2.5 rounded-xl border shrink-0 transition-all ${
                isListening
                  ? "bg-rose-500/20 text-rose-400 border-rose-500 animate-pulse"
                  : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-[var(--border-color)]"
              }`}
              title={isListening ? "Listening... click to stop" : "Speak to Ali AI"}
              aria-label="Voice input"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Ali anything..."
              className="flex-1 min-w-0 px-2.5 sm:px-4 py-2 sm:py-2.5 style-input text-xs font-mono placeholder-[var(--surface-input-placeholder)] focus:outline-none transition-colors"
            />

            <button
              type="submit"
              disabled={!input.trim() || isAiGenerating}
              className="p-2 sm:p-2.5 style-btn-primary shrink-0 font-bold hover:opacity-90 active:scale-95 transition-all disabled:opacity-40"
              title="Send Message"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
