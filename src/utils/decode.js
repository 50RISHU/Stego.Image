import { decryptData } from "./encryption";
import { decompressData } from "./compression";

// ===============================
// 🔹 Binary → String
// ===============================
function binaryToString(binary) {
  let result = "";
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.slice(i, i + 8);
    result += String.fromCharCode(parseInt(byte, 2));
  }
  return result;
}

// ===============================
// 🔹 Binary → Uint8Array
// ===============================
function binaryToBytes(binary) {
  const bytes = [];
  for (let i = 0; i < binary.length; i += 8) {
    bytes.push(parseInt(binary.slice(i, i + 8), 2));
  }
  return new Uint8Array(bytes);
}

// ===============================
// 🔓 MAIN DECODE FUNCTION
// ===============================
export async function decodeImage(img, canvas, password) {
  const ctx = canvas.getContext("2d");

  canvas.width = img.width;
  canvas.height = img.height;

  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  // ===============================
  // 🔍 Extract LSB bits
  // ===============================
  let binaryData = "";

  for (let i = 0; i < pixels.length; i++) {
    binaryData += (pixels[i] & 1).toString();
  }

  // ===============================
  // 🔚 End Marker
  // ===============================
  const endMarker = "1111111111111110";
  const endIndex = binaryData.indexOf(endMarker);

  if (endIndex === -1) {
    throw new Error("No hidden data found");
  }

  binaryData = binaryData.slice(0, endIndex);

  // ===============================
  // 🧾 Extract Metadata
  // ===============================
  const delimiter = "####STEGO####";

  const textData = binaryToString(binaryData);

  const parts = textData.split(delimiter);

  if (parts.length < 3) {
    throw new Error("Invalid or corrupted data");
  }

  const metadataString = parts[1];

  let metadata;
  try {
    metadata = JSON.parse(metadataString);
  } catch {
    throw new Error("Metadata parsing failed");
  }

  // ===============================
  // 📦 Extract File Binary
  // ===============================
  const metaBinaryLength = (delimiter + metadataString + delimiter).length * 8;

  const fileBinary = binaryData.slice(metaBinaryLength);

  const encryptedString = binaryToString(fileBinary);

  // 🔓 Decrypt using password
  const decryptedBytes = decryptData(encryptedString, password);


  const finalBytes = decompressData(decryptedBytes);

  // ===============================
  // 📄 Create File Blob
  // ===============================
  const blob = new Blob([finalBytes], {
    type: metadata.type || "application/octet-stream",
  });

  return {
    blob,
    fileName: metadata.name || "decoded_file",
  };
}
