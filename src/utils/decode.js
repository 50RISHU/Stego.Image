import { decryptData } from "./encryption";
import { decompressData } from "./compression";

/**
 * Converts a flat bit array back into a byte array.
 * @param {number[]} bits
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
 *
 * Pipeline:
 *   pixels → read LSBs → parse metadata → [AES-256 decrypt if encrypted] → GZIP decompress → Blob
 *
 * The `encrypted` flag stored in the metadata header determines whether
 * decryption is attempted — password is only used when that flag is true.
 *
 * @param {HTMLImageElement}  img      - Loaded stego image element
 * @param {HTMLCanvasElement} canvas   - Hidden canvas for pixel reading
 * @param {string|null}       password - Decryption password, or null if not encrypted
 * @returns {Promise<{ blob: Blob, fileName: string }>}
 */
export async function decodeImage(img, canvas, password) {
  const ctx = canvas.getContext("2d");
  canvas.width  = img.width;
  canvas.height = img.height;

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, 0, 0);

  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  // Step 1 — Extract LSBs from opaque pixels only
  const bits = [];
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] === 255) {
      for (let j = 0; j < 3; j++) {
        bits.push(pixels[i + j] & 1);
      }
    }
  }

  const bytes = bitsToBytes(bits);

  // Step 2 — Read 4-byte metadata length prefix
  const metaLength =
    (bytes[0] << 24) |
    (bytes[1] << 16) |
    (bytes[2] <<  8) |
     bytes[3];

  if (!metaLength || metaLength > bytes.length) {
    throw new Error("Invalid stego image.");
  }

  // Step 3 — Parse metadata JSON
  const metaBytes = bytes.slice(4, 4 + metaLength);
  let metadata;
  try {
    metadata = JSON.parse(new TextDecoder().decode(metaBytes));
  } catch {
    throw new Error("Invalid stego image or corrupted metadata.");
  }

  if (metadata.signature !== "STEGO_V1") {
    throw new Error("Invalid stego image.");
  }

  // Step 4 — Extract the payload bytes
  const payloadEnd = metadata.encryptedSize
    ? 4 + metaLength + metadata.encryptedSize
    : undefined;
  const payloadBytes = bytes.slice(4 + metaLength, payloadEnd);

  // Step 5 — Decrypt only if the image was encoded with encryption
  let decodedBytes;
  if (metadata.encrypted) {
    // Encrypted path: password required
    if (!password) {
      throw new Error("This image was encoded with encryption. Please enter the password.");
    }
    const decrypted = decryptData(payloadBytes, password);
    decodedBytes = decompressData(decrypted);
  } else {
    // Unencrypted path: skip decryption entirely
    decodedBytes = decompressData(payloadBytes);
  }

  // Step 6 — Validate output size matches original
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