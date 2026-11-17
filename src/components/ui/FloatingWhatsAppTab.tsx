"use client";

import React, { useMemo } from "react";

export const FloatingWhatsAppTab: React.FC = () => {
  const whatsappUrl = useMemo(() => {
    // Saludo dinámico según la hora local de Bolivia
    const now = new Date();
    const hour = now.getHours();
    let saludo = "Buenas tardes";
    if (hour >= 5 && hour < 12) {
      saludo = "Buenos días";
    } else if (hour >= 19 || hour < 5) {
      saludo = "Buenas noches";
    }

    const message = `Hola, ${saludo.toLowerCase()}. Estoy interesado en los productos de su tienda Aguja & Vinilo. Quisiera consultar disponibilidad y envíos.`;
    return `https://wa.me/59168610314?text=${encodeURIComponent(message)}`;
  }, []);

  return (
    <aside
      aria-label="Atención por WhatsApp"
      className="fixed z-40 select-none bottom-5 right-4 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:right-0 group"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Consultar por WhatsApp (+591 68610314)"
        className="flex items-center gap-2.5 bg-black text-white p-3 sm:py-3 sm:pl-3.5 sm:pr-2 rounded-full sm:rounded-l-2xl sm:rounded-r-none border border-white/20 shadow-2xl opacity-75 sm:opacity-35 hover:opacity-100 transition-all duration-300 ease-out sm:translate-x-1 sm:hover:translate-x-0 cursor-pointer"
      >
        {/* Icono oficial de WhatsApp en blanco puro */}
        <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center shrink-0">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.35C9.36 7.35 9.09 7.41 8.86 7.66C8.63 7.91 7.98 8.52 7.98 9.76C7.98 11 8.89 12.2 9.01 12.37C9.14 12.53 10.8 15.09 13.34 16.19C13.94 16.45 14.41 16.61 14.77 16.73C15.38 16.92 15.93 16.89 16.37 16.83C16.86 16.75 17.88 16.21 18.09 15.61C18.3 15.01 18.3 14.5 18.24 14.39C18.17 14.28 18 14.21 17.65 14.04C17.31 13.86 15.63 13.04 15.32 12.93C15 12.81 14.79 12.76 14.57 13.09C14.35 13.43 13.73 14.15 13.54 14.37C13.35 14.58 13.16 14.61 12.82 14.44C12.48 14.26 11.39 13.91 10.1 12.76C9.09 11.86 8.41 10.75 8.21 10.41C8.01 10.07 8.19 9.89 8.36 9.72C8.52 9.56 8.71 9.31 8.89 9.11C9.06 8.9 9.12 8.74 9.24 8.5C9.35 8.25 9.29 8.04 9.21 7.87C9.12 7.7 8.53 6.16 8.26 5.56C8 4.96 7.74 5.04 7.55 5.04L6.96 5.03C6.73 5.03 6.46 5.11 6.23 5.36C6 5.61 5.35 6.22 5.35 7.46C5.35 8.7 6.26 9.9 6.38 10.07L9.53 7.35Z" />
          </svg>
        </div>

        {/* Texto que se revela suavemente al hacer hover (solo en pantallas sm en adelante) */}
        <div className="hidden sm:block max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-out">
          <span className="text-xs font-mono tracking-wider font-semibold pr-2">
            WhatsApp
          </span>
        </div>
      </a>
    </aside>
  );
};

