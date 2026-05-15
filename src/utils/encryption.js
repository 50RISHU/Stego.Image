/**
 * AES-256 encryption and decryption utilities using crypto-js.
 * Encryption is optional — only applied when the user provides a password.
 */

import CryptoJS from "crypto-js";

/**
 * Encrypts a buffer with AES-256. Returns the ciphertext as UTF-8 encoded bytes.
 * @param   {Uint8Array} buffer
 * @param   {string}     password
 * @returns {Uint8Array}
 */
export function encryptData(buffer, password) {
  const wordArray = CryptoJS.lib.WordArray.create(buffer);
  const encrypted = CryptoJS.AES.encrypt(wordArray, password).toString(); // Base64 string
  return new TextEncoder().encode(encrypted);
}

/**
 * Decrypts an AES-256 encrypted buffer. Expects UTF-8 encoded Base64 ciphertext
 * as produced by encryptData().
 * @param   {Uint8Array} uint8Array
 * @param   {string}     password
 * @returns {Uint8Array}
 * @throws  {Error} If the password is wrong or the data is corrupted.
 */
export function decryptData(uint8Array, password) {
  try {
    const base64 = new TextDecoder().decode(uint8Array);
    const bytes  = CryptoJS.AES.decrypt(base64, password);

    // Convert WordArray to Uint8Array
    const result = new Uint8Array(bytes.sigBytes);
    for (let i = 0; i < bytes.sigBytes; i++) {
      result[i] = (bytes.words[i >>> 2] >> (24 - (i % 4) * 8)) & 0xff;
    }

    if (!result.length) throw new Error();
    return result;
  } catch {
    throw new Error("Wrong password or corrupted data.");
  }
}