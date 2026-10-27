import * as THREE from "three";

/**
 * Creates high-resolution procedural vinyl groove and center label textures
 * Clean, minimal, high-contrast and razor-sharp.
 */
export function createVinylGrooveTexture(): THREE.CanvasTexture {
  if (typeof document === "undefined") {
    return new THREE.CanvasTexture(new OffscreenCanvas(1, 1) as unknown as HTMLCanvasElement);
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  if (!ctx) return new THREE.CanvasTexture(canvas);

  const cx = 512;
  const cy = 512;

  // Base vinyl lacquer
  ctx.fillStyle = "#0a0a08";
  ctx.fillRect(0, 0, 1024, 1024);

  // Concentric physical audio grooves with high contrast micro-grooves
  for (let r = 210; r < 500; r += 1.4) {
    const isGap = (r > 310 && r < 318) || (r > 410 && r < 418);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = isGap
      ? "rgba(10, 10, 8, 0.95)"
      : `rgba(${40 + Math.sin(r * 3) * 20}, ${40 + Math.sin(r * 3) * 20}, ${35}, 0.85)`;
    ctx.lineWidth = isGap ? 2.5 : 1.2;
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function createCenterLabelTexture(): THREE.CanvasTexture {
  if (typeof document === "undefined") {
    return new THREE.CanvasTexture(new OffscreenCanvas(1, 1) as unknown as HTMLCanvasElement);
  }

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  if (!ctx) return new THREE.CanvasTexture(canvas);

  const cx = 256;
  const cy = 256;

  // Center paper circle background (high-contrast warm ecru)
  ctx.beginPath();
  ctx.arc(cx, cy, 250, 0, Math.PI * 2);
  ctx.fillStyle = "#F5EFE3";
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#C89D56";
  ctx.stroke();

  // Outer concentric gold rim
  ctx.beginPath();
  ctx.arc(cx, cy, 235, 0, Math.PI * 2);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#BD5338";
  ctx.stroke();

  // Typography - Minimal, bold and clean
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillStyle = "#12110F";
  ctx.font = "700 28px sans-serif";
  ctx.letterSpacing = "2px";
  ctx.fillText("AGUJA Y VINILO", cx, cy - 80);

  ctx.fillStyle = "#BD5338";
  ctx.font = "600 16px sans-serif";
  ctx.fillText("ALTA FIDELIDAD • SERIE AUDIÓFILA", cx, cy - 48);

  ctx.fillStyle = "#1E1D19";
  ctx.font = "600 13px monospace";
  ctx.fillText("180G PRENSADO VIRGEN", cx, cy + 55);

  ctx.font = "bold 12px monospace";
  ctx.fillStyle = "#524F47";
  ctx.fillText("33 ⅓ RPM • STEREO HI-FI", cx, cy + 85);

  ctx.font = "10px monospace";
  ctx.fillStyle = "#8B826B";
  ctx.fillText("ENVÍOS A TODA BOLIVIA", cx, cy + 115);

  // Spindle center ring
  ctx.beginPath();
  ctx.arc(cx, cy, 20, 0, Math.PI * 2);
  ctx.fillStyle = "#0E0E0C";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#C89D56";
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
