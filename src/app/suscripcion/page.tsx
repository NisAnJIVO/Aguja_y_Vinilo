"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import { useLanguage } from "@/context/LanguageContext";
import { VinylFriendGift } from "@/components/ui/VinylFriendGift";
import { VinylCharacter } from "@/components/ui/VinylCharacter";
import {
  ShoppingCart,
  ArrowRight,
  Clock,
  Truck,
  AlertTriangle,
  X,
  Edit3,
} from "lucide-react";

// Géneros musicales seleccionables
const GENEROS_DISPONIBLES = [
  "Rock Clásico & Alternativo",
  "Indie Rock & Shoegaze",
  "Pop & Synthpop",
  "Post-Punk & New Wave",
  "Hip Hop & Neo Soul",
  "Electrónica & Ambient",
  "Rock Latino & En Español",
  "Metal & Hard Rock",
  "Folk & Acústico",
];

// Géneros para exclusión
const GENEROS_EXCLUIBLES = [
  "Reggaetón & Urbano Comercial",
  "Jazz Instrumental",
  "Cumbia & Tropical",
  "Metal Extremo",
  "Country",
  "Música Clásica",
];

const GENEROS_MAP_EN: Record<string, string> = {
  "Rock Clásico & Alternativo": "Classic & Alternative Rock",
  "Indie Rock & Shoegaze": "Indie Rock & Shoegaze",
  "Pop & Synthpop": "Pop & Synthpop",
  "Post-Punk & New Wave": "Post-Punk & New Wave",
  "Hip Hop & Neo Soul": "Hip Hop & Neo Soul",
  "Electrónica & Ambient": "Electronic & Ambient",
  "Rock Latino & En Español": "Latin & Spanish Rock",
  "Metal & Hard Rock": "Metal & Hard Rock",
  "Folk & Acústico": "Folk & Acoustic",
  "Reggaetón & Urbano Comercial": "Reggaeton & Commercial Urban",
  "Jazz Instrumental": "Instrumental Jazz",
  "Cumbia & Tropical": "Cumbia & Tropical",
  "Metal Extremo": "Extreme Metal",
  "Country": "Country",
  "Música Clásica": "Classical Music",
};

const CIUDADES_BOLIVIA = [
  "Sucre",
  "La Paz",
  "Santa Cruz",
  "Cochabamba",
  "Tarija",
  "Oruro",
  "Potosí",
  "Beni (Trinidad)",
  "Pando (Cobija)",
];

export default function SuscripcionPage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const { addItem } = useCartStore();
  const { isPlus, profile, cancelSubscription, updatePreferences } =
    useSubscriptionStore();

  const isEn = language === "en";

  const [mounted, setMounted] = useState(false);

  // Estados del formulario de suscripción
  const [favoritos, setFavoritos] = useState<string[]>([
    "Rock Clásico & Alternativo",
    "Indie Rock & Shoegaze",
  ]);
  const [excluidos, setExcluidos] = useState<string[]>([
    "Reggaetón & Urbano Comercial",
  ]);
  const [notas, setNotas] = useState("");

  // Formulario de dirección de envío
  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("Sucre");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");

  const [isSubscribing, setIsSubscribing] = useState(false);

  // Modal para confirmar cancelación
  const [showCancelModal, setShowCancelModal] = useState(false);
  // Modal para editar preferencias de miembro activo
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (profile) {
      setFavoritos(profile.generosFavoritos || []);
      setExcluidos(profile.generosExcluidos || []);
      setNotas(profile.notas || "");
      setNombre(profile.nombre || "");
      setCiudad(profile.ciudad || "Sucre");
      setDireccion(profile.direccion || "");
      setTelefono(profile.telefono || "");
    }
  }, [profile]);

  // Toggle de favoritos
  const toggleFavorito = (gen: string) => {
    setFavoritos((prev) => {
      if (prev.includes(gen)) {
        if (prev.length === 1) return prev;
        return prev.filter((g) => g !== gen);
      }
      setExcluidos((ex) => ex.filter((g) => g !== gen));
      return [...prev, gen];
    });
  };

  // Toggle de exclusiones
  const toggleExcluido = (gen: string) => {
    setExcluidos((prev) => {
      if (prev.includes(gen)) {
        return prev.filter((g) => g !== gen);
      }
      setFavoritos((fav) => fav.filter((g) => g !== gen));
      return [...prev, gen];
    });
  };

  // Helper para nombre de género en pantalla
  const getGenreDisplay = (gen: string) => {
    return isEn ? GENEROS_MAP_EN[gen] || gen : gen;
  };

  // Proceder al pago de la suscripción
  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubscribing) return;
    setIsSubscribing(true);

    const favShort = favoritos.map((f) => getGenreDisplay(f).split(" ")[0]).join(", ");
    const exShort = excluidos.map((e) => getGenreDisplay(e).split(" ")[0]).join(", ");

    addItem(
      {
        id: "sub-miembro-plus",
        type: "subscription",
        title: isEn ? "Plus Member Subscription" : "Suscripción Miembro Plus",
        subtitle: `3 ${isEn ? "records/mo" : "discos/mes"} • ${ciudad} • ${
          isEn ? "Favorites" : "Favoritos"
        }: ${favShort}${exShort ? ` • ${isEn ? "Excludes" : "Excluye"}: ${exShort}` : ""}`,
        priceBs: 500,
      },
      1
    );

    // Animación del amiguito corriendo con el regalo y redirección directa al carrito
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      router.push("/carrito");
    }, 1400);
  };

  // Guardar edición de preferencias en modo Miembro Plus
  const handleSavePreferences = () => {
    updatePreferences(favoritos, excluidos, notas, {
      nombre,
      ciudad,
      direccion,
      telefono,
    });
    setShowEditModal(false);
  };

  if (!mounted) {
    return (
      <main className="w-full min-h-screen bg-white py-20 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin" />
      </main>
    );
  }

  // =========================================================================
  // VISTA 1: DASHBOARD DE MIEMBRO PLUS (CUANDO YA ESTÁ SUSCRITO)
  // =========================================================================
  if (isPlus && profile) {
    return (
      <main className="w-full min-h-screen bg-white text-black py-12 sm:py-20 px-4 sm:px-8 lg:px-14">
        <div className="w-full max-w-[1440px] mx-auto space-y-12">
          
          {/* Encabezado de Miembro Plus con el muñequito coronado */}
          <div className="bg-white p-6 sm:p-10 border border-black/15 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5 sm:gap-6">
              {/* Nuestro amiguito con su CORONA DE MIEMBRO PLUS */}
              <div className="shrink-0">
                <VinylCharacter size={95} forceCrown={true} pose="headphones" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F59E0B] text-black uppercase tracking-wider">
                    {t.suscripcion.plusActiveBadge}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    {t.suscripcion.since} {profile.fechaInicio}
                  </span>
                </div>
                <h1 className="font-serif text-2xl sm:text-4xl font-normal text-neutral-900 tracking-tight">
                  {t.suscripcion.hello} {profile.nombre}
                </h1>
                <p className="font-sans text-xs sm:text-sm text-neutral-600 font-light mt-0.5">
                  {t.suscripcion.dashboardSubtitle}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setShowEditModal(true)}
                className="px-4 py-2.5 bg-white hover:bg-neutral-100 text-neutral-800 font-mono text-xs uppercase tracking-wider border border-neutral-300 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{t.suscripcion.editPrefsBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowCancelModal(true)}
                className="px-4 py-2.5 text-xs font-mono text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 transition-colors cursor-pointer"
              >
                {t.suscripcion.cancelBtn}
              </button>
            </div>
          </div>

          {/* Grilla: Progreso de Entregas (7 cols) + Datos de Envío (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Columna Izquierda: Entregas del Mes & Preferencias */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Progreso de las 3 Entregas Semanales */}
              <div className="bg-white p-6 sm:p-8 border border-black/15 space-y-5">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-normal text-neutral-900">
                      {t.suscripcion.upcomingDeliveriesTitle}
                    </h2>
                    <span className="font-mono text-xs text-neutral-500">
                      {isEn ? "1 curated surprise record delivered each week" : "1 disco sorpresa cada semana directo a tu puerta"}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-neutral-900 bg-neutral-100 px-2.5 py-1 rounded">
                    {isEn ? "1 of 3 delivered" : "1 de 3 entregados"}
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {/* Entrega 1 */}
                  <div className="flex items-center justify-between p-3.5 rounded bg-neutral-50 border border-neutral-200">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        ✓
                      </div>
                      <div>
                        <span className="font-bold text-neutral-900 block">
                          {isEn ? "Week 1: First Arrival" : "Semana 1: Primer Envío"}
                        </span>
                        <span className="text-[11px] text-neutral-500">
                          {isEn ? `Successfully delivered to ${profile.ciudad}` : `Entregado con éxito en ${profile.ciudad}`}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] text-neutral-800 font-semibold font-mono">
                      {t.suscripcion.completedStatus}
                    </span>
                  </div>

                  {/* Entrega 2 */}
                  <div className="flex items-center justify-between p-3.5 rounded bg-neutral-50 border border-neutral-200">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center animate-pulse">
                        <Truck className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-bold text-neutral-900 block">
                          {isEn ? "Week 2: Packing Curation" : "Semana 2: Preparando Curaduría"}
                        </span>
                        <span className="text-[11px] text-neutral-500">
                          {isEn ? `Next shipment: ${profile.proximaEntrega}` : `Próximo despacho: ${profile.proximaEntrega}`}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] text-neutral-700 font-semibold">
                      {t.suscripcion.inProcessStatus}
                    </span>
                  </div>

                  {/* Entrega 3 */}
                  <div className="flex items-center justify-between p-3.5 rounded bg-neutral-50/60 border border-neutral-200/60 opacity-60">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-neutral-200 text-neutral-500 flex items-center justify-center">
                        <Clock className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-medium text-neutral-700 block">
                          {isEn ? "Week 3: In Selection Queue" : "Semana 3: En Cola de Selección"}
                        </span>
                        <span className="text-[11px] text-neutral-400">
                          {isEn ? "Monthly season finale" : "Cierre mensual de temporada"}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] text-neutral-400">
                      {t.suscripcion.scheduledStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Preferencias Musicales Activas */}
              <div className="bg-white p-6 sm:p-8 border border-black/15 space-y-4">
                <h3 className="font-serif text-xl font-normal text-neutral-900">
                  {t.suscripcion.soundProfileTitle}
                </h3>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <span className="text-neutral-500 block mb-1">
                      {t.suscripcion.priorityGenres}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.generosFavoritos.map((fav) => (
                        <span
                          key={fav}
                          className="px-2.5 py-1 bg-black text-white rounded text-[11px]"
                        >
                          {getGenreDisplay(fav)}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-100">
                    <span className="text-neutral-500 block mb-1">
                      {t.suscripcion.activeExclusions}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.generosExcluidos.length > 0 ? (
                        profile.generosExcluidos.map((ex) => (
                          <span
                            key={ex}
                            className="px-2.5 py-1 bg-neutral-100 text-neutral-600 rounded text-[11px] line-through"
                          >
                            {getGenreDisplay(ex)}
                          </span>
                        ))
                      ) : (
                        <span className="text-neutral-400">{t.suscripcion.noExclusions}</span>
                      )}
                    </div>
                  </div>

                  {profile.notas && (
                    <div className="pt-2 border-t border-neutral-100">
                      <span className="text-neutral-500 block mb-1">
                        {t.suscripcion.curatorNotes}
                      </span>
                      <p className="text-neutral-800 font-sans italic bg-neutral-50 p-2.5 rounded border border-neutral-200">
                        &ldquo;{profile.notas}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Columna Derecha: Dirección Registrada & Soporte Directo */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white p-6 sm:p-8 border border-black/15 space-y-4">
                <h3 className="font-serif text-xl font-normal text-neutral-900">
                  {t.suscripcion.destinationLabel}
                </h3>

                <div className="space-y-3 font-mono text-xs text-neutral-700">
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span className="text-neutral-500">{t.suscripcion.nameLabel}:</span>
                    <span className="font-bold text-neutral-900">{profile.nombre}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span className="text-neutral-500">{t.suscripcion.cityLabel}:</span>
                    <span className="font-bold text-neutral-900">{profile.ciudad}, Bolivia</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span className="text-neutral-500">{t.suscripcion.addressLabel}:</span>
                    <span className="text-neutral-800 max-w-[200px] text-right truncate">
                      {profile.direccion}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">{t.suscripcion.phoneLabel}:</span>
                    <span className="text-neutral-800">{profile.telefono}</span>
                  </div>
                </div>
              </div>

              {/* Canal VIP */}
              <div className="bg-white p-6 sm:p-8 border border-black/15 space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-900 font-bold block">
                  {t.suscripcion.vipSupportTitle}
                </span>
                <p className="font-sans text-xs text-neutral-600 font-light leading-relaxed">
                  {t.suscripcion.vipSupportDesc}
                </p>
                <a
                  href={`https://wa.me/59168610314?text=%C2%A1Hola!%20Soy%20Miembro%20Plus%20(${profile.nombre})%20y%20deseo%20coordinar%20mi%20pr%C3%B3xima%20entrega%20semanal.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-black hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>{t.suscripcion.vipWhatsAppBtn}</span>
                </a>
              </div>

            </div>

          </div>

          {/* MODAL DE CANCELACIÓN DE SUSCRIPCIÓN */}
          {showCancelModal && (
            <div
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <div className="bg-white max-w-md w-full p-6 sm:p-8 rounded-lg shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
                <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-6 h-6" />
                </div>

                <div className="text-center space-y-2">
                  <h3 className="font-serif text-2xl font-normal text-neutral-900">
                    {t.suscripcion.cancelModalTitle}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    {t.suscripcion.cancelModalDesc}
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCancelModal(false)}
                    className="flex-1 py-3 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-mono text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                  >
                    {t.suscripcion.keepMembershipBtn}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      cancelSubscription();
                      setShowCancelModal(false);
                    }}
                    className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                  >
                    {t.suscripcion.confirmCancelBtn}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MODAL DE EDICIÓN DE PREFERENCIAS Y DIRECCIÓN */}
          {showEditModal && (
            <div
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-lg shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                  <h3 className="font-serif text-2xl font-normal text-neutral-900">
                    {t.suscripcion.editModalTitle}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="p-1 rounded-full hover:bg-neutral-100 text-neutral-500 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Géneros favoritos */}
                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase tracking-wider text-neutral-900 font-bold block">
                    {t.suscripcion.likesLabel}
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {GENEROS_DISPONIBLES.map((gen) => {
                      const isSel = favoritos.includes(gen);
                      return (
                        <button
                          key={gen}
                          type="button"
                          onClick={() => toggleFavorito(gen)}
                          className={`px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer border ${
                            isSel
                              ? "bg-black text-white border-black"
                              : "bg-white text-neutral-700 border-neutral-300 hover:border-black"
                          }`}
                        >
                          {getGenreDisplay(gen)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Exclusiones */}
                <div className="space-y-2 pt-2 border-t border-neutral-100">
                  <label className="font-mono text-xs uppercase tracking-wider text-neutral-900 font-bold block">
                    {t.suscripcion.exclusionsLabel}
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {GENEROS_EXCLUIBLES.map((gen) => {
                      const isEx = excluidos.includes(gen);
                      return (
                        <button
                          key={gen}
                          type="button"
                          onClick={() => toggleExcluido(gen)}
                          className={`px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer border ${
                            isEx
                              ? "bg-neutral-900 text-white border-neutral-900 line-through"
                              : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-neutral-400"
                          }`}
                        >
                          {getGenreDisplay(gen)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dirección y teléfono */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-100">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-neutral-600 block mb-1">
                      {t.suscripcion.nameLabel}
                    </label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded px-3 py-2 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono uppercase text-neutral-600 block mb-1">
                      {t.suscripcion.cityLabel}
                    </label>
                    <select
                      value={ciudad}
                      onChange={(e) => setCiudad(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded px-3 py-2 text-xs font-mono"
                    >
                      {CIUDADES_BOLIVIA.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-mono uppercase text-neutral-600 block mb-1">
                      {t.suscripcion.addressLabel}
                    </label>
                    <input
                      type="text"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded px-3 py-2 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono uppercase text-neutral-600 block mb-1">
                      {t.suscripcion.phoneLabel}
                    </label>
                    <input
                      type="text"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded px-3 py-2 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-3 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 py-3 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-mono text-xs uppercase tracking-wider rounded cursor-pointer"
                  >
                    {t.suscripcion.cancelEditBtn}
                  </button>
                  <button
                    type="button"
                    onClick={handleSavePreferences}
                    className="flex-1 py-3 px-4 bg-black hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider rounded cursor-pointer"
                  >
                    {t.suscripcion.saveChangesBtn}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    );
  }

  // =========================================================================
  // VISTA 2: FORMULARIO DE SUSCRIPCIÓN (CUANDO AÚN NO ES PLUS)
  // =========================================================================
  return (
    <main className="w-full min-h-screen bg-white text-black py-12 sm:py-20 px-4 sm:px-8 lg:px-14 relative">
      <div className="w-full max-w-[1440px] mx-auto space-y-12 sm:space-y-16">
        
        {/* Encabezado */}
        <div className="border-b border-black/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
              {t.suscripcion.badge}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-black">
              {t.suscripcion.title}
            </h1>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-neutral-600">
            <span className="block font-bold text-neutral-900 text-sm">
              {t.suscripcion.pricePerMonth}
            </span>
            <span>{t.suscripcion.frequencyText}</span>
          </div>
        </div>

        {/* Grilla: Plan a la izquierda (5 cols) + Formulario de Gustos y Dirección a la derecha (7 cols) */}
        <form onSubmit={handleProceed} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Columna Izquierda: Tarjeta del Plan */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-10 border border-black/15 space-y-8">
            <div className="space-y-3 border-b border-neutral-100 pb-6">
              <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 block">
                {t.suscripcion.membershipTitle}
              </span>
              <h2 className="font-serif text-3xl font-normal text-neutral-900">
                {t.suscripcion.planName}
              </h2>
              <div className="flex items-baseline gap-2 pt-1">
                <span className="font-mono text-4xl sm:text-5xl font-bold text-neutral-900">
                  {t.suscripcion.monthlyPrice}
                </span>
                <span className="font-mono text-xs uppercase text-neutral-500">
                  {t.suscripcion.perMonthSuffix}
                </span>
              </div>
            </div>

            <div className="space-y-4 font-mono text-xs text-neutral-700">
              <div className="flex items-start justify-between border-b border-neutral-100 pb-3">
                <span className="text-neutral-500">{t.suscripcion.formatLabel}</span>
                <span className="font-bold text-neutral-900 text-right">
                  {t.suscripcion.formatValue}
                </span>
              </div>
              <div className="flex items-start justify-between border-b border-neutral-100 pb-3">
                <span className="text-neutral-500">{t.suscripcion.frequencyLabel}</span>
                <span className="font-bold text-neutral-900 text-right">
                  {t.suscripcion.frequencyValue}
                </span>
              </div>
              <div className="flex items-start justify-between border-b border-neutral-100 pb-3">
                <span className="text-neutral-500">{t.suscripcion.shippingLabel}</span>
                <span className="font-bold text-neutral-900 text-right">
                  {t.suscripcion.shippingValue}
                </span>
              </div>
              <div className="flex items-start justify-between border-b border-neutral-100 pb-3">
                <span className="text-neutral-500">{t.suscripcion.commitmentLabel}</span>
                <span className="font-bold text-neutral-900 text-right">
                  {t.suscripcion.commitmentValue}
                </span>
              </div>
              <div className="flex items-start justify-between pt-1">
                <span className="text-neutral-500">{t.suscripcion.badgeLabel}</span>
                <span className="font-bold text-amber-600 text-right">
                  {t.suscripcion.badgeValue}
                </span>
              </div>
            </div>

            {/* Ilustración de nuestro amiguito sosteniendo el regalo */}
            <div className="p-4 rounded-md bg-neutral-50 border border-neutral-200/60 flex items-center gap-4">
              <div className="w-14 h-14 bg-black rounded flex items-center justify-center shrink-0">
                <VinylFriendGift size={48} inverted={true} forceCrown={true} />
              </div>
              <div className="text-xs font-mono text-neutral-600">
                <strong className="text-neutral-900 block font-serif text-sm font-normal">
                  {t.suscripcion.boxTitle}
                </strong>
                {t.suscripcion.boxDesc}
              </div>
            </div>

            {/* BOTÓN PROTAGONISTA: PROCEDER AL PAGO */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubscribing}
                className="w-full py-4 px-6 bg-black hover:bg-neutral-800 disabled:bg-neutral-600 text-white font-mono text-xs uppercase tracking-wider font-semibold rounded flex items-center justify-center gap-3 transition-colors shadow-sm cursor-pointer"
              >
                <span>{t.suscripcion.proceedBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Columna Derecha: Gustos + Datos de Envío */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-black/15 space-y-8">
            
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                {t.suscripcion.configSubtitle}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-neutral-900">
                {t.suscripcion.configTitle}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 font-light mt-1">
                {t.suscripcion.configDesc}
              </p>
            </div>

            {/* 1. Géneros favoritos */}
            <div className="space-y-3">
              <label className="font-mono text-xs uppercase tracking-wider text-neutral-900 font-bold block">
                {t.suscripcion.likesLabel}
              </label>

              <div className="flex flex-wrap gap-2">
                {GENEROS_DISPONIBLES.map((gen) => {
                  const isSelected = favoritos.includes(gen);
                  return (
                    <button
                      key={gen}
                      type="button"
                      onClick={() => toggleFavorito(gen)}
                      className={`px-3.5 py-2 rounded text-xs font-mono transition-colors cursor-pointer border ${
                        isSelected
                          ? "bg-black text-white border-black font-semibold"
                          : "bg-white text-neutral-700 border-neutral-300 hover:border-black"
                      }`}
                    >
                      {getGenreDisplay(gen)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Exclusiones */}
            <div className="space-y-3 pt-4 border-t border-neutral-100">
              <label className="font-mono text-xs uppercase tracking-wider text-neutral-900 font-bold block">
                {t.suscripcion.exclusionsLabel}
              </label>

              <div className="flex flex-wrap gap-2">
                {GENEROS_EXCLUIBLES.map((gen) => {
                  const isExcluded = excluidos.includes(gen);
                  return (
                    <button
                      key={gen}
                      type="button"
                      onClick={() => toggleExcluido(gen)}
                      className={`px-3.5 py-2 rounded text-xs font-mono transition-colors cursor-pointer border ${
                        isExcluded
                          ? "bg-neutral-900 text-white border-neutral-900 line-through opacity-90"
                          : "bg-neutral-50 text-neutral-500 border-neutral-200 hover:border-neutral-400"
                      }`}
                    >
                      {getGenreDisplay(gen)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Formulario de Envío Semanal */}
            <div className="space-y-4 pt-4 border-t border-neutral-100 font-sans">
              <label className="font-mono text-xs uppercase tracking-wider text-neutral-900 font-bold block">
                {t.suscripcion.destinationLabel}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase text-neutral-600 block mb-1">
                    {t.suscripcion.nameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder={isEn ? "E.g. Your full name" : "Ej. Tu nombre y apellido"}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded px-3.5 py-2.5 text-xs text-neutral-900 font-mono focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-neutral-600 block mb-1">
                    {t.suscripcion.cityLabel} *
                  </label>
                  <select
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded px-3.5 py-2.5 text-xs text-neutral-900 font-mono focus:outline-none focus:border-black"
                  >
                    {CIUDADES_BOLIVIA.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-mono uppercase text-neutral-600 block mb-1">
                    {t.suscripcion.addressLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    placeholder={isEn ? "E.g. Calvo St #240, Central Zone (or Agency Pickup)" : "Ej. Calle Calvo #240, Zona Central (o Retiro en Terminal)"}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded px-3.5 py-2.5 text-xs text-neutral-900 font-mono focus:outline-none focus:border-black"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-mono uppercase text-neutral-600 block mb-1">
                    {t.suscripcion.phoneLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Ej. 68610314"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded px-3.5 py-2.5 text-xs text-neutral-900 font-mono focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            {/* 4. Artistas Referencia */}
            <div className="space-y-2 pt-4 border-t border-neutral-100">
              <label className="font-mono text-xs uppercase tracking-wider text-neutral-900 font-bold block">
                {t.suscripcion.notesLabel}
              </label>
              <input
                type="text"
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                placeholder={isEn ? "E.g. Radiohead, Oasis, Dayglow, Cerati, The Smiths..." : "Ej. Radiohead, Oasis, Dayglow, Cerati, The Smiths..."}
                className="w-full bg-neutral-50 border border-neutral-200 rounded px-3.5 py-2.5 text-xs text-neutral-900 font-mono focus:outline-none focus:border-black"
              />
            </div>

          </div>

        </form>

      </div>

      {/* SPINNER / ANIMACIÓN EXCLUSIVA: NUESTRO AMIGUITO CORRIENDO CON EL REGALO */}
      {isSubscribing && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-[120] backdrop-blur-md bg-white/85 flex flex-col items-center justify-center select-none animate-in fade-in duration-200"
        >
          <div className="w-full max-w-sm px-6 text-center space-y-6">
            
            {/* Pista de carrera */}
            <div className="relative w-64 h-24 mx-auto flex items-center justify-between border-b-2 border-black/20 pb-2">
              <div className="animate-[runAcross_1.2s_ease-in-out_infinite] transform">
                <VinylFriendGift size={76} isRunning={true} forceCrown={true} />
              </div>
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shrink-0 shadow-md">
                <ShoppingCart className="w-6 h-6 stroke-[2]" />
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-normal text-neutral-900 tracking-tight">
                {isEn ? "Preparing your subscription..." : "Preparando tu suscripción..."}
              </h3>
              <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest mt-1">
                {isEn ? "Taking your surprise box to cart" : "Llevando tu caja al carrito"}
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Estilos CSS para el recorrido del amiguito */}
      <style jsx global>{`
        @keyframes runAcross {
          0% {
            transform: translateX(0px) rotate(-3deg);
          }
          50% {
            transform: translateX(55px) rotate(4deg);
          }
          100% {
            transform: translateX(110px) rotate(-3deg);
          }
        }
      `}</style>
    </main>
  );
}
