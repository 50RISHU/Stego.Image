import JSZip from "jszip";
import { saveAs } from "file-saver";

export async function downloadZip(stegoDataUrl) {
  const zip = new JSZip();

  // Convert base64 → blob
  const response = await fetch(stegoDataUrl);
  const blob = await response.blob();

  // Add file into zip
  zip.file("stego-image.png", blob);

  // Generate zip
  const zipBlob = await zip.generateAsync({ type: "blob" });

  // Download
  saveAs(zipBlob, "stego-image.zip");
}