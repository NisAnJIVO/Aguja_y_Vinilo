import fs from "fs";
import path from "path";

const targetPath = path.resolve("public/img/discos/guns-n-roses-use-your-illusion-i.jpg");

async function run() {
  const query = encodeURIComponent("Guns N' Roses Use Your Illusion I");
  const url = `https://itunes.apple.com/search?term=${query}&entity=album&limit=5`;
  
  const res = await fetch(url);
  const data = await res.json();
  console.log("Results count:", data.resultCount);
  
  let chosenUrl = "";
  for (const item of data.results) {
    console.log(item.artistName, "-", item.collectionName, item.artworkUrl100);
    if (item.collectionName && item.collectionName.toLowerCase().includes("use your illusion i")) {
      chosenUrl = item.artworkUrl100.replace("100x100bb.jpg", "600x600bb.jpg");
      break;
    }
  }

  if (!chosenUrl && data.results.length > 0) {
    chosenUrl = data.results[0].artworkUrl100.replace("100x100bb.jpg", "600x600bb.jpg");
  }

  if (chosenUrl) {
    console.log("Fetching:", chosenUrl);
    const imgRes = await fetch(chosenUrl);
    const buffer = await imgRes.arrayBuffer();
    fs.writeFileSync(targetPath, Buffer.from(buffer));
    console.log("Successfully saved Guns N Roses cover to", targetPath);
  } else {
    console.log("Not found in iTunes, trying alternative...");
  }
}

run();

