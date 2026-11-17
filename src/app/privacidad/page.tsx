import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { VinylCharacter } from "@/components/ui/VinylCharacter";

export const metadata: Metadata = {
  title: "Políticas de Privacidad | Aguja & Vinilo",
  description: "Tratamiento confidencial de datos, seguridad en pedidos y protección del usuario en Aguja & Vinilo Bolivia.",
};

export default function PrivacidadPage() {
  return (
    <main className="w-full min-h-screen bg-white text-black py-10 sm:py-24 px-4 sm:px-12 lg:px-16">
      <div className="w-full max-w-[1520px] mx-auto space-y-16 sm:space-y-24">
        
        {/* =====================================================================
            ENCABEZADO EDITORIAL
           ===================================================================== */}
        <div className="border-b border-black/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
              Privacidad &amp; Seguridad de Datos • Est. 2026
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-black">
              Políticas de Privacidad
            </h1>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-neutral-600">
            <span className="block font-bold text-neutral-900 text-sm">Protección Estricta de Datos</span>
            <span>Uso exclusivo para despacho y facturación</span>
          </div>
        </div>

        {/* =====================================================================
            BLOQUE 1: COMPROMISO DE PRIVACIDAD
           ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-14 items-start">
          
          <div className="lg:col-span-5 space-y-5">
            {/* Nuestro amiguito protagonista con escudo protector */}
            <div className="mb-6">
              <VinylCharacter size={105} pose="shield" />
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-black leading-tight">
              Tus datos son sagrados. Solo los usamos para llevar la música a tu puerta.
            </h2>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block">
              Cero Venta de Datos a Terceros • Almacenamiento Cifrado
            </span>
          </div>

          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-neutral-700 leading-relaxed font-light">
            <p>
              En <strong className="font-medium text-neutral-900">Aguja &amp; Vinilo</strong> respetamos profundamente la privacidad de nuestros clientes y miembros coleccionistas. Esta política describe con total transparencia qué información recopilamos, cómo la resguardamos y cuál es su finalidad exclusiva.
            </p>
            <p>
              Solo recopilamos los datos estrictamente indispensables para procesar tu pedido, emitir el comprobante de compra y coordinar la entrega con la empresa de transporte: <strong className="font-medium text-neutral-900">nombre y apellido, ciudad de destino, dirección física y teléfono de contacto</strong>.
            </p>
            <p>
              Bajo ninguna circunstancia vendemos, alquilamos, intercambiamos ni cedemos tus datos personales o historial de compras a empresas de publicidad, brokers de datos ni entidades terceras.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="mailto:jivo3534@gmail.com?subject=Consulta%20sobre%20Privacidad%20y%20Datos"
                className="inline-block px-5 py-2.5 border border-black text-black hover:bg-black hover:text-white transition-colors text-xs font-mono uppercase tracking-wider"
              >
                Escribir a Privacidad (jivo3534@gmail.com)
              </a>
              <Link
                href="/terminos"
                className="inline-block px-5 py-2.5 border border-neutral-300 text-neutral-700 hover:border-black hover:text-black transition-colors text-xs font-mono uppercase tracking-wider"
              >
                Ver Términos del Servicio
              </Link>
            </div>
          </div>

        </div>

        {/* Separador fino */}
        <div className="w-full border-b border-neutral-200" />

        {/* =====================================================================
            BLOQUE 2: CLAÚSULAS DE PRIVACIDAD (ESTILO EDITORIAL MINIMALISTA)
           ===================================================================== */}
        <div>
          <div className="mb-10 sm:mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
              Garantías de Protección
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-neutral-900">
              Pilares de Seguridad y Confidencialidad
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 font-mono text-xs">
            
            <div className="space-y-3">
              <span className="text-neutral-400 block font-bold">01 / RECOLECCIÓN</span>
              <h4 className="font-serif text-xl font-normal text-neutral-900">
                Uso Exclusivo Logístico
              </h4>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                Tu teléfono y dirección se utilizan únicamente para coordinar la llegada del paquete con la empresa de transporte o terminal.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-neutral-400 block font-bold">02 / PAGOS</span>
              <h4 className="font-serif text-xl font-normal text-neutral-900">
                Sin Datos de Tarjetas
              </h4>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                No guardamos ni registramos números de tarjeta de crédito en nuestros servidores. Las operaciones bancarias se procesan directamente con entidades financieras oficiales.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-neutral-400 block font-bold">03 / BOLETÍN</span>
              <h4 className="font-serif text-xl font-normal text-neutral-900">
                Cancelación Inmediata
              </h4>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                Si te suscribes a nuestro boletín de novedades sonoras, puedes desuscribirte en cualquier momento con un solo clic. Cero spam.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-neutral-400 block font-bold">04 / DERECHOS</span>
              <h4 className="font-serif text-xl font-normal text-neutral-900">
                Baja &amp; Supresión Total
              </h4>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                Tienes el derecho de solicitar la eliminación definitiva de tu cuenta y registros enviando un correo a jivo3534@gmail.com.
              </p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
