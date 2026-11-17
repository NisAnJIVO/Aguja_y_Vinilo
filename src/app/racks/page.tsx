"use client";

import React, { useMemo } from "react";
import { useProductModalStore } from "@/store/productModalStore";
import { useLanguage } from "@/context/LanguageContext";
import { useSearchStore } from "@/store/searchStore";
import { X } from "lucide-react";

interface MuebleItem {
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

const MUEBLES_ITEMS: MuebleItem[] = [
  {
    id: 1,
    name: "Credenza Retro Esquinas Curvas",
    nameEn: "Curved-Corner Retro Credenza",
    type: "Mueble Aparador Mediano",
    typeEn: "Mid-Sized Sideboard Console",
    priceBs: 2400,
    desc: "Nogal cálido con marco envolvente redondeado, estantes dobles para discos y puerta vertical independiente.",
    descEn: "Warm walnut with rounded wrap-around frame, dual record shelves, and independent vertical door.",
    image: "/img/Muebles/1.jpg",
  },
  {
    id: 2,
    name: "Mesa Consola Ovalada Compacta",
    nameEn: "Compact Oval Console Table",
    type: "Mesa Auxiliar / Tocadiscos",
    typeEn: "Turntable & Vinyl Accent Table",
    priceBs: 1450,
    desc: "Cuerpo ovalado retro en madera oscura con bahía abierta izquierda y dos cajones cilíndricos.",
    descEn: "Retro dark-wood oval body featuring open left bay and twin cylindrical accessory drawers.",
    image: "/img/Muebles/2.jpg",
  },
  {
    id: 3,
    name: "Consola Angular Trapezoidal",
    nameEn: "Trapezoidal Angle Audio Console",
    type: "Mueble de Autor Mid-Century",
    typeEn: "Mid-Century Designer Piece",
    priceBs: 2100,
    desc: "Geometría oblicua artesanal con 2 cajones anchos con uñero y doble estante abierto para amplificador y vinilos.",
    descEn: "Handcrafted oblique geometry with 2 wide flush-pull drawers and dual open shelves for amp and LPs.",
    image: "/img/Muebles/3.jpg",
  },
  {
    id: 4,
    name: "Gran Credenza Clásica con Arcos de Vidrio",
    nameEn: "Grand Classic Credenza with Arched Glass",
    type: "Aparador Monumental",
    typeEn: "Monumental Audiophile Sideboard",
    priceBs: 4800,
    desc: "Pieza de gran formato (~2m) con 4 puertas con vidrieras en arco, 2 cajones centrales y herrajes de latón dorado.",
    descEn: "Large format piece (~2m) with 4 arched glass doors, 2 center drawers, and brushed brass hardware.",
    image: "/img/Muebles/4.jpg",
  },
  {
    id: 5,
    name: "Aparador Mid-Century con Puertas de Ratán",
    nameEn: "Mid-Century Sideboard with Woven Rattan Doors",
    type: "Mueble Acústico Cannage",
    typeEn: "Cannage Acoustic Audio Unit",
    priceBs: 3200,
    desc: "Frontal con celosía trenzada de mimbre natural que permite el paso del sonido, con nicho central para tornamesa o receptor.",
    descEn: "Natural cane lattice front that lets sound pass freely, with central bay for turntable or audio receiver.",
    image: "/img/Muebles/5.jpg",
  },
  {
    id: 6,
    name: "Estantería Consola 4 Nichos Redondeados",
    nameEn: "4-Niche Soft-Edge Console Bookshelf",
    type: "Estante Modular de Roble",
    typeEn: "Modular Oak Storage Shelf",
    priceBs: 1950,
    desc: "Estructura diáfana de roble macizo con 4 compartimentos de borde suave diseñados para almacenar hasta 200 LPs.",
    descEn: "Solid oak structure featuring 4 soft-contoured cube bays tailored to store up to 200 LP records.",
    image: "/img/Muebles/6.jpg",
  },
  {
    id: 7,
    name: "Aparador Escandinavo Vintage 3 Cajones",
    nameEn: "Vintage Scandinavian 3-Drawer Credenza",
    type: "Consola Danesa Clásica",
    typeEn: "Classic Danish Modern Console",
    priceBs: 3600,
    desc: "Madera maciza lustrada con tiradores de madera esculpidos a mano, 3 cajones centrales y 2 puertas laterales de gran capacidad.",
    descEn: "Lustrous solid timber with hand-carved wood handles, 3 central drawers, and 2 deep lateral cabinets.",
    image: "/img/Muebles/7.jpg",
  },
  {
    id: 8,
    name: "Mueble Escultórico Asimétrico",
    nameEn: "Asymmetric Sculptural Audio Cabinet",
    type: "Mobiliario de Colección",
    typeEn: "Collector Art Furniture",
    priceBs: 4200,
    desc: "Diseño vanguardista con puerta lateral facetada en ángulo y veta cruzada de madera noble sobre patas estilizadas.",
    descEn: "Avant-garde silhouette with angular faceted side door and bookmatched grain atop tapered legs.",
    image: "/img/Muebles/8.jpg",
  },
  {
    id: 9,
    name: "Buffet Arquitectónico Acanalado de Lujo",
    nameEn: "Luxury Fluted Architectural Audio Buffet",
    type: "Aparador Palillería Premium",
    typeEn: "Premium Fluted Wood Sideboard",
    priceBs: 5400,
    desc: "Frontal monumental de listones acanalados con arcos en relieve, patas estriadas y tapa superior amplia para equipo Hi-Fi.",
    descEn: "Monumental fluted wood slat front with relief arches, reeded legs, and wide top deck for heavy Hi-Fi gear.",
    image: "/img/Muebles/9.jpg",
  },
  {
    id: 10,
    name: "Mesa Consola Baja Aerodinámica",
    nameEn: "Aerodynamic Low-Profile Console Table",
    type: "Mesa de Centro para Vinilos",
    typeEn: "Vinyl Coffee & Turntable Table",
    priceBs: 1600,
    desc: "Diseño cápsula retro-futurista con nicho deslizante en acabado verde petróleo, ideal para tocadiscos compacto y revistas.",
    descEn: "Retro-futuristic capsule design with sliding teal bay, ideal for compact players, vinyls, and magazines.",
    image: "/img/Muebles/10.jpg",
  },
  {
    id: 11,
    name: "Consola de Audio Integral Futurista",
    nameEn: "Futuristic All-in-One Space Console",
    type: "Sistema de Sonido Todo-en-Uno",
    typeEn: "All-in-One Integrated Sound System",
    priceBs: 6800,
    desc: "Consola escultórica inspirada en el diseño espacial de los 70s, con altavoces estéreo incorporados, tornamesa y tapa acrílica tintada.",
    descEn: "Sculptural console inspired by 70s Space Age design, complete with stereo speakers, deck, and tinted dome.",
    image: "/img/Muebles/11.jpg",
  },
  {
    id: 12,
    name: "Banco Estéreo de Madera Maciza DOOPER",
    nameEn: "DOOPER Solid Wood Stereo Acoustic Bench",
    type: "Consola Soundbar de Autor",
    typeEn: "Designer Soundbar Credenza",
    priceBs: 4900,
    desc: "Bloque de roble natural con sistema de bafles estéreo integrados en el frente y plataforma superior libre para tocadiscos.",
    descEn: "Solid natural oak monolith with front-integrated stereo drivers and open top deck for high-end decks.",
    image: "/img/Muebles/12.jpg",
  },
  {
    id: 13,
    name: "Torre Minimalista para 150 Discos",
    nameEn: "Minimalist 150-Record Upright Tower",
    type: "Torre Vertical Compacta",
    typeEn: "Compact Vertical LP Tower",
    priceBs: 1300,
    desc: "Estructura vertical esbelta para espacios reducidos con repisa superior para tocadiscos y nichos divididos.",
    descEn: "Slender vertical storage for compact living rooms, with top player tray and segregated album cubbies.",
    image: "/img/Muebles/13.jpg",
  },
  {
    id: 14,
    name: "Aparador Vintage con Racks de Exhibición Frontal",
    nameEn: "Vintage Credenza with Front-Display Bins",
    type: "Aparador Flip-Bin de Roble",
    typeEn: "Oak Flip-Bin Record Console",
    priceBs: 3800,
    desc: "Permite ojear las portadas hacia el frente como en una disquería, con amplios estantes inferiores y cajón de accesorios.",
    descEn: "Allows crate-digging style browsing of cover art, with deep lower shelves and accessory drawers.",
    image: "/img/Muebles/14.jpg",
  },
  {
    id: 15,
    name: "Mesa Auxiliar Minimalista en Nogal Oscuro",
    nameEn: "Minimalist Dark Walnut Accent Stand",
    type: "Soporte Compacto para Deck",
    typeEn: "Compact Audio Deck Stand",
    priceBs: 1100,
    desc: "Patas inclinadas cónicas con estante inferior ranurado para guardar 40 discos de uso diario.",
    descEn: "Tapered angled legs with slotted bottom shelf holding up to 40 daily rotation vinyl records.",
    image: "/img/Muebles/15.jpg",
  },
  {
    id: 16,
    name: "Credenza Industrial Hierro & Madera Reciclada",
    nameEn: "Industrial Iron & Reclaimed Timber Credenza",
    type: "Mueble Brutalista Pesado",
    typeEn: "Heavy Brutalist Audio Unit",
    priceBs: 3400,
    desc: "Estructura de perfiles de acero soldado al carbono combinada con tablones gruesos de madera recuperada tratada.",
    descEn: "Welded carbon steel perimeter frame paired with thick reclaimed solid timber planks.",
    image: "/img/Muebles/16.jpg",
  },
];

export default function RacksPage() {
  const { openModal } = useProductModalStore();
  const { language, t } = useLanguage();
  const { searchQuery, clearSearch } = useSearchStore();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const q = mounted ? searchQuery.trim().toLowerCase() : "";

  const filteredItems = useMemo(() => {
    if (!q) return MUEBLES_ITEMS;
    return MUEBLES_ITEMS.filter((item) => {
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
              {t.racks.title}
            </h1>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mt-2">
              {t.racks.subtitle}
            </span>
          </div>

          {mounted && q && (
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-neutral-600">
                {filteredItems.length} {t.racks.itemsFound}
              </span>
              <button
                type="button"
                onClick={clearSearch}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black text-white rounded font-mono text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>{t.racks.clearFilter}</span>
              </button>
            </div>
          )}
        </div>

        {/* Mensaje de sin resultados */}
        {filteredItems.length === 0 ? (
          <div className="bg-white p-12 text-center rounded border border-black/10 my-8">
            <p className="font-serif text-lg text-neutral-800 mb-2">
              {t.racks.noResults}
            </p>
            <p className="text-xs font-mono text-neutral-500 mb-6">
              &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              type="button"
              onClick={clearSearch}
              className="px-4 py-2 bg-black text-white rounded font-mono text-xs uppercase cursor-pointer"
            >
              {t.racks.clearFilter}
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
                      id: `rack-${item.id}`,
                      title: displayName,
                      subtitle: displayType,
                      categoryLabel: isEn ? "Vinyl Furniture & Racks" : "Muebles & Racks de Vinilo",
                      priceBs: item.priceBs,
                      image: item.image,
                      description: displayDesc,
                      type: "furniture",
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
