"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number; // Inclinación máxima en grados (por defecto: 5 grados)
  className?: string;
}

/**
 * Componente TiltCard con GSAP quickTo.
 * Reacciona a la posición exacta del cursor dentro de la tarjeta inclinándose suavemente
 * en 3D (máximo 4 a 6 grados).
 * Desactivado automáticamente en pantallas táctiles.
 */
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  maxTilt = 5,
  className = "",
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotXTo = useRef<gsap.QuickToFunc | null>(null);
  const rotYTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    if (isTouch || !cardRef.current) return;

    gsap.set(cardRef.current, {
      transformPerspective: 900,
      transformStyle: "preserve-3d",
    });

    rotXTo.current = gsap.quickTo(cardRef.current, "rotationX", {
      duration: 0.22,
      ease: "power2.out",
    });
    rotYTo.current = gsap.quickTo(cardRef.current, "rotationY", {
      duration: 0.22,
      ease: "power2.out",
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rotXTo.current || !rotYTo.current || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1; // De -1 a 1
    const normY = (y / rect.height) * 2 - 1; // De -1 a 1

    rotXTo.current(-normY * maxTilt);
    rotYTo.current(normX * maxTilt);
  };

  const handleMouseLeave = () => {
    rotXTo.current?.(0);
    rotYTo.current?.(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative will-change-transform ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
