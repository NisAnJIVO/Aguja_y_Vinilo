"use client";

import React, { useState } from "react";
import { Phone, Mail, Clock, Check, Disc, MessageCircle, Truck, ShieldCheck, Share2 } from "lucide-react";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* HEADER */}
      <div className="max-w-3xl mb-12 md:mb-16">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C89D56] uppercase tracking-wider mb-2">
          <Disc className="w-4 h-4 animate-spin-slow" />
          <span>Atención al Coleccionista</span>
        </div>
        <h1 className="font-display font-medium text-3xl sm:text-4xl md:text-5xl text-theme-primary tracking-tight">
          Contacto & Asesoramiento
        </h1>
        <p className="mt-4 text-sm sm:text-base text-theme-muted leading-relaxed">
          ¿Buscas una primera edición especial, calibrar tu cápsula o diseñar un mueble a medida?
          Escríbenos directamente o déjanos tu consulta para coordinar tu envío a cualquier rincón de Bolivia.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LEFT: CONTACT FORM */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-theme-card border border-black/10 dark:border-white/10 shadow-sm">
          {isSubmitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#5F6B50]/20 text-[#5F6B50] flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl text-theme-primary">
                Consulta Registrada con Éxito
              </h3>
              <p className="text-xs text-theme-muted max-w-sm mx-auto leading-relaxed">
                Gracias, <strong className="text-theme-primary">{formData.name}</strong>. Nos comunicaremos contigo al{" "}
                <strong className="text-theme-primary">{formData.phone || formData.email}</strong> vía WhatsApp a la brevedad.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 px-4 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono text-theme-primary hover:border-[#C89D56]"
              >
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-theme-muted uppercase">Nombre y Apellido *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej: Marcelo Quiroga"
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
                    placeholder="tunombre@ejemplo.com"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-theme-primary focus:border-[#C89D56] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-theme-muted uppercase">Celular / WhatsApp *</label>
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
                    Lunes a Sábado: 09:00 – 20:00
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center gap-2 text-[11px] font-mono text-[#5F6B50]">
              <ShieldCheck className="w-4 h-4" />
              <span>Garantía de prensado plano y reemplazo sin costo</span>
            </div>
          </div>

          {/* Social Media Card */}
          <div className="p-8 rounded-2xl bg-theme-card border border-black/10 dark:border-white/10 space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#C89D56]" />
              <h3 className="font-display text-lg text-theme-primary">
                Redes Sociales & Comunidad
              </h3>
            </div>
            <p className="text-xs text-theme-muted leading-relaxed">
              Síguenos para nuevos ingresos de vinilos, unboxings de prensados especiales, consejos de agujas y promociones exclusivas.
            </p>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#C89D56] text-theme-primary text-xs font-mono transition-all hover:scale-[1.02]"
              >
                <svg className="w-4 h-4 fill-none stroke-[#E1306C]" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                <span>Instagram</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#C89D56] text-theme-primary text-xs font-mono transition-all hover:scale-[1.02]"
              >
                <svg className="w-4 h-4 fill-none stroke-[#1877F2]" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                <span>Facebook</span>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#C89D56] text-theme-primary text-xs font-mono transition-all hover:scale-[1.02]"
              >
                <svg className="w-4 h-4 fill-current text-theme-primary" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
                <span>TikTok</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#C89D56] text-theme-primary text-xs font-mono transition-all hover:scale-[1.02]"
              >
                <svg className="w-4 h-4 fill-none stroke-[#FF0000]" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
