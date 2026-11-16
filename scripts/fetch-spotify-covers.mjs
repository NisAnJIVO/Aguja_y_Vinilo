import fs from "fs";
import path from "path";

const targetDir = path.resolve("public/img/discos");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const albums = [
  { id: "disco-01", artist: "Nsqk", title: "mosca", song: "Santurce", year: 2024, format: "Vinilo — 1×LP Edición Limitada" },
  { id: "disco-02", artist: "The Strokes", title: "The New Abnormal", song: "Ode To The Mets", year: 2020, format: "Vinilo — 1×LP Audiophile 180g" },
  { id: "disco-03", artist: "TV Girl", title: "French Exit", song: "Lovers Rock", year: 2014, format: "Vinilo — 1×LP Magenta & Black" },
  { id: "disco-04", artist: "Mac Miller", title: "The Divine Feminine", song: "Congratulations", year: 2016, format: "Vinilo — 2×LP Pink Vinyl" },
  { id: "disco-05", artist: "Suki Waterhouse", title: "Memoir of a Sparklemuffin", song: "Good Looking", year: 2024, format: "Vinilo — 1×LP Gatefold" },
  { id: "disco-06", artist: "Men I Trust", title: "Oncle Jazz", song: "Show Me How", year: 2019, format: "Vinilo — 2×LP White Vinyl" },
  { id: "disco-07", artist: "Oasis", title: "Heathen Chemistry", song: "Stop Crying Your Heart Out", year: 2002, format: "Vinilo — 2×LP Heavyweight 180g" },
  { id: "disco-08", artist: "Laufey", title: "Bewitched", song: "Second Best", year: 2023, format: "Vinilo — 1×LP Limited Gold Edition" },
  { id: "disco-09", artist: "Anri", title: "Timely!!", song: "Remember Summer Days", year: 1983, format: "Vinilo — 1×LP City Pop Edition" },
  { id: "disco-10", artist: "José José", title: "Distancia", song: "Amar Sin Ser Amado", year: 1984, format: "Vinilo — 1×LP Clásico Master" },
  { id: "disco-11", artist: "Pretenders", title: "Don't Tell A Lie", song: "Don't Tell A Lie", year: 2020, format: "Vinilo — 7\" Single 45 RPM" },
  { id: "disco-12", artist: "Maná", title: "Drama Y Luz", song: "El Verdadero Amor Perdona", year: 2011, format: "Vinilo — 2×LP Gatefold 180g" },
  { id: "disco-13", artist: "Alejandro Sanz", title: "Más", song: "Y, ¿Si fuera ella?", year: 1997, format: "Vinilo — 2×LP Edición Especial" },
  { id: "disco-14", artist: "Calvin Harris", title: "Funk Wav Bounces Vol. 1", song: "Feels", year: 2017, format: "Vinilo — 1×LP Yellow Vinyl" },
  { id: "disco-15", artist: "Bobby Pulido", title: "Desvelado", song: "Desvelado", year: 1995, format: "Vinilo — 1×LP Coleccionista" },
  { id: "disco-16", artist: "Los Temerarios", title: "Tu Última Canción", song: "Tu Última Canción", year: 1993, format: "Vinilo — 1×LP Original Pressing" },
  { id: "disco-17", artist: "Foreigner", title: "Agent Provocateur", song: "I Want to Know What Love Is", year: 1984, format: "Vinilo — 1×LP Master Tape" },
  { id: "disco-18", artist: "Joy Crookes", title: "Skin", song: "Feet Don't Fail Me Now", year: 2021, format: "Vinilo — 1×LP Eco-Mix Vinyl" },
  { id: "disco-19", artist: "Olivia Dean", title: "Messy", song: "So Easy (To Fall In Love)", year: 2023, format: "Vinilo — 1×LP Transparent Amber" },
  { id: "disco-20", artist: "Willie Colón", title: "Fantasmas", song: "Oh Qué Será?", year: 1981, format: "Vinilo — 1×LP Salsa Dura 180g" },
  { id: "disco-21", artist: "Joji", title: "SMITHEREENS", song: "If It Only Gets Better", year: 2022, format: "Vinilo — 1×LP White Smoke Edition" },
  { id: "disco-22", artist: "TWICE", title: "Summer Nights", song: "What is Love?", year: 2018, format: "Vinilo — 1×LP K-Pop Special" },
  { id: "disco-23", artist: "Imagine Dragons", title: "Smoke + Mirrors", song: "Warriors", year: 2015, format: "Vinilo — 2×LP Gatefold 180g" },
  { id: "disco-24", artist: "grandson", title: "Death of an Optimist", song: "Blood // Water", year: 2020, format: "Vinilo — 1×LP Splatter Vinyl" },
  { id: "disco-25", artist: "10cc", title: "The Original Soundtrack", song: "I'm Not In Love", year: 1975, format: "Vinilo — 1×LP Classic 180g" },
  { id: "disco-26", artist: "Bonnie Tyler", title: "Secret Dreams and Forbidden Fire", song: "Holding Out for a Hero", year: 1986, format: "Vinilo — 1×LP Pop Rock" },
  { id: "disco-27", artist: "Kumbia Kings", title: "Amor, Familia Y Respeto", song: "Fuiste Mala", year: 1999, format: "Vinilo — 1×LP Cumbia Fusión" },
  { id: "disco-28", artist: "Adanowsky", title: "Aline", song: "Aline (feat. Mon Laferte)", year: 2023, format: "Vinilo — 7\" Single Lathe Cut" },
];

async function run() {
  const catalog = [];

  for (let i = 0; i < albums.length; i++) {
    const item = albums[i];
    const query = encodeURIComponent(`${item.artist} ${item.title}`);
    const searchUrl = `https://itunes.apple.com/search?term=${query}&entity=album&limit=1`;
    
    let coverUrl = "";
    let localPath = `/img/discos/${item.id}.jpg`;
    let diskFilePath = path.join(targetDir, `${item.id}.jpg`);

    try {
      const res = await fetch(searchUrl);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        // Upgrade 100x100 to 600x600 high res
        const highResUrl = data.results[0].artworkUrl100.replace("100x100bb.jpg", "600x600bb.jpg");
        const imgRes = await fetch(highResUrl);
        const buffer = await imgRes.arrayBuffer();
        fs.writeFileSync(diskFilePath, Buffer.from(buffer));
        console.log(`[OK] Downloaded: ${item.artist} - ${item.title}`);
      } else {
        // Fallback search with artist only
        const res2 = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(item.artist)}&entity=album&limit=1`);
        const data2 = await res2.json();
        if (data2.results && data2.results.length > 0) {
          const highResUrl = data2.results[0].artworkUrl100.replace("100x100bb.jpg", "600x600bb.jpg");
          const imgRes = await fetch(highResUrl);
          const buffer = await imgRes.arrayBuffer();
          fs.writeFileSync(diskFilePath, Buffer.from(buffer));
          console.log(`[OK-fallback] Downloaded: ${item.artist}`);
        } else {
          console.log(`[MISSING] Could not find cover for ${item.artist}`);
        }
      }
    } catch (err) {
      console.error(`Error for ${item.artist}:`, err.message);
    }

    catalog.push({
      id: item.id,
      artist: item.artist,
      title: item.title,
      song: item.song,
      year: item.year,
      coverImage: fs.existsSync(diskFilePath) ? localPath : "https://upload.wikimedia.org/wikipedia/commons/5/5e/Disco_de_vinilo_-_Almendra.jpg",
      format: item.format,
      priceUSD: 28 + (i % 6) * 3.5,
      priceBs: 195 + (i % 6) * 25,
      category: i < 8 ? "exclusives" : "limited",
    });
  }

  // Write out data file
  const tsContent = `export interface DiscoItem {
  id: string;
  artist: string;
  title: string;
  song: string;
  year: number;
  coverImage: string;
  format: string;
  priceUSD: number;
  priceBs: number;
  category: "exclusives" | "limited";
}

export const DISCOS_CATALOG: DiscoItem[] = ${JSON.stringify(catalog, null, 2)};
`;

  fs.writeFileSync(path.resolve("src/data/discosData.ts"), tsContent, "utf-8");
  console.log("Successfully generated src/data/discosData.ts with", catalog.length, "Spotify albums!");
}

run();

