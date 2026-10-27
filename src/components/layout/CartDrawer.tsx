"use client";

import React from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { X, Trash2, Plus, Minus, ArrowRight, Disc, Truck } from "lucide-react";

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getSubtotal } = useCartStore();

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const freeShippingThreshold = 400;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          aria-label="Carrito de compras"
          className="w-screen max-w-md bg-[#12110F] border-l border-white/10 shadow-2xl flex flex-col justify-between text-[#F6F3EC]"
        >
          {/* HEADER */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Disc className="w-5 h-5 text-[#C89D56]" />
              <h2 className="font-display font-semibold text-lg">Tu Colección Seleccionada</h2>
            </div>
            <button
              onClick={closeCart}
              aria-label="Cerrar carrito"
              className="p-1.5 rounded-full text-[#8B826B] hover:text-[#F6F3EC] hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* FREE SHIPPING PROGRESS BAR */}
          <div className="bg-[#1A1916] px-6 py-3 border-b border-white/5">
            <div className="flex items-center gap-2 text-xs text-[#C3B9A1] mb-2">
              <Truck className="w-4 h-4 text-[#C89D56]" />
              {isFreeShipping ? (
                <span className="text-[#C89D56] font-semibold">
                  ¡Tienes envío gratuito a toda Bolivia!
                </span>
              ) : (
                <span>
                  Agrega <strong className="text-[#F6F3EC]">{amountForFreeShipping} Bs</strong> más para envío gratuito
                </span>
              )}
            </div>
            <div className="w-full bg-[#282722] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#C89D56] h-full transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>

          {/* ITEMS LIST */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <Disc className="w-12 h-12 text-[#2B2A25] mx-auto animate-spin-slow" />
                <p className="text-[#8B826B] text-sm">Tu bandeja de discos está vacía.</p>
                <Link
                  href="/catalogo"
                  onClick={closeCart}
                  className="inline-block px-4 py-2 rounded bg-[#C89D56] text-[#0E0E0C] text-xs font-semibold hover:bg-[#DDB36D] transition-colors"
                >
                  Explorar Catálogo
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-lg bg-[#181714] border border-white/5 items-center justify-between"
                >
                  {/* Thumbnail / Disc Icon */}
                  <div className="w-12 h-12 rounded bg-[#282722] flex items-center justify-center shrink-0 border border-white/5">
                    <Disc className="w-6 h-6 text-[#C89D56]" />
                  </div>

                  {/* Title & Price */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-medium text-xs sm:text-sm text-[#F6F3EC] truncate">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-[#8B826B] truncate">{item.subtitle}</p>
                    <p className="text-xs font-mono font-semibold text-[#C89D56] mt-0.5">
                      {item.priceBs} Bs
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-white/10 rounded bg-[#100F0E]">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label={`Reducir cantidad de ${item.title}`}
                        className="p-1 hover:text-[#C89D56] transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono px-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label={`Aumentar cantidad de ${item.title}`}
                        className="p-1 hover:text-[#C89D56] transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label={`Eliminar ${item.title} del carrito`}
                      className="p-1 text-[#8B826B] hover:text-[#C05436] transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* FOOTER & CHECKOUT */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#0E0E0C] space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#8B826B]">Subtotal estimado</span>
                <span className="font-display font-bold text-xl text-[#F6F3EC]">
                  {subtotal} Bs
                </span>
              </div>
              <p className="text-[11px] text-[#6F6B60]">
                Incluye embalaje protector en cartón rígido multicapa y seguro contra roturas.
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-3.5 rounded-lg bg-[#C89D56] hover:bg-[#DDB36D] text-[#0E0E0C] font-semibold text-sm flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-xl"
              >
                <span>Proceder al Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
