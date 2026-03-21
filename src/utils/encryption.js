import CryptoJS from "crypto-js";

// 🔐 Encrypt
export function encryptData(buffer, password) {
  const wordArray = CryptoJS.lib.WordArray.create(buffer);

  const encrypted = CryptoJS.AES.encrypt(wordArray, password).toString();

  return encrypted;
}

// 🔓 Decrypt
export function decryptData(cipherText, password) {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, password);

    const decrypted = bytes.toString(CryptoJS.enc.Latin1);

    if (!decrypted) throw new Error("Wrong password");

    // Convert string → Uint8Array
    const arr = new Uint8Array(decrypted.length);
    for (let i = 0; i < decrypted.length; i++) {
      arr[i] = decrypted.charCodeAt(i);
    }

    return arr;
  } catch {
    throw new Error("Decryption failed (wrong password)");
  }
}