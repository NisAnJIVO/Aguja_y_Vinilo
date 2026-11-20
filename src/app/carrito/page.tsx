"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import { useOrdersStore } from "@/store/ordersStore";
import { useLanguage } from "@/context/LanguageContext";
import { VinylFriendGift } from "@/components/ui/VinylFriendGift";
import { VinylCharacter } from "@/components/ui/VinylCharacter";
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Lock,
  CreditCard,
  Disc,
  Search,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  QrCode,
  Clock,
  X,
} from "lucide-react";

export default function CarritoPage() {
  const { t } = useLanguage();
  const { items, updateQuantity, removeItem, clearCart, getSubtotal, getTotalItems } =
    useCartStore();
  const { subscribe } = useSubscriptionStore();
  const { orders, addOrder } = useOrdersStore();

  const [formData, setFormData] = useState({
    nombreTitular: "",
    numeroTarjeta: "",
    expiracion: "",
    cvc: "",
    ciudad: "Sucre",
    direccion: "",
    telefono: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [metodoPago, setMetodoPago] = useState<"tarjeta" | "qr" | "paypal">("tarjeta");
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrCountdown, setQrCountdown] = useState(30);
  const [orderSummary, setOrderSummary] = useState<{
    id: string;
    total: number;
    itemsCount: number;
    ciudad: string;
    isSubscription: boolean;
    metodoPago?: string;
  } | null>(null);

  const [trackingCodeInput, setTrackingCodeInput] = useState("");
  // Cuando hay productos en el carrito, el historial inicia plegado; cuando el carrito está vacío, inicia visible
  const [showHistoryWithItems, setShowHistoryWithItems] = useState(false);

  // Temporizador para el código QR (30 segundos de vigencia oficial)
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showQrModal && qrCountdown > 0) {
      timer = setTimeout(() => {
        setQrCountdown((prev) => prev - 1);
      }, 1000);
    } else if (showQrModal && qrCountdown === 0) {
      // Al completarse los 30 segundos, efectúa la confirmación del pago
      completarOrden("QR Simple");
      setShowQrModal(false);
    }
    return () => clearTimeout(timer);
  }, [showQrModal, qrCountdown]);

  // Scroll inmediato al tope absoluto al mostrar la pantalla de éxito
  React.useEffect(() => {
    if (isSuccess) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (
        typeof window !== "undefined" &&
        (window as unknown as { __lenis?: { scrollTo: (y: number, opts: unknown) => void } }).__lenis
      ) {
        (window as unknown as { __lenis?: { scrollTo: (y: number, opts: unknown) => void } }).__lenis?.scrollTo(
          0,
          { immediate: true, force: true }
        );
      }
    }
  }, [isSuccess]);

  const subtotal = getSubtotal();
  const totalItems = getTotalItems();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  // Formateador automático de tarjeta (bloques de 4 dígitos)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, "$1 ");
    handleInputChange("numeroTarjeta", formatted);
  };

  // Formateador automático de vencimiento (MM/AA)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (raw.length >= 3) {
      raw = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    handleInputChange("expiracion", raw);
  };

  // Formateador de CVC (3 a 4 dígitos numéricos)
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    handleInputChange("cvc", raw);
  };

  // Validación estricta antes de procesar el pago
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.nombreTitular.trim() || formData.nombreTitular.trim().length < 3) {
      errors.nombreTitular = "Por favor ingresa tu nombre completo";
    }

    if (metodoPago === "tarjeta") {
      const cleanCard = formData.numeroTarjeta.replace(/\D/g, "");
      if (cleanCard.length < 15) {
        errors.numeroTarjeta = "Ingresa los 16 dígitos de tu tarjeta";
      }

      if (!/^\d{2}\/\d{2}$/.test(formData.expiracion.trim())) {
        errors.expiracion = "Ingresa fecha de vencimiento (MM/AA)";
      }

      const cleanCvc = formData.cvc.replace(/\D/g, "");
      if (cleanCvc.length < 3) {
        errors.cvc = "Ingresa los 3 dígitos de seguridad";
      }
    }

    if (!formData.telefono.trim() || formData.telefono.trim().length < 7) {
      errors.telefono = "Ingresa un número de teléfono o WhatsApp válido";
    }

    if (!formData.direccion.trim() || formData.direccion.trim().length < 5) {
      errors.direccion = "Ingresa tu dirección completa de entrega o terminal";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Bloqueo total de tecla Enter para evitar compras accidentales a medio escribir
  const handlePreventEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const completarOrden = (metodoUtilizado: string = metodoPago) => {
    // Verificar si es exclusivamente suscripción o si incluye productos físicos
    const subItem = items.find(
      (i) => i.type === "subscription" || i.id === "sub-miembro-plus"
    );
    const isOnlySubscription = Boolean(subItem && items.length === 1);

    // Si incluye suscripción, activar de inmediato la membresía Miembro Plus
    if (subItem) {
      subscribe({
        nombre: formData.nombreTitular || "Coleccionista",
        ciudad: formData.ciudad,
        direccion: formData.direccion,
        telefono: formData.telefono,
      });
    }

    // Si es SOLO suscripción, NO genera código de despacho ni paquete con estados de envío
    let generatedId = "";
    if (!isOnlySubscription) {
      const physicalItems = items.filter(
        (i) => i.type !== "subscription" && i.id !== "sub-miembro-plus"
      );
      const savedOrder = addOrder({
        id: `AV-${Math.floor(100000 + Math.random() * 900000)}`,
        total: subtotal,
        itemsCount: physicalItems.reduce((acc, curr) => acc + curr.quantity, 0),
        ciudad: formData.ciudad,
        direccion: formData.direccion || "Dirección no especificada",
        telefono: formData.telefono || "+591 68610314",
        items: physicalItems.map((i) => ({
          id: i.id,
          title: i.title,
          subtitle: i.subtitle,
          priceBs: i.priceBs,
          quantity: i.quantity,
        })),
      });
      generatedId = savedOrder.id;
    }

    setOrderSummary({
      id: generatedId,
      total: subtotal,
      itemsCount: totalItems,
      ciudad: formData.ciudad,
      isSubscription: isOnlySubscription,
      metodoPago: metodoUtilizado,
    });

    setIsProcessing(false);
    setIsSuccess(true);
    clearCart();

    // Reset de scroll inmediato en el momento del pago
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (
      typeof window !== "undefined" &&
      (window as unknown as { __lenis?: { scrollTo: (y: number, opts: unknown) => void } }).__lenis
    ) {
      (window as unknown as { __lenis?: { scrollTo: (y: number, opts: unknown) => void } }).__lenis?.scrollTo(
        0,
        { immediate: true, force: true }
      );
    }
  };

  const handlePayment = () => {
    if (items.length === 0) return;

    if (!validateForm()) {
      return;
    }

    if (metodoPago === "tarjeta") {
      setIsProcessing(true);
      setTimeout(() => {
        completarOrden("Tarjeta Bancaria");
      }, 1200);
    } else if (metodoPago === "qr") {
      setQrCountdown(30);
      setShowQrModal(true);
    } else if (metodoPago === "paypal") {
      setIsProcessing(true);
      const usdAmount = (subtotal / 6.96).toFixed(2);
      const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=jivo3534@gmail.com&item_name=Aguja+y+Vinilo+-+Coleccion+de+Vinilos&amount=${usdAmount}&currency_code=USD`;
      window.open(paypalUrl, "_blank", "noopener,noreferrer");
      setTimeout(() => {
        completarOrden("PayPal");
      }, 1500);
    }
  };

  // =========================================================================
  // VISTA DE ÉXITO DE COMPRA
  // =========================================================================
  if (isSuccess && orderSummary) {
    return (
      <main className="w-full min-h-screen bg-white text-black pt-10 sm:pt-16 pb-20 px-4 sm:px-8 lg:px-12 flex flex-col items-center justify-start">
        <div className="w-full max-w-xl mx-auto bg-white p-8 sm:p-12 border border-black/15 text-center animate-in fade-in zoom-in-95 duration-300">
          <div className="flex justify-center mb-5">
            <VinylCharacter size={95} pose="headphones" />
          </div>

          {orderSummary.isSubscription ? (
            <>
              <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-neutral-900 mb-2">
                ¡Membresía Plus Confirmada!
              </h1>
              <p className="font-sans text-sm text-neutral-600 mb-8 font-light">
                Ya eres Miembro Plus. Tu suscripción mensual está activa.
              </p>

              <div className="bg-neutral-50 rounded-md p-5 border border-neutral-200/70 text-left space-y-2.5 text-xs font-mono mb-8">
                <div className="flex justify-between border-b border-neutral-200/60 pb-2">
                  <span className="text-neutral-500">Plan:</span>
                  <span className="font-bold text-neutral-900">Club Miembro Plus</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200/60 pb-2">
                  <span className="text-neutral-500">Mensualidad:</span>
                  <span className="font-bold text-neutral-900">Bs. {orderSummary.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200/60 pb-2">
                  <span className="text-neutral-500">Método de Pago:</span>
                  <span className="font-bold text-neutral-900">{orderSummary.metodoPago || "Tarjeta Bancaria"}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200/60 pb-2">
                  <span className="text-neutral-500">Beneficio:</span>
                  <span className="text-neutral-800">3 vinilos al mes (1 por semana)</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-neutral-500">Ciudad de Despacho:</span>
                  <span className="text-neutral-900 font-bold">{orderSummary.ciudad}, Bolivia</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/suscripcion"
                  className="py-3 px-6 bg-black hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider rounded transition-colors"
                >
                  Ir a mi Panel de Miembro Plus
                </Link>
                <Link
                  href="/discos"
                  className="py-3 px-6 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-mono text-xs uppercase tracking-wider rounded transition-colors border border-neutral-300"
                >
                  Ver Catálogo de Discos
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-neutral-900 mb-2">
                ¡Pago Recibido con Éxito!
              </h1>
              <p className="font-sans text-sm text-neutral-600 mb-8 font-light">
                Tu transacción ha sido procesada correctamente y tu pedido está confirmado.
              </p>

              <div className="bg-neutral-50 rounded-md p-5 border border-neutral-200/70 text-left space-y-2.5 text-xs font-mono mb-8">
                <div className="flex justify-between border-b border-neutral-200/60 pb-2">
                  <span className="text-neutral-500">Número de Pedido:</span>
                  <span className="font-bold text-neutral-900">{orderSummary.id}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200/60 pb-2">
                  <span className="text-neutral-500">Total Pagado:</span>
                  <span className="font-bold text-neutral-900">Bs. {orderSummary.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200/60 pb-2">
                  <span className="text-neutral-500">Método de Pago:</span>
                  <span className="font-bold text-neutral-900">{orderSummary.metodoPago || "Tarjeta Bancaria"}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200/60 pb-2">
                  <span className="text-neutral-500">Artículos adquiridos:</span>
                  <span className="text-neutral-800">{orderSummary.itemsCount} productos</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-neutral-500">Destino de Envío:</span>
                  <span className="text-neutral-800">{orderSummary.ciudad}, Bolivia</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/discos"
                  className="py-3 px-6 bg-black hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider rounded transition-colors"
                >
                  Explorar Más Discos
                </Link>
                <Link
                  href="/"
                  className="py-3 px-6 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-mono text-xs uppercase tracking-wider rounded transition-colors border border-neutral-300"
                >
                  Ir al Inicio
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    );
  }

  // =========================================================================
  // SECCIÓN BRUTALISTA DE HISTORIAL DE COMPRAS (COMPONENTE REUTILIZABLE)
  // =========================================================================
  const renderBrutalistOrderHistory = () => (
    <section className="mt-8 pt-8 border-t-2 border-black animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
            Registro Oficial • Aguja &amp; Vinilo
          </span>
          <h3 className="font-mono text-sm sm:text-base font-bold uppercase tracking-wider text-black">
            {t.cart.historyTitle}
          </h3>
        </div>

        {/* Buscador directo brutalista */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!trackingCodeInput.trim()) return;
            window.location.href = `/estado-pedido?codigo=${encodeURIComponent(
              trackingCodeInput.trim()
            )}`;
          }}
          className="flex items-center border border-black max-w-xs w-full bg-white"
        >
          <input
            type="text"
            value={trackingCodeInput}
            onChange={(e) => setTrackingCodeInput(e.target.value)}
            placeholder="Código AV-000000"
            className="flex-1 bg-transparent px-3 py-1.5 text-xs font-mono uppercase focus:outline-none"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-black text-white font-mono text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer shrink-0"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {orders.length === 0 ? (
        <div className="py-8 px-4 border border-dashed border-neutral-300 text-center font-mono text-xs text-neutral-500 bg-white">
          No hay pedidos registrados en este navegador aún.
        </div>
      ) : (
        <>
          {/* VISTA MÓVIL (TARJETAS COMPACTAS SIN SCROLL HORIZONTAL) */}
          <div className="sm:hidden space-y-3 font-mono text-xs">
            {orders.map((ord) => (
              <div key={ord.id} className="p-3.5 bg-white border border-black/15 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-neutral-900">{ord.id}</span>
                  <span className="text-neutral-500 text-[11px]">{ord.fechaFormatted}</span>
                </div>
                <div className="text-neutral-700 text-xs truncate">
                  {ord.items && ord.items.length > 0
                    ? ord.items.map((i) => i.title).join(", ")
                    : `${ord.itemsCount} productos`}
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500 text-[11px]">{ord.ciudad}</span>
                    <span className="font-bold text-neutral-900">Bs. {ord.total.toLocaleString()}</span>
                  </div>
                  <Link
                    href={`/estado-pedido?codigo=${ord.id}`}
                    className="inline-block py-1 px-2.5 bg-black hover:bg-neutral-800 text-white font-mono text-[11px] uppercase tracking-wider transition-colors"
                  >
                    Rastrear &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* VISTA DESKTOP (TABLA CLÁSICA) */}
          <div className="hidden sm:block w-full overflow-x-auto bg-white border border-black/15">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-black text-[11px] uppercase tracking-wider bg-neutral-100 text-neutral-600">
                  <th className="py-2.5 px-3 font-bold">CÓDIGO</th>
                  <th className="py-2.5 px-3">FECHA</th>
                  <th className="py-2.5 px-3">PRODUCTOS</th>
                  <th className="py-2.5 px-3">DESTINO</th>
                  <th className="py-2.5 px-3 text-right">TOTAL</th>
                  <th className="py-2.5 px-3 text-right">ACCIÓN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3 px-3 font-bold text-neutral-900">{ord.id}</td>
                    <td className="py-3 px-3 text-neutral-500 whitespace-nowrap">{ord.fechaFormatted}</td>
                    <td className="py-3 px-3 text-neutral-800 max-w-[200px] truncate">
                      {ord.items && ord.items.length > 0
                        ? ord.items.map((i) => i.title).join(", ")
                        : `${ord.itemsCount} productos`}
                    </td>
                    <td className="py-3 px-3 text-neutral-700 whitespace-nowrap">{ord.ciudad}</td>
                    <td className="py-3 px-3 font-bold text-neutral-900 text-right whitespace-nowrap">
                      Bs. {ord.total.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <Link
                        href={`/estado-pedido?codigo=${ord.id}`}
                        className="inline-block py-1 px-2.5 bg-black hover:bg-neutral-800 text-white font-mono text-[11px] uppercase tracking-wider transition-colors"
                      >
                        Rastrear &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );

  // =========================================================================
  // PANTALLA PRINCIPAL DEL CARRITO
  // =========================================================================
  return (
    <main className="w-full min-h-screen bg-white text-black py-10 sm:py-16 px-4 sm:px-8 lg:px-14">
      <div className="w-full max-w-[1540px] mx-auto">
        {/* Encabezado sin botón redundante */}
        <div className="mb-6 sm:mb-8 border-b border-black/10 pb-4 flex items-end justify-between gap-4">
          <div>
            <Link
              href="/discos"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-neutral-500 hover:text-black mb-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> {t.cart.continueShopping}
            </Link>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-black">
              {t.cart.title}
            </h1>
          </div>
          {items.length > 0 && (
            <span className="text-xs font-mono text-neutral-500 bg-neutral-100 px-3 py-1.5 border border-black/10">
              {totalItems} {totalItems === 1 ? "artículo" : "artículos"}
            </span>
          )}
        </div>

        {/* ESTADO VACÍO: Con nuestro amiguito de protagonista y enlaces rápidos */}
        {items.length === 0 ? (
          <div className="space-y-8">
            <div className="w-full py-6 px-6 sm:px-8 bg-white border border-black/15 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <VinylCharacter size={85} pose="headphones" />
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-normal text-neutral-900">
                    {t.cart.emptyTitle}
                  </h2>
                  <p className="text-xs font-mono text-neutral-500 mt-0.5">
                    {t.cart.emptyText}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono uppercase">
                <Link
                  href="/discos"
                  className="py-2 px-4 bg-black hover:bg-neutral-800 text-white transition-colors"
                >
                  Discos
                </Link>
                <Link
                  href="/tocadiscos"
                  className="py-2 px-4 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 transition-colors"
                >
                  Tocadiscos
                </Link>
                <Link
                  href="/racks"
                  className="py-2 px-4 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 transition-colors"
                >
                  Muebles
                </Link>
                <Link
                  href="/extras"
                  className="py-2 px-4 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 transition-colors"
                >
                  Extras
                </Link>
              </div>
            </div>

            {/* Cuando el carrito está vacío, el historial se muestra de forma directa y visible aquí abajo */}
            {renderBrutalistOrderHistory()}
          </div>
        ) : (
          /* GRILLA DE 2 COLUMNAS: ITEMS Y FORMULARIO DE PAGO */
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
              {/* COLUMNA IZQUIERDA: LISTA DE PRODUCTOS (7 COLS) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg p-4 sm:p-5 border border-black/5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
                    >
                      {/* Imagen del producto */}
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded bg-neutral-100 overflow-hidden shrink-0 border border-black/5 flex items-center justify-center relative">
                          {item.type === "subscription" || item.id === "sub-miembro-plus" ? (
                            <div className="w-full h-full bg-black flex items-center justify-center p-2.5">
                              <VinylFriendGift size={62} inverted={true} />
                            </div>
                          ) : typeof item.imageOrCover === "string" ? (
                            <img
                              src={item.imageOrCover}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Disc className="w-8 h-8 text-neutral-400" />
                          )}
                        </div>

                        {/* Detalles del producto */}
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-0.5 truncate">
                            {item.subtitle || "Producto Aguja & Vinilo"}
                          </span>
                          <h3 className="font-serif text-base sm:text-lg font-normal text-neutral-900 leading-snug truncate">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm font-mono font-semibold text-neutral-800 mt-1">
                            Bs. {item.priceBs.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Controles de Cantidad y Eliminación */}
                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                        {item.type === "subscription" || item.id === "sub-miembro-plus" ? (
                          <div className="font-mono text-xs text-neutral-500 bg-neutral-100 px-3 py-1.5 rounded border border-neutral-200/80">
                            1 Suscripción Mensual
                          </div>
                        ) : (
                          <div className="inline-flex items-center border border-neutral-200 rounded-md bg-neutral-50">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1.5 hover:bg-neutral-200 text-neutral-700 transition-colors rounded-l-md"
                              aria-label={`Reducir ${item.title}`}
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-mono font-semibold text-neutral-900">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1.5 hover:bg-neutral-200 text-neutral-700 transition-colors rounded-r-md"
                              aria-label={`Aumentar ${item.title}`}
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}

                        {/* Total por ítem */}
                        <div className="text-right min-w-[80px]">
                          <span className="text-xs sm:text-sm font-bold font-mono text-neutral-900 block">
                            Bs. {(item.priceBs * item.quantity).toLocaleString()}
                          </span>
                        </div>

                        {/* Botón eliminar */}
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          title="Eliminar producto"
                          aria-label={`Eliminar ${item.title}`}
                          className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botón vaciar carrito */}
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs font-mono text-neutral-500 hover:text-red-600 transition-colors underline cursor-pointer"
                  >
                    Vaciar todo el carrito
                  </button>
                </div>
              </div>

              {/* COLUMNA DERECHA: FINALIZAR COMPRA & PAGO BANCARIO (5 COLS) */}
              <div
                className="lg:col-span-5 bg-white p-6 sm:p-8 border border-black/15"
                onKeyDownCapture={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
              >
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-6">
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-normal text-neutral-900">
                      Finalizar Pedido
                    </h2>
                    <span className="text-xs text-neutral-500">
                      Envío asegurado a toda Bolivia
                    </span>
                  </div>

                  {/* Logos decorativos */}
                  <div className="flex items-center gap-1.5">
                    <div className="h-6 px-2 bg-white rounded border border-neutral-200 flex items-center justify-center shadow-xs">
                      <svg viewBox="0 0 36 12" className="h-3 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.9 0.5L9.3 11.5H6.3L3.8 2.6C3.7 2.1 3.5 1.7 3.1 1.5C2.5 1.1 1.5 0.8 0.5 0.6L0.6 0.2H5.1C5.7 0.2 6.3 0.6 6.4 1.3L7.6 7.8L11.3 0.5H13.9ZM26.2 7.8C26.2 4.8 22.1 4.7 22.1 3.3C22.1 2.9 22.5 2.4 23.4 2.3C23.9 2.2 25.2 2.2 26.6 2.8L27.1 0.7C26.4 0.4 25.4 0.2 24.2 0.2C21.3 0.2 19.3 1.8 19.3 4C19.3 5.6 20.8 6.5 21.9 7.1C23 7.6 23.4 8 23.4 8.5C23.4 9.3 22.4 9.7 21.5 9.7C19.9 9.7 19.1 9.4 17.9 8.9L17.4 11.2C18.3 11.6 19.8 11.9 21.3 11.9C24.4 11.9 26.2 10.3 26.2 7.8ZM33.9 11.5H36.5L34.2 0.5H31.9C31.3 0.5 30.9 0.8 30.7 1.3L26.2 11.5H29.1L29.7 9.9H33.2L33.9 11.5ZM30.5 7.6L31.9 3.6L32.7 7.6H30.5ZM18.9 0.5L16.6 11.5H13.9L16.2 0.5H18.9Z" fill="#1A1F71"/>
                      </svg>
                    </div>
                    <div className="h-6 px-2 bg-white rounded border border-neutral-200 flex items-center justify-center shadow-xs">
                      <svg viewBox="0 0 32 20" className="h-3.5 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="11" cy="10" r="9" fill="#EB001B"/>
                        <circle cx="21" cy="10" r="9" fill="#F79E1B"/>
                        <path d="M16 3.6A9 9 0 0 0 16 16.4A9 9 0 0 0 16 3.6Z" fill="#FF5F00"/>
                      </svg>
                    </div>
                    <div className="h-6 px-1.5 bg-[#006FCF] rounded flex items-center justify-center shadow-xs text-white font-black text-[9px] tracking-tight">
                      AMEX
                    </div>
                  </div>
                </div>

                {/* Totales */}
                <div className="space-y-2.5 text-xs font-mono text-neutral-600 pb-5 border-b border-neutral-100">
                  <div className="flex justify-between">
                    <span>{t.cart.subtotal} ({totalItems} items):</span>
                    <span className="font-semibold text-neutral-900">
                      Bs. {subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.cart.shipping}:</span>
                    <span className="font-semibold text-neutral-900">{t.cart.shippingFree}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.cart.packaging}:</span>
                    <span className="font-semibold text-neutral-900">{t.cart.packagingIncluded}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-neutral-900 pt-2 border-t border-neutral-100">
                    <span>{t.cart.total}:</span>
                    <span className="text-lg">Bs. {subtotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* CONTENEDOR DE PAGO (SIN FORM NATIVO, CON ATRIBUTOS NEUTRALES) */}
                <div className="mt-6 space-y-4">
                  {/* SELECTOR DE MÉTODO DE PAGO */}
                  <div>
                    <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-2 font-semibold">
                      Selecciona Método de Pago
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setMetodoPago("tarjeta");
                          setFormErrors({});
                        }}
                        className={`py-2.5 px-2 border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                          metodoPago === "tarjeta"
                            ? "border-black bg-black text-white shadow-xs"
                            : "border-neutral-300 bg-neutral-50/60 hover:bg-neutral-100 text-neutral-700"
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        <span className="text-[10px] font-mono uppercase font-semibold leading-none">Tarjeta</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setMetodoPago("qr");
                          setFormErrors({});
                        }}
                        className={`py-2.5 px-2 border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                          metodoPago === "qr"
                            ? "border-black bg-black text-white shadow-xs"
                            : "border-neutral-300 bg-neutral-50/60 hover:bg-neutral-100 text-neutral-700"
                        }`}
                      >
                        <QrCode className="w-4 h-4" />
                        <span className="text-[10px] font-mono uppercase font-semibold leading-none">QR Simple</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setMetodoPago("paypal");
                          setFormErrors({});
                        }}
                        className={`py-2.5 px-2 border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                          metodoPago === "paypal"
                            ? "border-black bg-black text-white shadow-xs"
                            : "border-neutral-300 bg-neutral-50/60 hover:bg-neutral-100 text-neutral-700"
                        }`}
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.305-.03.19-.066.389-.107.595-.918 4.605-4.004 6.84-8.083 6.84H8.847l-1.771 7.787zm9.645-13.88c.026-.164.048-.323.067-.478.435-2.793-.728-4.229-3.468-4.229H7.666L5.597 19.347h2.723l1.178-5.183h2.385c3.21 0 5.632-1.722 6.357-5.327l.006-.03z"/>
                        </svg>
                        <span className="text-[10px] font-mono uppercase font-semibold leading-none">PayPal</span>
                      </button>
                    </div>
                  </div>

                  {/* CAMPOS ESPECÍFICOS SEGÚN MÉTODO */}
                  {metodoPago === "tarjeta" && (
                    <>
                      {/* Titular */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[11px] font-mono uppercase text-neutral-500">
                            Titular de la Tarjeta
                          </label>
                          {formErrors.nombreTitular && (
                            <span className="text-[10px] font-mono text-red-600">
                              {formErrors.nombreTitular}
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          name="auth_field_alpha"
                          value={formData.nombreTitular}
                          onChange={(e) => handleInputChange("nombreTitular", e.target.value)}
                          onKeyDown={handlePreventEnter}
                          autoComplete="one-time-code"
                          autoCorrect="off"
                          spellCheck={false}
                          data-lpignore="true"
                          data-form-type="other"
                          data-1p-ignore="true"
                          data-bwignore="true"
                          data-disable-autofill="true"
                          placeholder="Nombre y apellido como figura en el plástico"
                          className={`w-full bg-white border px-3 py-2 text-xs text-neutral-900 font-mono focus:outline-none ${
                            formErrors.nombreTitular ? "border-red-500 bg-red-50/20" : "border-neutral-300 focus:border-black"
                          }`}
                        />
                      </div>

                      {/* Referencia de Cuenta / Pago */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[11px] font-mono uppercase text-neutral-500">
                            Número de Tarjeta
                          </label>
                          {formErrors.numeroTarjeta && (
                            <span className="text-[10px] font-mono text-red-600">
                              {formErrors.numeroTarjeta}
                            </span>
                          )}
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            name="auth_field_num"
                            value={formData.numeroTarjeta}
                            onChange={handleCardNumberChange}
                            onKeyDown={handlePreventEnter}
                            autoComplete="one-time-code"
                            autoCorrect="off"
                            spellCheck={false}
                            data-lpignore="true"
                            data-form-type="other"
                            data-1p-ignore="true"
                            data-bwignore="true"
                            data-disable-autofill="true"
                            maxLength={19}
                            placeholder="•••• •••• •••• ••••"
                            className={`w-full bg-white border px-3 py-2 text-xs text-neutral-900 font-mono focus:outline-none ${
                              formErrors.numeroTarjeta ? "border-red-500 bg-red-50/20" : "border-neutral-300 focus:border-black"
                            }`}
                          />
                        </div>
                      </div>

                      {/* Vencimiento y Seguridad */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="text-[11px] font-mono uppercase text-neutral-500">
                              Vigencia (MM/AA)
                            </label>
                            {formErrors.expiracion && (
                              <span className="text-[10px] font-mono text-red-600">
                                {formErrors.expiracion}
                              </span>
                            )}
                          </div>
                          <input
                            type="text"
                            name="auth_field_term"
                            value={formData.expiracion}
                            onChange={handleExpiryChange}
                            onKeyDown={handlePreventEnter}
                            autoComplete="one-time-code"
                            data-lpignore="true"
                            data-form-type="other"
                            data-1p-ignore="true"
                            data-bwignore="true"
                            data-disable-autofill="true"
                            maxLength={5}
                            placeholder="MM/AA"
                            className={`w-full bg-white border px-3 py-2 text-xs text-neutral-900 font-mono focus:outline-none ${
                              formErrors.expiracion ? "border-red-500 bg-red-50/20" : "border-neutral-300 focus:border-black"
                            }`}
                          />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="text-[11px] font-mono uppercase text-neutral-500">
                              CVC / CVV
                            </label>
                            {formErrors.cvc && (
                              <span className="text-[10px] font-mono text-red-600">
                                {formErrors.cvc}
                              </span>
                            )}
                          </div>
                          <input
                            type="text"
                            inputMode="numeric"
                            name="auth_field_code"
                            value={formData.cvc}
                            onChange={handleCvcChange}
                            onKeyDown={handlePreventEnter}
                            maxLength={4}
                            autoComplete="one-time-code"
                            data-lpignore="true"
                            data-form-type="other"
                            data-1p-ignore="true"
                            data-bwignore="true"
                            data-disable-autofill="true"
                            placeholder="•••"
                            className={`w-full bg-white border px-3 py-2 text-xs text-neutral-900 font-mono focus:outline-none ${
                              formErrors.cvc ? "border-red-500 bg-red-50/20" : "border-neutral-300 focus:border-black"
                            }`}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {metodoPago === "qr" && (
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[11px] font-mono uppercase text-neutral-500">
                            Nombre del Pagador / Facturación
                          </label>
                          {formErrors.nombreTitular && (
                            <span className="text-[10px] font-mono text-red-600">
                              {formErrors.nombreTitular}
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          value={formData.nombreTitular}
                          onChange={(e) => handleInputChange("nombreTitular", e.target.value)}
                          onKeyDown={handlePreventEnter}
                          placeholder="Nombre y apellido completos"
                          className={`w-full bg-white border px-3 py-2 text-xs text-neutral-900 font-mono focus:outline-none ${
                            formErrors.nombreTitular ? "border-red-500 bg-red-50/20" : "border-neutral-300 focus:border-black"
                          }`}
                        />
                      </div>

                      <div className="p-3 bg-neutral-50 border border-neutral-200 rounded text-xs font-mono text-neutral-600 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-neutral-900">
                          <QrCode className="w-4 h-4 text-black" />
                          <span>Pago Instantáneo QR Simple</span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-neutral-500">
                          Al presionar el botón inferior se generará el código QR oficial interoperable con 30 segundos de vigencia para abonar desde cualquier banco boliviano.
                        </p>
                      </div>
                    </div>
                  )}

                  {metodoPago === "paypal" && (
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[11px] font-mono uppercase text-neutral-500">
                            Nombre del Titular de la Cuenta
                          </label>
                          {formErrors.nombreTitular && (
                            <span className="text-[10px] font-mono text-red-600">
                              {formErrors.nombreTitular}
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          value={formData.nombreTitular}
                          onChange={(e) => handleInputChange("nombreTitular", e.target.value)}
                          onKeyDown={handlePreventEnter}
                          placeholder="Nombre completo"
                          className={`w-full bg-white border px-3 py-2 text-xs text-neutral-900 font-mono focus:outline-none ${
                            formErrors.nombreTitular ? "border-red-500 bg-red-50/20" : "border-neutral-300 focus:border-black"
                          }`}
                        />
                      </div>

                      <div className="p-3 bg-[#003087]/5 border border-[#003087]/20 rounded text-xs font-mono text-neutral-700 space-y-1">
                        <div className="flex items-center justify-between font-bold text-[#003087]">
                          <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 fill-[#003087]" viewBox="0 0 24 24">
                              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.305-.03.19-.066.389-.107.595-.918 4.605-4.004 6.84-8.083 6.84H8.847l-1.771 7.787zm9.645-13.88c.026-.164.048-.323.067-.478.435-2.793-.728-4.229-3.468-4.229H7.666L5.597 19.347h2.723l1.178-5.183h2.385c3.21 0 5.632-1.722 6.357-5.327l.006-.03z"/>
                            </svg>
                            Pasarela PayPal Internacional
                          </span>
                          <span className="text-xs font-bold text-neutral-900">
                            ${(subtotal / 6.96).toFixed(2)} USD
                          </span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-neutral-600">
                          Serás dirigido de forma segura a la pasarela de cobro oficial de PayPal para autorizar la transacción en USD al cambio oficial referencial.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Datos de envío */}
                  <div className="pt-2 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                          Ciudad
                        </label>
                        <select
                          value={formData.ciudad}
                          onChange={(e) => handleInputChange("ciudad", e.target.value)}
                          className="w-full bg-white border border-neutral-300 px-3 py-2 text-xs text-neutral-900 font-mono focus:outline-none focus:border-black"
                        >
                          <option value="Sucre">Sucre</option>
                          <option value="La Paz">La Paz</option>
                          <option value="Santa Cruz">Santa Cruz</option>
                          <option value="Cochabamba">Cochabamba</option>
                          <option value="Tarija">Tarija</option>
                          <option value="Oruro">Oruro</option>
                          <option value="Potosí">Potosí</option>
                          <option value="Beni">Beni</option>
                          <option value="Pando">Pando</option>
                        </select>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[11px] font-mono uppercase text-neutral-500">
                            Teléfono
                          </label>
                          {formErrors.telefono && (
                            <span className="text-[10px] font-mono text-red-600">
                              {formErrors.telefono}
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          name="auth_field_phone"
                          value={formData.telefono}
                          onChange={(e) => handleInputChange("telefono", e.target.value)}
                          onKeyDown={handlePreventEnter}
                          autoComplete="one-time-code"
                          data-lpignore="true"
                          data-form-type="other"
                          data-1p-ignore="true"
                          data-bwignore="true"
                          data-disable-autofill="true"
                          placeholder="Ej. 68610314"
                          className={`w-full bg-white border px-3 py-2 text-xs text-neutral-900 font-mono focus:outline-none ${
                            formErrors.telefono ? "border-red-500 bg-red-50/20" : "border-neutral-300 focus:border-black"
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[11px] font-mono uppercase text-neutral-500">
                          Dirección de Entrega
                        </label>
                        {formErrors.direccion && (
                          <span className="text-[10px] font-mono text-red-600">
                            {formErrors.direccion}
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        name="auth_field_address"
                        value={formData.direccion}
                        onChange={(e) => handleInputChange("direccion", e.target.value)}
                        onKeyDown={handlePreventEnter}
                        autoComplete="one-time-code"
                        data-lpignore="true"
                        data-form-type="other"
                        data-1p-ignore="true"
                        data-bwignore="true"
                        data-disable-autofill="true"
                        placeholder="Calle, número, zona o retiro en terminal"
                        className={`w-full bg-white border px-3 py-2 text-xs text-neutral-900 font-mono focus:outline-none ${
                          formErrors.direccion ? "border-red-500 bg-red-50/20" : "border-neutral-300 focus:border-black"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Mensaje de error */}
                  {Object.keys(formErrors).length > 0 && (
                    <div className="p-2.5 rounded bg-red-50 border border-red-200 text-red-700 text-xs font-mono flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>Por favor completa todos los campos requeridos antes de pagar.</span>
                    </div>
                  )}

                  {/* Botón Pagar Dinámico según Método */}
                  <button
                    type="button"
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className={`w-full mt-4 py-3.5 px-4 text-white rounded font-mono text-xs sm:text-sm uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer ${
                      metodoPago === "paypal"
                        ? "bg-[#003087] hover:bg-[#002060] disabled:bg-[#003087]/60"
                        : "bg-black hover:bg-neutral-800 disabled:bg-neutral-600"
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Procesando pago...</span>
                      </>
                    ) : metodoPago === "tarjeta" ? (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>{t.cart.payBtn} Bs. {subtotal.toLocaleString()}</span>
                      </>
                    ) : metodoPago === "qr" ? (
                      <>
                        <QrCode className="w-4 h-4" />
                        <span>Generar Código QR • Bs. {subtotal.toLocaleString()}</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.305-.03.19-.066.389-.107.595-.918 4.605-4.004 6.84-8.083 6.84H8.847l-1.771 7.787zm9.645-13.88c.026-.164.048-.323.067-.478.435-2.793-.728-4.229-3.468-4.229H7.666L5.597 19.347h2.723l1.178-5.183h2.385c3.21 0 5.632-1.722 6.357-5.327l.006-.03z"/>
                        </svg>
                        <span>Pagar con PayPal • ${(subtotal / 6.96).toFixed(2)} USD</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* BOTÓN DESPLEGABLE DE HISTORIAL (Solo cuando hay productos en el carrito) */}
            <div className="pt-6 border-t border-black/10 flex flex-col items-center">
              <button
                type="button"
                onClick={() => setShowHistoryWithItems(!showHistoryWithItems)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-neutral-100 border border-black/20 text-neutral-800 text-xs font-mono uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
              >
                {showHistoryWithItems ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    <span>{t.cart.hideHistory}</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    <span>{t.cart.viewHistory} ({orders.length})</span>
                  </>
                )}
              </button>

              {showHistoryWithItems && (
                <div className="w-full mt-6">
                  {renderBrutalistOrderHistory()}
                </div>
              )}
            </div>

            {/* MODAL OFICIAL DE PAGO CON CÓDIGO QR SIMPLE */}
            {showQrModal && (
              <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white border-2 border-black max-w-sm w-full p-6 text-center shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
                  {/* Botón cerrar */}
                  <button
                    type="button"
                    onClick={() => setShowQrModal(false)}
                    className="absolute top-3.5 right-3.5 text-neutral-400 hover:text-black transition-colors cursor-pointer"
                    aria-label="Cerrar modal"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Encabezado */}
                  <div className="inline-block px-2.5 py-0.5 bg-neutral-100 border border-neutral-300 text-[10px] font-mono uppercase tracking-wider text-neutral-700 font-semibold mb-2">
                    Cobro Interoperable Simple
                  </div>

                  <h3 className="font-serif text-xl font-normal text-neutral-900 mb-1">
                    Escanea el Código QR
                  </h3>
                  <p className="text-xs text-neutral-600 font-sans leading-relaxed mb-3">
                    Abre la aplicación de tu banco o billetera móvil en Bolivia y escanea para pagar.
                  </p>

                  {/* Imagen del QR */}
                  <div className="relative mx-auto w-52 h-52 bg-white p-2 border border-neutral-300 rounded shadow-xs flex items-center justify-center mb-3">
                    <img
                      src="/img/QR.png"
                      alt="Código QR de Pago Simple"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Monto y temporizador */}
                  <div className="bg-neutral-50 border border-neutral-200 p-3 rounded mb-4">
                    <div className="flex justify-between items-center text-xs font-mono mb-1">
                      <span className="text-neutral-500">Monto a abonar:</span>
                      <span className="font-bold text-neutral-900 text-sm">Bs. {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-neutral-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-neutral-600" /> Tiempo restante:
                      </span>
                      <span className="font-bold text-neutral-900 font-mono">
                        00:{qrCountdown.toString().padStart(2, "0")}s
                      </span>
                    </div>

                    {/* Barra de progreso de los 30s */}
                    <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden mt-2">
                      <div
                        className="bg-black h-full transition-all duration-1000 ease-linear"
                        style={{ width: `${(qrCountdown / 30) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        completarOrden("QR Simple");
                        setShowQrModal(false);
                      }}
                      className="w-full py-2.5 px-4 bg-black hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider font-semibold rounded transition-colors cursor-pointer"
                    >
                      Confirmar Pago Realizado
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowQrModal(false)}
                      className="w-full py-2 px-4 bg-transparent hover:bg-neutral-100 text-neutral-600 font-mono text-[11px] uppercase tracking-wider rounded transition-colors cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </main>
  );
}
