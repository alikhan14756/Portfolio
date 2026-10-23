"use client";

import React from "react";
import { usePortfolioStore } from "../../stores/usePortfolioStore";
import { STYLE_PRESETS } from "../../data/stylePresets";

const MARQUEE_DURATION = "40s";

const marqueeKeyframes = `
@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
`;

export const QuickThemeBar: React.FC = () => {
  const currentStyleId = usePortfolioStore((s) => s.styleId);
  const setStyleId = usePortfolioStore((s) => s.setStyleId);

  return (
    <div className="w-full border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/70 backdrop-blur-md transition-colors duration-300 overflow-hidden">
      {/* Inject keyframes */}
      <style>{marqueeKeyframes}</style>

      <div
        className="flex items-center whitespace-nowrap"
        style={{
          animation: `marquee-scroll ${MARQUEE_DURATION} linear infinite`,
          width: "max-content",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.animationPlayState = "running";
        }}
      >
        {/* Render list twice for seamless infinite loop */}
        {[...STYLE_PRESETS, ...STYLE_PRESETS].map((preset, idx) => {
          const isActive = currentStyleId === preset.id;
          return (
            <button
              key={`${preset.id}-${idx}`}
              onClick={() => setStyleId(preset.id)}
              className={`mx-1 my-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold shrink-0 transition-all active:scale-95 border whitespace-nowrap ${
                isActive
                  ? "style-btn-primary shadow-md font-bold"
                  : "bg-[var(--surface-input)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)]/60"
              }`}
              title={`Switch to ${preset.name}`}
            >
              {preset.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
