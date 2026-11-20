"use client";

import React from "react";

export interface HoverRollTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  className?: string;
  rollClassName?: string;
}

/**
 * Micro-interacción de "Rolling Text" inspirada en Bürocratik.
 * - Duplica el texto verticalmente dentro de un contenedor con overflow-hidden.
 * - Al hacer hover, el texto original se desliza rápidamente hacia arriba (-100%)
 *   mientras la copia entra desde abajo (0%) con un easing seco (power3.out, 0.35s).
 * - La copia entra con un cambio de estilo elegante (itálica / acento de color).
 * - Cero saltos de layout garantizado.
 */
export const HoverRollText: React.FC<HoverRollTextProps> = ({
  text,
  className = "",
  rollClassName = "italic text-white",
  ...props
}) => {
  return (
    <span
      className={`group/roll relative inline-block overflow-hidden align-baseline select-none ${className}`}
      {...props}
    >
      {/* Texto original que sale hacia arriba (-100%) en hover */}
      <span className="block transition-transform duration-[350ms] ease-[cubic-bezier(0.215,0.61,0.355,1)] group-hover/roll:-translate-y-full group-hover:-translate-y-full will-change-transform">
        {text}
      </span>

      {/* Copia duplicada que entra desde abajo (0%) con estilo itálico/acento */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 block transition-transform duration-[350ms] ease-[cubic-bezier(0.215,0.61,0.355,1)] translate-y-full group-hover/roll:translate-y-0 group-hover:translate-y-0 will-change-transform ${rollClassName}`}
      >
        {text}
      </span>
    </span>
  );
};
