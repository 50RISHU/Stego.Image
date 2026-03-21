import pako from "pako";

// 📦 Compress (Uint8Array → Uint8Array)
export function compressData(buffer) {
  return pako.deflate(buffer);
}

// 📦 Decompress
export function decompressData(buffer) {
  return pako.inflate(buffer);
}