import { SleeveAndCare } from "./types";

export const MOCK_SLEEVES: SleeveAndCare[] = [
  {
    id: "slv-01",
    slug: "fundas-exteriores-mylar-anti-uv",
    name: "Fundas Exteriores Mylar Archivísticas 4 Mil (Pack de 50)",
    category: "Fundas Exteriores",
    priceBs: 160,
    packSize: "50 unidades",
    material: "Polipropileno de alta densidad virgen con filtro anti-UV al 98%",
    description: "La armadura definitiva para tus carátulas gatefold y sencillas. Transparencia cristalina de grado museo que realza el color de la carátula sin volverse amarilla con los años.",
    features: [
      "Espesor de 4 milésimas de pulgada (extra rígido)",
      "Bordes reforzados soldados por ultrasonido",
      "Libre de ácido y plastificantes migrantes",
      "Compatible con LPs dobles de hasta 35mm de grosor"
    ],
    image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "slv-02",
    slug: "fundas-interiores-kraft-japones-antiestatico",
    name: "Fundas Interiores de Papel Kraft Japonés con Antiestático (Pack de 25)",
    category: "Fundas Interiores",
    priceBs: 130,
    packSize: "25 unidades",
    material: "Papel Kraft libre de ácido + polietileno de alta densidad (HDPE) con aditivo antiestático",
    description: "Elimina la carga estática que atrae pelusas y polvo al surco del vinilo. El forro interior sedoso previene los micro-arañazos cada vez que extraes el disco.",
    features: [
      "Película interna antiestática certificada",
      "Ventana circular troquelada para ver la etiqueta sin extraer el disco",
      "Esquinas biseladas para una inserción sin dobleces dentro de la carátula",
      "Fabricado en Shizuoka, Japón"
    ],
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "slv-03",
    slug: "kit-de-limpieza-ritual-aguja-y-vinilo",
    name: "Kit de Limpieza Ritual: Cepillo de Fibra de Carbono + Fluido Desionizado",
    category: "Limpieza y Cuidado",
    priceBs: 210,
    packSize: "Kit completo de 3 piezas",
    material: "Fibra de carbono electroconductiva, madera de haya y solución tensoactiva libre de alcohol",
    description: "El ritual obligatorio antes de posar la aguja. Dos hileras de más de un millón de microfibras de carbono descargan la electricidad estática y barren las micropartículas del fondo del surco.",
    features: [
      "Cepillo con doble hilera de fibra de carbono y cuerpo de madera noble",
      "Frasco pulverizador de 100ml con fluido hidrófugo desionizado de secado rápido",
      "Mini-cepillo denso para la púa de diamante de la cápsula",
      "Bolsa de lienzo crudo serigrafiado a mano"
    ],
    image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "slv-04",
    slug: "pesa-estabilizadora-de-laton-macizo",
    name: "Pesa Estabilizadora de Latón Macizo 420g para Plato",
    category: "Accesorios de Brazo",
    priceBs: 280,
    packSize: "1 unidad con base de terciopelo",
    material: "Latón macizo C360 torneado en torno CNC y base de fieltro acústico",
    description: "Aplana vinilos ligeramente alabeados y acopla firmemente el disco al plato giratorio, aumentando el peso de los graves y reduciendo la microfonía del surco.",
    features: [
      "Peso optimizado de 420 gramos: máximo acople sin fatigar los rodamientos del motor",
      "Superficie moleteada para un agarre seguro con una sola mano",
      "Nivel de burbuja esférico de alta precisión integrado en la parte superior",
      "Base de fieltro suave para no rayar la etiqueta de papel central"
    ],
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80"
  }
];
