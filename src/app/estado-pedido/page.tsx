"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useOrdersStore, computeOrderStatus, Order } from "@/store/ordersStore";
import {
  Search,
  PackageCheck,
  Truck,
  Clock,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { VinylCharacter } from "@/components/ui/VinylCharacter";

function EstadoPedidoContent() {
  const searchParams = useSearchParams();
  const { getOrderById } = useOrdersStore();

  const [orderQuery, setOrderQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // Leer parámetro ?codigo=... al cargar la página
  useEffect(() => {
    const codeParam = searchParams.get("codigo");
    if (codeParam) {
      setOrderQuery(codeParam);
      lookupOrder(codeParam);
    }
  }, [searchParams]);

  const lookupOrder = (code: string) => {
    const cleanId = code.trim().toUpperCase();
    const formattedId = cleanId.startsWith("AV-") ? cleanId : `AV-${cleanId}`;

    const existing = getOrderById(formattedId);
    if (existing) {
      setActiveOrder(existing);
      setSearched(true);
      return;
    }

    // Si el código no está guardado en este navegador (ingresado manualmente para consulta),
    // se crea la simulación del pedido
    const demoNumeric = formattedId.replace(/[^0-9]/g, "") || "850742";
    const simulatedCreatedAt = Date.now() - 12 * 60 * 1000; // Pedido de hace 12 min

    const simulatedOrder: Order = {
      id: formattedId,
      createdAt: simulatedCreatedAt,
      fechaFormatted: new Date(simulatedCreatedAt).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      total: 280,
      itemsCount: 1,
      ciudad: "Sucre",
      direccion: "Calle Calvo #240, Zona Central",
      telefono: "+591 68610314",
      items: [
        {
          id: "item-order",
          title: "Vinilo Sellado 180g Edición Especial",
          subtitle: "Prensado Audiófilo Virgen",
          priceBs: 280,
          quantity: 1,
        },
      ],
      guia: `BOL-${demoNumeric}`,
      transporte: "Mensajería Expresa & Encomienda Nacional",
    };

    setActiveOrder(simulatedOrder);
    setSearched(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;
    lookupOrder(orderQuery);
  };

  const statusInfo = activeOrder
    ? computeOrderStatus(activeOrder.createdAt)
    : null;

  return (
    <main className="w-full min-h-screen bg-white text-black py-12 sm:py-20 px-4 sm:px-8 lg:px-14">
      <div className="w-full max-w-[1540px] mx-auto space-y-12">
        {/* Encabezado */}
        <div className="border-b border-black/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
              Rastreador de Guía • Envíos desde Sucre a toda Bolivia
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-black">
              Estado de tu Pedido
            </h1>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-neutral-600">
            <span className="block font-bold text-neutral-900 text-sm">Seguimiento en Vivo</span>
            <span>Sede Central: Sucre, Chuquisaca</span>
          </div>
        </div>

        {/* Formulario de Búsqueda de Pedido */}
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 border border-black/15 space-y-5 text-center">
          <div className="flex justify-center mb-1">
            <VinylCharacter size={95} pose="inspecting" />
          </div>

          <h2 className="font-serif text-2xl font-normal text-neutral-900">
            Ingresa tu Código de Pedido
          </h2>
          <p className="font-sans text-xs sm:text-sm text-neutral-600 font-light">
            Escribe el código oficial que recibiste al completar tu compra (ej: AV-850742).
          </p>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 pt-2">
            <input
              type="text"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="Ej. AV-850742"
              required
              className="flex-1 bg-white border border-black/20 px-4 py-3 text-sm font-mono text-neutral-900 focus:outline-none focus:border-black uppercase tracking-wider"
            />
            <button
              type="submit"
              className="py-3 px-6 bg-black hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Consultar</span>
            </button>
          </form>
        </div>

        {/* Tarjeta de Resultados del Pedido */}
        {searched && activeOrder && statusInfo && (
          <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 border border-black/15 space-y-8 animate-in fade-in duration-300">
            
            {/* Protagonista con pose según la fase de despacho */}
            <div className="flex justify-center py-2">
              <VinylCharacter
                size={95}
                pose={
                  statusInfo.step === 4
                    ? "headphones"
                    : statusInfo.step === 3
                    ? "shipping"
                    : statusInfo.step === 2
                    ? "shipping"
                    : "inspecting"
                }
              />
            </div>

            {/* Cabecera del pedido encontrado */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-black/10 pb-5 gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-0.5">
                  Número de Pedido
                </span>
                <span className="font-mono text-2xl font-bold text-neutral-900">
                  {activeOrder.id}
                </span>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-0.5">
                  Fecha de Confirmación
                </span>
                <span className="font-mono text-xs text-neutral-700">
                  {activeOrder.fechaFormatted}
                </span>
              </div>
            </div>

            {/* Línea de tiempo visual de 4 pasos (Fondo blanco estricto, CERO fondo verde) */}
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-bold block">
                Progreso del Despacho
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {/* Paso 1: Confirmado */}
                <div className="flex flex-col items-center text-center p-3.5 bg-white border border-black/15">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 shadow-xs transition-colors ${
                      statusInfo.step >= 1 ? "bg-black text-white" : "bg-neutral-200 text-neutral-400"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="font-mono text-[11px] font-bold text-neutral-900 block">
                    Confirmado
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono mt-0.5">Pago verificado</span>
                </div>

                {/* Paso 2: Embalando (Fondo blanco estricto, SIN fondo verde en la card) */}
                <div className="flex flex-col items-center text-center p-3.5 bg-white border border-black/15">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 shadow-xs transition-colors ${
                      statusInfo.step >= 2
                        ? "bg-emerald-600 text-white"
                        : "bg-neutral-200 text-neutral-400"
                    }`}
                  >
                    <PackageCheck className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="font-mono text-[11px] font-bold text-neutral-900 block">
                    Embalando
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono mt-0.5">Cartón rígido listo</span>
                </div>

                {/* Paso 3: En Camino */}
                <div className="flex flex-col items-center text-center p-3.5 bg-white border border-black/15">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 shadow-xs transition-colors ${
                      statusInfo.step >= 3
                        ? "bg-emerald-600 text-white"
                        : "bg-neutral-200 text-neutral-400"
                    }`}
                  >
                    <Truck className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="font-mono text-[11px] font-bold text-neutral-900 block">
                    En Camino
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono mt-0.5">Despacho encomienda</span>
                </div>

                {/* Paso 4: Entregado */}
                <div className="flex flex-col items-center text-center p-3.5 bg-white border border-black/15">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 shadow-xs transition-colors ${
                      statusInfo.step >= 4
                        ? "bg-emerald-600 text-white"
                        : "bg-neutral-200 text-neutral-400"
                    }`}
                  >
                    <Clock className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="font-mono text-[11px] font-bold text-neutral-900 block">
                    Entregado
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono mt-0.5">En destino final</span>
                </div>
              </div>
            </div>

            {/* Ficha técnica del pedido */}
            <div className="bg-white p-5 border border-black/15 font-mono text-xs space-y-2.5">
              <div className="flex justify-between border-b border-neutral-100 pb-2">
                <span className="text-neutral-500">Origen del Despacho:</span>
                <span className="font-bold text-neutral-900">Sucre, Chuquisaca (Sede Central)</span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-2">
                <span className="text-neutral-500">Destino de Entrega:</span>
                <span className="font-bold text-neutral-900">{activeOrder.ciudad}, Bolivia</span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-2">
                <span className="text-neutral-500">Dirección Registrada:</span>
                <span className="text-neutral-800">{activeOrder.direccion}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-2">
                <span className="text-neutral-500">Artículos ({activeOrder.itemsCount}):</span>
                <span className="text-neutral-800">
                  {activeOrder.items && activeOrder.items.length > 0
                    ? activeOrder.items.map((i) => i.title).join(", ")
                    : "Vinilos en formato físico 180g"}
                </span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-2">
                <span className="text-neutral-500">Empresa de Transporte:</span>
                <span className="text-neutral-800">{activeOrder.transporte}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-neutral-500">Guía de Encomienda:</span>
                <span className="font-bold text-neutral-900">{activeOrder.guia}</span>
              </div>
            </div>

            {/* Asistencia directa por WhatsApp */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-black/10">
              <span className="text-xs text-neutral-500 font-mono text-center sm:text-left">
                ¿Deseas cambiar tu dirección de entrega o coordinar la hora?
              </span>
              <a
                href={`https://wa.me/59168610314?text=%C2%A1Hola!%20Deseo%20consultar%20detalles%20sobre%20mi%20pedido%20${activeOrder.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 bg-black hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp (+591 68610314)</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function EstadoPedidoPage() {
  return (
    <Suspense
      fallback={
        <main className="w-full min-h-screen bg-white flex items-center justify-center p-8">
          <div className="font-mono text-xs text-neutral-500">Cargando estado del pedido...</div>
        </main>
      }
    >
      <EstadoPedidoContent />
    </Suspense>
  );
}
