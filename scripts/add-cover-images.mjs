import fs from "fs";
import path from "path";

const recordCovers = [
  "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1546707012-c46675f12716?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80"
];

// Update mock-records.ts
const recordsPath = path.resolve("src/data/mock-records.ts");
let recordsContent = fs.readFileSync(recordsPath, "utf-8");

let recIndex = 0;
recordsContent = recordsContent.replace(/id:\s*"rec-\d\d",/g, (match) => {
  const coverUrl = recordCovers[recIndex] || recordCovers[0];
  recIndex++;
  return `${match}\n    coverImage: "${coverUrl}",`;
});

fs.writeFileSync(recordsPath, recordsContent, "utf-8");
console.log(`Updated ${recIndex} records with coverImage in mock-records.ts`);

// Update mock-hardware.ts
const hardwarePath = path.resolve("src/data/mock-hardware.ts");
let hardwareContent = fs.readFileSync(hardwarePath, "utf-8");
const ttImages = [
  "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1542208998-f6dbbb27a72f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80"
];
hardwareContent = hardwareContent.replace(/\/images\/turntable-1\.webp/g, ttImages[0]);
hardwareContent = hardwareContent.replace(/\/images\/turntable-2\.webp/g, ttImages[1]);
hardwareContent = hardwareContent.replace(/\/images\/turntable-3\.webp/g, ttImages[2]);
hardwareContent = hardwareContent.replace(/\/images\/turntable-4\.webp/g, ttImages[3]);
fs.writeFileSync(hardwarePath, hardwareContent, "utf-8");
console.log("Updated mock-hardware.ts with real turntable images");

// Update mock-sleeves.ts
const sleevesPath = path.resolve("src/data/mock-sleeves.ts");
let sleevesContent = fs.readFileSync(sleevesPath, "utf-8");
sleevesContent = sleevesContent.replace(/\/images\/sleeves-outer\.webp/g, "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=1200&q=80");
sleevesContent = sleevesContent.replace(/\/images\/sleeves-inner\.webp/g, "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=80");
sleevesContent = sleevesContent.replace(/\/images\/cleaning-kit\.webp/g, "https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=1200&q=80");
sleevesContent = sleevesContent.replace(/\/images\/brass-weight\.webp/g, "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80");
fs.writeFileSync(sleevesPath, sleevesContent, "utf-8");
console.log("Updated mock-sleeves.ts with real sleeves & care images");

// Update mock-furniture.ts
const furnPath = path.resolve("src/data/mock-furniture.ts");
let furnContent = fs.readFileSync(furnPath, "utf-8");
furnContent = furnContent.replace(/\/images\/furniture-acrobata\.webp/g, "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80");
furnContent = furnContent.replace(/\/images\/furniture-sopocachi\.webp/g, "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80");
furnContent = furnContent.replace(/\/images\/furniture-monolito\.webp/g, "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1200&q=80");
furnContent = furnContent.replace(/\/images\/furniture-crate\.webp/g, "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80");
fs.writeFileSync(furnPath, furnContent, "utf-8");
console.log("Updated mock-furniture.ts with real furniture images");
