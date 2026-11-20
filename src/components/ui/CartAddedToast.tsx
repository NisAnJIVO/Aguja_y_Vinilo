"use client";

import React from "react";
import { useToastStore } from "@/store/toastStore";
import { VinylFriendGift } from "@/components/ui/VinylFriendGift";
import { ShoppingCart } from "lucide-react";

export const CartAddedToast: React.FC = () => {
  const { isVisible } = useToastStore();

  if (!isVisible) return null;

  return (
    <div
      aria-live="polite"
      className="fixed inset-0 z-[120] backdrop-blur-md bg-white/75 flex flex-col items-center justify-center pointer-events-none select-none transition-opacity duration-200 animate-in fade-in"
    >
      {/* Pista del muñequito corriendo con el producto hacia el carrito (sin texto) */}
      <div className="relative w-64 h-24 mx-auto flex items-center justify-between border-b-2 border-black/20 pb-2 animate-in zoom-in-95 duration-200">
        <div className="animate-[runAcross_1.2s_ease-in-out_infinite] transform">
          <VinylFriendGift size={76} isRunning={true} />
        </div>
        <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shrink-0 shadow-md">
          <ShoppingCart className="w-6 h-6 stroke-[2]" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes runAcross {
          0% {
            transform: translateX(0px) rotate(-3deg);
          }
          50% {
            transform: translateX(55px) rotate(4deg);
          }
          100% {
            transform: translateX(110px) rotate(-3deg);
          }
        }
      `}</style>
    </div>
  );
};
