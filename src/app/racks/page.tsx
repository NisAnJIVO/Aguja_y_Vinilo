"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { useProductModalStore } from "@/store/productModalStore";
import { HoverRollText } from "@/components/ui/HoverRollText";
import { MessageCircle, ShoppingCart } from "lucide-react";

interface RackFurniture {
  id: number;
  name: string;
  type: string;
  capacity: string;
  dimensions: string;
  materials: string;
  priceBs: number;
  desc: string;
  image: string;
}

const RACKS_ITEMS: RackFurniture[] = [
  {
    id: 1,
    name: "Credenza Retro Esquinas Curvas",
    type: "Aparador Acústico Mediano",
    capacity: "Hasta 220 vinilos",
    dimensions: "120 × 75 × 45 cm",
    materials: "Nogal macizo lustrado y herrajes de acero",
    priceBs: 2400,
    desc: "Cuerpo en nogal cálido con marco envolvente redondeado, estantes dobles para vinilos en posición vertical y puerta con bisagras de cierre suave.",
    image: "/img/Muebles/1.jpg",
  },
  {
    id: 2,
    name: "Mesa Consola Ovalada Compacta",
    type: "Mesa para Tocadiscos",
    capacity: "Hasta 90 vinilos",
    dimensions: "85 × 70 × 40 cm",
    materials: "Madera oscura natural y patas torneadas",
    priceBs: 1450,
    desc: "Silueta ovalada con nicho abierto lateral para ojear portadas de frente y dos cajones cilíndricos para cepillos y accesorios.",
    image: "/img/Muebles/2.jpg",
  },
  {
    id: 3,
    name: "Consola Angular Trapezoidal",
    type: "Mueble Mid-Century de Autor",
    capacity: "Hasta 160 vinilos",
    dimensions: "110 × 72 × 42 cm",
    materials: "Roble americano y tiradores uñero ocultos",
    priceBs: 2100,
    desc: "Líneas oblicuas artesanales con 2 cajones anchos y estantes abiertos divididos para receptor estéreo, amplificador y vinilos.",
    image: "/img/Muebles/3.jpg",
  },
  {
    id: 4,
    name: "Gran Credenza Clásica con Arcos de Vidrio",
    type: "Aparador Monumental",
    capacity: "Hasta 450 vinilos",
    dimensions: "190 × 85 × 48 cm",
    materials: "Madera noble maciza, vidrio y latón dorado",
    priceBs: 4800,
    desc: "Mueble de gran formato para colecciones extensas con 4 puertas acristaladas, cajones centrales y cubierta reforzada para equipo pesado.",
    image: "/img/Muebles/4.jpg",
  },
  {
    id: 5,
    name: "Aparador Mid-Century con Celosía de Ratán",
    type: "Mueble Acústico Transpirable",
    capacity: "Hasta 280 vinilos",
    dimensions: "140 × 78 × 45 cm",
    materials: "Roble claro y celosía tejida de mimbre",
    priceBs: 3200,
    desc: "Frontal con tejido natural que permite el paso libre del sonido para colocar bafles o amplificadores en el interior sin recalentamiento.",
    image: "/img/Muebles/5.jpg",
  },
  {
    id: 6,
    name: "Estantería Consola 4 Nichos Redondeados",
    type: "Estante Modular de Roble",
    capacity: "Hasta 200 vinilos",
    dimensions: "95 × 80 × 40 cm",
    materials: "Roble macizo europeo con cantos biselados",
    priceBs: 1950,
    desc: "Cuatro compartimentos cúbicos dimensionados exactamente para carpetas LP de 12 pulgadas con base amortiguada antivibración.",
    image: "/img/Muebles/6.jpg",
  },
  {
    id: 7,
    name: "Aparador Escandinavo 3 Cajones",
    type: "Consola Danesa Clásica",
    capacity: "Hasta 250 vinilos",
    dimensions: "150 × 74 × 44 cm",
    materials: "Teca tratada al aceite y tiradores esculpidos",
    priceBs: 3600,
    desc: "Tres cajones centrales para almacenamiento de discos 7 pulgadas y cables, con dos armarios laterales de gran profundidad.",
    image: "/img/Muebles/7.jpg",
  },
  {
    id: 8,
    name: "Mueble Escultórico Asimétrico",
    type: "Diseño Contemporáneo de Carpintería",
    capacity: "Hasta 180 vinilos",
    dimensions: "125 × 76 × 42 cm",
    materials: "Madera natural veteada y estructura de hierro",
    priceBs: 4200,
    desc: "Frontal facetado en ángulo con veta emparejada a libro y compartimento superior para tocadiscos de alta fidelidad.",
    image: "/img/Muebles/8.jpg",
  },
];

export default function RacksPage() {
  const { addItem } = useCartStore();
  const { showToast } = useToastStore();
  const { openModal } = useProductModalStore();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gridRef.current?.querySelectorAll(".rack-card");
    if (!cards || cards.length === 0) return;

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          opacity: 0,
          y: 35,
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleAddToCart = (item: RackFurniture) => {
    addItem(
      {
        id: `rack-${item.id}`,
        type: "furniture",
        title: item.name,
        subtitle: item.type,
        priceBs: item.priceBs,
        imageOrCover: item.image,
      },
      1
    );
    showToast(item.name);
  };

  const handleOpenDetail = (item: RackFurniture) => {
    openModal({
      id: `rack-${item.id}`,
      title: item.name,
      subtitle: item.type,
      categoryLabel: "Mobiliario & Racks",
      priceBs: item.priceBs,
      image: item.image,
      description: `${item.desc} • Capacidad: ${item.capacity} • Medidas: ${item.dimensions} • Materiales: ${item.materials}.`,
      type: "furniture",
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F7F7] text-[#111111] select-none">
      {/* HERO EDITORIAL */}
      <header className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8 border-b border-black/15">
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
          Carpintería Especializada • Estudio de Diseño
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-[#111111]">
          Racks y Muebles
        </h1>
        <p className="font-sans text-sm sm:text-base text-neutral-600 font-light mt-2 max-w-2xl">
          Mobiliario artesanal en madera noble y acero estructural diseñado para proteger, organizar y exhibir tu colección con estabilidad acústica.
        </p>
      </header>

      {/* GRILLA EDITORIAL DE 2 COLUMNAS (1 EN MÓVIL) CON REVELADO CLIP-PATH */}
      <div
        ref={gridRef}
        className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14"
      >
        {RACKS_ITEMS.map((item) => (
          <article
            key={item.id}
            className="rack-card group flex flex-col bg-white border border-black/10 overflow-hidden shadow-sm hover:border-black/40 hover:shadow-md transition-all"
          >
            {/* FOTO GRANDE DEL MUEBLE CON ZOOM MÍNIMO EN HOVER */}
            <div
              onClick={() => handleOpenDetail(item)}
              data-cursor="VER"
              className="relative w-full aspect-[16/11] bg-[#EEEEEE] overflow-hidden cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
              />
              <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-xs font-mono text-[10px] text-white px-2.5 py-1 uppercase tracking-wider">
                {item.type}
              </div>
            </div>

            {/* ESPECIFICACIONES CLARAS Y DIRECTAS */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between text-left">
              <div>
                <h2
                  onClick={() => handleOpenDetail(item)}
                  className="font-serif text-2xl sm:text-3xl font-normal text-[#111111] leading-tight cursor-pointer hover:opacity-75 transition-opacity"
                >
                  {item.name}
                </h2>
                <p className="font-sans text-sm text-neutral-600 font-light mt-2 leading-relaxed">
                  {item.desc}
                </p>

                {/* Especificaciones */}
                <dl className="grid grid-cols-2 gap-3 font-mono text-xs uppercase tracking-wider border-t border-black/10 pt-4 mt-5">
                  <div>
                    <dt className="text-neutral-400 text-[10px]">Capacidad</dt>
                    <dd className="text-[#111111] font-semibold mt-0.5">{item.capacity}</dd>
                  </div>
                  <div>
                    <dt className="text-neutral-400 text-[10px]">Medidas</dt>
                    <dd className="text-[#111111] font-semibold mt-0.5">{item.dimensions}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-neutral-400 text-[10px]">Material</dt>
                    <dd className="text-[#111111] font-medium truncate mt-0.5">{item.materials}</dd>
                  </div>
                </dl>
              </div>

              {/* Precio y Botón de Compra */}
              <div className="pt-6 border-t border-black/10 mt-6 flex items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider block">
                    Precio final
                  </span>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#111111]">
                    Bs. {item.priceBs}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(item)}
                    className="px-5 py-2.5 bg-black text-white font-mono text-xs uppercase tracking-wider font-bold hover:bg-neutral-800 transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <HoverRollText text="Pedir / Agregar" rollClassName="italic text-white" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* BLOQUE DE PEDIDO A MEDIDA */}
      <section className="w-full border-t border-black/15 bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1520px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#111111]">
              ¿Necesitas un rack a medida para tu espacio?
            </h3>
            <p className="font-sans text-sm sm:text-base text-neutral-600 font-light mt-1 max-w-xl">
              Diseñamos y fabricamos muebles personalizados según las dimensiones exactas de tu sala, número de vinilos y componentes de tu equipo de sonido.
            </p>
          </div>

          <a
            href="https://wa.me/59168610314?text=Hola,%20quisiera%20consultar%20por%20un%20rack%20a%20medida%20para%20mis%20vinilos."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-black text-white font-mono text-xs uppercase tracking-widest font-bold hover:bg-neutral-800 transition-colors flex items-center gap-2.5 shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar Mueble Personalizado</span>
          </a>
        </div>
      </section>
    </div>
  );
}
