import { compressData } from "./compression";
import { encryptData } from "./encryption";

// ===============================
// 🔹 Helper: String → Binary
// ===============================
function stringToBinary(str) {
  return str
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("");
}

// ===============================
// 🔹 Helper: Buffer → Binary
// ===============================
function bufferToBinary(buffer) {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes)
    .map((b) => b.toString(2).padStart(8, "0"))
    .join("");
}

// ===============================
// 🔐 MAIN ENCODE FUNCTION
// ===============================
export async function encodeImage(img, file, password, canvas) {
  const ctx = canvas.getContext("2d");

  // Set canvas size
  canvas.width = img.width;
  canvas.height = img.height;

  // Draw image
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  // ===============================
  // 📦 Read File
  // ===============================
  const fileBuffer = await file.arrayBuffer();

  // ===============================
  // 🧾 Metadata
  // ===============================
  const metadata = JSON.stringify({
    name: file.name,
    type: file.type,
    size: file.size,
    compressed: true,
  });

  const delimiter = "####STEGO####";

  // Combine metadata + delimiter
  const metaString = delimiter + metadata + delimiter;

  const metaBinary = stringToBinary(metaString);

  const compressed = compressData(new Uint8Array(fileBuffer));

  const encryptedData = encryptData(compressed, password);

  const fileBinary = stringToBinary(encryptedData);

  // ===============================
  // 🔚 End Marker
  // ===============================
  const endMarker = "1111111111111110";

  const fullBinary = metaBinary + fileBinary + endMarker;

  // ===============================
  // ⚠️ Capacity Check
  // ===============================
  if (fullBinary.length > pixels.length) {
    throw new Error("File too large for this image");
  }

  // ===============================
  // 🖼️ LSB Encoding
  // ===============================
  let dataIndex = 0;

  for (let i = 0; i < pixels.length; i++) {
    if (dataIndex < fullBinary.length) {
      // Clear last bit & set new bit
      pixels[i] = (pixels[i] & 254) | Number(fullBinary[dataIndex]);
      dataIndex++;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  // ===============================
  // 📥 Return Stego Image
  // ===============================
  return canvas.toDataURL("image/png");
}
