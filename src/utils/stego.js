/**
 * LSB steganography encoder.
 *
 * Pipeline: file → GZIP compress → AES-256 encrypt (optional) → embed in image pixels
 *
 * Binary stream layout:
 *   [ 4B: metadata length ] [ N bytes: JSON metadata ] [ payload ]
 *
 * Only fully opaque pixels (alpha === 255) are used.
 * Capacity: ⌊(opaque pixels × 3) / 8⌋ bytes
 */

import { compressData } from "./compression";
import { encryptData }  from "./encryption";

/**
 * Unpacks each byte into 8 bits, MSB first.
 * @param   {Uint8Array} bytes
 * @returns {number[]}
 */
function bytesToBits(bytes) {
  const bits = [];
  for (let b of bytes) {
    for (let i = 7; i >= 0; i--) {
      bits.push((b >> i) & 1);
    }
  }
  return bits;
}

/**
 * Hides a secret file inside a cover image using LSB steganography.
 * @param   {HTMLImageElement}  img      - Cover image element.
 * @param   {File}              file     - Secret file to embed.
 * @param   {string|null}       password - Encryption password, or null to skip encryption.
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

  const fileBuffer  = await file.arrayBuffer();
  const compressed  = compressData(new Uint8Array(fileBuffer));
  const isEncrypted = Boolean(password);
  const payload     = isEncrypted ? encryptData(compressed, password) : compressed;

  // Build metadata header; `encrypted` flag tells the decoder whether to decrypt
  const metadata = JSON.stringify({
    signature:     "STEGO_V1",
    name:          file.name,
    type:          file.type,
    size:          file.size,
    encrypted:     isEncrypted,
    encryptedSize: payload.length,
  });

  const metaBytes  = new TextEncoder().encode(metadata);
  const metaLength = metaBytes.length;

  // Assemble: [4B big-endian length][metadata][payload]
  const byteStream = new Uint8Array(4 + metaLength + payload.length);
  byteStream[0] = (metaLength >> 24) & 255;
  byteStream[1] = (metaLength >> 16) & 255;
  byteStream[2] = (metaLength >>  8) & 255;
  byteStream[3] =  metaLength        & 255;
  byteStream.set(metaBytes, 4);
  byteStream.set(payload,   4 + metaLength);

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
          pixels[i + j] = (pixels[i + j] & 254) | bits[bitIndex++]; // clear LSB, set new bit
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL("image/png"); // PNG is required — JPEG would destroy the LSBs
}