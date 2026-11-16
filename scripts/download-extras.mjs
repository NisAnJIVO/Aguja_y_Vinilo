import fs from "fs";
import path from "path";

const targetDir = path.resolve("public/img/extras");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 30 imágenes temáticas de alta estética (poleras de bandas, pines, cuadros/posters, accesorios musicales)
const items = [
  // 1-8: Poleras y ropa gráfica con arte de álbumes / bandas
  { id: 1, title: "Polera Gráfica Joy Division - Unknown Pleasures", category: "Ropa", priceBs: 150, url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&q=80" },
  { id: 2, title: "Tee Oversized Vintage Nirvana In Utero", category: "Ropa", priceBs: 165, url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&q=80" },
  { id: 3, title: "Polera Dark Wave Tour 1984", category: "Ropa", priceBs: 140, url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=900&q=80" },
  { id: 4, title: "Camiseta Ilustración Daft Punk Helmet", category: "Ropa", priceBs: 160, url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=900&q=80" },
  { id: 5, title: "Hoodie Pesado Master Audio Tape", category: "Ropa", priceBs: 280, url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=900&q=80" },
  { id: 6, title: "Polera The Smiths Meat Is Murder", category: "Ropa", priceBs: 145, url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=900&q=80" },
  { id: 7, title: "Remera Gráfica Sonic Youth Goo", category: "Ropa", priceBs: 155, url: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=900&q=80" },
  { id: 8, title: "Polera Minimalista Onda Senoidal", category: "Ropa", priceBs: 130, url: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=900&q=80" },

  // 9-15: Cuadros de vinilo, marcos para portadas y posters enmarcados
  { id: 9, title: "Cuadro Marco Exhibidor de Vinilo 12\" LP", category: "Cuadros", priceBs: 180, url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=900&q=80" },
  { id: 10, title: "Poster Enmarcado Bauhaus Music Hall", category: "Cuadros", priceBs: 160, url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=900&q=80" },
  { id: 11, title: "Lámina Serigrafiada Kraftwerk Man-Machine", category: "Cuadros", priceBs: 140, url: "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?w=900&q=80" },
  { id: 12, title: "Cuadro Galería Disco de Oro Personalizado", category: "Cuadros", priceBs: 320, url: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=900&q=80" },
  { id: 13, title: "Set de 3 Mini Cuadros Portadas Jazz Blue Note", category: "Cuadros", priceBs: 210, url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=900&q=80" },
  { id: 14, title: "Marco Flotante Acrílico para Vinilos", category: "Cuadros", priceBs: 195, url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80" },
  { id: 15, title: "Print Enmarcado Ondas de Frecuencia Sonora", category: "Cuadros", priceBs: 175, url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=900&q=80" },

  // 16-22: Pines esmaltados, parches y llaveros de culto
  { id: 16, title: "Pin Esmaltado Tornamesa Technics SL-1200", category: "Pines", priceBs: 45, url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=80" },
  { id: 17, title: "Pin Disco de Vinilo 45 RPM Adaptador", category: "Pines", priceBs: 40, url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=900&q=80" },
  { id: 18, title: "Set de 4 Pines Esmaltados Géneros Musicales", category: "Pines", priceBs: 120, url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=900&q=80" },
  { id: 19, title: "Pin Cassette C-90 Vintage Oro Viejo", category: "Pines", priceBs: 50, url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=900&q=80" },
  { id: 20, title: "Llavero Mini Slipmat de Fieltro Bordado", category: "Pines", priceBs: 35, url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=900&q=80" },
  { id: 21, title: "Pin Cápsula Fonocaptora Ortofon Red", category: "Pines", priceBs: 55, url: "https://images.unsplash.com/photo-1563089145-599997674d42?w=900&q=80" },
  { id: 22, title: "Parche Bordado Termoadhesivo Vinyl Junkie", category: "Pines", priceBs: 45, url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=80" },

  // 23-30: Accesorios esenciales, bolsas tote, slipmats y cuidado de discos
  { id: 23, title: "Bolsa Tote Bag Pesada 'Record Collector'", category: "Accesorios", priceBs: 95, url: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=900&q=80" },
  { id: 24, title: "Cepillo Antiestático de Fibra de Carbono", category: "Accesorios", priceBs: 110, url: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?w=900&q=80" },
  { id: 25, title: "Slipmat de Corcho Audiófilo 3mm", category: "Accesorios", priceBs: 135, url: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=900&q=80" },
  { id: 26, title: "Audífonos de Monitoreo Retro Cuero & Acero", category: "Accesorios", priceBs: 450, url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80" },
  { id: 27, title: "Estabilizador de Peso Clamp de Bronce 350g", category: "Accesorios", priceBs: 190, url: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=900&q=80" },
  { id: 28, title: "Kit de Limpieza Líquida para Surcos Hi-Fi", category: "Accesorios", priceBs: 140, url: "https://images.unsplash.com/photo-1608248597359-598d1a129035?w=900&q=80" },
  { id: 29, title: "Pack 25 Fundas Interiores Antiestáticas de Papel Arroz", category: "Accesorios", priceBs: 125, url: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=900&q=80" },
  { id: 30, title: "Cinta Cassette Virgen Edición Cromo 1990", category: "Accesorios", priceBs: 65, url: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=900&q=80" },
];

async function run() {
  const resultData = [];

  for (const item of items) {
    const ext = ".jpg";
    const fileName = `${item.id}${ext}`;
    const filePath = path.join(targetDir, fileName);
    const localUrl = `/img/extras/${fileName}`;

    if (!fs.existsSync(filePath)) {
      try {
        console.log(`Downloading ${item.id}: ${item.title}...`);
        const res = await fetch(item.url);
        if (res.ok) {
          const buf = await res.arrayBuffer();
          fs.writeFileSync(filePath, Buffer.from(buf));
          console.log(`[OK] Saved ${fileName} (${buf.byteLength} bytes)`);
        } else {
          console.error(`Failed ${item.id}: HTTP ${res.status}`);
        }
      } catch (e) {
        console.error(`Error downloading ${item.id}:`, e.message);
      }
    } else {
      console.log(`[EXISTS] ${fileName}`);
    }

    resultData.push({
      id: item.id,
      title: item.title,
      category: item.category,
      priceBs: item.priceBs,
      image: fs.existsSync(filePath) ? localUrl : item.url,
    });
  }

  // Create data file for extras
  const tsContent = `export interface ExtraItem {
  id: number;
  title: string;
  category: "Ropa" | "Cuadros" | "Pines" | "Accesorios";
  priceBs: number;
  image: string;
}

export const EXTRAS_CATALOG: ExtraItem[] = ${JSON.stringify(resultData, null, 2)};
`;

  fs.writeFileSync(path.resolve("src/data/extrasData.ts"), tsContent, "utf-8");
  console.log("Successfully created src/data/extrasData.ts with", resultData.length, "items!");
}

run();

