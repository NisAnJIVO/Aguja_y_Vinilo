"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface InitialPreloaderProps {
  onHeroEnter?: () => void;
}

export const InitialPreloader: React.FC<InitialPreloaderProps> = ({ onHeroEnter }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [count, setCount] = useState("00%");
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Solo mostrar una vez por sesión
    if (typeof window === "undefined") return;

    const seen = sessionStorage.getItem("agy_initial_preloader_seen");
    if (seen) {
      return;
    }

    sessionStorage.setItem("agy_initial_preloader_seen", "true");
    setShouldRender(true);
  }, []);

  useEffect(() => {
    if (!shouldRender || !preloaderRef.current) return;

    // Bloquear scroll mientras el preloader está activo
    document.body.style.overflow = "hidden";

    const counterObj = { val: 0 };
    const tl = gsap.timeline();

    // 1. Contador que sube rápido de 00% a 100% en 1.2 segundos con easing
    tl.to(counterObj, {
      val: 100,
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: () => {
        const current = Math.floor(counterObj.val);
        setCount(`${String(current).padStart(2, "0")}%`);
      },
    })
      // 2. Pantalla negra se retira hacia arriba con clip-path seco y rápido (power4.inOut)
      .to(preloaderRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.7,
        ease: "power4.inOut",
        onStart: () => {
          // Disparar justo aquí la animación de entrada del video y el H1 del Hero
          if (onHeroEnter) {
            onHeroEnter();
          }
        },
        onComplete: () => {
          document.body.style.overflow = "";
          setShouldRender(false);
        },
      });

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, [shouldRender, onHeroEnter]);

  if (!shouldRender) return null;

  return (
    <div
      ref={preloaderRef}
      aria-hidden="true"
      className="fixed inset-0 z-[999999] bg-[#080808] text-white flex flex-col justify-between p-6 sm:p-12 select-none"
      style={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        willChange: "clip-path",
      }}
    >
      {/* Barra superior con estética terminal brutalista */}
      <div className="flex items-start justify-between border-b border-white/15 pb-4 font-mono text-xs uppercase tracking-widest text-neutral-400">
        <div className="flex items-center gap-2.5">
          <span className="inline-block w-2 h-2 bg-white animate-pulse" />
          <span className="text-white font-bold">
            AGUJA &amp; VINILO // CARGANDO ARCHIVO
          </span>
        </div>
        <div className="hidden sm:block text-neutral-500 font-medium">
          SUCRE • BOLIVIA // ANALOG 180G ARCHIVE
        </div>
      </div>

      {/* Centro técnico minimalista */}
      <div className="flex flex-col items-center justify-center my-auto font-mono text-[11px] sm:text-xs text-neutral-500 tracking-widest uppercase space-y-1.5 text-center">
        <div>[ VINYL RECORD REPOSITORY ]</div>
        <div className="text-neutral-400">SYS_INIT: AUDIO DE ALTA FIDELIDAD</div>
      </div>

      {/* Barra inferior: Contador tipográfico gigante en una esquina */}
      <div className="flex flex-col sm:flex-row items-end sm:items-end justify-between border-t border-white/15 pt-4 gap-4">
        <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider space-y-0.5">
          <div>PRESSING HIGH FIDELITY</div>
          <div className="text-neutral-400">EST. 2024 • FORMATO FÍSICO</div>
        </div>

        {/* Contador tipográfico grande en la esquina inferior derecha */}
        <div className="text-right font-mono font-black text-7xl sm:text-9xl md:text-[140px] leading-none tracking-tighter text-white tabular-nums">
          {count}
        </div>
      </div>
    </div>
  );
};
