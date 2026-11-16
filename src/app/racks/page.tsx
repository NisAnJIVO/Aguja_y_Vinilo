import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Muebles & Racks de Vinilos | Aguja & Vinilo",
  description: "Mobiliario artesanal de madera maciza diseñado especialmente para almacenar, proteger y exhibir tus discos de vinilo y equipos de sonido.",
};

const MUEBLES_ITEMS = [
  {
    id: 1,
    name: "Credenza Retro Esquinas Curvas",
    type: "Mueble Aparador Mediano",
    priceBs: 2400,
    desc: "Nogal cálido con marco envolvente redondeado, estantes dobles para discos y puerta vertical independiente.",
    image: "/img/Muebles/1.jpg",
  },
  {
    id: 2,
    name: "Mesa Consola Ovalada Compacta",
    type: "Mesa Auxiliar / Tocadiscos",
    priceBs: 1450,
    desc: "Cuerpo ovalado retro en madera oscura con bahía abierta izquierda y dos cajones cilíndricos.",
    image: "/img/Muebles/2.jpg",
  },
  {
    id: 3,
    name: "Consola Angular Trapezoidal",
    type: "Mueble de Autor Mid-Century",
    priceBs: 2100,
    desc: "Geometría oblicua artesanal con 2 cajones anchos con uñero y doble estante abierto para amplificador y vinilos.",
    image: "/img/Muebles/3.jpg",
  },
  {
    id: 4,
    name: "Gran Credenza Clásica con Arcos de Vidrio",
    type: "Aparador Monumental",
    priceBs: 4800,
    desc: "Pieza de gran formato (~2m) con 4 puertas con vidrieras en arco, 2 cajones centrales y herrajes de latón dorado.",
    image: "/img/Muebles/4.jpg",
  },
  {
    id: 5,
    name: "Aparador Mid-Century con Puertas de Ratán",
    type: "Mueble Acústico Cannage",
    priceBs: 3200,
    desc: "Frontal con celosía trenzada de mimbre natural que permite el paso del sonido, con nicho central para tornamesa o receptor.",
    image: "/img/Muebles/5.jpg",
  },
  {
    id: 6,
    name: "Estantería Consola 4 Nichos Redondeados",
    type: "Estante Modular de Roble",
    priceBs: 1950,
    desc: "Estructura diáfana de roble macizo con 4 compartimentos de borde suave diseñados para almacenar hasta 200 LPs.",
    image: "/img/Muebles/6.jpg",
  },
  {
    id: 7,
    name: "Aparador Escandinavo Vintage 3 Cajones",
    type: "Consola Danesa Clásica",
    priceBs: 3600,
    desc: "Madera maciza lustrada con tiradores de madera esculpidos a mano, 3 cajones centrales y 2 puertas laterales de gran capacidad.",
    image: "/img/Muebles/7.jpg",
  },
  {
    id: 8,
    name: "Mueble Escultórico Asimétrico",
    type: "Mobiliario de Colección",
    priceBs: 4200,
    desc: "Diseño vanguardista con puerta lateral facetada en ángulo y veta cruzada de madera noble sobre patas estilizadas.",
    image: "/img/Muebles/8.jpg",
  },
  {
    id: 9,
    name: "Buffet Arquitectónico Acanalado de Lujo",
    type: "Aparador Palillería Premium",
    priceBs: 5400,
    desc: "Frontal monumental de listones acanalados con arcos en relieve, patas estriadas y tapa superior amplia para equipo Hi-Fi.",
    image: "/img/Muebles/9.jpg",
  },
  {
    id: 10,
    name: "Mesa Consola Baja Aerodinámica",
    type: "Mesa de Centro para Vinilos",
    priceBs: 1600,
    desc: "Diseño cápsula retro-futurista con nicho deslizante en acabado verde petróleo, ideal para tocadiscos compacto y revistas.",
    image: "/img/Muebles/10.jpg",
  },
  {
    id: 11,
    name: "Consola de Audio Integral Futurista",
    type: "Sistema de Sonido Todo-en-Uno",
    priceBs: 6800,
    desc: "Consola escultórica inspirada en el diseño espacial de los 70s, con altavoces estéreo incorporados, tornamesa y tapa acrílica tintada.",
    image: "/img/Muebles/11.jpg",
  },
  {
    id: 12,
    name: "Banco Estéreo de Madera Maciza DOOPER",
    type: "Consola Soundbar de Autor",
    priceBs: 4900,
    desc: "Bloque de roble natural con sistema de bafles estéreo integrados en el frente y plataforma superior libre para tocadiscos.",
    image: "/img/Muebles/12.jpg",
  },
  {
    id: 13,
    name: "Pedestal Modernista con Visores Circulares",
    type: "Estación de Vinilo Now Playing",
    priceBs: 3800,
    desc: "Pedestal metálico central con 3 módulos de madera con ventanas circulares para exhibir las cubiertas de tus álbumes favoritos.",
    image: "/img/Muebles/13.jpg",
  },
  {
    id: 14,
    name: "Columna Pedestal Acústica con Metacrilato",
    type: "Mueble Vertical Slim",
    priceBs: 2750,
    desc: "Estructura vertical sobre peana cromada con pantalla acústica circular, placa de acrílico frontal y compartimento vertical para vinilos.",
    image: "/img/Muebles/14.jpg",
  },
  {
    id: 15,
    name: "Estación de Vinilo con Palillería Vertical",
    type: "Mueble Estación Hi-Fi",
    priceBs: 2900,
    desc: "Mueble de nogal con puerta de listones verticales, soporte superior reforzado para tornamesa y bandeja de acceso rápido a LPs.",
    image: "/img/Muebles/15.jpg",
  },
  {
    id: 16,
    name: "Estación de Apartamento en 3 Niveles",
    type: "Mueble Torre Compacto",
    priceBs: 1850,
    desc: "Torre compacta de madera en 3 niveles: tornamesa superior, hueco intermedio para receptor/amplificador y base para vinilos y altavoces.",
    image: "/img/Muebles/16.jpg",
  },
];

export default function RacksPage() {
  return (
    <main className="w-full min-h-screen bg-[#EDEDED] text-black py-12 sm:py-20 px-6 sm:px-10 lg:px-16">
      <div className="w-full max-w-[1720px] mx-auto">
        
        {/* Encabezado */}
        <div className="mb-12 border-b border-black/10 pb-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-black">
            Muebles &amp; Racks de Vinilo
          </h1>
        </div>

        {/* Grilla limpia 4x4 (4 columnas x 4 filas = 16 elementos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {MUEBLES_ITEMS.map((item) => (
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
