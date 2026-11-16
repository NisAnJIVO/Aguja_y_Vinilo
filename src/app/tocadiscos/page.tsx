import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tocadiscos & Tornamesas | Aguja & Vinilo",
  description: "Desde gramófonos de colección y tocadiscos maletín vintage hasta tornamesas audiófilas de alta precisión.",
};

const TOCADISCOS_ITEMS = [
  {
    id: 1,
    name: "Tornamesa de Sobremesa en Madera con Altavoz",
    type: "Tornamesa Doméstica Hi-Fi",
    priceBs: 1650,
    desc: "Chasis de madera natural con altavoz frontal integrado, cubierta de acrílico transparente y soporte para vinilos.",
    image: "/img/Tocadiscos/1.jpg",
  },
  {
    id: 2,
    name: "Tornamesa Compacta Syitren con Altavoz Estéreo",
    type: "Tocadiscos Compacto de Madera",
    priceBs: 1400,
    desc: "Plinto de nogal con frontal de tela acústica, cápsula magnética pre-calibrada y tapa antipolvo ahumada.",
    image: "/img/Tocadiscos/2.jpg",
  },
  {
    id: 3,
    name: "Gramófono Clásico con Trompeta de Latón Dorado",
    type: "Pieza de Colección Vintage",
    priceBs: 2800,
    desc: "Réplica artesanal histórica con enorme bocina floral de latón pulido, mecanismo a manivela y caja de madera noble.",
    image: "/img/Tocadiscos/3.jpg",
  },
  {
    id: 4,
    name: "Tocadiscos Portátil Maletín Celeste Vintage",
    type: "Maletín Transportable 3 Velocidades",
    priceBs: 680,
    desc: "Diseño ByronStatics en maleta celeste pastel con asa ergonómica, cierres metálicos y altavoces estéreo incorporados.",
    image: "/img/Tocadiscos/4.jpg",
  },
  {
    id: 5,
    name: "Tornamesa Vertical Cyberpunk BEAT-FORCE",
    type: "Diseño Conceptual Futurista",
    priceBs: 3200,
    desc: "Estructura vertical transparente con tubos iluminados, diseño mecha vanguardista y reproducción en ángulo flotante.",
    image: "/img/Tocadiscos/5.jpg",
  },
  {
    id: 6,
    name: "Magnetófono Master Reel-to-Reel de Bobina Abierta",
    type: "Grabadora de Cinta Analógica",
    priceBs: 4500,
    desc: "Equipo analógico de estudio con carretes de aluminio, vúmetros iluminados y perillas de precisión en aluminio cepillado.",
    image: "/img/Tocadiscos/6.jpg",
  },
  {
    id: 7,
    name: "Tocadiscos Maleta Rojo Brillante",
    type: "Maletín Retro Vinilo",
    priceBs: 720,
    desc: "Estuche de transporte forrado en ecocuero rojo carmesí con herrajes cromados y conmutador para 33, 45 y 78 RPM.",
    image: "/img/Tocadiscos/7.jpg",
  },
  {
    id: 8,
    name: "Gramófono Antiguo con Bocina Escarlata Grabada",
    type: "Gramófono His Master's Voice",
    priceBs: 2950,
    desc: "Auténtico gramófono con bocina petalada en esmalte rojo envejecido, caja lacada en negro satinado y reproductor de aguja.",
    image: "/img/Tocadiscos/8.jpg",
  },
  {
    id: 9,
    name: "Tocadiscos Maletín Victrola Blanco Puro",
    type: "Maleta Portátil Minimalista",
    priceBs: 750,
    desc: "Maletín en cuero sintético blanco marfil con altavoces frontales, entrada auxiliar y salida para auriculares.",
    image: "/img/Tocadiscos/9.jpg",
  },
  {
    id: 10,
    name: "Tornamesa Minimalista Blanca Audio-Technica",
    type: "Tornamesa Hi-Fi Automática",
    priceBs: 1850,
    desc: "Líneas puras en blanco mate con tapa de metacrilato transparente, brazo recto y previo de fono conmutable.",
    image: "/img/Tocadiscos/10.jpg",
  },
  {
    id: 11,
    name: "Tornamesa U-Turn Orbit Nogal Audiophile",
    type: "Tracción por Correa de Precisión",
    priceBs: 2600,
    desc: "Chasis macizo en nogal americano, plato acrílico de alta inercia y brazo balanceado con aguja Ortofon.",
    image: "/img/Tocadiscos/11.jpg",
  },
  {
    id: 12,
    name: "Tornamesa Vintage Yamaha Direct Drive YP-D3",
    type: "Tracción Directa Clásica 70s",
    priceBs: 3100,
    desc: "Plinto de madera natural con motor servo direct drive, brazo cromado en forma de S y luz estroboscópica de calibración.",
    image: "/img/Tocadiscos/12.jpg",
  },
  {
    id: 13,
    name: "Torre Hi-Fi Vintage Pioneer con Mueble de Cristal",
    type: "Sistema Completo de Audio Rack",
    priceBs: 4200,
    desc: "Tornamesa Pioneer PL plateada montada sobre mueble rack de madera con puertas de vidrio y amplificador estéreo integrado.",
    image: "/img/Tocadiscos/13.jpg",
  },
  {
    id: 14,
    name: "Tocadiscos Retro Ford Mustang Rojo Metálico",
    type: "Edición Conmemorativa Mustang 1965",
    priceBs: 1750,
    desc: "Diseño automotriz con velocímetro retroiluminado como dial de radio AM/FM, altavoces frontales y sonido estéreo.",
    image: "/img/Tocadiscos/14.jpg",
  },
  {
    id: 15,
    name: "Gramófono Victoriano con Plata Repujada",
    type: "Antigüedad Ornamental",
    priceBs: 3600,
    desc: "Caja de caoba con placas de plata repujada en motivos florales, bocina cincelada y manivela lateral funcional.",
    image: "/img/Tocadiscos/15.jpg",
  },
  {
    id: 16,
    name: "Tornamesa Negro Mate sobre Mueble Curvo con Listones",
    type: "Set Moderno Tornamesa + Mueble",
    priceBs: 2450,
    desc: "Tocadiscos negro satinado con tapa acrílica transparente sobre mueble semicircular de palillería con ranuras para discos.",
    image: "/img/Tocadiscos/16.jpg",
  },
];

export default function TocadiscosPage() {
  return (
    <main className="w-full min-h-screen bg-[#EDEDED] text-black py-12 sm:py-20 px-6 sm:px-10 lg:px-16">
      <div className="w-full max-w-[1720px] mx-auto">
        
        {/* Encabezado */}
        <div className="mb-12 border-b border-black/10 pb-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-black">
            Tocadiscos &amp; Equipos Analógicos
          </h1>
        </div>

        {/* Grilla limpia 4x4 (4 columnas x 4 filas = 16 elementos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {TOCADISCOS_ITEMS.map((item) => (
            <div key={item.id} className="flex flex-col select-none group">
              <div className="relative w-full aspect-[4/3] bg-white rounded-sm overflow-hidden border border-black/5 shadow-sm">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="pt-3.5 flex flex-col">
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500">
                  {item.type}
                </span>
                <h3 className="font-bold text-base text-black mt-0.5 leading-snug">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
                <p className="text-sm font-bold font-mono text-black mt-2">
                  Bs. {item.priceBs.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
