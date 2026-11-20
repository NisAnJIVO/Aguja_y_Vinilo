"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;     // Atracción magnética del botón exterior
  textStrength?: number; // Atracción magnética del contenido interior (mayor para crear profundidad/paralaje)
}

/**
 * Componente wrapper MagneticButton usando GSAP.
 * - Al entrar el cursor en el área, el botón y su contenido son atraídos hacia la posición del mouse.
 * - El contenido interno se desplaza ligeramente más rápido que el contenedor para generar sensación de profundidad.
 * - Al salir el cursor, regresa elásticamente a su posición original con elastic.out(1, 0.3).
 * - Deshabilitado automáticamente en dispositivos táctiles.
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  strength = 0.32,
  textStrength = 0.52,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    // Desactivar en pantallas táctiles
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Movimiento magnético suave del contenedor exterior
      gsap.to(container, {
        x: deltaX * strength,
        y: deltaY * strength,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Movimiento más pronunciado del texto/contenido interior (profundidad / paralaje)
      gsap.to(content, {
        x: deltaX * textStrength,
        y: deltaY * textStrength,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      // Retorno con efecto elástico muy controlado: elastic.out(1, 0.3)
      gsap.to(container, {
        x: 0,
        y: 0,
        duration: 0.85,
        ease: "elastic.out(1, 0.3)",
        overwrite: "auto",
      });

      gsap.to(content, {
        x: 0,
        y: 0,
        duration: 0.85,
        ease: "elastic.out(1, 0.3)",
        overwrite: "auto",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      gsap.killTweensOf([container, content]);
    };
  }, [strength, textStrength]);

  return (
    <div
      ref={containerRef}
      className={`inline-block relative will-change-transform ${className}`}
    >
      <div ref={contentRef} className="inline-block w-full h-full will-change-transform">
        {children}
      </div>
    </div>
  );
};
