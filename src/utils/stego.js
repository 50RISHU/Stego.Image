/**
 * LSB steganography encoder.
 *
 * Pipeline: file → DEFLATE compress → AES-256 encrypt (single block with metadata) → embed in image pixels
 *
 * Binary stream layout (all encrypted as one block):
 *   encrypt( [4B magic "STGO"] [4B filename length] [filename bytes] [4B mimetype length] [mimetype bytes] [4B original size] [compressed payload] )
 *
 * Only fully opaque pixels (alpha === 255) are used.
 * Capacity: ⌊(opaque pixels × 3) / 8⌋ bytes
 */

import { compressData } from "./compression";
import { encryptData }  from "./encryption";

const MAGIC = new Uint8Array([0x53, 0x54, 0x47, 0x4F]); // "STGO"

function bytesToBits(bytes) {
  const bits = [];
  for (let b of bytes) {
    for (let i = 7; i >= 0; i--) {
      bits.push((b >> i) & 1);
    }
  }
  return bits;
}

function uint32ToBytes(n) {
  return new Uint8Array([
    (n >> 24) & 0xff,
    (n >> 16) & 0xff,
    (n >>  8) & 0xff,
     n        & 0xff,
  ]);
}

/**
 * Hides a secret file inside a cover image using LSB steganography.
 * Metadata and payload are encrypted together — no plaintext is embedded.
 * @param   {HTMLImageElement}  img      - Cover image element.
 * @param   {File}              file     - Secret file to embed.
 * @param   {string}            password - Encryption password.
 * @param   {HTMLCanvasElement} canvas   - Off-screen canvas for pixel manipulation.
 * @returns {Promise<string>}              Data URL of the output PNG.
 * @throws  {Error} If the file is too large for the cover image.
 */
export async function encodeImage(img, file, password, canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width  = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels    = imageData.data;

  const fileBuffer = await file.arrayBuffer();
  const compressed = compressData(new Uint8Array(fileBuffer));

  const nameBytes = new TextEncoder().encode(file.name);
  const typeBytes = new TextEncoder().encode(file.type || "application/octet-stream");
  const sizeBytes = uint32ToBytes(file.size);

  // Build plaintext block: [STGO][4B name len][name][4B type len][type][4B orig size][compressed payload]
  const plaintext = new Uint8Array(
    4 +
    4 + nameBytes.length +
    4 + typeBytes.length +
    4 +
    compressed.length
  );

  let offset = 0;
  plaintext.set(MAGIC,                    offset); offset += 4;
  plaintext.set(uint32ToBytes(nameBytes.length), offset); offset += 4;
  plaintext.set(nameBytes,                offset); offset += nameBytes.length;
  plaintext.set(uint32ToBytes(typeBytes.length), offset); offset += 4;
  plaintext.set(typeBytes,                offset); offset += typeBytes.length;
  plaintext.set(sizeBytes,                offset); offset += 4;
  plaintext.set(compressed,               offset);

  // Encrypt the entire block — metadata + payload, nothing left in plaintext
  const encrypted = encryptData(plaintext, password);

  // Prepend total encrypted size as 4B so decoder knows when to stop reading
  const byteStream = new Uint8Array(4 + encrypted.length);
  byteStream.set(uint32ToBytes(encrypted.length), 0);
  byteStream.set(encrypted, 4);

  const bits = bytesToBits(byteStream);

  // Count opaque pixels to verify capacity before writing
  let opaquePixels = 0;
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] === 255) opaquePixels++;
  }

  if (bits.length > opaquePixels * 3) {
    throw new Error("File too large for this image.");
  }

  // Write each bit into the LSB of R, G, B channels of opaque pixels
  let bitIndex = 0;
  for (let i = 0; i < pixels.length; i += 4) {
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