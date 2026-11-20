"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface VelocityMarqueeProps {
  text?: string;
  className?: string;
}

/**
 * Marquee infinito con tipografía gigante mayúscula y bordes superior/inferior de 1px.
 * Lee la velocidad y dirección del scroll con GSAP ScrollTrigger:
 * - Movimiento continuo continuo a velocidad base.
 * - Aceleración cuando el usuario scrollea rápido.
 * - Inversión de dirección en tiempo real cuando el usuario scrollea hacia arriba.
 */
export const VelocityMarquee: React.FC<VelocityMarqueeProps> = ({
  text = "AGUJA & VINILO — FORMATO FÍSICO — 180G — SUCRE BOLIVIA — ",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!trackRef.current || !containerRef.current) return;

    let currentXPercent = 0;
    let targetVelocity = 1; // Multiplicador de velocidad objetivo (retorna a 1 base)
    let currentVelocity = 1;
    let direction = 1; // 1 = hacia la izquierda (scroll down), -1 = hacia la derecha (scroll up)

    const baseStep = 0.055; // Desplazamiento base continuo por tick

    // ScrollTrigger para monitorear velocidad y dirección de scroll de la página
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const vel = self.getVelocity();

        // Detectar dirección de scroll
        if (vel > 15) {
          direction = 1; // Scroll hacia abajo: texto avanza a la izquierda
        } else if (vel < -15) {
          direction = -1; // Scroll hacia arriba: texto invierte hacia la derecha
        }

        // Aceleración en función de la velocidad de scroll
        const boost = Math.abs(vel) / 120;
        targetVelocity = 1 + Math.min(boost, 14);
      },
    });

    // Ticker optimizado de GSAP a 60/120fps sin acumulación de lag
    const onTick = () => {
      // Suavizado de velocidad con interpolación
      currentVelocity = gsap.utils.interpolate(currentVelocity, targetVelocity, 0.08);
      targetVelocity = gsap.utils.interpolate(targetVelocity, 1, 0.04);

      // Desplazamiento acumulado
      currentXPercent -= baseStep * currentVelocity * direction;

      // Wrap matemático continuo entre -50% y 0% para eliminar cualquier salto visual
      const wrappedPercent = gsap.utils.wrap(-50, 0, currentXPercent);

      gsap.set(trackRef.current, {
        xPercent: wrappedPercent,
      });
    };

    gsap.ticker.add(onTick);

    return () => {
      gsap.ticker.remove(onTick);
      trigger.kill();
    };
  }, []);

  // Bloque de texto repetido 3 veces por mitad para asegurar que cubra pantallas ultra-anchas
  const renderTextChunk = () => (
    <span className="flex items-center shrink-0">
      <span className="mx-3 sm:mx-5">{text}</span>
      <span className="mx-3 sm:mx-5">{text}</span>
      <span className="mx-3 sm:mx-5">{text}</span>
    </span>
  );

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden border-y border-black bg-white py-4 sm:py-6 select-none ${className}`}
    >
      <div
        ref={trackRef}
        className="flex w-max whitespace-nowrap font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter text-black"
        style={{ willChange: "transform" }}
      >
        {/* Mitad A (0% a -50%) */}
        {renderTextChunk()}
        {/* Mitad B (-50% a -100%) */}
        {renderTextChunk()}
      </div>
    </div>
  );
};
