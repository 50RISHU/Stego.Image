import CryptoJS from "crypto-js";

// 🔐 Encrypt → Uint8Array
export function encryptData(buffer, password) {
  const wordArray = CryptoJS.lib.WordArray.create(buffer);
  const encrypted = CryptoJS.AES.encrypt(wordArray, password).toString();

  return new TextEncoder().encode(encrypted);
}

// 🔓 Decrypt → Uint8Array
export function decryptData(uint8Array, password) {
  try {
    const base64 = new TextDecoder().decode(uint8Array);
    const bytes = CryptoJS.AES.decrypt(base64, password);

    const result = new Uint8Array(bytes.sigBytes);

    for (let i = 0; i < bytes.sigBytes; i++) {
      result[i] =
        (bytes.words[i >>> 2] >> (24 - (i % 4) * 8)) & 0xff;
    }

    if (!result.length) throw new Error();

    return result;
  } catch {
    throw new Error("Wrong password or corrupted data");
  }
}