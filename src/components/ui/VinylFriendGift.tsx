"use client";

import React, { useEffect, useState } from "react";
import { useSubscriptionStore } from "@/store/subscriptionStore";

interface VinylFriendGiftProps {
  className?: string;
  size?: number | string;
  isRunning?: boolean;
  inverted?: boolean; // true cuando el fondo es negro/oscuro
  forceCrown?: boolean;
}

export const VinylFriendGift: React.FC<VinylFriendGiftProps> = ({
  className = "",
  size = 64,
  isRunning = false,
  inverted = false,
  forceCrown,
}) => {
  const { isPlus } = useSubscriptionStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasCrown = forceCrown || (mounted && isPlus);

  // Paleta de colores según el fondo
  const bodyColor = inverted ? "#FFFFFF" : "#111111";
  const eyeOuter = inverted ? "#111111" : "#FFFFFF";
  const eyePupil = inverted ? "#FFFFFF" : "#111111";
  const boxFill = inverted ? "#181818" : "#F5F5F5";
  const boxStroke = inverted ? "#FFFFFF" : "#111111";
  const ribbonColor = "#F59E0B"; // Dorado vinilo vibrante en ambos modos

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
    >
      <svg
        viewBox="0 -6 46 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full overflow-visible transition-transform duration-300 ${
          isRunning ? "animate-bounce" : ""
        }`}
      >
        {/* ===================================================================
            CORONA DE MIEMBRO PLUS
           =================================================================== */}
        {hasCrown && (
          <g className="animate-in fade-in zoom-in-75 duration-300">
            <path
              d="M9 -2.5L11.8 1.5L16 -4.5L20.2 1.5L23 -2.5L21.5 2.5H10.5L9 -2.5Z"
              fill="#F59E0B"
              stroke="#D97706"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="-2.5" r="1.1" fill="#FEF08A" stroke="#CA8A04" strokeWidth="0.5" />
            <circle cx="16" cy="-4.5" r="1.3" fill="#FEF08A" stroke="#CA8A04" strokeWidth="0.5" />
            <circle cx="23" cy="-2.5" r="1.1" fill="#FEF08A" stroke="#CA8A04" strokeWidth="0.5" />
            <circle cx="16" cy="0" r="0.9" fill="#DC2626" />
          </g>
        )}

        {/* Cuerpo del Cíclope Vinilo (Cabeza redonda + Torso + Piernitas) */}
        <g className={isRunning ? "animate-[runningLegs_0.35s_ease-in-out_infinite_alternate]" : ""}>
          {/* Silueta del cuerpo */}
          <path
            d="M16 2C9.37 2 4 7.37 4 14C4 19.5 7.5 24.2 12.5 25.5V32C12.5 33.1 11.6 34 10.5 34H9V36H14V26.5H18V36H23V34H21.5C20.4 34 19.5 33.1 19.5 32V25.5C24.5 24.2 28 19.5 28 14C28 7.37 22.63 2 16 2Z"
            fill={bodyColor}
          />

          {/* Ojo Cíclope con iris y destello */}
          <ellipse cx="16" cy="13" rx="5.5" ry="3.5" fill={eyeOuter} />
          <circle cx="16" cy="13" r="2.2" fill={eyePupil} />
          <circle cx="15.2" cy="12.2" r="0.7" fill={eyeOuter} />
        </g>

        {/* Brazos que sostienen la caja de regalo hacia el frente */}
        <g className={isRunning ? "animate-[giftWiggle_0.35s_ease-in-out_infinite_alternate]" : ""}>
          {/* Brazo izquierdo / conector */}
          <path
            d="M20 18C23 18 25 19.5 26 21"
            stroke={bodyColor}
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Caja de Regalo */}
          <rect
            x="24"
            y="15"
            width="17"
            height="16"
            rx="2"
            fill={boxFill}
            stroke={boxStroke}
            strokeWidth="2"
          />

          {/* Tapa de la caja de regalo */}
          <rect
            x="22.5"
            y="13"
            width="20"
            height="4"
            rx="1.2"
            fill={boxFill}
            stroke={boxStroke}
            strokeWidth="2"
          />

          {/* Cintas cruzadas del regalo */}
          <line
            x1="32.5"
            y1="13"
            x2="32.5"
            y2="31"
            stroke={ribbonColor}
            strokeWidth="2"
          />
          <line
            x1="24"
            y1="23"
            x2="41"
            y2="23"
            stroke={ribbonColor}
            strokeWidth="2"
          />

          {/* Lazo / Moño superior */}
          <path
            d="M32.5 13C30.5 10 27 9.5 28.5 12C30 13 32.5 13 32.5 13Z"
            fill={ribbonColor}
          />
          <path
            d="M32.5 13C34.5 10 38 9.5 36.5 12C35 13 32.5 13 32.5 13Z"
            fill={ribbonColor}
          />
          <circle cx="32.5" cy="12.8" r="1.5" fill={ribbonColor} />
        </g>
      </svg>
    </div>
  );
};
