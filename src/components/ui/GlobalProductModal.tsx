"use client";

import React, { useState } from "react";
import { useProductModalStore } from "@/store/productModalStore";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { useLanguage } from "@/context/LanguageContext";
import { X, ShoppingCart, Plus, Minus } from "lucide-react";

export const GlobalProductModal: React.FC = () => {
  const { isOpen, product, closeModal } = useProductModalStore();
  const { addItem } = useCartStore();
  const { showToast } = useToastStore();
  const { language } = useLanguage();
  const [quantity, setQuantity] = useState(1);

  const isEn = language === "en";

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addItem(
      {
        id: String(product.id),
        type: product.type || "vinyl",
        title: product.title,
        subtitle: product.subtitle || product.categoryLabel || "",
        priceBs: product.priceBs,
        imageOrCover: product.image,
      },
      quantity
    );

    closeModal();
    showToast(product.title);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      onClick={closeModal}
    >
      <div
        className="relative bg-white text-neutral-900 rounded-lg max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          type="button"
          onClick={closeModal}
          aria-label={isEn ? "Close product modal" : "Cerrar modal de producto"}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Imagen del producto sin recortes en contenedor oscuro */}
        <div className="w-full md:w-3/5 bg-neutral-950 flex items-center justify-center p-3 sm:p-8 overflow-hidden select-none shrink-0">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[24vh] sm:max-h-[40vh] md:max-h-[75vh] w-auto max-w-full object-contain rounded drop-shadow-2xl"
          />
        </div>

        {/* Información & Acción de Compra */}
        <div className="w-full md:w-2/5 p-4 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Categoría o formato */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-neutral-600 bg-neutral-100 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded">
                {product.categoryLabel || product.format || (isEn ? "Exclusive Piece" : "Producto Exclusivo")}
              </span>
            </div>

            {/* Título y subtítulo/artista */}
            <h2 className="font-serif text-xl sm:text-3xl font-normal tracking-tight text-neutral-900 leading-snug mb-1">
              {product.title}
            </h2>
            {product.subtitle && (
              <p className="font-sans text-xs sm:text-sm text-neutral-500 font-light mb-2 sm:mb-3">
                {product.subtitle}
              </p>
            )}

            {/* Precio en Bolivianos */}
            <div className="text-xl sm:text-3xl font-bold text-neutral-900 font-mono mb-3 sm:mb-4">
              Bs. {product.priceBs.toLocaleString()}
            </div>

            {/* Descripción */}
            <div className="text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-2 sm:pt-3 mb-4 sm:mb-6">
              {product.description}
            </div>

            {/* Selector de cantidad */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                {isEn ? "Quantity:" : "Cantidad:"}
              </span>
              <div className="inline-flex items-center border border-neutral-200 rounded-md bg-neutral-50">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 hover:bg-neutral-200 text-neutral-700 transition-colors rounded-l-md cursor-pointer"
                  aria-label="Disminuir cantidad"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3.5 py-1 text-sm font-mono font-semibold text-neutral-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 hover:bg-neutral-200 text-neutral-700 transition-colors rounded-r-md cursor-pointer"
                  aria-label="Aumentar cantidad"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Garantías de envío */}
            <div className="space-y-1.5 text-[11px] font-mono text-neutral-500 bg-neutral-50 p-3 rounded border border-neutral-200/60 mb-6">
              <div className="flex justify-between">
                <span>{isEn ? "Availability:" : "Disponibilidad:"}</span>
                <span className="text-emerald-600 font-semibold">{isEn ? "In Stock" : "En Stock"}</span>
              </div>
              <div className="flex justify-between">
                <span>{isEn ? "Shipping:" : "Envío:"}</span>
                <span>{isEn ? "All Bolivia (Nationwide)" : "Toda Bolivia (9 departamentos)"}</span>
              </div>
              <div className="flex justify-between">
                <span>{isEn ? "Packaging:" : "Embalaje:"}</span>
                <span>{isEn ? "Rigid multilayer box" : "Cartón rígido multicapa seguro"}</span>
              </div>
            </div>
          </div>

          {/* BOTÓN PROTAGONISTA: AGREGAR AL CARRITO */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full py-3.5 px-5 rounded-md font-mono text-xs sm:text-sm uppercase tracking-wider font-semibold flex items-center justify-center gap-2.5 transition-all duration-200 bg-black hover:bg-neutral-800 text-white shadow-lg active:scale-98 cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4 stroke-[2]" />
            <span>{isEn ? "Add to Cart" : "Agregar al Carrito"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
