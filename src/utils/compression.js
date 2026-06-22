/**
 * DEFLATE compression and decompression utilities using pako.
 * Compress before encrypt — encrypted data is incompressible.
 */

import pako from "pako";

/**
 * DEFLATE-compresses a binary buffer.
 * @param   {Uint8Array} buffer
 * @returns {Uint8Array}
 */
export function compressData(buffer) {
  return pako.deflate(buffer);
}

/**
 * DEFLATE-decompresses a binary buffer.
 * Throws if the buffer is not valid DEFLATE data (e.g. wrong password upstream).
 * @param   {Uint8Array} buffer
 * @returns {Uint8Array}
 */
export function decompressData(buffer) {
  return pako.inflate(buffer);
}