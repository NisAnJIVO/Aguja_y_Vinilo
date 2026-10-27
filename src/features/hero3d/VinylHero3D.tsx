"use client";

import React, { useState, useRef, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import { VinylScene } from "./VinylScene";
import { usePlayerStore } from "@/store/playerStore";
import { Disc3, Volume2, VolumeX } from "lucide-react";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export const VinylHero3D: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const {
    isPlaying,
    isTonearmEngaged,
    isCrackleEnabled,
    togglePlay,
    toggleCrackle,
  } = usePlayerStore();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || prefersReducedMotion) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[460px] sm:h-[520px] lg:h-[580px] rounded-2xl overflow-hidden bg-[#12110F] dark:bg-[#12110F] light:bg-[#EAE4D5] border border-white/10 dark:border-white/10 light:border-black/10 shadow-2xl flex items-center justify-center select-none"
    >
      {/* Dynamic Gallery Spotlight Circle behind Turntable to guarantee edge separation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_50%,rgba(200,157,86,0.18)_0%,rgba(20,19,16,0.02)_65%)] dark:bg-[radial-gradient(circle_at_45%_50%,rgba(200,157,86,0.18)_0%,transparent_65%)] light:bg-[radial-gradient(circle_at_45%_50%,rgba(255,255,255,0.7)_0%,transparent_70%)] pointer-events-none" />

      {/* Real-time 3D Scene with 2x DPR for Pin-Sharp Clarity */}
      {!prefersReducedMotion ? (
        <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
          <Canvas
            camera={{ position: [0, 0, 5.0], fov: 45 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            dpr={[1.5, 2]}
            shadows
          >
            <VinylScene
              isSpinning={isPlaying}
              isTonearmEngaged={isTonearmEngaged}
              mousePos={mousePos}
            />
          </Canvas>
        </div>
      ) : (
        /* Minimalist fallback for low-power devices / reduced motion */
        <div className="relative w-72 h-72 rounded-full vinyl-grooves flex items-center justify-center shadow-2xl">
          <div className="absolute inset-0 rounded-full vinyl-sheen pointer-events-none" />
          <div className="w-32 h-32 rounded-full bg-[#EDE6D8] border-4 border-[#12110F] flex flex-col items-center justify-center p-2 text-center shadow-inner">
            <span className="text-[9px] font-mono tracking-widest text-[#161513] uppercase font-bold">
              Aguja & Vinilo
            </span>
            <span className="text-[8px] text-[#A23E23] font-bold">
              Alta Fidelidad
            </span>
            <span className="text-[7px] text-[#524F47] font-mono mt-1">33 ⅓ RPM • 180g</span>
            <div className="w-3.5 h-3.5 rounded-full bg-[#0E0E0C] border border-[#DDD6C4] mt-1" />
          </div>
        </div>
      )}

      {/* Floating Minimalist Turntable Controls (NO pulsing dots) */}
      <div className="absolute bottom-5 left-5 right-5 sm:left-auto sm:right-6 flex flex-wrap items-center justify-between sm:justify-end gap-3 z-10">
        <div className="flex items-center gap-2 bg-[#181714]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
          <button
            onClick={togglePlay}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              isPlaying
                ? "bg-[#C89D56] text-[#0E0E0C] font-semibold shadow-md"
                : "text-[#F6F3EC] hover:text-[#C89D56] bg-white/5"
            }`}
          >
            <Disc3 className={`w-3.5 h-3.5 ${isPlaying ? "animate-spin" : ""}`} />
            <span>{isPlaying ? "Girar Plato (33 RPM)" : "Encender Motor"}</span>
          </button>

          <button
            onClick={toggleCrackle}
            title={isCrackleEnabled ? "Desactivar ruido de aguja analógica" : "Activar crujido analógico"}
            className={`p-1.5 rounded-full text-xs transition-colors ${
              isCrackleEnabled
                ? "text-[#C89D56] bg-[#C89D56]/15"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {isCrackleEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

        {/* Minimal interaction hint */}
        <div className="hidden md:flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-[#A89D84] bg-[#181714]/80 px-3 py-1.5 rounded-full border border-white/10">
          <span>INTERACCIÓN 3D</span>
        </div>
      </div>
    </div>
  );
};
