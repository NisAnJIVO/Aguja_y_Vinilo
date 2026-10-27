import React from "react";
import Link from "next/link";
import { Disc, Phone, Mail, ShieldCheck, Heart, Truck, MessageCircle } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-black/10 dark:border-white/10 bg-[#0A0A09] dark:bg-[#0A0A09] light:bg-[#EAE4D5] text-[#C3B9A1] dark:text-[#C3B9A1] light:text-[#38342B] pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-black/5 dark:border-white/5">
          {/* BRAND COLUMN */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#181714] border border-[#C89D56]/40 flex items-center justify-center">
                <Disc className="w-4 h-4 text-[#C89D56]" />
              </div>
              <span className="font-display font-semibold tracking-wider text-lg text-theme-primary">
                AGUJA Y VINILO
              </span>
            </div>
            <p className="text-sm text-theme-muted leading-relaxed max-w-sm">
              Tienda 100% online especializada en el objeto físico y el sonido analógico.
              Vinilos curados de 180g, tocadiscos audiófilos calibrados a mano y muebles artesanales,
              con despachos asegurados a todos los departamentos de Bolivia.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#C89D56] dark:text-[#C89D56] light:text-[#9E6F22]">
              <ShieldCheck className="w-4 h-4" />
              <span>Garantía de prensado plano y embalaje rígido multicapa</span>
            </div>
          </div>

          {/* SECCIONES */}
          <div>
            <h4 className="font-display font-semibold text-sm text-theme-primary uppercase tracking-wider mb-4">
              Colección
            </h4>
            <ul className="space-y-2.5 text-xs text-theme-muted">
              <li>
                <Link href="/catalogo" className="hover:text-[#C89D56] transition-colors">
                  Catálogo General
                </Link>
              </li>
              <li>
                <Link href="/bibliotecas" className="hover:text-[#C89D56] transition-colors">
                  Bibliotecas Curadas
                </Link>
              </li>
              <li>
                <Link href="/suscripcion" className="text-[#C05436] hover:underline font-semibold">
                  Suscripción Mensual Sorpresa
                </Link>
              </li>
              <li>
                <Link href="/tocadiscos" className="hover:text-[#C89D56] transition-colors">
                  Tocadiscos Hi-Fi
                </Link>
              </li>
              <li>
                <Link href="/fundas" className="hover:text-[#C89D56] transition-colors">
                  Fundas y Limpieza Ritual
                </Link>
              </li>
              <li>
                <Link href="/muebles" className="hover:text-[#C89D56] transition-colors">
                  Mobiliario en Vinilo y Madera
                </Link>
              </li>
            </ul>
          </div>

          {/* ENVÍOS Y ATENCIÓN ONLINE */}
          <div>
            <h4 className="font-display font-semibold text-sm text-theme-primary uppercase tracking-wider mb-4">
              Envíos Nacionales
            </h4>
            <ul className="space-y-3 text-xs text-theme-muted">
              <li className="flex items-start gap-2">
                <Truck className="w-4 h-4 text-[#C89D56] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-theme-primary block">Tienda 100% Online</strong>
                  Despachos diarios asegurados a La Paz, Santa Cruz, Cochabamba, Sucre, Tarija, Oruro, Potosí, Beni y Pando.
                </span>
              </li>
              <li className="text-[11px] font-mono text-[#5F6B50] font-semibold">
                Envío gratuito para pedidos mayores a 400 Bs
              </li>
            </ul>
          </div>

          {/* ATENCIÓN DIRECTA */}
          <div>
            <h4 className="font-display font-semibold text-sm text-theme-primary uppercase tracking-wider mb-4">
              Contacto Directo
            </h4>
            <ul className="space-y-2.5 text-xs text-theme-muted">
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#5F6B50]" />
                <a
                  href="https://wa.me/59168610314"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C89D56] font-mono text-sm font-semibold text-theme-primary"
                >
                  WhatsApp: 68610314
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C89D56]" />
                <span className="font-mono text-theme-primary">+591 68610314</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C89D56]" />
                <a href="mailto:jivo3534@gmail.com" className="hover:text-[#C89D56] text-theme-primary">
                  jivo3534@gmail.com
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/contacto"
                  className="inline-block px-3 py-1.5 rounded border border-[#C89D56]/40 text-[#C89D56] hover:bg-[#C89D56] hover:text-[#0E0E0C] font-medium text-xs transition-colors"
                >
                  Consultas & Asesoría
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-theme-muted gap-4">
          <p>© 2026 Aguja y Vinilo — Tienda online de música analógica en Bolivia. Moneda oficial: Bolivianos (Bs).</p>
          <div className="flex items-center gap-1">
            <span>Envíos asegurados con amor por el acetato</span>
            <Heart className="w-3.5 h-3.5 text-[#C05436] fill-current mx-1 inline" />
            <span>a toda Bolivia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
