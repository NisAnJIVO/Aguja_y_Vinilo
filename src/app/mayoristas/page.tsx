import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { VinylCharacter } from "@/components/ui/VinylCharacter";

export const metadata: Metadata = {
  title: "Ventas al Por Mayor & Distribución | Aguja & Vinilo",
  description: "Distribución mayorista de vinilos, tocadiscos y muebles para cafeterías, disquerías y espacios culturales en Bolivia.",
};

export default function MayoristasPage() {
  return (
    <main className="w-full min-h-screen bg-white text-black py-10 sm:py-24 px-4 sm:px-12 lg:px-16">
      <div className="w-full max-w-[1520px] mx-auto space-y-16 sm:space-y-24">
        
        {/* Encabezado */}
        <div className="border-b border-black/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
              Canal B2B • Espacios Culturales &amp; Boutiques
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-black">
              Ventas al Por Mayor
            </h1>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-neutral-600">
            <span className="block font-bold text-neutral-900 text-sm">Distribución a Nivel Nacional</span>
            <span>Precios especiales por volumen</span>
          </div>
        </div>

        {/* Bloque Explicativo & Contacto Directo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-7 space-y-6 font-sans text-sm sm:text-base text-neutral-700 leading-relaxed font-light">
            <div className="mb-6">
              <VinylCharacter size={105} pose="shipping" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-neutral-900 leading-tight">
              ¿Tienes una cafetería, disquería local o espacio sonoro?
            </h2>
            <p>
              En <strong className="font-medium text-neutral-900">Aguja &amp; Vinilo</strong> ofrecemos condiciones especiales de suministro por volumen para negocios, locales gastronómicos, tiendas de diseño y proyectos culturales en toda Bolivia que busquen incorporar vinilos, tornamesas o mobiliario acústico a su propuesta.
            </p>
            <p>
              Ofrecemos lotes curados de títulos clásicos e independientes, garantía directa de reposición y asesoramiento para crear un catálogo atractivo para tu público local.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-neutral-200 font-mono text-xs">
              <div className="space-y-1.5">
                <span className="font-bold text-neutral-900 uppercase block">Lotes de Vinilos (10+ unidades)</span>
                <p className="text-neutral-500 font-sans font-light">Descuentos escalonados según volumen y selección de géneros.</p>
              </div>
              <div className="space-y-1.5">
                <span className="font-bold text-neutral-900 uppercase block">Mobiliario &amp; Tornamesas</span>
                <p className="text-neutral-500 font-sans font-light">Precios mayoristas para ambientar locales comerciales.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-neutral-200 lg:pl-10">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block mb-1">
                Contacto Directo B2B
              </span>
              <h3 className="font-serif text-2xl font-normal text-neutral-900 mb-2">
                Coordinación Comercial
              </h3>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                Escríbenos directamente por WhatsApp para coordinar catálogo disponible, tiempos de entrega y cotizaciones personalizadas.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href="https://wa.me/59168610314?text=%C2%A1Hola!%20Represento%20un%20negocio%20y%20deseo%20consultar%20sobre%20ventas%20al%20por%20mayor%20de%20Aguja%20y%20Vinilo."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 bg-black hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp (+591 68610314)</span>
              </a>

              <Link
                href="/contacto"
                className="w-full py-2.5 px-4 border border-neutral-300 text-neutral-800 hover:border-black font-mono text-xs uppercase tracking-wider flex items-center justify-center transition-colors text-center"
              >
                Formulario de Contacto
              </Link>
            </div>

            <div className="pt-4 border-t border-neutral-200 text-[11px] font-mono text-neutral-400 space-y-1">
              <p>Correo de coordinación mayorista:</p>
              <p className="text-neutral-700 font-medium">jivo3534@gmail.com</p>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
