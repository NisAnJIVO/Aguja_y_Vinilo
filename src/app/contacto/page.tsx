"use client";

import React, { useState } from "react";
import { Phone, Mail, Clock, Check, Disc, MessageCircle, Truck, ShieldCheck } from "lucide-react";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "La Paz",
    reason: "Asesoría para elegir vinilo",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* HEADER */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89D56]/15 border border-[#C89D56]/30 text-xs font-mono text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22]">
          <MessageCircle className="w-3.5 h-3.5" />
          <span>ATENCIÓN ONLINE PERSONALIZADA • ENVÍOS A TODA BOLIVIA</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl text-theme-primary">
          Hablemos de Música & Vinilos
        </h1>

        <p className="text-sm sm:text-base text-theme-secondary font-light leading-relaxed">
          Somos una tienda 100% online especializada en el objeto físico. ¿Buscas un disco en
          específico que no ves en el catálogo? ¿Quieres asesoramiento para calibrar tu cápsula
          o encargar un mueble con medidas especiales? Escríbenos directamente por WhatsApp o déjanos un mensaje.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* LEFT: CONTACT FORM */}
        <div className="lg:col-span-7 p-8 rounded-2xl bg-theme-card border border-black/10 dark:border-white/10 shadow-sm">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#5F6B50]/20 border border-[#5F6B50] flex items-center justify-center mx-auto text-[#748363]">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="font-display text-2xl text-theme-primary">
                Mensaje Recibido
              </h2>
              <p className="text-xs sm:text-sm text-theme-muted max-w-md mx-auto leading-relaxed">
                Muchas gracias, <strong className="text-theme-primary">{formData.name}</strong>. Te responderemos al WhatsApp <strong className="text-[#C89D56]">{formData.phone}</strong> o al correo <strong className="text-[#C89D56]">{formData.email}</strong> a la brevedad.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 px-5 py-2.5 rounded-lg border border-black/10 dark:border-white/10 text-xs font-mono text-[#C89D56] hover:bg-black/5 dark:hover:bg-white/5"
              >
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-black/10 dark:border-white/10 pb-4">
                <h2 className="font-display text-xl text-theme-primary">
                  Formulario de Contacto & Asesoría
                </h2>
                <p className="text-xs text-theme-muted">
                  Te contestamos el mismo día. Atención de lunes a sábado.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-theme-muted uppercase">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tu nombre"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-theme-primary focus:border-[#C89D56] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-theme-muted uppercase">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tucorreo@email.com"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-theme-primary focus:border-[#C89D56] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-theme-muted uppercase">Teléfono / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ej: 68610314"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-theme-primary focus:border-[#C89D56] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-theme-muted uppercase">Tu Departamento *</label>
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
                <label className="text-xs font-mono text-theme-muted uppercase">Motivo de Consulta</label>
                <select
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-theme-primary focus:border-[#C89D56] focus:outline-none"
                >
                  <option value="Asesoría para elegir vinilo">Asesoría para elegir un vinilo de colección</option>
                  <option value="Consulta sobre Tocadiscos">Asesoramiento técnico en tocadiscos y agujas</option>
                  <option value="Mobiliario a Medida">Cotización de mueble para vinilos a medida</option>
                  <option value="Suscripción Sorpresa">Dudas sobre la Suscripción Mensual Sorpresa</option>
                  <option value="Búsqueda de disco descatalogado">Búsqueda de un disco especial o descatalogado</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-theme-muted uppercase">Mensaje o Detalle *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Cuéntanos qué necesitas saber o qué álbum estás buscando..."
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-theme-primary focus:border-[#C89D56] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-[#C89D56] hover:bg-[#DDB36D] text-[#0E0E0C] font-semibold text-xs flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] shadow-xl"
              >
                <Disc className="w-4 h-4 animate-spin-slow" />
                <span>Enviar Consulta</span>
              </button>
            </form>
          )}
        </div>

        {/* RIGHT: DIRECT CONTACT CHANNELS */}
        <div className="lg:col-span-5 space-y-6">
          {/* WhatsApp Direct Card */}
          <div className="p-8 rounded-2xl bg-theme-card border border-[#5F6B50]/40 space-y-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#5F6B50]/20 flex items-center justify-center text-[#5F6B50]">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-medium text-lg text-theme-primary">
                  WhatsApp Directo
                </h3>
                <span className="text-xs font-mono text-[#5F6B50] font-semibold">Respuesta Rápida</span>
              </div>
            </div>

            <p className="text-xs text-theme-muted leading-relaxed">
              La vía más rápida para consultar stock, solicitar fotos reales del prensado o coordinar tu despacho.
            </p>

            <a
              href="https://wa.me/59168610314?text=Hola%20Aguja%20y%20Vinilo,%20quisiera%20hacer%20una%20consulta"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-lg bg-[#5F6B50] hover:bg-[#748363] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-transform hover:scale-105 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chatear al 68610314</span>
            </a>
          </div>

          {/* Details Card */}
          <div className="p-8 rounded-2xl bg-theme-card border border-black/10 dark:border-white/10 space-y-5 shadow-sm">
            <h3 className="font-display text-lg text-theme-primary">
              Canales Oficiales
            </h3>

            <div className="space-y-4 text-xs font-mono text-theme-muted">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C89D56] shrink-0 mt-0.5" />
                <div>
                  <span className="text-theme-muted text-[10px] uppercase block">Teléfono / WhatsApp</span>
                  <a href="tel:+59168610314" className="text-theme-primary font-bold hover:text-[#C89D56]">
                    +591 68610314
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C89D56] shrink-0 mt-0.5" />
                <div>
                  <span className="text-theme-muted text-[10px] uppercase block">Correo Electrónico</span>
                  <a href="mailto:jivo3534@gmail.com" className="text-theme-primary font-bold hover:text-[#C89D56]">
                    jivo3534@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Truck className="w-4 h-4 text-[#C89D56] shrink-0 mt-0.5" />
                <div>
                  <span className="text-theme-muted text-[10px] uppercase block">Cobertura de Despachos</span>
                  <span className="text-theme-primary">
                    Envíos diarios asegurados a los 9 departamentos de Bolivia
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C89D56] shrink-0 mt-0.5" />
                <div>
                  <span className="text-theme-muted text-[10px] uppercase block">Horario de Atención Online</span>
                  <span className="text-theme-primary">
                    Lunes a Sábado: 09:00 — 20:00
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center gap-2 text-[11px] font-mono text-[#5F6B50]">
              <ShieldCheck className="w-4 h-4" />
              <span>Garantía de prensado plano y reemplazo sin costo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
