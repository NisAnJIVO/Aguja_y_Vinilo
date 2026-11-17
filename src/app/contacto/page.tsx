"use client";

import React, { useState } from "react";
import { MessageCircle, Mail, MapPin, Clock, Check } from "lucide-react";
import { VinylCharacter } from "@/components/ui/VinylCharacter";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    emailOrPhone: "",
    asunto: "consulta-general",
    mensaje: "",
  });

  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.mensaje) return;

    setIsSent(true);
    setTimeout(() => {
      setFormData({
        nombre: "",
        emailOrPhone: "",
        asunto: "consulta-general",
        mensaje: "",
      });
      setIsSent(false);
    }, 4000);
  };

  return (
    <main className="w-full min-h-screen bg-white text-black py-10 sm:py-24 px-4 sm:px-12 lg:px-16">
      <div className="w-full max-w-[1520px] mx-auto space-y-16 sm:space-y-24">
        
        {/* Encabezado */}
        <div className="border-b border-black/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
              Atención al Cliente • Asesoría Especializada
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-black">
              Contacto &amp; Soporte
            </h1>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-neutral-600">
            <span className="block font-bold text-neutral-900 text-sm">Respuesta en menos de 15 minutos</span>
            <span>WhatsApp directo: +591 68610314</span>
          </div>
        </div>

        {/* Grilla 2 Columnas: Canales Directos (5 cols) + Formulario (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Canales Directos */}
          <div className="lg:col-span-5 space-y-8">
            <div className="mb-6">
              <VinylCharacter size={105} pose="headphones" />
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                Canal Inmediato
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-neutral-900">
                Escríbenos por WhatsApp
              </h2>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 mt-2 font-light leading-relaxed">
                Es nuestro canal más rápido para consultar disponibilidad de discos, resolver dudas sobre calibración de tornamesas o coordinar envíos inmediatos.
              </p>
            </div>

            <a
              href="https://wa.me/59168610314?text=%C2%A1Hola!%20Me%20contacto%20desde%20la%20p%C3%A1gina%20de%20Aguja%20%26%20Vinilo%20para%20solicitar%20asesor%C3%ADa."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full py-3.5 px-6 bg-black hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider font-semibold items-center justify-center gap-2.5 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Abrir Chat de WhatsApp (+591 68610314)</span>
            </a>

            <div className="pt-6 border-t border-neutral-200 space-y-4 text-xs font-mono text-neutral-600">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-neutral-900 block">Horario de Atención:</span>
                  <span>Lunes a Sábado: 09:00 – 20:00</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-neutral-900 block">Sede Operativa:</span>
                  <span>Sucre, Chuquisaca, Bolivia (Despachos diarios a todo el país)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-neutral-900 block">Correo Electrónico:</span>
                  <a href="mailto:jivo3534@gmail.com" className="hover:underline">jivo3534@gmail.com</a>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-100 space-y-1.5 text-xs font-mono">
                <span className="font-bold text-neutral-900 block uppercase tracking-wider text-[11px]">Redes &amp; Canales:</span>
                <div className="flex flex-wrap gap-4 pt-1">
                  <a
                    href="https://www.tiktok.com/@agujayvinilos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-neutral-800"
                  >
                    TikTok &rarr;
                  </a>
                  <a
                    href="https://www.instagram.com/ajuga_y_vinilo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-neutral-800"
                  >
                    Instagram &rarr;
                  </a>
                  <a
                    href="mailto:jivo3534@gmail.com"
                    className="hover:underline text-neutral-800"
                  >
                    Gmail &rarr;
                  </a>
                  <a
                    href="https://wa.me/59168610314"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-neutral-800"
                  >
                    WhatsApp &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de Mensaje */}
          <div className="lg:col-span-7 space-y-6 lg:border-l lg:border-neutral-200 lg:pl-12">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                Formulario Web
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-neutral-900">
                Envíanos un Mensaje
              </h2>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 mt-1 font-light">
                Completa tus datos y nos pondremos en contacto contigo en breve.
              </p>
            </div>

            {isSent ? (
              <div className="p-8 text-center bg-neutral-50 border border-neutral-200 rounded space-y-3 animate-in fade-in">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="font-serif text-xl font-normal text-neutral-900">
                  ¡Mensaje Enviado con Éxito!
                </h3>
                <p className="font-sans text-xs text-neutral-600 max-w-sm mx-auto font-light">
                  Gracias por escribirnos. Uno de nuestros curadores revisará tu mensaje y te responderá en breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                <div>
                  <label className="text-[11px] font-mono uppercase text-neutral-600 block mb-1">
                    Tu Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Ej. Nombre y apellido"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-black font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-neutral-600 block mb-1">
                      Correo Electrónico o Teléfono *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.emailOrPhone}
                      onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                      placeholder="Ej. nombre@correo.com o 68610314"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-black font-sans"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-neutral-600 block mb-1">
                      Motivo de Contacto
                    </label>
                    <select
                      value={formData.asunto}
                      onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-black font-sans"
                    >
                      <option value="consulta-general">Consulta de Disco o Álbum</option>
                      <option value="tornamesas">Asesoría sobre Tocadiscos</option>
                      <option value="envios">Estado o Seguimiento de Envío</option>
                      <option value="suscripcion">Dudas sobre Miembro Plus</option>
                      <option value="mayoristas">Ventas al Por Mayor</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-neutral-600 block mb-1">
                    Tu Mensaje o Consulta *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    placeholder="Cuéntanos qué disco buscas, qué tornamesa tienes o en qué podemos ayudarte..."
                    className="w-full bg-neutral-50 border border-neutral-200 rounded px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-black font-sans resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-black hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                  >
                    Enviar Mensaje &rarr;
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}
