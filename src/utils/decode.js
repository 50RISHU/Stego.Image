import { decryptData } from "./encryption";
import { decompressData } from "./compression";

// Convert bits → bytes
function bitsToBytes(bits) {
  const bytes = [];
  for (let i = 0; i < bits.length; i += 8) {
    let byte = 0;
    for (let j = 0; j < 8; j++) {
      byte = (byte << 1) | (bits[i + j] || 0);
    }
    bytes.push(byte);
  }
  return new Uint8Array(bytes);
}

export async function decodeImage(img, canvas, password) {
  const ctx = canvas.getContext("2d");

  canvas.width = img.width;
  canvas.height = img.height;
  
  // Disable smoothing to ensure exact pixel accuracy
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, 0, 0);

  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  // Extract bits
  const bits = [];
  for (let i = 0; i < pixels.length; i += 4) {
    for (let j = 0; j < 3; j++) {
      bits.push(pixels[i + j] & 1);
    }
  }

  const bytes = bitsToBytes(bits);

  // 🔥 Read metadata length
  const metaLength =
    (bytes[0] << 24) |
    (bytes[1] << 16) |
    (bytes[2] << 8) |
    bytes[3];

  if (!metaLength || metaLength > bytes.length) {
    throw new Error("Invalid stego image");
  }

  // 🔥 Extract metadata
  const metaBytes = bytes.slice(4, 4 + metaLength);
  const metadata = JSON.parse(new TextDecoder().decode(metaBytes));

  if (metadata.signature !== "STEGO_V1") {
    throw new Error("Invalid stego image");
  }

  // 🔥 Extract EXACTLY the encrypted payload using encryptedSize
  // Prevents grabbing garbage LSBs from the rest of the image
  const encryptedSize = metadata.encryptedSize; 
  const encryptedEnd = encryptedSize ? (4 + metaLength + encryptedSize) : undefined;
  const encrypted = bytes.slice(4 + metaLength, encryptedEnd);

  const decrypted = decryptData(encrypted, password);
  const finalBytes = decompressData(decrypted);

  if (finalBytes.length !== metadata.size) {
    throw new Error("Wrong password or corrupted file");
  }

  return {
    blob: new Blob([finalBytes], {
      type: metadata.type || "application/octet-stream",
    }),
    fileName: metadata.name,
  };
}