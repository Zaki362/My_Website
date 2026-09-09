import * as THREE from "three";

// Small, deterministic textures stay local and never require a network request.
export function createStudioMaterialMaps() {
  let seed = 419;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const make = (paint: (ctx: CanvasRenderingContext2D) => void) => {
    const canvas = document.createElement("canvas"); canvas.width = canvas.height = 512;
    const ctx = canvas.getContext("2d")!; paint(ctx);
    const map = new THREE.CanvasTexture(canvas); map.wrapS = map.wrapT = THREE.RepeatWrapping; map.anisotropy = 4;
    return map;
  };
  const wood = make(ctx => {
    ctx.fillStyle = "#ddd4c5"; ctx.fillRect(0, 0, 512, 512);
    for (let y = 0; y < 512; y++) {
      const base = 155 + Math.sin(y * .095) * 16 + random() * 48;
      ctx.strokeStyle = `rgba(${base},${base - 9},${base - 19},.42)`; ctx.lineWidth = .5 + random() * 1.2;
      ctx.beginPath(); ctx.moveTo(-4, y);
      for (let x = 0; x <= 516; x += 8) ctx.lineTo(x, y + Math.sin(x * .015 + y * .029) * (1 + Math.sin(y * .03) * 2));
      ctx.stroke();
    }
    for (let i = 0; i < 2200; i++) {
      ctx.fillStyle = `rgba(63,41,26,${random() * .07})`; ctx.fillRect(random() * 512, random() * 512, 8 + random() * 32, .6);
    }
  });
  wood.colorSpace = THREE.SRGBColorSpace;
  const plaster = make(ctx => {
    const image = ctx.createImageData(512, 512);
    for (let i = 0; i < image.data.length; i += 4) {
      const value = 170 + random() * 55; image.data[i] = image.data[i + 1] = image.data[i + 2] = value; image.data[i + 3] = 255;
    }
    ctx.putImageData(image, 0, 0);
  });
  plaster.repeat.set(7, 5);
  const fabric = make(ctx => {
    ctx.fillStyle = "#bdbab4"; ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 512; i += 3) {
      ctx.fillStyle = i % 2 ? "#d2cfc9" : "#aaa8a1"; ctx.fillRect(i, 0, 1, 512);
      ctx.fillStyle = "#d5d2cb99"; ctx.fillRect(0, i, 512, 1);
    }
  });
  fabric.repeat.set(3, 3);
  return { wood, plaster, fabric };
}
