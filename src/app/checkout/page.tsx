"use client";

import React, { useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { useCartStore } from "@/store/cartStore";
import {
  ShieldCheck,
  Check,
  Truck,
  QrCode,
  CreditCard,
  Building,
  Disc,
  PackageCheck,
  Lock
} from "lucide-react";

export default function CheckoutPage() {
  const { items, getSubtotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();
  const freeShipping = subtotal >= 400;
  const shippingCost = items.length === 0 ? 0 : freeShipping ? 0 : 35;
  const total = subtotal + shippingCost;

  const [paymentMethod, setPaymentMethod] = useState<"qr" | "card" | "transfer">("qr");
  const [formData, setFormData] = useState({
    name: "Carlos Morales",
    email: "carlos.morales@example.bo",
    phone: "+591 71234567",
    department: "La Paz",
    city: "La Paz",
    address: "Calle 21 de Calacoto No. 120, Edif. Los Pinos, Apto 4B",
    notes: "Dejar en portería si no respondo el timbre"
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedId = `AV-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderId(generatedId);
      setIsProcessing(false);
      setOrderConfirmed(true);
      clearCart();

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#C89D56", "#C05436", "#5F6B50", "#EDE8DC"]
        });
      } catch {
        // ignore
      }
    }, 1600);
  };

  if (orderConfirmed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8">
        <div className="w-20 h-20 rounded-full bg-[#5F6B50]/20 border-2 border-[#5F6B50] flex items-center justify-center mx-auto text-[#748363]">
          <Check className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-[#C89D56] uppercase tracking-widest font-semibold">
            Pedido Confirmado • Taller Aguja y Vinilo
          </span>
          <h1 className="font-display text-3xl sm:text-4xl text-theme-primary">
            ¡Tu Música está en Camino!
          </h1>
          <p className="text-xs sm:text-sm text-theme-muted max-w-md mx-auto leading-relaxed">
            Número de Guía: <strong className="text-[#C89D56] font-mono text-base">{orderId}</strong>
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-theme-card border border-black/10 dark:border-white/10 text-left text-xs font-mono space-y-3 max-w-md mx-auto shadow-sm">
          <div className="flex justify-between border-b border-black/10 dark:border-white/10 pb-2">
            <span className="text-theme-muted">Destinatario:</span>
            <span className="text-theme-primary">{formData.name}</span>
          </div>
          <div className="flex justify-between border-b border-black/10 dark:border-white/10 pb-2">
            <span className="text-theme-muted">Destino:</span>
            <span className="text-theme-primary">{formData.department} — {formData.address}</span>
          </div>
          <div className="flex justify-between border-b border-black/10 dark:border-white/10 pb-2">
            <span className="text-theme-muted">Método de Pago:</span>
            <span className="text-[#C89D56] uppercase font-bold">{paymentMethod === "qr" ? "QR Simple (Validado)" : paymentMethod}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-theme-muted">Total Pagado:</span>
            <span className="text-theme-primary font-bold text-sm">{total} Bs</span>
          </div>
        </div>

        <p className="text-xs text-theme-muted max-w-sm mx-auto">
          Te enviamos el comprobante y el seguimiento a tu correo <strong className="text-theme-primary">{formData.email}</strong> y por WhatsApp a <strong className="text-[#C89D56]">{formData.phone}</strong>.
        </p>

        <div className="pt-4">
          <Link
            href="/catalogo"
            className="px-6 py-3 rounded-lg bg-[#C89D56] hover:bg-[#DDB36D] text-[#0E0E0C] font-semibold text-xs inline-flex items-center gap-2 shadow-md"
          >
            <Disc className="w-4 h-4" />
            <span>Volver a la Batea de Vinilos</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* HEADER */}
      <div className="space-y-2 border-b border-black/10 dark:border-white/10 pb-6">
        <span className="text-xs font-mono text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22] uppercase tracking-widest flex items-center gap-1.5 font-semibold">
          <Lock className="w-3.5 h-3.5" />
          <span>Finalizar Compra • Despacho Asegurado en Bolivia</span>
        </span>
        <h1 className="font-display text-3xl sm:text-4xl text-theme-primary">
          Caja & Checkout
        </h1>
      </div>

      <form onSubmit={handleCompleteOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LEFT COLUMN: SHIPPING AND PAYMENT FORM */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. DATOS DE DESPACHO */}
          <div className="p-8 rounded-2xl bg-theme-card border border-black/10 dark:border-white/10 space-y-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-display font-medium text-theme-primary border-b border-black/10 dark:border-white/10 pb-3">
              <Truck className="w-4 h-4 text-[#C89D56]" />
              <span>1. Dirección de Entrega en Bolivia</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-theme-muted uppercase">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-theme-primary focus:border-[#C89D56] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-theme-muted uppercase">Teléfono / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-theme-primary focus:border-[#C89D56] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-theme-muted uppercase">Correo Electrónico *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-theme-primary focus:border-[#C89D56] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-theme-muted uppercase">Departamento *</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-theme-primary focus:border-[#C89D56] focus:outline-none"
                >
                  <option value="La Paz">La Paz</option>
                  <option value="Santa Cruz">Santa Cruz</option>
                  <option value="Cochabamba">Cochabamba</option>
                  <option value="Chuquisaca">Chuquisaca (Sucre)</option>
                  <option value="Tarija">Tarija</option>
                  <option value="Oruro">Oruro</option>
                  <option value="Potosí">Potosí</option>
                  <option value="Beni">Beni</option>
                  <option value="Pando">Pando</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-theme-muted uppercase">Dirección de Despacho *</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Calle, número, edificio, piso o zona"
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-theme-primary focus:border-[#C89D56] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-theme-muted uppercase">Indicaciones de Entrega</label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Referencias del domicilio"
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-theme-primary focus:border-[#C89D56] focus:outline-none"
              />
            </div>
          </div>

          {/* 2. MÉTODO DE PAGO */}
          <div className="p-8 rounded-2xl bg-theme-card border border-black/10 dark:border-white/10 space-y-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-display font-medium text-theme-primary border-b border-black/10 dark:border-white/10 pb-3">
              <CreditCard className="w-4 h-4 text-[#C89D56]" />
              <span>2. Forma de Pago Nacional</span>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("qr")}
                className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === "qr"
                    ? "bg-[#C89D56]/15 border-[#C89D56] text-[#C89D56] shadow-sm font-semibold"
                    : "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 text-theme-muted hover:text-theme-primary"
                }`}
              >
                <QrCode className="w-6 h-6" />
                <span className="text-xs font-mono">QR Simple</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("transfer")}
                className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === "transfer"
                    ? "bg-[#C89D56]/15 border-[#C89D56] text-[#C89D56] shadow-sm font-semibold"
                    : "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 text-theme-muted hover:text-theme-primary"
                }`}
              >
                <Building className="w-6 h-6" />
                <span className="text-xs font-mono">Transferencia</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === "card"
                    ? "bg-[#C89D56]/15 border-[#C89D56] text-[#C89D56] shadow-sm font-semibold"
                    : "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 text-theme-muted hover:text-theme-primary"
                }`}
              >
                <CreditCard className="w-6 h-6" />
                <span className="text-xs font-mono">Tarjeta</span>
              </button>
            </div>

            {/* Dynamic Payment Details Render */}
            {paymentMethod === "qr" && (
              <div className="p-6 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-4 text-center">
                <span className="text-xs font-mono text-[#C89D56] uppercase tracking-wider block font-semibold">
                  Pago Inmediato con QR Simple Bolivia
                </span>
                <div className="w-44 h-44 mx-auto bg-white p-3 rounded-xl flex items-center justify-center shadow-lg border-2 border-[#C89D56]/30">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                    <rect x="0" y="0" width="100" height="100" fill="white" />
                    <rect x="10" y="10" width="25" height="25" fill="black" />
                    <rect x="15" y="15" width="15" height="15" fill="white" />
                    <rect x="18" y="18" width="9" height="9" fill="black" />
                    <rect x="65" y="10" width="25" height="25" fill="black" />
                    <rect x="70" y="15" width="15" height="15" fill="white" />
                    <rect x="73" y="18" width="9" height="9" fill="black" />
                    <rect x="10" y="65" width="25" height="25" fill="black" />
                    <rect x="15" y="70" width="15" height="15" fill="white" />
                    <rect x="18" y="73" width="9" height="9" fill="black" />
                    <circle cx="50" cy="50" r="8" fill="#C89D56" />
                  </svg>
                </div>
                <p className="text-[11px] text-theme-muted font-mono max-w-sm mx-auto">
                  Acepta BNB, BCP, Banco Unión, Banco FIE, Mercantil Santa Cruz, Ganadero, Sol y billeteras Yape / Simple.
                </p>
              </div>
            )}

            {paymentMethod === "transfer" && (
              <div className="p-5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono space-y-2 text-theme-muted">
                <div className="flex justify-between">
                  <span>Banco:</span>
                  <span className="text-theme-primary font-bold">Banco Nacional de Bolivia (BNB)</span>
                </div>
                <div className="flex justify-between">
                  <span>Titular:</span>
                  <span className="text-theme-primary">Aguja y Vinilo S.R.L.</span>
                </div>
                <div className="flex justify-between">
                  <span>No. Cuenta en Bs:</span>
                  <span className="text-[#C89D56] font-bold">150-1892837-01</span>
                </div>
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="p-5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono space-y-2 text-theme-muted text-center">
                <p>Pasarela segura CyberSource / Red Enlace para tarjetas Visa y Mastercard emitidas en Bolivia y el extranjero.</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-2xl bg-theme-card border border-black/10 dark:border-white/10 space-y-6 shadow-sm">
            <h3 className="font-display text-xl text-theme-primary border-b border-black/10 dark:border-white/10 pb-3">
              Resumen del Pedido ({items.length} artículos)
            </h3>

            {/* Items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.length === 0 ? (
                <p className="text-xs text-theme-muted py-4 text-center font-mono">
                  No hay artículos en tu batea de compra.
                </p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs border-b border-black/5 dark:border-white/5 pb-2">
                    <div className="min-w-0 pr-3">
                      <strong className="block text-theme-primary truncate">{item.title}</strong>
                      <span className="text-[11px] text-theme-muted truncate block">{item.subtitle}</span>
                      <span className="text-[10px] text-theme-muted">Cant: {item.quantity}</span>
                    </div>
                    <span className="font-mono font-bold text-theme-primary shrink-0">
                      {item.priceBs * item.quantity} Bs
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Costs calculation */}
            <div className="space-y-2 pt-2 border-t border-black/10 dark:border-white/10 text-xs font-mono text-theme-muted">
              <div className="flex justify-between">
                <span>Subtotal productos:</span>
                <span className="text-theme-primary font-bold">{subtotal} Bs</span>
              </div>
              <div className="flex justify-between">
                <span>Despacho asegurado:</span>
                <span className={freeShipping ? "text-[#5F6B50] font-bold" : "text-theme-primary font-bold"}>
                  {freeShipping ? "GRATIS" : `${shippingCost} Bs`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-theme-primary pt-2 border-t border-black/10 dark:border-white/10">
                <span>Total a Pagar:</span>
                <span className="text-[#C89D56] font-mono text-lg">{total} Bs</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing || items.length === 0}
              className="w-full py-4 rounded-lg bg-[#C89D56] hover:bg-[#DDB36D] text-[#0E0E0C] font-semibold text-xs flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] shadow-xl disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Disc className="w-4 h-4 animate-spin" />
                  <span>Procesando Despacho...</span>
                </>
              ) : (
                <>
                  <PackageCheck className="w-4 h-4" />
                  <span>Confirmar Pedido ({total} Bs)</span>
                </>
              )}
            </button>

            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-[#5F6B50] justify-center">
              <ShieldCheck className="w-4 h-4" />
              <span>Transacción encriptada y protegida</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
