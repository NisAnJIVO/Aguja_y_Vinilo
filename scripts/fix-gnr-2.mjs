import fs from "fs";
import path from "path";

const targetPath = path.resolve("public/img/discos/guns-n-roses-use-your-illusion-i.jpg");

async function run() {
  const url = `https://itunes.apple.com/search?term=Use+Your+Illusion+I&entity=album&limit=10`;
  const res = await fetch(url);
  const data = await res.json();
  for (const item of data.results) {
    console.log(item.artistName, "-", item.collectionName);
    if (item.artistName.toLowerCase().includes("guns") && item.collectionName.toLowerCase().includes("illusion i")) {
      const highRes = item.artworkUrl100.replace("100x100bb.jpg", "1000x1000bb.jpg");
      console.log("FOUND EXACT:", highRes);
      const img = await fetch(highRes);
      const buf = await img.arrayBuffer();
      fs.writeFileSync(targetPath, Buffer.from(buf));
      console.log("Successfully wrote exact Use Your Illusion I cover!");
      return;
    }
  }
}

run();

