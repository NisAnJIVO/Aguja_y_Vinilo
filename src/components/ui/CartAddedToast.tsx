"use client";

import React from "react";
import { useToastStore } from "@/store/toastStore";

export const CartAddedToast: React.FC = () => {
  const { isVisible, productTitle } = useToastStore();

  if (!isVisible) return null;

  return (
    <div
      aria-live="polite"
      className="fixed inset-0 z-[100] backdrop-blur-md bg-black/15 flex flex-col items-center justify-center pointer-events-none select-none transition-opacity duration-200 animate-in fade-in"
    >
      {/* Círculo verde con checkmark blanco idéntico a la referencia del usuario */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-2xl animate-in zoom-in-75 duration-300 ease-out">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 sm:w-10 sm:h-10 text-white"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      {/* Texto minimalista: solo "Agregado al carrito" */}
      <h3 className="font-serif text-lg sm:text-xl font-normal text-neutral-900 mt-3.5 tracking-tight drop-shadow-sm text-center">
        Agregado al carrito
      </h3>
    </div>
  );
};
