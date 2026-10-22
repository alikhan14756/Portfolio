"use client";

import React, { useState } from "react";
import { useBiosphereStore } from "../../stores/useBiosphereStore";
import { audioSystem } from "../../engine/AudioSystem";
import { QualityTier, ClimateStatus, clamp } from "@aetheria/common";
import {
  Volume2,
  VolumeX,
  Zap,
  Activity,
  Gauge,
  Sliders,
  Radio,
  Eye,
  EyeOff
} from "lucide-react";

export const HUDOverlay: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);

  const x = useBiosphereStore((s) => s.x);
  const y = useBiosphereStore((s) => s.y);
  const vx = useBiosphereStore((s) => s.vx);
  const vy = useBiosphereStore((s) => s.vy);
  const energy = useBiosphereStore((s) => s.energy);
  const isDepleted = useBiosphereStore((s) => s.isDepleted);
  const isAttracting = useBiosphereStore((s) => s.isAttracting);
  const climate = useBiosphereStore((s) => s.climate);
  const entropyScore = useBiosphereStore((s) => s.entropyScore);
  const qualityTier = useBiosphereStore((s) => s.qualityTier);
  const fps = useBiosphereStore((s) => s.fps);
  const isMuted = useBiosphereStore((s) => s.isMuted);
  const volume = useBiosphereStore((s) => s.volume);
  const reducedMotion = useBiosphereStore((s) => s.reducedMotion);
  const zoomWidth = useBiosphereStore((s) => s.zoomWidth);

  const setQualityTier = useBiosphereStore((s) => s.setQualityTier);
  const setClimate = useBiosphereStore((s) => s.setClimate);
  const setMuted = useBiosphereStore((s) => s.setMuted);
  const setVolume = useBiosphereStore((s) => s.setVolume);
  const setReducedMotion = useBiosphereStore((s) => s.setReducedMotion);
  const triggerShockwave = useBiosphereStore((s) => s.triggerShockwave);
  const setIsAttracting = useBiosphereStore((s) => s.setIsAttracting);

  const speed = Math.sqrt(vx * vx + vy * vy);

  const handleMuteToggle = () => {
    const muted = audioSystem.toggleMute();
    setMuted(muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    audioSystem.setVolume(val);
    setVolume(val);
  };

  const handleShockwave = () => {
    const success = triggerShockwave();
    if (success) {
      audioSystem.playShockwave();
    }
  };

  const climateColors: Record<ClimateStatus, string> = {
    STABLE: "border-sky-500/40 text-sky-400 bg-sky-950/40",
    LUMINESCENT: "border-emerald-500/40 text-emerald-400 bg-emerald-950/40",
    TURBULENT: "border-rose-500/40 text-rose-400 bg-rose-950/40",
    DORMANT: "border-slate-600/40 text-slate-400 bg-slate-900/60"
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex flex-col justify-between p-4 sm:p-6 select-none font-mono">
      {/* Top Header Bar */}
      <div className="flex items-start justify-between gap-4">
        {/* Left: Branding & Climate State */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-lg font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-teal-300">
              AETHERIA
            </span>
            <div
              className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold tracking-wider uppercase transition-colors duration-500 ${climateColors[climate]}`}
            >
              {climate}
            </div>
          </div>

          {/* Coordinates & Velocity Telemetry */}
          <div className="flex items-center gap-4 text-xs text-slate-400 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800/80 shadow-lg">
            <div>
              <span className="text-slate-500">POS: </span>
              <span className="text-slate-200">
                {x >= 0 ? `+${x.toFixed(1)}` : x.toFixed(1)}, {y >= 0 ? `+${y.toFixed(1)}` : y.toFixed(1)}
              </span>
              <span className="text-slate-600 ml-1">WU</span>
            </div>
            <div className="w-px h-3 bg-slate-800" />
            <div>
              <span className="text-slate-500">VEL: </span>
              <span className="text-cyan-400">{speed.toFixed(1)}</span>
              <span className="text-slate-600 ml-1">WU/s</span>
            </div>
            <div className="w-px h-3 bg-slate-800" />
            <div>
              <span className="text-slate-500">ENTROPY: </span>
              <span className="text-amber-400">{entropyScore}</span>
            </div>
          </div>
        </div>

        {/* Right: Diagnostics & Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* FPS & Quality Tier */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/60 backdrop-blur-md border border-slate-800/80 text-xs text-slate-400">
            <Gauge className="w-3.5 h-3.5 text-emerald-400" />
            <span className={fps >= 50 ? "text-emerald-400" : "text-amber-400"}>
              {fps} FPS
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-sky-400 font-semibold">T{qualityTier}</span>
          </div>

          {/* Audio Mute Toggle */}
          <button
            onClick={handleMuteToggle}
            className="p-2 rounded-lg bg-slate-950/60 backdrop-blur-md border border-slate-800/80 text-slate-300 hover:text-white hover:border-sky-500/50 transition-all shadow-lg active:scale-95"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-sky-400" />
            )}
          </button>

          {/* Quick Settings Dropdown */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-lg bg-slate-950/60 backdrop-blur-md border transition-all shadow-lg active:scale-95 ${
              showSettings
                ? "border-sky-500 text-sky-400"
                : "border-slate-800/80 text-slate-300 hover:text-white"
            }`}
            title="Settings & Biosphere Controls"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Settings Modal Flyout */}
      {showSettings && (
        <div className="pointer-events-auto absolute top-20 right-4 sm:right-6 w-72 bg-[#090f1d]/95 backdrop-blur-xl border border-slate-800 rounded-xl p-4 shadow-2xl space-y-4 text-xs z-50">
          <div className="flex items-center justify-between font-bold text-slate-200 border-b border-slate-800 pb-2">
            <span>BIOSPHERE CONTROLS</span>
            <span className="text-[10px] text-sky-400">v2.0</span>
          </div>

          {/* Volume Slider */}
          <div>
            <div className="flex justify-between text-slate-400 mb-1.5">
              <span>Master Volume</span>
              <span className="text-sky-400">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
            />
          </div>

          {/* Quality Tier Selector */}
          <div>
            <span className="text-slate-400 block mb-1.5">Visual Quality Tier</span>
            <div className="grid grid-cols-3 gap-1.5">
              {[1, 2, 3].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setQualityTier(tier as QualityTier)}
                  className={`py-1 rounded text-center font-bold border transition-all ${
                    qualityTier === tier
                      ? "bg-sky-500/20 border-sky-400 text-sky-300"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  T{tier}
                  <span className="block text-[9px] font-normal text-slate-500">
                    {tier === 1 ? "25k" : tier === 2 ? "8k" : "2.5k"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Climate Simulation Override (Phase 1 Testing) */}
          <div>
            <span className="text-slate-400 block mb-1.5">Climate Override</span>
            <div className="grid grid-cols-2 gap-1.5">
              {(["STABLE", "LUMINESCENT", "TURBULENT", "DORMANT"] as ClimateStatus[]).map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setClimate(c);
                    audioSystem.updateClimateAudio(c);
                  }}
                  className={`py-1 px-2 rounded text-[10px] font-semibold border transition-all text-left ${
                    climate === c
                      ? "bg-sky-500/20 border-sky-400 text-sky-300"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Reduced Motion Toggle */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-800">
            <span className="text-slate-400">Reduced Motion</span>
            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              className={`p-1.5 rounded border transition-all ${
                reducedMotion
                  ? "bg-sky-500/20 border-sky-400 text-sky-300"
                  : "bg-slate-900 border-slate-800 text-slate-500"
              }`}
            >
              {reducedMotion ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      )}

      {/* Bottom Interface: Energy Pool & Mobile Action Triggers */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        {/* Energy Pool Gauge */}
        <div className="max-w-md w-full bg-slate-950/70 backdrop-blur-md border border-slate-800/80 rounded-xl p-3 shadow-2xl">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-1.5">
              <Zap className={`w-3.5 h-3.5 ${isDepleted ? "text-rose-400 animate-bounce" : "text-amber-400"}`} />
              <span className="text-slate-300 font-bold">KINETIC ENERGY</span>
              {isDepleted && (
                <span className="text-[10px] font-bold text-rose-400 px-1.5 py-0.2 rounded bg-rose-950 border border-rose-500/40">
                  DEPLETED (-60% SPEED)
                </span>
              )}
            </div>
            <span className="text-slate-300 font-bold">{Math.round(energy)} / 100</span>
          </div>

          {/* Energy Progress Bar */}
          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className={`h-full transition-all duration-75 rounded-full ${
                isDepleted
                  ? "bg-rose-500"
                  : isAttracting
                  ? "bg-violet-400"
                  : "bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400"
              }`}
              style={{ width: `${clamp(energy, 0, 100)}%` }}
            />
          </div>

          <div className="flex justify-between items-center mt-2 text-[10px] text-slate-500">
            <span>Regen: +8.0/s</span>
            <span>Singularity: -15.0/s</span>
            <span>Shockwave: -45.0 flat</span>
          </div>
        </div>

        {/* Action Controls & Interactive Shortcuts */}
        <div className="pointer-events-auto flex items-center gap-2 self-end">
          {/* Mobile / Screen Shockwave Action Button */}
          <button
            onClick={handleShockwave}
            disabled={energy < 45 || isDepleted}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-amber-500/30 text-amber-300 hover:bg-amber-500/10 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg font-sans text-xs font-semibold"
          >
            <Zap className="w-4 h-4" />
            <span>SHOCKWAVE (Space)</span>
          </button>

          {/* Mobile / Screen Singularity Hold Button */}
          <button
            onPointerDown={() => {
              setIsAttracting(true);
              audioSystem.setAttractionActive(true);
            }}
            onPointerUp={() => {
              setIsAttracting(false);
              audioSystem.setAttractionActive(false);
            }}
            disabled={isDepleted}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-violet-500/30 text-violet-300 hover:bg-violet-500/10 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg font-sans text-xs font-semibold"
          >
            <Radio className="w-4 h-4" />
            <span>SINGULARITY (Click/Hold)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
