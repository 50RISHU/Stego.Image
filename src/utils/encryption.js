/**
 * AES-256 encryption and decryption utilities using crypto-js.
 *
 * Key derivation: PBKDF2 with SHA-256, 100,000 iterations, random 16-byte salt.
 * The salt is prepended to the ciphertext so the decoder can reconstruct the key.
 *
 * Payload layout (returned by encryptData):
 *   [ 16 bytes: salt ][ remaining bytes: Base64 ciphertext (UTF-8 encoded) ]
 */

import CryptoJS from "crypto-js";

const PBKDF2_ITERATIONS = 100000;
const SALT_SIZE         = 16; // bytes
const KEY_SIZE          = 8;  // words (8 × 4 bytes = 32 bytes = AES-256)

/**
 * Derives an AES-256 key from a password and salt using PBKDF2-SHA256.
 * @param   {string}             password
 * @param   {CryptoJS.WordArray} salt
 * @returns {CryptoJS.WordArray}
 */
function deriveKey(password, salt) {
  return CryptoJS.PBKDF2(password, salt, {
    keySize:    KEY_SIZE,
    iterations: PBKDF2_ITERATIONS,
    hasher:     CryptoJS.algo.SHA256,
  });
}

/**
 * Encrypts a buffer with AES-256 using a PBKDF2-derived key.
 * Returns [ 16-byte salt | UTF-8 encoded Base64 ciphertext ].
 * @param   {Uint8Array} buffer
 * @param   {string}     password
 * @returns {Uint8Array}
 */
export function encryptData(buffer, password) {
  const salt      = CryptoJS.lib.WordArray.random(SALT_SIZE);
  const key       = deriveKey(password, salt);
  const wordArray = CryptoJS.lib.WordArray.create(buffer);

  const encrypted  = CryptoJS.AES.encrypt(wordArray, key, { iv: salt }).toString();
  const cipherBytes = new TextEncoder().encode(encrypted);

  // Convert salt WordArray to raw bytes
  const saltBytes = new Uint8Array(SALT_SIZE);
  for (let i = 0; i < SALT_SIZE; i++) {
    saltBytes[i] = (salt.words[i >>> 2] >> (24 - (i % 4) * 8)) & 0xff;
  }

  // Output: [salt][ciphertext]
  const output = new Uint8Array(SALT_SIZE + cipherBytes.length);
  output.set(saltBytes,   0);
  output.set(cipherBytes, SALT_SIZE);
  return output;
}

/**
 * Decrypts an AES-256 payload produced by encryptData().
 * Reads the first 16 bytes as salt, re-derives the key, then decrypts.
 * @param   {Uint8Array} uint8Array - [ 16-byte salt | ciphertext bytes ]
 * @param   {string}     password
 * @returns {Uint8Array}
 * @throws  {Error} If the password is wrong or the payload is corrupted.
 */
export function decryptData(uint8Array, password) {
  if (uint8Array.length <= SALT_SIZE) {
    throw new Error("Invalid encrypted payload.");
  }

  try {
    // Reconstruct salt WordArray from the first 16 bytes
    const saltBytes = uint8Array.slice(0, SALT_SIZE);
    const saltWords = [];
    for (let i = 0; i < SALT_SIZE; i += 4) {
      saltWords.push(
        (saltBytes[i]     << 24) |
        (saltBytes[i + 1] << 16) |
        (saltBytes[i + 2] <<  8) |
         saltBytes[i + 3]
      );
    }
    const salt = CryptoJS.lib.WordArray.create(saltWords, SALT_SIZE);
    const key  = deriveKey(password, salt);

    const base64 = new TextDecoder().decode(uint8Array.slice(SALT_SIZE));
    const bytes  = CryptoJS.AES.decrypt(base64, key, { iv: salt });

    if (!bytes.sigBytes || bytes.sigBytes <= 0) {
      throw new Error("Wrong password or corrupted data.");
    }

    // Convert WordArray to Uint8Array
    const result = new Uint8Array(bytes.sigBytes);
    for (let i = 0; i < bytes.sigBytes; i++) {
      result[i] = (bytes.words[i >>> 2] >> (24 - (i % 4) * 8)) & 0xff;
    }

    return result;
  } catch (err) {
    if (err.message === "Invalid encrypted payload.") throw err;
    throw new Error("Wrong password or corrupted data.");
  }
}