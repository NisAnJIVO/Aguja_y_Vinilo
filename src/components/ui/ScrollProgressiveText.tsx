"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollProgressiveTextProps {
  text: string;
  className?: string;
}

/**
 * Efecto de lectura progresiva con GSAP ScrollTrigger (scrub: true).
 * - Divide el párrafo en palabras individuales (spans).
 * - Inicialmente todas las palabras tienen opacity: 0.15.
 * - Conforme el usuario hace scroll, las palabras se iluminan secuencialmente hasta opacity: 1.
 */
export const ScrollProgressiveText: React.FC<ScrollProgressiveTextProps> = ({
  text,
  className = "",
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLSpanElement>(".scroll-word");
    if (words.length === 0) return;

    // Estado inicial: opacity 0.15
    gsap.set(words, { opacity: 0.15 });

    // Animación de iluminación secuencial con scrub
    const tween = gsap.to(words, {
      opacity: 1,
      ease: "none",
      stagger: 0.05,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "bottom 45%",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text]);

  const words = text.split(" ");

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className="scroll-word inline-block mr-[0.28em] will-change-[opacity]"
        >
          {word}
        </span>
      ))}
    </p>
  );
};
