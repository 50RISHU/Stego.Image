/**
 * LSB steganography decoder.
 *
 * Pipeline: image pixels → read LSBs → parse metadata → AES-256 decrypt (if encrypted) → GZIP decompress
 *
 * The `encrypted` flag in the metadata header — not the UI toggle — determines
 * whether decryption is attempted.
 */

import { decryptData }    from "./encryption";
import { decompressData } from "./compression";

/**
 * Packs groups of 8 bits back into bytes, MSB first.
 * Out-of-bounds reads are treated as 0 (zero-padded).
 * @param   {number[]} bits
 * @returns {Uint8Array}
 */
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

/**
 * Extracts a hidden file from a stego image.
 * The image must be a lossless PNG that has not been re-compressed by any platform.
 * @param   {HTMLImageElement}  img      - Stego image element.
 * @param   {HTMLCanvasElement} canvas   - Off-screen canvas for pixel reading.
 * @param   {string|null}       password - Decryption password, or null if not encrypted.
 * @returns {Promise<{ blob: Blob, fileName: string }>}
 * @throws  {Error} If the image is invalid, the password is wrong, or the file is corrupted.
 */
export async function decodeImage(img, canvas, password) {
  const ctx = canvas.getContext("2d");
  canvas.width  = img.width;
  canvas.height = img.height;

  ctx.imageSmoothingEnabled = false; // ensure raw pixel values, no interpolation
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

  // First 4 bytes are the metadata length as a big-endian uint32
  const metaLength =
    (bytes[0] << 24) |
    (bytes[1] << 16) |
    (bytes[2] <<  8) |
     bytes[3];

  if (!metaLength || metaLength > bytes.length) {
    throw new Error("Invalid stego image.");
  }

  // Parse JSON metadata immediately after the 4-byte prefix
  let metadata;
  try {
    metadata = JSON.parse(new TextDecoder().decode(bytes.slice(4, 4 + metaLength)));
  } catch {
    throw new Error("Invalid stego image or corrupted metadata.");
  }

  if (metadata.signature !== "STEGO_V1") {
    throw new Error("Invalid stego image.");
  }

  // Slice exactly encryptedSize bytes to avoid trailing pixel noise
  const payloadStart = 4 + metaLength;
  const payloadEnd   = metadata.encryptedSize ? payloadStart + metadata.encryptedSize : undefined;
  const payloadBytes = bytes.slice(payloadStart, payloadEnd);

  // Decrypt then decompress, or just decompress if not encrypted
  let decodedBytes;
  if (metadata.encrypted) {
    if (!password) {
      throw new Error("This image was encoded with encryption. Please enter the password.");
    }
    decodedBytes = decompressData(decryptData(payloadBytes, password));
  } else {
    decodedBytes = decompressData(payloadBytes);
  }

  // Output length must match the original file size stored in metadata
  if (decodedBytes.length !== metadata.size) {
    throw new Error(
      metadata.encrypted
        ? "Wrong password or corrupted file."
        : "Corrupted file or mismatched encryption settings."
    );
  }

  return {
    blob:     new Blob([decodedBytes], { type: metadata.type || "application/octet-stream" }),
    fileName: metadata.name,
  };
}