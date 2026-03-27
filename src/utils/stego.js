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
    encryptedSize: encrypted.length // 🔥 Added to track exact payload size
  });

  const metaBytes = new TextEncoder().encode(metadata);
  const metaLength = metaBytes.length;
  const totalLength = 4 + metaLength + encrypted.length;

  // 🔥 Build byte stream
  const payload = new Uint8Array(totalLength);
  
  // store meta length (4 bytes)
  payload[0] = (metaLength >> 24) & 255;
  payload[1] = (metaLength >> 16) & 255;
  payload[2] = (metaLength >> 8) & 255;
  payload[3] = metaLength & 255;
  
  payload.set(metaBytes, 4);
  payload.set(encrypted, 4 + metaLength);

  const bits = bytesToBits(payload);
  const capacity = (pixels.length / 4) * 3;

  if (bits.length > capacity) {
    throw new Error("File too large");
  }

  let bitIndex = 0;

  for (let i = 0; i < pixels.length; i += 4) {
    for (let j = 0; j < 3; j++) {
      if (bitIndex < bits.length) {
        pixels[i + j] = (pixels[i + j] & 254) | bits[bitIndex++];
      }
    }
    // 🔥 CRITICAL FIX: Force Alpha to 255 to prevent browser 
    // premultiplication data loss in PNGs with transparency
    pixels[i + 3] = 255; 
  }

  ctx.putImageData(imageData, 0, 0);

  return canvas.toDataURL("image/png");
}