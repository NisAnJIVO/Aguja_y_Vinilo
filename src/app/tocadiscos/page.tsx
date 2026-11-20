"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { useProductModalStore } from "@/store/productModalStore";
import { HoverRollText } from "@/components/ui/HoverRollText";
import { ShoppingCart, MessageCircle, Check } from "lucide-react";

interface TurntableEquipment {
  id: number;
  name: string;
  brand: string;
  traction: string;
  cartridge: string;
  preamp: string;
  speeds: string;
  priceBs: number;
  desc: string;
  image: string;
}

const TURNTABLES: TurntableEquipment[] = [
  {
    id: 1,
    name: "Tornamesa de Sobremesa en Madera Natural",
    brand: "Audio-Technica Partner",
    traction: "Correa (Belt-Drive) antivibración",
    cartridge: "Audio-Technica AT3600L MM",
    preamp: "Sí (Phono / Línea conmutable)",
    speeds: "33 ⅓ y 45 RPM",
    priceBs: 1650,
    desc: "Chasis macizo en madera natural con altavoz frontal integrado, cubierta de acrílico transparente antipolvo y soporte vertical para exhibir portadas.",
    image: "/img/Tocadiscos/1.jpg",
  },
  {
    id: 2,
    name: "Tornamesa Compacta Syitren H8",
    brand: "Syitren Audio",
    traction: "Correa de silicona de precisión",
    cartridge: "Cápsula magnética Audio-Technica",
    preamp: "Sí (Integrado con salida RCA)",
    speeds: "33 ⅓ y 45 RPM",
    priceBs: 1400,
    desc: "Plinto en nogal satinado con rejilla acústica de tela gris, motor DC desacoplado y cubierta protectora ahumada de perfil bajo.",
    image: "/img/Tocadiscos/2.jpg",
  },
  {
    id: 3,
    name: "Gramófono Histórico con Bocina de Latón",
    brand: "His Master's Voice Replica",
    traction: "Mecanismo acústico artesanal",
    cartridge: "Aguja de acero para discos de goma laca",
    preamp: "Acústico (Bocina cónica de resonancia)",
    speeds: "78 RPM clásico",
    priceBs: 2800,
    desc: "Pieza ornamental y coleccionable con campana floral repujada en latón dorado, caja de caoba maciza y manivela mecánica funcional.",
    image: "/img/Tocadiscos/3.jpg",
  },
  {
    id: 4,
    name: "Tocadiscos Maletín Portátil Celeste Pastel",
    brand: "ByronStatics Retro",
    traction: "Tracción por correa ligera",
    cartridge: "Punta de rubí estéreo",
    preamp: "Sí (Altavoces estéreo incorporados)",
    speeds: "33 ⅓, 45 y 78 RPM",
    priceBs: 680,
    desc: "Diseño transportable con asa reforzada y cantoneras cromadas. Entrada auxiliar de 3.5mm y salida RCA para amplificador externo.",
    image: "/img/Tocadiscos/4.jpg",
  },
  {
    id: 5,
    name: "Tornamesa de Estudio Minimalista Blanco Puro",
    brand: "Audio-Technica",
    traction: "Tracción por correa balanceada",
    cartridge: "Audio-Technica Dual Magnet",
    preamp: "Sí (Preamplificador Phono conmutable)",
    speeds: "33 ⅓ y 45 RPM",
    priceBs: 1850,
    desc: "Plinto en acabado blanco mate puro con brazo de aluminio recto, plato de fundición de aluminio y amortiguación de resonancias.",
    image: "/img/Tocadiscos/10.jpg",
  },
  {
    id: 6,
    name: "Tornamesa Audiophile U-Turn Orbit Nogal",
    brand: "U-Turn Audio",
    traction: "Correa externa visible sobre plato",
    cartridge: "Ortofon OM5E de aguja elíptica",
    preamp: "Sí (Pluto preamp integrado)",
    speeds: "33 ⅓ y 45 RPM",
    priceBs: 2600,
    desc: "Chasis denso de madera maciza en nogal americano, plato acrílico pesado de rotación estable y brazo de precisión mecanizado.",
    image: "/img/Tocadiscos/11.jpg",
  },
  {
    id: 7,
    name: "Tornamesa Direct Drive Yamaha Vintage YP-D3",
    brand: "Yamaha Hi-Fi",
    traction: "Tracción Directa (Direct-Drive Servo)",
    cartridge: "Audio-Technica VM95E Elíptica",
    preamp: "No (Requiere entrada Phono)",
    speeds: "33 ⅓ y 45 RPM con pitch control",
    priceBs: 3100,
    desc: "Mítico plato japonés con motor servo de acople directo, luz estroboscópica de calibración de velocidad y brazo en S balanceado estáticamente.",
    image: "/img/Tocadiscos/12.jpg",
  },
  {
    id: 8,
    name: "Sistema Hi-Fi Pioneer Tower con Mueble Rack",
    brand: "Pioneer Vintage",
    traction: "Tornamesa Pioneer PL + Amplificador",
    cartridge: "Pioneer Audio MM",
    preamp: "Sí (Amplificador estéreo de componentes)",
    speeds: "33 ⅓ y 45 RPM",
    priceBs: 4200,
    desc: "Sistema completo de audio clásico en torre vertical con puertas de cristal templado, sintonizador analógico y etapa de potencia.",
    image: "/img/Tocadiscos/13.jpg",
  },
];

export default function TocadiscosPage() {
  const { addItem } = useCartStore();
  const { showToast } = useToastStore();
  const { openModal } = useProductModalStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const items = containerRef.current?.querySelectorAll(".turntable-parallax-img");
    if (!items || items.length === 0) return;

    items.forEach((img) => {
      gsap.fromTo(
        img,
        { y: -30 },
        {
          y: 30,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleAddToCart = (item: TurntableEquipment) => {
    addItem(
      {
        id: `tt-${item.id}`,
        type: "turntable",
        title: item.name,
        subtitle: item.brand,
        priceBs: item.priceBs,
        imageOrCover: item.image,
      },
      1
    );
    showToast(item.name);
  };

  const handleOpenDetail = (item: TurntableEquipment) => {
    openModal({
      id: `tt-${item.id}`,
      title: item.name,
      subtitle: item.brand,
      categoryLabel: "Tocadiscos & Hardware",
      priceBs: item.priceBs,
      image: item.image,
      description: `${item.desc} • Tracción: ${item.traction} • Cápsula: ${item.cartridge} • Preamplificador: ${item.preamp}.`,
      type: "turntable",
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#EDEDED] text-[#111111] select-none">
      {/* HERO DE SECCIÓN COMPACTO */}
      <header className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8 border-b border-black/15">
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
          Equipos &amp; Hardware Analógico
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-[#111111]">
          Tocadiscos
        </h1>
        <p className="font-sans text-sm sm:text-base text-neutral-600 font-light mt-2 max-w-2xl">
          Reproducción analógica de alta fidelidad, calibración precisa y diseño atemporal para tus vinilos.
        </p>
      </header>

      {/* GALERÍA DE PRODUCTO ASIMÉTRICA (60% FOTO / 40% FICHA) */}
      <div ref={containerRef} className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24">
        {TURNTABLES.map((item, idx) => (
          <article
            key={item.id}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center border-b border-black/10 pb-16 sm:pb-24 last:border-b-0 ${
              idx % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* 60% FOTO GRANDE CON PARALLAX INTERNO Y ZOOM EN HOVER */}
            <div
              onClick={() => handleOpenDetail(item)}
              data-cursor="VER"
              className="lg:col-span-7 cursor-pointer group"
            >
              <div className="relative w-full aspect-[16/10] bg-[#E2E2E2] border border-black/10 overflow-hidden shadow-sm group-hover:border-black/40 group-hover:shadow-md transition-all">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="turntable-parallax-img object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-xs font-mono text-[10px] text-white px-2.5 py-1 uppercase tracking-wider">
                  Modelo N° {String(idx + 1).padStart(2, "0")} • {item.brand}
                </div>
              </div>
            </div>

            {/* 40% FICHA TÉCNICA LIMPIA CON DATOS REALES */}
            <div className="lg:col-span-5 flex flex-col justify-between text-left">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-medium">
                  {item.brand}
                </span>
                <h2
                  onClick={() => handleOpenDetail(item)}
                  className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#111111] leading-snug mt-1 cursor-pointer hover:opacity-75 transition-opacity"
                >
                  {item.name}
                </h2>
                <p className="font-sans text-sm text-neutral-600 font-light mt-3 leading-relaxed">
                  {item.desc}
                </p>

                {/* Especificaciones Técnicas */}
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 font-mono text-xs uppercase tracking-wider border-t border-black/10 pt-5 mt-6">
                  <div>
                    <dt className="text-neutral-400 text-[10px]">Tracción</dt>
                    <dd className="text-[#111111] font-semibold truncate mt-0.5">{item.traction}</dd>
                  </div>
                  <div>
                    <dt className="text-neutral-400 text-[10px]">Cápsula</dt>
                    <dd className="text-[#111111] font-semibold truncate mt-0.5">{item.cartridge}</dd>
                  </div>
                  <div>
                    <dt className="text-neutral-400 text-[10px]">Preamplificador</dt>
                    <dd className="text-[#111111] font-semibold truncate mt-0.5">{item.preamp}</dd>
                  </div>
                  <div>
                    <dt className="text-neutral-400 text-[10px]">Velocidades</dt>
                    <dd className="text-[#111111] font-semibold truncate mt-0.5">{item.speeds}</dd>
                  </div>
                </dl>
              </div>

              {/* Precio y Botones de Acción */}
              <div className="pt-8 border-t border-black/10 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider block">
                    Precio de contado
                  </span>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#111111]">
                    Bs. {item.priceBs}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(item)}
                    className="group px-5 py-3 bg-black text-white font-mono text-xs uppercase tracking-wider font-bold hover:bg-neutral-800 transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <HoverRollText text="Agregar al carrito" rollClassName="italic text-white" />
                  </button>

                  <a
                    href={`https://wa.me/59168610314?text=Hola,%20quisiera%20consultar%20por%20el%20tocadiscos:%20${encodeURIComponent(
                      item.name
                    )}%20(Bs.%20${item.priceBs})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-black/20 hover:border-black text-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                    title="Consultar por WhatsApp"
                    aria-label="Consultar por WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
