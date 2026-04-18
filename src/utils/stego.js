import { compressData } from "./compression";
import { encryptData } from "./encryption";

/**
 * Converts a byte array into a flat bit array (MSB first).
 * @param {Uint8Array} bytes
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
 * Encodes a secret file into a cover image using LSB steganography.
 *
 * Pipeline:
 *   file → GZIP compress → [AES-256 encrypt if password provided] → embed into pixels
 *
 * @param {HTMLImageElement} img      - Loaded cover image element
 * @param {File}             file     - Secret file to hide
 * @param {string|null}      password - Encryption password, or null to skip encryption
 * @param {HTMLCanvasElement} canvas  - Hidden canvas for pixel manipulation
 * @returns {Promise<string>}          - Data URL of the output PNG
 */
export async function encodeImage(img, file, password, canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width  = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels    = imageData.data;

  // Step 1 — Compress
  const fileBuffer = await file.arrayBuffer();
  const compressed = compressData(new Uint8Array(fileBuffer));

  // Step 2 — Encrypt only when a password is provided
  const isEncrypted = Boolean(password);
  const payload     = isEncrypted ? encryptData(compressed, password) : compressed;

  // Step 3 — Build metadata header
  // `encrypted` flag lets the decoder know whether to attempt decryption
  const metadata = JSON.stringify({
    signature:     "STEGO_V1",
    name:          file.name,
    type:          file.type,
    size:          file.size,
    encrypted:     isEncrypted,        // ← NEW: decoder reads this flag
    encryptedSize: payload.length,
  });

  const metaBytes  = new TextEncoder().encode(metadata);
  const metaLength = metaBytes.length;
  const totalLength = 4 + metaLength + payload.length;

  // Step 4 — Assemble byte stream: [4B meta length][meta JSON][payload]
  const byteStream = new Uint8Array(totalLength);
  byteStream[0] = (metaLength >> 24) & 255;
  byteStream[1] = (metaLength >> 16) & 255;
  byteStream[2] = (metaLength >>  8) & 255;
  byteStream[3] =  metaLength        & 255;
  byteStream.set(metaBytes, 4);
  byteStream.set(payload,   4 + metaLength);

  const bits = bytesToBits(byteStream);

  // Step 5 — Capacity check (opaque pixels only, 3 LSBs per pixel)
  let opaquePixels = 0;
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] === 255) opaquePixels++;
  }

  if (bits.length > opaquePixels * 3) {
    throw new Error("File too large for this image.");
  }

  // Step 6 — Embed bits into LSBs of opaque pixel RGB channels
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