import { compressData } from "./compression";
import { encryptData } from "./encryption";

// Convert byte array → bit array
function bytesToBits(bytes) {
  const bits = [];
  for (let b of bytes) {
    for (let i = 7; i >= 0; i--) {
      bits.push((b >> i) & 1);
    }
  }
  return bits;
}

export async function encodeImage(img, file, password, canvas) {
  const ctx = canvas.getContext("2d");

  canvas.width = img.width;
  canvas.height = img.height;

  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  const fileBuffer = await file.arrayBuffer();
  const compressed = compressData(new Uint8Array(fileBuffer));
  const encrypted = encryptData(compressed, password);

  const metadata = JSON.stringify({
    signature: "STEGO_V1",
    name: file.name,
    type: file.type,
    size: file.size,
    encryptedSize: encrypted.length
  });

  const metaBytes = new TextEncoder().encode(metadata);
  const metaLength = metaBytes.length;
  const totalLength = 4 + metaLength + encrypted.length;

  // 🔥 Build byte stream
  const payload = new Uint8Array(totalLength);
  
  payload[0] = (metaLength >> 24) & 255;
  payload[1] = (metaLength >> 16) & 255;
  payload[2] = (metaLength >> 8) & 255;
  payload[3] = metaLength & 255;
  
  payload.set(metaBytes, 4);
  payload.set(encrypted, 4 + metaLength);

  const bits = bytesToBits(payload);
  
  // 🔥 Count only fully opaque pixels for capacity
  let opaquePixels = 0;
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] === 255) opaquePixels++;
  }
  
  const capacity = opaquePixels * 3;

  if (bits.length > capacity) {
    throw new Error("File too large. This image has too many transparent pixels.");
  }

  let bitIndex = 0;

  for (let i = 0; i < pixels.length; i += 4) {
    // 🔥 ONLY embed data if the pixel is fully opaque
    if (pixels[i + 3] === 255) {
      for (let j = 0; j < 3; j++) {
        if (bitIndex < bits.length) {
          pixels[i + j] = (pixels[i + j] & 254) | bits[bitIndex++];
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);

  return canvas.toDataURL("image/png");
}