import fs from "fs";
import path from "path";

const targetDir = path.resolve("public/img/discos");

const newAlbums = [
  { id: "dayglow-fuzzybrain", query: "Dayglow Fuzzybrain" },
  { id: "oasis-definitely-maybe", query: "Oasis Definitely Maybe" },
  { id: "miloj-la-vida-era-mas-corta", query: "Milo j La Vida Era Más Corta" },
  { id: "miloj-fallback", query: "Milo j 166" },
];

async function run() {
  for (const item of newAlbums) {
    const filePath = path.join(targetDir, `${item.id}.jpg`);
    try {
      const searchUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(item.query)}&entity=album&limit=1`;
      const res = await fetch(searchUrl);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const highRes = data.results[0].artworkUrl100.replace("100x100bb.jpg", "600x600bb.jpg");
        const img = await fetch(highRes);
        const buf = await img.arrayBuffer();
        fs.writeFileSync(filePath, Buffer.from(buf));
        console.log(`[OK] Downloaded: ${item.id}`);
      } else {
        console.log(`[NOT FOUND] ${item.query}`);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

run();

