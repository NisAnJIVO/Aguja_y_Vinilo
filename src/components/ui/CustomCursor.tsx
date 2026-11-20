"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    // Detectar dispositivos táctiles y deshabilitar completamente
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    if (isTouch) {
      setIsTouchDevice(true);
      return;
    }

    if (!cursorRef.current) return;

    // Centrar el cursor con respecto a las coordenadas del puntero
    gsap.set(cursorRef.current, {
      xPercent: -50,
      yPercent: -50,
      pointerEvents: "none",
    });

    // Inercia muy corta y precisa con GSAP quickTo
    xTo.current = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.12,
      ease: "power2.out",
    });
    yTo.current = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.12,
      ease: "power2.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (xTo.current && yTo.current) {
        xTo.current(e.clientX);
        yTo.current(e.clientY);
      }
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest<HTMLElement>("[data-cursor]");

      if (cursorTarget) {
        const raw = cursorTarget.getAttribute("data-cursor")?.trim() || "";
        const label = raw.startsWith("[") ? raw : `[ ${raw} ]`;
        setCursorText(label);
      } else {
        setCursorText("");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`fixed top-0 left-0 z-[99999] pointer-events-none select-none hidden md:flex items-center justify-center transition-opacity duration-150 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ willChange: "transform" }}
    >
      {cursorText ? (
        /* Etiqueta rectangular sin bordes redondeados (Brutalist Badge) */
        <div className="bg-white text-black font-mono text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-none border border-black/10 select-none whitespace-nowrap mix-blend-difference shadow-sm transition-transform duration-100 scale-100">
          {cursorText}
        </div>
      ) : (
        /* Punto/mira minimalista de 8px con mix-blend-difference */
        <div className="w-2 h-2 bg-white rounded-full mix-blend-difference shadow-sm" />
      )}
    </div>
  );
};
