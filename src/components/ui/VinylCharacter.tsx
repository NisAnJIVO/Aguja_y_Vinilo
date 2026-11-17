"use client";

import React, { useEffect, useState } from "react";
import { useSubscriptionStore } from "@/store/subscriptionStore";

export type VinylCharacterPose =
  | "default"
  | "headphones"
  | "shipping"
  | "inspecting"
  | "reading"
  | "shield"
  | "corporate";

export type VinylCharacterExpression = "curious" | "bliss" | "wink" | "focused";

interface VinylCharacterProps {
  className?: string;
  size?: number | string;
  forceCrown?: boolean;
  inverted?: boolean; // true para fondo oscuro (cuerpo blanco)
  pose?: VinylCharacterPose;
  expression?: VinylCharacterExpression;
  animated?: boolean;
  interactive?: boolean;
}

export const VinylCharacter: React.FC<VinylCharacterProps> = ({
  className = "",
  size = 64,
  forceCrown,
  inverted = false,
  pose = "default",
  expression,
  animated = true,
  interactive = true,
}) => {
  const { isPlus } = useSubscriptionStore();
  const [mounted, setMounted] = useState(false);
  const [isWinking, setIsWinking] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasCrown = forceCrown || (mounted && isPlus);
  const bodyColor = inverted ? "#FFFFFF" : "#111111";
  const eyeOuter = inverted ? "#111111" : "#FFFFFF";
  const eyePupil = inverted ? "#FFFFFF" : "#111111";
  const accentColor = "#F59E0B"; // Dorado vinilo
  const strokeLine = inverted ? "#FFFFFF" : "#111111";

  // Determinar expresión según la pose si no se especifica
  const currentExpression: VinylCharacterExpression =
    expression ||
    (pose === "headphones"
      ? "bliss"
      : pose === "inspecting" || pose === "reading"
      ? "focused"
      : isWinking
      ? "wink"
      : "curious");

  const handleClick = () => {
    if (!interactive) return;
    setClicked(true);
    setIsWinking(true);
    setTimeout(() => {
      setIsWinking(false);
      setClicked(false);
    }, 1200);
  };

  const characterSVG = (
    <div
      style={typeof size === "number" ? { width: size, height: size } : { width: size, height: size }}
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center select-none cursor-pointer group transition-transform duration-300 ${
        clicked ? "scale-110 -rotate-3" : "hover:scale-105"
      } ${animated ? "animate-[mascotBob_3.5s_ease-in-out_infinite]" : ""}`}
    >
      <svg
        viewBox="-10 -10 50 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* ===================================================================
            CORONITA DE MIEMBRO PLUS
           =================================================================== */}
        {hasCrown && (
          <g className="animate-in fade-in zoom-in-75 duration-300">
            <path
              d="M7 -3.5L9.8 0.5L14 -5.5L18.2 0.5L21 -3.5L19.5 1.5H8.5L7 -3.5Z"
              fill={accentColor}
              stroke="#D97706"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
            <circle cx="7" cy="-3.5" r="1.1" fill="#FEF08A" stroke="#CA8A04" strokeWidth="0.5" />
            <circle cx="14" cy="-5.5" r="1.3" fill="#FEF08A" stroke="#CA8A04" strokeWidth="0.5" />
            <circle cx="21" cy="-3.5" r="1.1" fill="#FEF08A" stroke="#CA8A04" strokeWidth="0.5" />
            <circle cx="14" cy="-1" r="0.9" fill="#DC2626" />
          </g>
        )}

        {/* ===================================================================
            CUERPO DEL CÍCLOPE VINILO (SILUETA CON PATITAS)
           =================================================================== */}
        <g>
          {/* Silueta de cuerpo redondo + torso + piernas */}
          <path
            d="M14 2C7.37 2 2 7.37 2 14C2 19.5 5.5 24.2 10.5 25.5V32C10.5 33.1 9.6 34 8.5 34H7V36H12V26H16V36H21V34H19.5C18.4 34 17.5 33.1 17.5 32V25.5C22.5 24.2 26 19.5 26 14C26 7.37 20.63 2 14 2Z"
            fill={bodyColor}
          />

          {/* Sutiles surcos de vinilo en la cabeza para darle textura física */}
          <circle cx="14" cy="14" r="10" stroke={inverted ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.08)"} strokeWidth="0.6" fill="none" />
          <circle cx="14" cy="14" r="8" stroke={inverted ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.08)"} strokeWidth="0.6" fill="none" />
        </g>

        {/* ===================================================================
            EXPRESIÓN DEL OJO CÍCLOPE
           =================================================================== */}
        {currentExpression === "bliss" ? (
          /* Ojo cerrado en éxtasis musical (^_^) */
          <g>
            <path
              d="M9.5 15C11 12 17 12 18.5 15"
              stroke={eyeOuter}
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Pequeños sonrojos rosados / tiernos en las mejillas */}
            <ellipse cx="6" cy="18" rx="2" ry="1.2" fill="#F43F5E" opacity="0.45" />
            <ellipse cx="22" cy="18" rx="2" ry="1.2" fill="#F43F5E" opacity="0.45" />
          </g>
        ) : currentExpression === "wink" ? (
          /* Guiño cómplice / simpático */
          <g>
            <path
              d="M10 14.5C11.5 12 16.5 12 18 14.5"
              stroke={eyeOuter}
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Destello de complicidad al lado */}
            <path d="M22 10L23.5 11.5L22 13L20.5 11.5Z" fill={accentColor} />
          </g>
        ) : currentExpression === "focused" ? (
          /* Ojo enfocado mirando hacia abajo/derecha a lo que inspecciona */
          <g>
            <ellipse cx="14" cy="13" rx="5.5" ry="3.5" fill={eyeOuter} />
            <circle cx="15.8" cy="13.8" r="2.2" fill={eyePupil} />
            <circle cx="15.2" cy="13" r="0.7" fill={eyeOuter} />
          </g>
        ) : (
          /* Expresión curiosa estándar (gran ojo abierto con brillo) */
          <g>
            <ellipse cx="14" cy="13" rx="5.5" ry="3.5" fill={eyeOuter} />
            <circle cx="14" cy="13" r="2.2" fill={eyePupil} />
            <circle cx="13.2" cy="12.2" r="0.8" fill={eyeOuter} />
            <circle cx="14.8" cy="13.8" r="0.4" fill={eyeOuter} />
          </g>
        )}

        {/* ===================================================================
            ACCESORIOS Y POSES SEGÚN EL ROL DE LA PÁGINA
           =================================================================== */}
        
        {/* 1. HEADPHONES (Nosotros / Audición) */}
        {pose === "headphones" && (
          <g>
            {/* Diadema de auriculares de vinilo */}
            <path
              d="M0 13C0 4.5 6.2 -0.5 14 -0.5C21.8 -0.5 28 4.5 28 13"
              stroke={strokeLine}
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            {/* Almohadillas en color dorado vinilo */}
            <rect x="-3" y="9.5" width="4" height="8" rx="2" fill={accentColor} stroke={strokeLine} strokeWidth="1" />
            <rect x="27" y="9.5" width="4" height="8" rx="2" fill={accentColor} stroke={strokeLine} strokeWidth="1" />

            {/* Notas musicales flotantes en el aire */}
            <g className="animate-[musicNote1_3s_ease-in-out_infinite]">
              <path d="M-6 4C-6 2.5 -4 1.5 -3 3V-3L1 -4V2M-3 -1L1 -2" stroke={accentColor} strokeWidth="1.2" strokeLinecap="round" />
            </g>
            <g className="animate-[musicNote2_2.8s_ease-in-out_infinite]">
              <path d="M30 2C30 1 31.5 0 32.5 1.5V-4L35.5 -5V0" stroke={accentColor} strokeWidth="1.2" strokeLinecap="round" />
            </g>
          </g>
        )}

        {/* 2. SHIPPING (Envíos / Logística) */}
        {pose === "shipping" && (
          <g>
            {/* Brazos abrazando la caja de encomienda */}
            <path d="M10 20L18 22M19 18L24 21" stroke={bodyColor} strokeWidth="2.2" strokeLinecap="round" />
            
            {/* Caja de encomienda rígida con esquinas reforzadas */}
            <rect
              x="20"
              y="14"
              width="15"
              height="13"
              rx="1.5"
              fill={inverted ? "#222222" : "#F4F4F4"}
              stroke={strokeLine}
              strokeWidth="1.4"
            />
            {/* Cinta adhesiva cruzada en oro vinilo */}
            <line x1="27.5" y1="14" x2="27.5" y2="27" stroke={accentColor} strokeWidth="2" />
            <line x1="20" y1="20.5" x2="35" y2="20.5" stroke={accentColor} strokeWidth="1.4" />
            {/* Sello de envío: flechas de frágil */}
            <path d="M22 17L23.5 15.5L25 17M23.5 16V19" stroke={strokeLine} strokeWidth="0.8" strokeLinecap="round" />
          </g>
        )}

        {/* 3. INSPECTING (Devoluciones & Garantía de Prensado) */}
        {pose === "inspecting" && (
          <g>
            {/* Brazo izquierdo sosteniendo un mini vinilo de 180g */}
            <circle cx="2" cy="22" r="6" fill="#111111" stroke={accentColor} strokeWidth="0.8" />
            <circle cx="2" cy="22" r="2" fill={accentColor} />

            {/* Brazo derecho sosteniendo la lupa */}
            <path d="M19 19L24 17" stroke={bodyColor} strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="26" cy="15" r="5" fill="none" stroke={strokeLine} strokeWidth="1.6" />
            <line x1="29.5" y1="18.5" x2="34" y2="23" stroke={accentColor} strokeWidth="2.4" strokeLinecap="round" />
            {/* Destello de pureza sonora */}
            <path d="M26 12L26.5 13.5L28 14L26.5 14.5L26 16L25.5 14.5L24 14L25.5 13.5Z" fill={accentColor} />
          </g>
        )}

        {/* 4. READING (Blog & Archivo de Crónicas) */}
        {pose === "reading" && (
          <g>
            {/* Gafas redondas de lectura sobre su gran ojo */}
            <circle cx="14" cy="13" r="5" fill="none" stroke={accentColor} strokeWidth="1.2" />
            <line x1="9" y1="13" x2="5" y2="11" stroke={accentColor} strokeWidth="1" />
            <line x1="19" y1="13" x2="23" y2="11" stroke={accentColor} strokeWidth="1" />

            {/* Periódico / Magazine de Crónicas abierto */}
            <path
              d="M2 21L14 23.5L26 21V34L14 35.5L2 34Z"
              fill={inverted ? "#1C1C1C" : "#FFFFFF"}
              stroke={strokeLine}
              strokeWidth="1.4"
            />
            {/* Encabezado del periódico */}
            <line x1="5" y1="24.5" x2="11" y2="24.8" stroke={accentColor} strokeWidth="1.4" />
            <line x1="17" y1="24.8" x2="23" y2="24.5" stroke={strokeLine} strokeWidth="1" />
            {/* Líneas de texto */}
            <line x1="5" y1="27.5" x2="12" y2="27.8" stroke={strokeLine} strokeWidth="0.8" />
            <line x1="5" y1="30.5" x2="11" y2="30.8" stroke={strokeLine} strokeWidth="0.8" />
            <line x1="16" y1="27.8" x2="23" y2="27.5" stroke={strokeLine} strokeWidth="0.8" />
            <line x1="16" y1="30.8" x2="22" y2="30.5" stroke={strokeLine} strokeWidth="0.8" />
          </g>
        )}

        {/* 5. SHIELD (Políticas de Privacidad) */}
        {pose === "shield" && (
          <g>
            {/* Brazo protector */}
            <path d="M19 19L24 21" stroke={bodyColor} strokeWidth="2.2" strokeLinecap="round" />
            
            {/* Escudo de seguridad heráldico */}
            <path
              d="M23 14L30 11L37 14V23C37 28 30 31.5 30 31.5C30 31.5 23 28 23 23V14Z"
              fill={inverted ? "#1A1A1A" : "#FFFFFF"}
              stroke={strokeLine}
              strokeWidth="1.5"
            />
            {/* Candado dorado de alta seguridad en el centro */}
            <path d="M28.5 20V18C28.5 17 29 16.5 30 16.5C31 16.5 31.5 17 31.5 18V20" stroke={accentColor} strokeWidth="1.2" fill="none" />
            <rect x="27.5" y="20" width="5" height="4.5" rx="1" fill={accentColor} />
            <circle cx="30" cy="22" r="0.6" fill={bodyColor} />
          </g>
        )}

        {/* 6. CORPORATE (Empresa / Términos) */}
        {pose === "corporate" && (
          <g>
            {/* Corbata de ejecutivo coleccionista en oro vinilo */}
            <polygon points="14,19 16,22 15,30 14,32.5 13,30 12,22" fill={accentColor} />
            <circle cx="14" cy="19.5" r="1.2" fill="#D97706" />

            {/* Maletín clásico de piel en mano derecha */}
            <rect
              x="23"
              y="20"
              width="10"
              height="8"
              rx="1.2"
              fill={inverted ? "#252525" : "#1A1A1A"}
              stroke={strokeLine}
              strokeWidth="1.2"
            />
            {/* Hebilla dorada del maletín */}
            <rect x="27.5" y="23" width="1.5" height="1.5" fill={accentColor} />
            <path d="M26 20V18.5H30V20" stroke={strokeLine} strokeWidth="1.2" fill="none" />
          </g>
        )}

      </svg>
    </div>
  );

  return characterSVG;
};
