"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useBiosphereStore } from "../../stores/useBiosphereStore";
import { audioSystem } from "../../engine/AudioSystem";
import { Sparkles, Compass, Radio, Zap } from "lucide-react";

export const EntryPortal: React.FC = () => {
  const audioUnlocked = useBiosphereStore((s) => s.audioUnlocked);
  const unlockAudio = useBiosphereStore((s) => s.unlockAudio);

  const handleEnter = async () => {
    await audioSystem.unlock();
    unlockAudio();
  };

  return (
    <AnimatePresence>
      {!audioUnlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-6 select-none"
        >
          <div className="relative max-w-lg w-full bg-[#070d1b]/90 border border-sky-500/30 rounded-2xl p-8 shadow-2xl shadow-sky-500/10 text-center">
            {/* Bioluminescent Header Halo */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-sky-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-mono tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>CORE BIOSPHERE v2.0</span>
            </div>

            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400 tracking-tight mb-3">
              A E T H E R I A
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
              An infinite, physics-driven digital ecosystem. Navigate through 2.5D procedural ether, emit deterministic forces, and harmonize with collective resonances.
            </p>

            {/* Interaction Guide */}
            <div className="grid grid-cols-3 gap-3 mb-8 text-left">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold mb-1">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Explore</span>
                </div>
                <p className="text-[11px] text-slate-400">Pointer or Touch drag to navigate with inertial physics.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-2 text-violet-400 text-xs font-semibold mb-1">
                  <Radio className="w-3.5 h-3.5" />
                  <span>Singularity</span>
                </div>
                <p className="text-[11px] text-slate-400">Hold Left Click or Touch Hold to attract particle swarms.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Shockwave</span>
                </div>
                <p className="text-[11px] text-slate-400">Press Spacebar or Double Tap to fire repulsive impulse.</p>
              </div>
            </div>

            {/* Enter Button */}
            <button
              onClick={handleEnter}
              className="w-full group relative py-3.5 px-6 rounded-xl font-medium text-slate-900 bg-gradient-to-r from-sky-400 via-teal-300 to-sky-400 hover:from-sky-300 hover:to-teal-200 transition-all duration-200 shadow-lg shadow-sky-500/25 active:scale-[0.98] font-sans"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 font-semibold tracking-wide">
                ENTER THE BIOSPHERE
              </span>
            </button>

            <div className="mt-4 text-[11px] text-slate-500 font-mono">
              Unlocks native Web Audio procedural synthesizer (D Lydian Pentatonic)
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
