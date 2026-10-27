import { Turntable } from "./types";

export const MOCK_TURNTABLES: Turntable[] = [
  {
    id: "tt-01",
    slug: "aguja-and-co-modelo-i-altiplano",
    name: "Modelo I — 'Altiplano' Audiophile",
    brand: "Aguja & Co. Atelier",
    priceBs: 4600,
    driveType: "Tracción por correa de silicona desacoplada (Belt Drive)",
    cartridge: "Ortofon 2M Bronze pre-calibrada con aguja Fine Line Nude",
    chassis: "Plinto de madera de cedro macizo boliviano con tratamiento acústico y patas de latón con desacoplo magnético",
    speeds: "33 ⅓ y 45 RPM con control electrónico óptico de velocidad",
    description: "Diseñado y ensamblado a mano en nuestro taller de La Paz. El Modelo I combina el peso acústico del cedro estacionado durante 10 años con un plato de acrílico rectificado de 30mm que absorbe cualquier resonancia parasitaria.",
    features: [
      "Brazo cónico de fibra de carbono de 9 pulgadas con rodamientos cerámicos de ultra baja fricción",
      "Motor síncrono DC desacoplado en suspensión de elastómero",
      "Salida analógica RCA pura chapada en oro de 24k con borne de tierra dedicado",
      "Calibración manual de peso, anti-skating y azimut antes de cada entrega"
    ],
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=80",
    isStaffPick: true,
    specs: {
      "Relación señal/ruido": "-74 dB",
      "Fluctuación y lloro (Wow & Flutter)": "±0.06% a 33 RPM",
      "Plato": "Acrílico mate de 2.2 kg de alta inercia",
      "Consumo": "4.5 W en funcionamiento",
      "Peso total": "10.4 kg"
    }
  },
  {
    id: "tt-02",
    slug: "thorens-td-1600-edicion-nogal-artesanal",
    name: "Thorens TD-1600 Re-imaginado",
    brand: "Thorens × Aguja y Vinilo",
    priceBs: 8900,
    driveType: "Subchasis flotante cónico sobre resortes cónicos",
    cartridge: "Nagaoka MP-200 Moving Permalloy",
    chassis: "Madera de nogal americano satinado con placa superior de aluminio cepillado",
    speeds: "33 ⅓ y 45 RPM con selector electrónico",
    description: "Una leyenda del audio analógico reinterpretada con acabado en nogal curado y cápsula japonesa Nagaoka, famosa por su dulzura en los tonos medios y cuerpo en los graves.",
    features: [
      "Subchasis suspendido con ajuste de tensión milimétrico",
      "Brazo Thorens TP 92 de precisión audiófila",
      "Salidas balanceadas XLR y no balanceadas RCA",
      "Fuente de alimentación externa lineal blindada"
    ],
    image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80",
    specs: {
      "Relación señal/ruido": "-78 dB",
      "Fluctuación y lloro": "±0.04%",
      "Plato": "Aluminio fundido amortiguado de 4.2 kg",
      "Peso total": "12.8 kg"
    }
  },
  {
    id: "tt-03",
    slug: "project-debut-carbon-acustico-edition",
    name: "Debut Carbon EVO 'Acústico Edition'",
    brand: "Pro-Ject",
    priceBs: 3850,
    driveType: "Correa plana de precisión",
    cartridge: "Ortofon 2M Red",
    chassis: "MDF denso de una pieza en acabado ébano satinado profundo",
    speeds: "33 ⅓, 45 y 78 RPM (con cambio electrónico)",
    description: "El estándar de oro para dar el salto al sonido de alta fidelidad sin complicaciones. Brazo de carbono de una sola pieza, plato de acero pesado con anillo de TPE anti-resonancias y patas ajustables de aluminio.",
    features: [
      "Brazo de carbono continuo de 8.6 pulgadas sin uniones",
      "Motor suspendido con placa TPE desacoplada",
      "Cable semibalanceado Connect it E incluido",
      "Control de velocidad integrado mediante interruptor inferior"
    ],
    image: "https://images.unsplash.com/photo-1542208998-f6dbbb27a72f?auto=format&fit=crop&w=1200&q=80",
    specs: {
      "Relación señal/ruido": "-68 dB",
      "Fluctuación y lloro": "±0.17%",
      "Plato": "Acero de 1.7 kg con amortiguación interna",
      "Peso total": "5.6 kg"
    }
  },
  {
    id: "tt-04",
    slug: "linn-sondek-lp12-homenaje-vintage",
    name: "Sondek Homenaje — Edición Coleccionista",
    brand: "Aguja & Co. Signature",
    priceBs: 13500,
    driveType: "Subchasis desacoplado patentado con tracción por correa de neodimio",
    cartridge: "Audio-Technica AT33EV Bobina Móvil (MC)",
    chassis: "Madera noble de mara boliviana recuperada con acabado en cera de abeja natural",
    speeds: "33 ⅓ y 45 RPM",
    description: "El pináculo del culto analógico. Una máquina concebida para revelar cada matiz oculto en las micro-ondulaciones de un vinilo de 180 gramos. Cada unidad tarda 6 semanas en calibrarse y afilarse acústicamente en nuestro taller.",
    features: [
      "Cápsula de bobina móvil MC con aguja elíptica desnuda",
      "Chasis con amortiguación viscoelástica de grado aeroespacial",
      "Rodamiento de punto único bañado en baño de aceite cerámico",
      "Certificado de calibración firmado y curva de respuesta impresa"
    ],
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80",
    isStaffPick: true,
    specs: {
      "Relación señal/ruido": "-82 dB",
      "Fluctuación y lloro": "±0.025%",
      "Plato": "Mazak 8 torneado en frío de 3.75 kg",
      "Peso total": "14.5 kg"
    }
  }
];
