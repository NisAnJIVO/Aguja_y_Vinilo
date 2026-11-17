import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { VinylCharacter } from "@/components/ui/VinylCharacter";

export const metadata: Metadata = {
  title: "Información de la Empresa | Aguja & Vinilo",
  description: "Ficha corporativa, sede central en Sucre, datos de registro y modelo operativo de Aguja & Vinilo en Bolivia.",
};

export default function EmpresaPage() {
  return (
    <main className="w-full min-h-screen bg-white text-black py-10 sm:py-24 px-4 sm:px-12 lg:px-16">
      <div className="w-full max-w-[1520px] mx-auto space-y-16 sm:space-y-24">
        
        {/* =====================================================================
            ENCABEZADO EDITORIAL
           ===================================================================== */}
        <div className="border-b border-black/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
              Ficha Corporativa &amp; Registro • Est. 2026
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-black">
              Información de la Empresa
            </h1>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-neutral-600">
            <span className="block font-bold text-neutral-900 text-sm">Sede Central: Sucre, Bolivia</span>
            <span>Operaciones &amp; Logística Nacional</span>
          </div>
        </div>

        {/* =====================================================================
            BLOQUE 1: IDENTIDAD INSTITUCIONAL
           ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-14 items-start">
          
          <div className="lg:col-span-5 space-y-5">
            {/* Nuestro amiguito protagonista en pose corporativa */}
            <div className="mb-6">
              <VinylCharacter size={105} pose="corporate" />
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-black leading-tight">
              Estructura formal para coleccionistas exigentes.
            </h2>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block">
              Comercio Electrónico Especializado en Audio Analógico
            </span>
          </div>

          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-neutral-700 leading-relaxed font-light">
            <p>
              <strong className="font-medium text-neutral-900">Aguja &amp; Vinilo</strong> está constituida como una empresa boliviana dedicada a la importación directa, distribución y curaduría de música física en vinilo virgen, tornamesas calibradas a mano y mobiliario acústico de diseño.
            </p>
            <p>
              Nuestra sede central de gestión, curaduría técnica y embalaje especializado opera desde la ciudad de <strong className="font-medium text-neutral-900">Sucre, Chuquisaca</strong>. A través de alianzas logísticas con las principales agencias de encomiendas y mensajería del país, mantenemos despachos continuos asegurados a los 9 departamentos de Bolivia.
            </p>
            <p>
              Todos nuestros procesos de venta emiten comprobantes de transacción válidos, garantizando la autenticidad y el origen legal de cada pieza que integra nuestro catálogo.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="https://wa.me/59168610314?text=Hola,%20quisiera%20consultar%20información%20corporativa%20de%20Aguja%20y%20Vinilo."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2.5 border border-black text-black hover:bg-black hover:text-white transition-colors text-xs font-mono uppercase tracking-wider"
              >
                Contacto Directo por WhatsApp
              </a>
              <Link
                href="/contacto"
                className="inline-block px-5 py-2.5 border border-neutral-300 text-neutral-700 hover:border-black hover:text-black transition-colors text-xs font-mono uppercase tracking-wider"
              >
                Canales de Atención
              </Link>
            </div>
          </div>

        </div>

        {/* Separador fino */}
        <div className="w-full border-b border-neutral-200" />

        {/* =====================================================================
            BLOQUE 2: TABLA DE DATOS TÉCNICOS & CORPORATIVOS (ESTILO EDITORIAL)
           ===================================================================== */}
        <div>
          <div className="mb-10 sm:mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
              Datos de Registro
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-neutral-900">
              Ficha Técnica de la Razón Social
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 font-mono text-xs">
            
            <div className="space-y-4">
              <div className="border-b border-neutral-200 pb-3 flex justify-between">
                <span className="text-neutral-500 uppercase">Nombre Comercial:</span>
                <span className="font-bold text-neutral-900">Aguja &amp; Vinilo</span>
              </div>
              <div className="border-b border-neutral-200 pb-3 flex justify-between">
                <span className="text-neutral-500 uppercase">Sede Central:</span>
                <span className="font-bold text-neutral-900">Sucre, Chuquisaca, Bolivia</span>
              </div>
              <div className="border-b border-neutral-200 pb-3 flex justify-between">
                <span className="text-neutral-500 uppercase">Modelo de Negocio:</span>
                <span className="text-neutral-900">Tienda Online de Venta &amp; Suscripción</span>
              </div>
              <div className="border-b border-neutral-200 pb-3 flex justify-between">
                <span className="text-neutral-500 uppercase">Moneda de Facturación:</span>
                <span className="font-bold text-neutral-900">Bolivianos (Bs.)</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-b border-neutral-200 pb-3 flex justify-between">
                <span className="text-neutral-500 uppercase">Canal Oficial WhatsApp:</span>
                <span className="font-bold text-neutral-900">+591 68610314</span>
              </div>
              <div className="border-b border-neutral-200 pb-3 flex justify-between">
                <span className="text-neutral-500 uppercase">Correo Electrónico:</span>
                <span className="font-bold text-neutral-900">jivo3534@gmail.com</span>
              </div>
              <div className="border-b border-neutral-200 pb-3 flex justify-between">
                <span className="text-neutral-500 uppercase">Cobertura Territorial:</span>
                <span className="text-neutral-900">9 Departamentos de Bolivia</span>
              </div>
              <div className="border-b border-neutral-200 pb-3 flex justify-between">
                <span className="text-neutral-500 uppercase">Año de Fundación:</span>
                <span className="font-bold text-neutral-900">2026</span>
              </div>
              <div className="border-b border-neutral-200 pb-3 flex justify-between">
                <span className="text-neutral-500 uppercase">TikTok:</span>
                <a href="https://www.tiktok.com/@agujayvinilos" target="_blank" rel="noopener noreferrer" className="font-bold text-neutral-900 hover:underline">TikTok</a>
              </div>
              <div className="border-b border-neutral-200 pb-3 flex justify-between">
                <span className="text-neutral-500 uppercase">Instagram:</span>
                <a href="https://www.instagram.com/ajuga_y_vinilo/" target="_blank" rel="noopener noreferrer" className="font-bold text-neutral-900 hover:underline">Instagram</a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
