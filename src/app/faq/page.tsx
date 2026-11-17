"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, MessageCircle } from "lucide-react";
import { VinylCharacter } from "@/components/ui/VinylCharacter";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    category: "Envíos & Entregas",
    question: "¿Cómo envían los vinilos y equipos a otros departamentos de Bolivia?",
    answer:
      "Despachamos a los 9 departamentos de Bolivia (La Paz, Santa Cruz, Cochabamba, Sucre, Tarija, Oruro, Potosí, Beni y Pando). Utilizamos cajas especiales de cartón rígido corrugado de alta densidad con refuerzo en las cuatro esquinas y plástico de burbuja antichoque para evitar cualquier doblez o abolladura en las carátulas. Enviamos a domicilio o terminal de encomiendas de tu preferencia.",
  },
  {
    id: "faq-2",
    category: "Envíos & Entregas",
    question: "¿Cuánto tiempo tarda en llegar mi pedido?",
    answer:
      "El tiempo de entrega estándar es de 24 horas hábiles para las ciudades del eje troncal (La Paz, Cochabamba y Santa Cruz) y de 24 a 48 horas para Sucre, Tarija, Oruro, Potosí, Trinidad y Cobija. Una vez despachado el paquete, te enviamos el código de guía con fotos del paquete listo por WhatsApp.",
  },
  {
    id: "faq-3",
    category: "Pagos & Seguridad",
    question: "¿Cuáles son los métodos de pago aceptados?",
    answer:
      "Aceptamos transferencias bancarias a través de cualquier banco boliviano, pagos inmediatos mediante código QR Simple, y tarjetas de débito o crédito (Visa y Mastercard). Toda la información de tu compra está protegida bajo estándares de encriptación bancaria.",
  },
  {
    id: "faq-4",
    category: "Productos & Calidad",
    question: "¿Los discos son nuevos o de segunda mano?",
    answer:
      "Todos los discos de vinilo que comercializamos son 100% nuevos, originales y sellados de fábrica en plástico termocontraíble. La gran mayoría son ediciones audiófilas prensadas en vinilo virgen pesado de 180 gramos para ofrecer la máxima durabilidad y calidad acústica.",
  },
  {
    id: "faq-5",
    category: "Suscripción Miembro Plus",
    question: "¿Cómo funciona la Suscripción Miembro Plus de 500 Bs/mes?",
    answer:
      "Nuestra suscripción mensual te entrega 3 vinilos al mes (despachamos 1 disco cada semana durante las 3 primeras semanas del mes). Para que nunca te llegue un disco de un género que no te gusta, nuestro configurador te permite elegir tus géneros favoritos (rock, indie, pop, etc.) y marcar tus exclusiones estrictas (como reggaetón o jazz instrumental). Sin contratos de permanencia: puedes pausar o cancelar cuando quieras.",
  },
  {
    id: "faq-6",
    category: "Garantía & Devoluciones",
    question: "¿Qué garantía tienen los discos si presentan algún defecto de fábrica?",
    answer:
      "Garantizamos la pureza acústica de cada prensado. Si un disco presenta defectos de prensado de fábrica, alabeo severo o saltos anormales con tu tornamesa correctamente calibrada, te lo cambiamos de inmediato sin ningún costo adicional dentro de los primeros 7 días.",
  },
  {
    id: "faq-7",
    category: "Tornamesas & Equipos",
    question: "¿Los tocadiscos vienen listos para usar o necesitan amplificador externo?",
    answer:
      "La mayoría de nuestros modelos compactos y maletines incorporan previo de fono y altavoces estéreo listos para enchufar y reproducir. En los modelos audiófilos de sobremesa (Audio-Technica, U-Turn, Yamaha), disponen de salida RCA conmutables para conectarse directamente a tus parlantes activos o equipo de sonido doméstico.",
  },
];

export default function FAQPage() {
  const [openId, setOpenId] = useState<string>("faq-1");

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <main className="w-full min-h-screen bg-white text-black py-10 sm:py-24 px-4 sm:px-12 lg:px-16">
      <div className="w-full max-w-[1520px] mx-auto space-y-16 sm:space-y-24">
        
        {/* Encabezado */}
        <div className="border-b border-black/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
              Centro de Ayuda • Respuestas Claras
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-black">
              Preguntas Frecuentes
            </h1>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-neutral-600">
            <span className="block font-bold text-neutral-900 text-sm">Atención Personalizada</span>
            <span>WhatsApp directo: +591 68610314</span>
          </div>
        </div>

        {/* Grilla 2 Columnas: Acordeón a la izquierda + Amiguito y Asistencia a la derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Acordeón de Preguntas en líneas puras minimalistas */}
          <div className="lg:col-span-8 divide-y divide-neutral-200">
            {FAQS.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id} className="py-6 first:pt-0">
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full text-left flex items-start justify-between gap-4 focus:outline-none cursor-pointer group"
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                        {faq.category}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl text-neutral-900 font-normal leading-snug group-hover:opacity-75 transition-opacity">
                        {faq.question}
                      </h3>
                    </div>
                    <div
                      className={`w-6 h-6 flex items-center justify-center shrink-0 text-neutral-400 group-hover:text-black transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-black" : ""
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="pt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans font-light animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Columna Derecha: Asistencia Directa en Estilo Editorial */}
          <div className="lg:col-span-4 space-y-6 lg:border-l lg:border-neutral-200 lg:pl-10">
            <div className="mb-4">
              <VinylCharacter size={95} pose="headphones" />
            </div>

            <div>
              <h3 className="font-serif text-2xl font-normal text-neutral-900 mb-2">
                ¿Tienes alguna otra consulta?
              </h3>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                Estamos disponibles para ayudarte con recomendaciones musicales, información sobre tiempos de flete a tu localidad o configuración de tu tornamesa.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href="https://wa.me/59168610314?text=%C2%A1Hola!%20Tengo%20una%20consulta%20sobre%20los%20productos%20y%20env%C3%ADos%20de%20Aguja%20%26%20Vinilo."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-black hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
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
              <p>Horario de atención directa:</p>
              <p className="text-neutral-700 font-medium">Lunes a Sábado: 09:00 – 20:00</p>
              <p>Tiempo de respuesta habitual: &lt; 15 min</p>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
