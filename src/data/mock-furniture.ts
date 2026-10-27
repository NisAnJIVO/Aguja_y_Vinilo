import { Furniture } from "./types";

export const MOCK_FURNITURE: Furniture[] = [
  {
    id: "furn-01",
    slug: "mueble-acrobata-nogal-vinilos",
    name: "Aparador 'Acróbata': Exhibición & Archivo",
    capacity: "450 vinilos + Bandeja superior para tocadiscos y amplificador",
    wood: "Nogal boliviano macizo con separadores verticales de vinilos reciclados termo-moldeados",
    priceBs: 3800,
    dimensions: "145 cm ancho × 88 cm alto × 46 cm profundidad",
    leadTime: "15 a 20 días hábiles de fabricación artesanal",
    description: "Nuestra pieza insignia. Cada separador vertical de discos está moldeado a partir de vinilos defectuosos prensados al calor, creando costillas negras que guían tus discos sin rozar las cubiertas. Patas de latón cepillado cónicas con regatones antivibración.",
    features: [
      "Separadores térmicos de vinilo reciclado con textura de surco real",
      "Módulo frontal 'Now Playing' inclinado a 15 grados para exhibir la carátula en reproducción",
      "Pasacables ocultos con conducto de latón para ocultar todo el cableado de señal y corriente",
      "Capacidad de carga probada de más de 120 kg de peso distribuido"
    ],
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "furn-02",
    slug: "mesa-de-escucha-sopocachi",
    name: "Mesa de Escucha 'Sopocachi' Desacoplada",
    capacity: "160 vinilos de rotación rápida + Amplificador + Tocadiscos",
    wood: "Roble blanco macizo y tablero sándwich con relleno de corcho viscoelástico",
    priceBs: 4900,
    dimensions: "110 cm ancho × 82 cm alto × 50 cm profundidad",
    leadTime: "18 días hábiles",
    description: "Diseñada específicamente para audiófilos que sufren de vibraciones de piso. La plataforma superior flota sobre cuatro amortiguadores mecánicos que aíslan el tocadiscos de los pasos y resonancias de los parlantes.",
    features: [
      "Plataforma flotante independiente aislada de resonancias",
      "Cajón extraíble forrado en terciopelo para cepillos, púas, pesa y líquidos",
      "Acabado al aceite de lino puro y cera de carnauba",
      "Compartimento de discos orientado hacia el frente para hojear como en disquería"
    ],
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "furn-03",
    slug: "estante-monolito-de-pared",
    name: "Exhibidor de Pared 'Monolito'",
    capacity: "3 discos en exhibición frontal + Ranura para 15 discos de escucha semanal",
    wood: "Cedro quemado al estilo Shou Sugi Ban y ganchos de latón macizo",
    priceBs: 580,
    dimensions: "95 cm ancho × 36 cm alto × 12 cm profundidad",
    leadTime: "5 días hábiles (Stock permanente en taller)",
    description: "Convierte tus portadas favoritas en obras de arte de pared. La técnica japonesa de carbonizado superficial de cedro resalta la veta natural en un negro profundo que combina a la perfección con el vinilo.",
    features: [
      "Sistema de montaje invisible con fijación oculta para muro de ladrillo o concreto",
      "Soportes frontales de latón torneado que sostienen gatefolds sin curvarlos",
      "Madera tratada al fuego sin barnices químicos",
      "Grabado láser con el monograma de Aguja y Vinilo y número de serie"
    ],
    image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "furn-04",
    slug: "caja-rustica-transportadora-de-roble",
    name: "Caja de Transporte & Escucha 'Carguero 60'",
    capacity: "60 a 70 LPs de 12 pulgadas",
    wood: "Madera de roble recuperado de toneles y asas de cuero vacuno curtido al tanino",
    priceBs: 820,
    dimensions: "36 cm ancho × 36 cm alto × 38 cm profundidad",
    leadTime: "Disponible de inmediato",
    description: "Robusta, táctil y pensada para acompañarte a sesiones de escucha con amigos o para mantener tu selección de la semana junto al sillón de lectura.",
    features: [
      "Asas de cuero grueso con remaches de cobre martillado a mano",
      "Esquineros de latón protector para resistir décadas de traslados",
      "Fondo amortiguado con lámina de fieltro de lana pura",
      "Apilable con encastres de precisión si adquieres varias unidades"
    ],
    image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80"
  }
];
