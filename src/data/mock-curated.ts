import { CuratedLibrary } from "./types";

export const MOCK_CURATED_LIBRARIES: CuratedLibrary[] = [
  {
    id: "lib-01",
    slug: "noches-de-lluvia-y-humo",
    title: "Noches de Lluvia y Humo: Baladas Tardías & Jazz Modal",
    subtitle: "Para cuando la ciudad duerme y sólo queda el crujido del acetato",
    description: "Una selección de discos para después de la medianoche. Grabaciones intimistas en cuartetos de jazz, trompetas con sordina, contrabajos profundos y pianos reverberantes que llenan el silencio sin invadirlo.",
    curator: "Lucas Montenegro — Curador Jefe de Aguja y Vinilo",
    recordCount: 5,
    mood: "Madrugada Solitaria",
    genreFocus: "Jazz modal, Cool Jazz, ECM Sessions",
    palette: {
      bg: "#12141A",
      accent: "#C89D56"
    },
    recordIds: ["rec-02", "rec-16", "rec-22", "rec-10", "rec-05"]
  },
  {
    id: "lib-02",
    slug: "psicodelia-andina-y-frecuencia-solar",
    title: "Psicodelia Andina: Del Charango Fuzz al Trance de la Cordillera",
    subtitle: "La explosión del krautrock andino y los ecos de cinta de 1970 a 1978",
    description: "La vertiente más audaz y mística del rock sudamericano. Sikuris tocados a toda velocidad, pedales de saturación fabricados a mano en La Paz y Lima, y sintetizadores monofónicos emulando el viento de la puna.",
    curator: "Sonia Cárdenas — Investigadora Musical de Archivo",
    recordCount: 5,
    mood: "Viaje Psiconáutico",
    genreFocus: "Folk Psicodélico, Krautrock, Progresivo Andino",
    palette: {
      bg: "#2A1810",
      accent: "#D26445"
    },
    recordIds: ["rec-01", "rec-06", "rec-14", "rec-21", "rec-23"]
  },
  {
    id: "lib-03",
    slug: "la-geometria-del-silencio-estudio-y-enfoque",
    title: "La Geometría del Silencio: Síntesis Analógica & Enfoque",
    subtitle: "Música arquitectónica para leer, dibujar y pensar con claridad",
    description: "Paisajes sonoros continuos prensados a 200 gramos con superficie virgen ultra silenciosa. Frecuencias moduladas sin cambios bruscos de tempo, diseñadas para alterar la percepción del espacio y el tiempo.",
    curator: "Martín von Boeck — Ingeniero Electroacústico",
    recordCount: 4,
    mood: "Concentración Profunda",
    genreFocus: "Ambient, Minimalismo, Sintetizadores Modulares",
    palette: {
      bg: "#181A1B",
      accent: "#5C94A8"
    },
    recordIds: ["rec-03", "rec-12", "rec-20", "rec-07"]
  },
  {
    id: "lib-04",
    slug: "domingo-de-sol-cafe-y-cuerdas",
    title: "Domingo de Sol: Bossa, Madera y Café Filtrado",
    subtitle: "Cálidas guitarras de nylon, vientos templados y tiempo suspendido",
    description: "El antídoto perfecto al ritmo digital acelerado. Grabaciones sin artificios que celebran la madera, la voz humana cercana al micrófono y el ritual de voltear la cara del disco con calma.",
    curator: "Camila Rojas — Sommelier de Café y Coleccionista",
    recordCount: 4,
    mood: "Domingo Lento",
    genreFocus: "Bossa Nova, MPB, Folk Acústico",
    palette: {
      bg: "#241D17",
      accent: "#C89D56"
    },
    recordIds: ["rec-05", "rec-08", "rec-11", "rec-15"]
  },
  {
    id: "lib-05",
    slug: "fuego-y-sudor-la-pista-analogica",
    title: "Fuego & Sudor: Funk, Metales y Pista Caliente",
    subtitle: "LPs grabados en vivo para hacer vibrar las vigas del salón",
    description: "Líneas de bajo con peso descomunal, clavinets incandescentes y secciones de viento tocadas con rabia y gozo. La máxima expresión física del ritmo analógico.",
    curator: "Rodrigo 'Kiko' Arce — DJ Residente y Archivista",
    recordCount: 4,
    mood: "Celebración Cálida",
    genreFocus: "Funk & Soul, Afro-Latin Groove, Chicha Eléctrica",
    palette: {
      bg: "#2A141A",
      accent: "#C05436"
    },
    recordIds: ["rec-04", "rec-09", "rec-17", "rec-21"]
  }
];
