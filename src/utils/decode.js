/**
 * LSB steganography decoder.
 *
 * Pipeline: image pixels → read LSBs → AES-256 decrypt → verify magic → DEFLATE decompress
 *
 * Everything is encrypted — no plaintext metadata exists in the image.
 * Wrong password produces garbage on decrypt; magic byte check catches it cleanly.
 */

import { decryptData }    from "./encryption";
import { decompressData } from "./compression";

const MAGIC = new Uint8Array([0x53, 0x54, 0x47, 0x4F]); // "STGO"

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

function readUint32(bytes, offset) {
  return (
    (bytes[offset]     << 24) |
    (bytes[offset + 1] << 16) |
    (bytes[offset + 2] <<  8) |
     bytes[offset + 3]
  ) >>> 0;
}

/**
 * Extracts a hidden file from a stego image.
 * @param   {HTMLImageElement}  img      - Stego image element.
 * @param   {HTMLCanvasElement} canvas   - Off-screen canvas for pixel reading.
 * @param   {string}            password - Decryption password.
 * @returns {Promise<{ blob: Blob, fileName: string }>}
 * @throws  {Error} If the password is wrong or the image has no hidden data.
 */
export async function decodeImage(img, canvas, password) {
  if (!password) {
    throw new Error("Password is required to decode this image.");
  }

  const ctx = canvas.getContext("2d");
  canvas.width  = img.width;
  canvas.height = img.height;

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, 0, 0);

  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  // Read LSB of R, G, B from every fully opaque pixel
  const bits = [];
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] === 255) {
      for (let j = 0; j < 3; j++) {
        bits.push(pixels[i + j] & 1);
      }
    }
  }

  const bytes = bitsToBytes(bits);

  // First 4 bytes = encrypted blob size
  const encryptedSize = readUint32(bytes, 0);

  if (!encryptedSize || encryptedSize > bytes.length - 4) {
    throw new Error("No hidden data found in this image.");
  }

  const encryptedBlob = bytes.slice(4, 4 + encryptedSize);

  // Decrypt everything — wrong password will throw here
  let plaintext;
  try {
    plaintext = decryptData(encryptedBlob, password);
  } catch {
    throw new Error("Wrong password or this image has no hidden data.");
  }

  // Verify magic bytes "STGO"
  if (
    plaintext[0] !== MAGIC[0] ||
    plaintext[1] !== MAGIC[1] ||
    plaintext[2] !== MAGIC[2] ||
    plaintext[3] !== MAGIC[3]
  ) {
    throw new Error("Wrong password or this image has no hidden data.");
  }

  // Parse: [4B magic][4B name len][name][4B type len][type][4B orig size][compressed payload]
  let offset = 4;

  const nameLen  = readUint32(plaintext, offset); offset += 4;
  const fileName = new TextDecoder().decode(plaintext.slice(offset, offset + nameLen)); offset += nameLen;

  const typeLen  = readUint32(plaintext, offset); offset += 4;
  const mimeType = new TextDecoder().decode(plaintext.slice(offset, offset + typeLen)); offset += typeLen;

  const origSize = readUint32(plaintext, offset); offset += 4;

  const compressedPayload = plaintext.slice(offset);

  // Decompress
  let decodedBytes;
  try {
    decodedBytes = decompressData(compressedPayload);
  } catch {
    throw new Error("Wrong password or corrupted data.");
  }

  // Final size check
  if (decodedBytes.length !== origSize) {
    throw new Error("Wrong password or corrupted data.");
  }

  return {
    blob:     new Blob([decodedBytes], { type: mimeType }),
    fileName,
  };
}