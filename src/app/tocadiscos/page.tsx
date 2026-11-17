"use client";

import React, { useMemo } from "react";
import { useProductModalStore } from "@/store/productModalStore";
import { useLanguage } from "@/context/LanguageContext";
import { useSearchStore } from "@/store/searchStore";
import { X } from "lucide-react";

interface TocadiscosItem {
  id: number;
  name: string;
  nameEn?: string;
  type: string;
  typeEn?: string;
  priceBs: number;
  desc: string;
  descEn?: string;
  image: string;
}

const TOCADISCOS_ITEMS: TocadiscosItem[] = [
  {
    id: 1,
    name: "Tornamesa de Sobremesa en Madera con Altavoz",
    nameEn: "Desktop Wooden Turntable with Built-in Speaker",
    type: "Tornamesa Doméstica Hi-Fi",
    typeEn: "Hi-Fi Home Turntable",
    priceBs: 1650,
    desc: "Chasis de madera natural con altavoz frontal integrado, cubierta de acrílico transparente y soporte para vinilos.",
    descEn: "Natural wood plinth with built-in front-facing speaker, clear acrylic dustcover, and integrated vinyl stand.",
    image: "/img/Tocadiscos/1.jpg",
  },
  {
    id: 2,
    name: "Tornamesa Compacta Syitren con Altavoz Estéreo",
    nameEn: "Syitren Compact Turntable with Stereo Speaker",
    type: "Tocadiscos Compacto de Madera",
    typeEn: "Compact Wooden Turntable",
    priceBs: 1400,
    desc: "Plinto de nogal con frontal de tela acústica, cápsula magnética pre-calibrada y tapa antipolvo ahumada.",
    descEn: "Walnut plinth with acoustic fabric grille, pre-calibrated magnetic cartridge, and smoked dustcover.",
    image: "/img/Tocadiscos/2.jpg",
  },
  {
    id: 3,
    name: "Gramófono Clásico con Trompeta de Latón Dorado",
    nameEn: "Classic Gramophone with Polished Brass Horn",
    type: "Pieza de Colección Vintage",
    typeEn: "Vintage Collector's Piece",
    priceBs: 2800,
    desc: "Réplica artesanal histórica con enorme bocina floral de latón pulido, mecanismo a manivela y caja de madera noble.",
    descEn: "Historical artisan replica with polished floral brass horn, manual hand-crank mechanism, and hardwood chest.",
    image: "/img/Tocadiscos/3.jpg",
  },
  {
    id: 4,
    name: "Tocadiscos Portátil Maletín Celeste Vintage",
    nameEn: "Vintage Pastel Blue Suitcase Turntable",
    type: "Maletín Transportable 3 Velocidades",
    typeEn: "3-Speed Portable Suitcase",
    priceBs: 680,
    desc: "Diseño ByronStatics en maleta celeste pastel con asa ergonómica, cierres metálicos y altavoces estéreo incorporados.",
    descEn: "Pastel blue suitcase design with ergonomic handle, heavy-duty latches, and stereo speakers.",
    image: "/img/Tocadiscos/4.jpg",
  },
  {
    id: 5,
    name: "Tornamesa Vertical Cyberpunk BEAT-FORCE",
    nameEn: "Cyberpunk Vertical Turntable BEAT-FORCE",
    type: "Diseño Conceptual Futurista",
    typeEn: "Futuristic Concept Design",
    priceBs: 3200,
    desc: "Estructura vertical transparente con tubos iluminados, diseño mecha vanguardista y reproducción en ángulo flotante.",
    descEn: "Transparent vertical structure with ambient tubes, vanguard mecha styling, and floating playback angle.",
    image: "/img/Tocadiscos/5.jpg",
  },
  {
    id: 6,
    name: "Magnetófono Master Reel-to-Reel de Bobina Abierta",
    nameEn: "Master Reel-to-Reel Open-Spool Tape Deck",
    type: "Grabadora de Cinta Analógica",
    typeEn: "Analog Tape Recorder",
    priceBs: 4500,
    desc: "Equipo analógico de estudio con carretes de aluminio, vúmetros iluminados y perillas de precisión en aluminio cepillado.",
    descEn: "Studio analog unit with aluminum reels, backlit analog VU meters, and brushed aluminum precision dials.",
    image: "/img/Tocadiscos/6.jpg",
  },
  {
    id: 7,
    name: "Tocadiscos Maleta Rojo Brillante",
    nameEn: "Bright Crimson Red Suitcase Turntable",
    type: "Maletín Retro Vinilo",
    typeEn: "Retro Vinyl Suitcase",
    priceBs: 720,
    desc: "Estuche de transporte forrado en ecocuero rojo carmesí con herrajes cromados y conmutador para 33, 45 y 78 RPM.",
    descEn: "Crimson faux leather carrying case with chrome hardware and selector for 33, 45, and 78 RPM.",
    image: "/img/Tocadiscos/7.jpg",
  },
  {
    id: 8,
    name: "Gramófono Antiguo con Bocina Escarlata Grabada",
    nameEn: "Antique Gramophone with Embossed Scarlet Horn",
    type: "Gramófono His Master's Voice",
    typeEn: "Classic Acoustic Horn Gramophone",
    priceBs: 2950,
    desc: "Auténtico gramófono con bocina petalada en esmalte rojo envejecido, caja lacada en negro satinado y reproductor de aguja.",
    descEn: "Petaled scarlet horn with antique finish, satin black lacquered cabinet, and physical needle reproducer.",
    image: "/img/Tocadiscos/8.jpg",
  },
  {
    id: 9,
    name: "Tocadiscos Maletín Victrola Blanco Puro",
    nameEn: "Victrola Pure White Suitcase Turntable",
    type: "Maleta Portátil Minimalista",
    typeEn: "Minimalist Portable Suitcase",
    priceBs: 750,
    desc: "Maletín en cuero sintético blanco marfil con altavoces frontales, entrada auxiliar y salida para auriculares.",
    descEn: "Ivory white leatherette suitcase with front speakers, aux-in, and dedicated headphone jack.",
    image: "/img/Tocadiscos/9.jpg",
  },
  {
    id: 10,
    name: "Tornamesa Minimalista Blanca Audio-Technica",
    nameEn: "Audio-Technica Minimalist White Turntable",
    type: "Tornamesa Hi-Fi Automática",
    typeEn: "Automatic Hi-Fi Turntable",
    priceBs: 1850,
    desc: "Líneas puras en blanco mate con tapa de metacrilato transparente, brazo recto y previo de fono conmutable.",
    descEn: "Clean matte white design with crystal dustcover, straight tonearm, and switchable phono preamp.",
    image: "/img/Tocadiscos/10.jpg",
  },
  {
    id: 11,
    name: "Tornamesa U-Turn Orbit Nogal Audiophile",
    nameEn: "U-Turn Orbit Walnut Audiophile Turntable",
    type: "Tracción por Correa de Precisión",
    typeEn: "Precision Belt-Drive Turntable",
    priceBs: 2600,
    desc: "Chasis macizo en nogal americano, plato acrílico de alta inercia y brazo balanceado con aguja Ortofon.",
    descEn: "Solid American walnut plinth, high-inertia acrylic platter, and balanced tonearm with Ortofon cartridge.",
    image: "/img/Tocadiscos/11.jpg",
  },
  {
    id: 12,
    name: "Tornamesa Vintage Yamaha Direct Drive YP-D3",
    nameEn: "Vintage Yamaha Direct Drive Turntable YP-D3",
    type: "Tracción Directa Clásica 70s",
    typeEn: "Classic 70s Direct Drive",
    priceBs: 3100,
    desc: "Plinto de madera natural con motor servo direct drive, brazo cromado en forma de S y luz estroboscópica de calibración.",
    descEn: "Natural wood plinth with servo direct-drive motor, chrome S-shaped tonearm, and stroboscopic light.",
    image: "/img/Tocadiscos/12.jpg",
  },
  {
    id: 13,
    name: "Torre Hi-Fi Vintage Pioneer con Mueble de Cristal",
    nameEn: "Pioneer Vintage Hi-Fi Tower with Glass Cabinet",
    type: "Sistema Completo de Audio Rack",
    typeEn: "Complete Audio Rack System",
    priceBs: 4200,
    desc: "Tornamesa Pioneer PL plateada montada sobre mueble rack de madera con puertas de vidrio y amplificador estéreo integrado.",
    descEn: "Silver Pioneer PL turntable housed in wooden audio cabinet with glass doors and integrated stereo amp.",
    image: "/img/Tocadiscos/13.jpg",
  },
  {
    id: 14,
    name: "Tocadiscos Retro Ford Mustang Rojo Metálico",
    nameEn: "Ford Mustang 1965 Retro Metallic Red Turntable",
    type: "Edición Conmemorativa Mustang 1965",
    typeEn: "Mustang 1965 Commemorative Edition",
    priceBs: 1750,
    desc: "Diseño automotriz con velocímetro retroiluminado como dial de radio AM/FM, altavoces frontales y sonido estéreo.",
    descEn: "Automotive-inspired design with backlit speedometer radio dial, front speakers, and stereo sound.",
    image: "/img/Tocadiscos/14.jpg",
  },
  {
    id: 15,
    name: "Gramófono Victoriano con Plata Repujada",
    nameEn: "Victorian Gramophone with Embossed Silver",
    type: "Antigüedad Ornamental",
    typeEn: "Ornamental Antique",
    priceBs: 3600,
    desc: "Caja de caoba con placas de plata repujada en motivos florales, bocina cincelada y manivela lateral funcional.",
    descEn: "Mahogany casing with floral embossed silver plaques, carved brass horn, and functional hand crank.",
    image: "/img/Tocadiscos/15.jpg",
  },
  {
    id: 16,
    name: "Tornamesa Negro Mate sobre Mueble Curvo con Listones",
    nameEn: "Matte Black Turntable on Slatted Curved Console",
    type: "Set Moderno Tornamesa + Mueble",
    typeEn: "Modern Turntable + Console Set",
    priceBs: 2450,
    desc: "Tocadiscos negro satinado con tapa acrílica transparente sobre mueble semicircular de palillería con ranuras para discos.",
    descEn: "Satin black player with clear cover seated atop a curved wood-slat cabinet with vinyl storage slots.",
    image: "/img/Tocadiscos/16.jpg",
  },
];

export default function TocadiscosPage() {
  const { openModal } = useProductModalStore();
  const { language, t } = useLanguage();
  const { searchQuery, clearSearch } = useSearchStore();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const q = mounted ? searchQuery.trim().toLowerCase() : "";

  const filteredItems = useMemo(() => {
    if (!q) return TOCADISCOS_ITEMS;
    return TOCADISCOS_ITEMS.filter((item) => {
      const matchName =
        item.name.toLowerCase().includes(q) ||
        (item.nameEn && item.nameEn.toLowerCase().includes(q));
      const matchType =
        item.type.toLowerCase().includes(q) ||
        (item.typeEn && item.typeEn.toLowerCase().includes(q));
      const matchDesc =
        item.desc.toLowerCase().includes(q) ||
        (item.descEn && item.descEn.toLowerCase().includes(q));
      return matchName || matchType || matchDesc;
    });
  }, [q]);

  const isEn = language === "en";

  return (
    <main suppressHydrationWarning className="w-full min-h-screen bg-[#EDEDED] text-black py-8 sm:py-20 px-4 sm:px-10 lg:px-16">
      <div className="w-full max-w-[1720px] mx-auto">
        
        {/* Encabezado */}
        <div className="mb-8 sm:mb-12 border-b border-black/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-black">
              {t.tocadiscos.title}
            </h1>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mt-2">
              {t.tocadiscos.subtitle}
            </span>
          </div>

          {mounted && q && (
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-neutral-600">
                {filteredItems.length} {t.tocadiscos.itemsFound}
              </span>
              <button
                type="button"
                onClick={clearSearch}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black text-white rounded font-mono text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>{t.tocadiscos.clearFilter}</span>
              </button>
            </div>
          )}
        </div>

        {/* Mensaje de sin resultados */}
        {filteredItems.length === 0 ? (
          <div className="bg-white p-12 text-center rounded border border-black/10 my-8">
            <p className="font-serif text-lg text-neutral-800 mb-2">
              {t.tocadiscos.noResults}
            </p>
            <p className="text-xs font-mono text-neutral-500 mb-6">
              &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              type="button"
              onClick={clearSearch}
              className="px-4 py-2 bg-black text-white rounded font-mono text-xs uppercase cursor-pointer"
            >
              {t.tocadiscos.clearFilter}
            </button>
          </div>
        ) : (
          /* Grilla 4x4 */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {filteredItems.map((item) => {
              const displayName = isEn && item.nameEn ? item.nameEn : item.name;
              const displayType = isEn && item.typeEn ? item.typeEn : item.type;
              const displayDesc = isEn && item.descEn ? item.descEn : item.desc;

              return (
                <div
                  key={item.id}
                  onClick={() =>
                    openModal({
                      id: `tocadiscos-${item.id}`,
                      title: displayName,
                      subtitle: displayType,
                      categoryLabel: isEn ? "Turntables & Analog Audio" : "Tocadiscos & Tornamesas",
                      priceBs: item.priceBs,
                      image: item.image,
                      description: displayDesc,
                      type: "turntable",
                    })
                  }
                  className="flex flex-col select-none group cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div className="relative w-full aspect-[4/3] bg-white rounded-sm overflow-hidden border border-black/5 shadow-sm">
                    <img
                      src={item.image}
                      alt={displayName}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="pt-3.5 flex flex-col">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                      {displayType}
                    </span>
                    <h3 className="font-serif text-base sm:text-[17px] font-normal text-black mt-1 leading-snug group-hover:opacity-75 transition-opacity">
                      {displayName}
                    </h3>
                    <p className="font-sans text-xs text-neutral-600 mt-1 line-clamp-2 leading-relaxed font-light">
                      {displayDesc}
                    </p>
                    <p className="text-sm font-bold font-mono text-black mt-2">
                      Bs. {item.priceBs.toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}
