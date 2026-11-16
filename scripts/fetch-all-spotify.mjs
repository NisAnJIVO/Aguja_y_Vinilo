import fs from "fs";
import path from "path";

const targetDir = path.resolve("public/img/discos");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Master list with unique artists only
const allArtists = [
  // Del primer lote
  { id: "disco-01", artist: "Nsqk", title: "mosca", song: "Santurce", year: 2024, format: "Vinilo — 1×LP Edición Limitada", priceBs: 220 },
  { id: "disco-02", artist: "The Strokes", title: "The New Abnormal", song: "Ode To The Mets", year: 2020, format: "Vinilo — 1×LP Audiophile 180g", priceBs: 260 },
  { id: "disco-03", artist: "TV Girl", title: "French Exit", song: "Lovers Rock", year: 2014, format: "Vinilo — 1×LP Magenta & Black", priceBs: 240 },
  { id: "disco-04", artist: "Mac Miller", title: "The Divine Feminine", song: "Congratulations", year: 2016, format: "Vinilo — 2×LP Pink Vinyl", priceBs: 280 },
  { id: "disco-05", artist: "Suki Waterhouse", title: "Memoir of a Sparklemuffin", song: "Good Looking", year: 2024, format: "Vinilo — 1×LP Gatefold", priceBs: 230 },
  { id: "disco-06", artist: "Men I Trust", title: "Oncle Jazz", song: "Show Me How", year: 2019, format: "Vinilo — 2×LP White Vinyl", priceBs: 250 },
  { id: "disco-07", artist: "Oasis", title: "Heathen Chemistry", song: "Stop Crying Your Heart Out", year: 2002, format: "Vinilo — 2×LP Heavyweight 180g", priceBs: 270 },
  { id: "disco-08", artist: "Laufey", title: "Bewitched", song: "Second Best", year: 2023, format: "Vinilo — 1×LP Limited Gold Edition", priceBs: 240 },
  { id: "disco-09", artist: "Anri", title: "Timely!!", song: "Remember Summer Days", year: 1983, format: "Vinilo — 1×LP City Pop Edition", priceBs: 290 },
  { id: "disco-10", artist: "José José", title: "Distancia", song: "Amar Sin Ser Amado", year: 1984, format: "Vinilo — 1×LP Clásico Master", priceBs: 180 },
  { id: "disco-11", artist: "Pretenders", title: "Don't Tell A Lie", song: "Don't Tell A Lie", year: 2020, format: "Vinilo — 7\" Single 45 RPM", priceBs: 160 },
  { id: "disco-12", artist: "Maná", title: "Drama Y Luz", song: "El Verdadero Amor Perdona", year: 2011, format: "Vinilo — 2×LP Gatefold 180g", priceBs: 250 },
  { id: "disco-13", artist: "Alejandro Sanz", title: "Más", song: "Y, ¿Si fuera ella?", year: 1997, format: "Vinilo — 2×LP Edición Especial", priceBs: 240 },
  { id: "disco-14", artist: "Calvin Harris", title: "Funk Wav Bounces Vol. 1", song: "Feels", year: 2017, format: "Vinilo — 1×LP Yellow Vinyl", priceBs: 230 },
  { id: "disco-15", artist: "Bobby Pulido", title: "Desvelado", song: "Desvelado", year: 1995, format: "Vinilo — 1×LP Coleccionista", priceBs: 190 },
  { id: "disco-16", artist: "Los Temerarios", title: "Tu Última Canción", song: "Tu Última Canción", year: 1993, format: "Vinilo — 1×LP Original Pressing", priceBs: 200 },

  // De las nuevas capturas
  { id: "disco-17", artist: "The Beatles", title: "Past Masters", song: "Don't Let Me Down", year: 1969, format: "Vinilo — 2×LP Remaster 180g", priceBs: 290 },
  { id: "disco-18", artist: "Decalius", title: "Dehumanizing Loneliness", song: "A Miserable Life...", year: 2021, format: "Vinilo — 1×LP Black Metal", priceBs: 210 },
  { id: "disco-19", artist: "wave to earth", title: "0.1 flaws and all.", song: "seasons", year: 2023, format: "Vinilo — 2×LP Indie Pop", priceBs: 260 },
  { id: "disco-20", artist: "Eric Carmen", title: "The Essential Eric Carmen", song: "All By Myself", year: 1975, format: "Vinilo — 1×LP Soft Rock", priceBs: 180 },
  { id: "disco-21", artist: "ILLIT", title: "SUPER REAL ME", song: "NOT CUTE ANYMORE", year: 2024, format: "Vinilo — 1×LP K-Pop Pink", priceBs: 220 },
  { id: "disco-22", artist: "Erik Satie", title: "Gymnopédies & Gnossiennes", song: "Gymnopédie No. 1", year: 1888, format: "Vinilo — 1×LP Classical Audiophile", priceBs: 250 },
  { id: "disco-23", artist: "Lamp", title: "Koibito E (For Lovers)", song: "For Lovers", year: 2004, format: "Vinilo — 1×LP Japanese Indie Pop", priceBs: 280 },
  { id: "disco-24", artist: "PANTERA BLUE", title: "Anticuada", song: "Blue Prelude", year: 2023, format: "Vinilo — 1×LP Indie Folk", priceBs: 190 },

  { id: "disco-25", artist: "OneRepublic", title: "Waking Up", song: "Secrets", year: 2009, format: "Vinilo — 2×LP Deluxe", priceBs: 240 },
  { id: "disco-26", artist: "Lord Huron", title: "Long Lost", song: "I Lied", year: 2021, format: "Vinilo — 2×LP Folk Gatefold", priceBs: 270 },
  { id: "disco-27", artist: "Faye Webster", title: "Atlanta Millionaires Club", song: "Kingston", year: 2019, format: "Vinilo — 1×LP Blue Vinyl", priceBs: 230 },
  { id: "disco-28", artist: "Justin Hurwitz", title: "La La Land (Original Soundtrack)", song: "Mia & Sebastian's Theme", year: 2016, format: "Vinilo — 1×LP Blue OST", priceBs: 260 },
  { id: "disco-29", artist: "Ritchie Valens", title: "The Best of Ritchie Valens", song: "Donna", year: 1958, format: "Vinilo — 1×LP 50s Rock & Roll", priceBs: 190 },
  { id: "disco-30", artist: "Melendi", title: "Un alumno más", song: "Septiembre", year: 2014, format: "Vinilo — 1×LP Pop Español", priceBs: 210 },
  { id: "disco-31", artist: "ABBA", title: "Super Trouper", song: "The Winner Takes It All", year: 1980, format: "Vinilo — 1×LP Pop Clásico", priceBs: 220 },
  { id: "disco-32", artist: "Michael Jackson", title: "Thriller", song: "Beat It", year: 1982, format: "Vinilo — 1×LP Gatefold 180g", priceBs: 300 },

  { id: "disco-33", artist: "Earth, Wind & Fire", title: "Raise!", song: "Let's Groove", year: 1981, format: "Vinilo — 1×LP Funk / Disco", priceBs: 220 },
  { id: "disco-34", artist: "Frankie Ruiz", title: "¡Solista Pero No Solo!", song: "Tú Con Él", year: 1985, format: "Vinilo — 1×LP Salsa Romántica", priceBs: 200 },
  { id: "disco-35", artist: "Matt Maltese", title: "Krystal", song: "Curl up & Die", year: 2019, format: "Vinilo — 1×LP Bedroom Pop", priceBs: 230 },
  { id: "disco-36", artist: "Black Sabbath", title: "Vol. 4", song: "Changes", year: 1972, format: "Vinilo — 1×LP Heavy Metal 180g", priceBs: 270 },
  { id: "disco-37", artist: "The Animals", title: "The Singles Plus", song: "House of the Rising Sun", year: 1964, format: "Vinilo — 1×LP British Invasion", priceBs: 210 },
  { id: "disco-38", artist: "Kansas", title: "Point of Know Return", song: "Dust in the Wind", year: 1977, format: "Vinilo — 1×LP Progressive Rock", priceBs: 210 },
  { id: "disco-39", artist: "Guns N' Roses", title: "Use Your Illusion I", song: "Don't Cry", year: 1991, format: "Vinilo — 2×LP Hard Rock", priceBs: 280 },
  { id: "disco-40", artist: "Coldplay", title: "Parachutes", song: "Yellow", year: 2000, format: "Vinilo — 1×LP Translucent Yellow", priceBs: 260 },

  { id: "disco-41", artist: "Mac DeMarco", title: "Salad Days", song: "Chamber Of Reflection", year: 2014, format: "Vinilo — 1×LP Slacker Rock", priceBs: 240 },
  { id: "disco-42", artist: "The Marías", title: "Superclean, Vol. I", song: "Only in My Dreams", year: 2017, format: "Vinilo — 1×LP Psychedelic Soul", priceBs: 250 },
  { id: "disco-43", artist: "Twenty One Pilots", title: "Blurryface", song: "Stressed Out", year: 2015, format: "Vinilo — 2×LP Red & Black Split", priceBs: 270 },
  { id: "disco-44", artist: "Sir Chloe", title: "Party Favors", song: "Michelle", year: 2020, format: "Vinilo — 1×LP Indie Rock", priceBs: 220 },
  { id: "disco-45", artist: "Alphaville", title: "Forever Young", song: "Big in Japan", year: 1984, format: "Vinilo — 1×LP Synthpop 180g", priceBs: 230 },
  { id: "disco-46", artist: "Arctic Monkeys", title: "AM", song: "I Wanna Be Yours", year: 2013, format: "Vinilo — 1×LP 180g Gatefold", priceBs: 260 },
  { id: "disco-47", artist: "Radiohead", title: "OK Computer", song: "No Surprises", year: 1997, format: "Vinilo — 2×LP Audiophile", priceBs: 290 },
  { id: "disco-48", artist: "Tom Odell", title: "Long Way Down", song: "Another Love", year: 2013, format: "Vinilo — 1×LP Acoustic Master", priceBs: 220 },
];

async function run() {
  const catalog = [];

  for (let i = 0; i < allArtists.length; i++) {
    const item = allArtists[i];
    const diskFilePath = path.join(targetDir, `${item.id}.jpg`);
    const localPath = `/img/discos/${item.id}.jpg`;

    if (!fs.existsSync(diskFilePath)) {
      const query = encodeURIComponent(`${item.artist} ${item.title}`);
      const searchUrl = `https://itunes.apple.com/search?term=${query}&entity=album&limit=1`;
      try {
        const res = await fetch(searchUrl);
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          const highResUrl = data.results[0].artworkUrl100.replace("100x100bb.jpg", "600x600bb.jpg");
          const imgRes = await fetch(highResUrl);
          const buffer = await imgRes.arrayBuffer();
          fs.writeFileSync(diskFilePath, Buffer.from(buffer));
          console.log(`[OK] Downloaded: ${item.artist} - ${item.title}`);
        } else {
          // fallback artist only
          const res2 = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(item.artist)}&entity=album&limit=1`);
          const data2 = await res2.json();
          if (data2.results && data2.results.length > 0) {
            const highResUrl = data2.results[0].artworkUrl100.replace("100x100bb.jpg", "600x600bb.jpg");
            const imgRes = await fetch(highResUrl);
            const buffer = await imgRes.arrayBuffer();
            fs.writeFileSync(diskFilePath, Buffer.from(buffer));
            console.log(`[OK-fallback] Downloaded: ${item.artist}`);
          } else {
            console.log(`[MISSING] ${item.artist}`);
          }
        }
      } catch (err) {
        console.error(`Error ${item.artist}:`, err.message);
      }
    } else {
      console.log(`[EXISTS] ${item.artist}`);
    }

    catalog.push({
      id: item.id,
      artist: item.artist,
      title: item.title,
      song: item.song,
      year: item.year,
      coverImage: fs.existsSync(diskFilePath) ? localPath : "https://upload.wikimedia.org/wikipedia/commons/5/5e/Disco_de_vinilo_-_Almendra.jpg",
      format: item.format,
      priceBs: item.priceBs,
    });
  }

  const tsContent = `export interface DiscoItem {
  id: string;
  artist: string;
  title: string;
  song: string;
  year: number;
  coverImage: string;
  format: string;
  priceBs: number;
}

export const DISCOS_CATALOG: DiscoItem[] = ${JSON.stringify(catalog, null, 2)};
`;

  fs.writeFileSync(path.resolve("src/data/discosData.ts"), tsContent, "utf-8");
  console.log("Master catalog generated with", catalog.length, "unique albums!");
}

run();

