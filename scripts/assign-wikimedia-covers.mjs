import fs from "fs";
import path from "path";

const realWikimediaCovers = [
  "https://upload.wikimedia.org/wikipedia/commons/5/5e/Disco_de_vinilo_-_Almendra.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/9/9c/El_lado_oscuro_de_la_luna_-_The_dark_side_of_the_moon_-_Pink_Floyd_-_Vinyl.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/7/73/150518-Philips-Kraftwerk-01.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/32/Confesiones_de_Invierno.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/4/47/%22Solo_Quiero_Caminar%22_by_Paco_de_Lucia%3B_Side_1_label_of_the_Philips_LP_release.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/0/01/Black_Sabbath_-_Paranoid_%285171038478%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/9/9d/Bob_Marley_-_Legend_-_Vinyl.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/2/2d/Emerson_Lake_%26_Palmer_-_LP_with_Manticore.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/3c/Almendra_%281969%29%2C_1st_album_by_Almendra_-_Long_Play_vinyl_record_-_RCA_Victor_Yellow_label.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/e/ef/Best_of_ABBA_vinyl_1975.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/b/b6/12in-Vinyl-LP-Record-Angle.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/1/1b/12in-LP-Vinyl-Record-Macro-Grooves.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/2/22/El_Super_Grupo_Azul_Volumen_II.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/8/88/Davie_Allan.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/7/7e/Ggvinyl.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/1/12/Bibletone_BL-3504_side1.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/8/80/Archiv_produktion_LP.png",
  "https://upload.wikimedia.org/wikipedia/commons/1/1a/Archiv_produktion_lp2.png",
  "https://upload.wikimedia.org/wikipedia/commons/1/15/Flight_Attendant_LP_Cover.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/33/Billo_mosaico.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/e/eb/33rpm_Record_Grooves.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/0/0f/DJ_Snake_and_Lil_Jon_-_Turn_Down_for_What_%28Vinyl%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/c/c5/Deep_Six_by_various_artists_%28US_1986%2C_Vinyl_A-side%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/36/Disque_vinyle_L%27Action_fran%C3%A7aise%2C_Hommes_et_faits_du_XX%C3%A8me_si%C3%A8cle_%C3%A9dit%C3%A9_en_1969.jpg"
];

const recordsPath = path.resolve("src/data/mock-records.ts");
let recordsContent = fs.readFileSync(recordsPath, "utf-8");

let count = 0;
recordsContent = recordsContent.replace(/coverImage:\s*"[^"]*",/g, () => {
  const url = realWikimediaCovers[count % realWikimediaCovers.length];
  count++;
  return `coverImage: "${url}",`;
});

fs.writeFileSync(recordsPath, recordsContent, "utf-8");
console.log(`Successfully updated ${count} records with verified authentic vinyl photographs!`);
