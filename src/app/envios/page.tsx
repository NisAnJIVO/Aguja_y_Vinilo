import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { VinylCharacter } from "@/components/ui/VinylCharacter";

export const metadata: Metadata = {
  title: "Políticas de Envío | Aguja & Vinilo",
  description: "Protocolos de empaque rígido multicapa, cobertura a los 9 departamentos de Bolivia y tiempos de entrega de Aguja & Vinilo.",
};

export default function EnviosPage() {
  return (
    <main className="w-full min-h-screen bg-white text-black py-10 sm:py-24 px-4 sm:px-12 lg:px-16">
      <div className="w-full max-w-[1520px] mx-auto space-y-16 sm:space-y-24">
        
        {/* =====================================================================
            ENCABEZADO EDITORIAL
           ===================================================================== */}
        <div className="border-b border-black/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
              Logística &amp; Cobertura Nacional • Est. 2026
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-black">
              Políticas de Envío
            </h1>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-neutral-600">
            <span className="block font-bold text-neutral-900 text-sm">Despachos Diarios desde Sucre</span>
            <span>Entregas aseguradas a toda Bolivia</span>
          </div>
        </div>

        {/* =====================================================================
            BLOQUE 1: PROTOCOLO & COMPROMISO
           ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-14 items-start">
          
          <div className="lg:col-span-5 space-y-5">
            {/* Nuestro amiguito protagonista con la caja de encomienda */}
            <div className="mb-6">
              <VinylCharacter size={105} pose="shipping" />
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-black leading-tight">
              Protección mecánica para carátulas y vinilos vírgenes.
            </h2>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block">
              Embalaje Rígido Especializado en Discos
            </span>
          </div>

          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-neutral-700 leading-relaxed font-light">
            <p>
              Entendemos el valor del objeto físico. Un disco de vinilo es vulnerable a dobleces de esquinas, presión excesiva y cambios bruscos de temperatura durante el tránsito. Por ello, en <strong className="font-medium text-neutral-900">Aguja &amp; Vinilo</strong> desarrollamos un protocolo logístico exclusivo para despachos en territorio boliviano.
            </p>
            <p>
              Cada vinilo se empaca individualmente en cajas de cartón corrugado extra-pesado con <strong className="font-medium text-neutral-900">protectores de esquinas en PVC de alto impacto</strong> y acolchado interno amortiguador. Para ediciones dobles o compuertas gatefold, retiramos cuidadosamente el disco de su funda exterior para prevenir desgastes en el lomo (*seam splits*).
            </p>
            <p>
              Todos los paquetes se rotulan con sello de frágil y seguro de transporte que garantiza la reposición inmediata ante cualquier contingencia en ruta.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/estado-pedido"
                className="inline-block px-5 py-2.5 border border-black text-black hover:bg-black hover:text-white transition-colors text-xs font-mono uppercase tracking-wider"
              >
                Rastrear Pedido con Código
              </Link>
              <Link
                href="/discos"
                className="inline-block px-5 py-2.5 border border-neutral-300 text-neutral-700 hover:border-black hover:text-black transition-colors text-xs font-mono uppercase tracking-wider"
              >
                Ver Catálogo Disponible
              </Link>
            </div>
          </div>

        </div>

        {/* Separador fino */}
        <div className="w-full border-b border-neutral-200" />

        {/* =====================================================================
            BLOQUE 2: DETALLES DE COBERTURA, TIEMPOS & TARIFAS (ESTILO EDITORIAL)
           ===================================================================== */}
        <div>
          <div className="mb-10 sm:mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
              Condiciones de Despacho
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-neutral-900">
              Cobertura Territorial &amp; Tiempos de Entrega
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 font-mono text-xs">
            
            <div className="space-y-4">
              <h4 className="font-bold text-neutral-900 text-sm uppercase tracking-wider">
                Eje Troncal &amp; Ciudades Principales
              </h4>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                <strong className="font-mono font-bold text-neutral-900">La Paz, Cochabamba, Santa Cruz y Sucre:</strong> Entregas en 24 horas hábiles a domicilio o en la agencia de transporte de tu elección. Envíos gratuitos en pedidos de catálogo y compras regulares.
              </p>
              <div className="border-t border-neutral-200 pt-3 text-neutral-500">
                Frecuencia: Despachos de lunes a sábado a las 18:00
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-neutral-900 text-sm uppercase tracking-wider">
                Resto de Departamentos
              </h4>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                <strong className="font-mono font-bold text-neutral-900">Tarija, Oruro, Potosí, Beni (Trinidad) y Pando (Cobija):</strong> Entregas en 24 a 48 horas hábiles mediante servicio terrestre y aéreo asegurado.
              </p>
              <div className="border-t border-neutral-200 pt-3 text-neutral-500">
                Garantía: Notificación instantánea vía WhatsApp con foto de guía
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
