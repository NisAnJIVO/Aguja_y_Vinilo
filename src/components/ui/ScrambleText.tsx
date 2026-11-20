"use client";

import React, { useRef, useEffect } from "react";
import { useTextScramble, UseTextScrambleOptions } from "@/hooks/useTextScramble";

export interface ScrambleTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    UseTextScrambleOptions {
  text: string;
  triggerOnHover?: boolean;
}

/**
 * Componente brutalista con efecto Text Scramble al hacer hover.
 * Mantiene un ancho y alto fijos mediante un elemento fantasma invisible,
 * evitando cualquier salto de línea o desplazamiento en menús o botones.
 */
export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  duration = 250,
  chars,
  triggerOnHover = true,
  className = "",
  ...props
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const { displayText, trigger } = useTextScramble(text, { duration, chars });

  useEffect(() => {
    if (!triggerOnHover || !containerRef.current) return;

    // Si el elemento está dentro de un botón o link interactivo, activar al hacer hover sobre el contenedor padre
    const interactiveParent = containerRef.current.closest<HTMLElement>(
      "a, button, [role='button'], [data-scramble-parent]"
    );
    const targetEl = interactiveParent || containerRef.current;

    const handleMouseEnter = () => {
      trigger();
    };

    targetEl.addEventListener("mouseenter", handleMouseEnter);
    return () => {
      targetEl.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [trigger, triggerOnHover]);

  return (
    <span
      ref={containerRef}
      className={`relative inline-block align-baseline ${className}`}
      {...props}
    >
      {/* 
        Elemento fantasma invisible que fija matemáticamente el ancho y alto exactos de la palabra original.
        Esto previene cualquier salto, temblor o desplazamiento (layout shift) en el menú o botones.
      */}
      <span className="invisible select-none pointer-events-none" aria-hidden="true">
        {text}
      </span>

      {/* Capa visible posicionada exactamente sobre el espacio reservado */}
      <span className="absolute inset-0 top-0 left-0 w-full h-full select-none pointer-events-none text-inherit leading-inherit font-inherit tracking-inherit">
        {displayText}
      </span>
    </span>
  );
};
