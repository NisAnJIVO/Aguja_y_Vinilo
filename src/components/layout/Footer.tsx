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

            {/* REDES SOCIALES */}
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-mono text-theme-muted uppercase tracking-wider">Redes:</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram @agujayvinilo"
                className="w-8 h-8 rounded-full bg-black/10 dark:bg-white/10 hover:bg-[#E1306C]/20 border border-black/10 dark:border-white/10 hover:border-[#E1306C] flex items-center justify-center text-theme-primary hover:text-[#E1306C] transition-all hover:scale-110"
              >
                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook Aguja y Vinilo"
                className="w-8 h-8 rounded-full bg-black/10 dark:bg-white/10 hover:bg-[#1877F2]/20 border border-black/10 dark:border-white/10 hover:border-[#1877F2] flex items-center justify-center text-theme-primary hover:text-[#1877F2] transition-all hover:scale-110"
              >
                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok @agujayvinilo"
                className="w-8 h-8 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/30 border border-black/10 dark:border-white/10 hover:border-[#C89D56] flex items-center justify-center text-theme-primary hover:text-[#C89D56] transition-all hover:scale-110"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube Aguja y Vinilo"
                className="w-8 h-8 rounded-full bg-black/10 dark:bg-white/10 hover:bg-[#FF0000]/20 border border-black/10 dark:border-white/10 hover:border-[#FF0000] flex items-center justify-center text-theme-primary hover:text-[#FF0000] transition-all hover:scale-110"
              >
                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
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
          <p>© 2026 Aguja y Vinilo - Tienda online de música analógica en Bolivia. Moneda oficial: Bolivianos (Bs).</p>
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
