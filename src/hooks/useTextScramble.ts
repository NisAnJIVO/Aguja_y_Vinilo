"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const UPPER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export interface UseTextScrambleOptions {
  duration?: number; // Duración total en ms (por defecto: 250ms)
  chars?: string;    // Caracteres aleatorios a usar
}

/**
 * Hook reutilizable para efecto brutalista/terminal "Text Scramble".
 * Cicla rápidamente caracteres aleatorios durante ~250ms hasta recomponer la palabra original.
 */
export function useTextScramble(text: string, options?: UseTextScrambleOptions) {
  const duration = options?.duration ?? 250;
  const chars = options?.chars ?? UPPER_CHARS;
  const [displayText, setDisplayText] = useState(text);
  const isRunningRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  const trigger = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    const startTime = performance.now();
    const length = text.length;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Decodificación progresiva de caracteres de izquierda a derecha
      const resolvedCount = Math.floor(progress * length);

      let scrambled = "";
      for (let i = 0; i < length; i++) {
        if (text[i] === " ") {
          scrambled += " ";
        } else if (i < resolvedCount || progress >= 1) {
          scrambled += text[i];
        } else {
          scrambled += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setDisplayText(scrambled);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setDisplayText(text);
        isRunningRef.current = false;
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, [text, duration, chars]);

  const reset = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    isRunningRef.current = false;
    setDisplayText(text);
  }, [text]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return { displayText, trigger, reset, isRunning: isRunningRef.current };
}
