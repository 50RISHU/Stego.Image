import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { decodeImage } from "../utils/decode";

/**
 * Decode page — lets the user upload a stego image and extract the hidden file.
 *
 * Encryption toggle (must match what was used during encoding):
 *   ON  → decodeImage will decrypt the payload using the provided password.
 *   OFF → decodeImage will skip decryption and decompress directly.
 *         The password field is hidden when encryption is OFF.
 */
function Decode() {
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");
  const [useEncrypt, setUseEncrypt] = useState(true); // must match encode-time setting
  const [outputFile, setOutputFile] = useState(null); // { url, name }
  const [loading, setLoading] = useState(false);

  const canvasRef = useRef();
  const imageInputRef = useRef();

  // ── Helpers ────────────────────────────────────────────────────────────────

  /**
   * Sets the selected image and clears any previous decode result.
   * @param {File} file
   */
  const selectImage = (file) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }
    setImage(file);
    setOutputFile(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    selectImage(e.dataTransfer.files[0]);
  };
  const handleDragOver = (e) => e.preventDefault();

  /**
   * Toggles encryption on/off.
   * Clears the password field when turning encryption off.
   */
  const handleToggleEncrypt = () => {
    setUseEncrypt((prev) => {
      if (prev) setPassword("");
      return !prev;
    });
  };

  // ── Decode ─────────────────────────────────────────────────────────────────

  /**
   * Loads the stego image, then calls decodeImage.
   * Passes password when encryption is ON, or null when OFF —
   * the decode utility uses this to decide whether to decrypt.
   */
  const handleDecode = () => {
    if (!image) {
      alert("Please upload a stego image.");
      return;
    }

    if (useEncrypt && !password) {
      alert(
        "Please enter the decryption password, or turn off encryption if the image was not encrypted.",
      );
      return;
    }

    setLoading(true);
    setOutputFile(null);

    const objectUrl = URL.createObjectURL(image);
    const img = new window.Image();
    img.src = objectUrl;

    img.onload = async () => {
      try {
        const { blob, fileName } = await decodeImage(
          img,
          canvasRef.current,
          useEncrypt ? password : null, // null tells decodeImage to skip decryption
        );
        setOutputFile({ url: URL.createObjectURL(blob), name: fileName });
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
        URL.revokeObjectURL(objectUrl);
      }
    };

    img.onerror = () => {
      alert("Failed to load image. Ensure it is a valid image file.");
      setLoading(false);
      URL.revokeObjectURL(objectUrl);
    };
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="decode-container container py-5">
      {/* HELMET */}
      <Helmet>
        <title>Extract Hidden File from Image Online — Steganography Decoder | Stego.Image</title>
        <meta
          name="description"
          content="Extract and decrypt files hidden inside images. Upload your stego image and password to recover the original file. Fully client-side."
        />
        <link rel="canonical" href="https://stegoimage.pages.dev/decode" />
      </Helmet>

      {/* Page header */}
      <div className="text-center text-white mb-4">
        <h1>Decode Data from Image</h1>
        <p>Extract hidden data from a steganographic image</p>
      </div>

      <div className="row g-4">
        {/* Stego image drop zone */}
        <div className="col-md-8 offset-md-2">
          <label className="label-text">Stego Image</label>
          <div
            className="drop-zone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => imageInputRef.current.click()}
          >
            <p className="mb-0">Select or drop stego image</p>
            {image && <span className="file-name">{image.name}</span>}
            <input
              type="file"
              accept="image/*"
              hidden
              ref={imageInputRef}
              onChange={(e) => selectImage(e.target.files[0])}
            />
          </div>
        </div>

        {/* ── Encryption Toggle ── */}
        <div className="col-md-8 offset-md-2">
          <div className="encrypt-toggle-row">
            {/* Left: label + status badge */}
            <div className="encrypt-toggle-label">
              <span className="label-text mb-0">Encryption</span>
              <span
                className={`encrypt-badge ${useEncrypt ? "badge-on" : "badge-off"}`}
              >
                {useEncrypt ? "🔒 AES-256 ON" : "🔓 OFF"}
              </span>
            </div>

            {/* Right: toggle switch */}
            <button
              type="button"
              className={`encrypt-toggle-btn ${useEncrypt ? "toggle-on" : "toggle-off"}`}
              onClick={handleToggleEncrypt}
              aria-pressed={useEncrypt}
              aria-label="Toggle decryption"
            >
              <span className="toggle-knob" />
            </button>
          </div>

          {/* Contextual hint — reminds user to match encode-time setting */}
          <p className="encrypt-hint">
            {useEncrypt
              ? "The image was encoded with encryption. Enter the password used during encoding."
              : "The image was encoded without encryption. No password is needed to extract."}
          </p>
        </div>

        {/* Password field — only shown when encryption is ON */}
        {useEncrypt && (
          <div className="col-md-8 offset-md-2">
            <label className="label-text">Decryption Password</label>
            <input
              type="password"
              className="form-control custom-input"
              placeholder="Enter the password used during encoding"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}

        {/* Decode button */}
        <div className="col-12 text-center">
          <button
            className="primary-btn"
            onClick={handleDecode}
            disabled={loading}
          >
            {loading && (
              <span className="spinner-border spinner-border-sm me-2" />
            )}
            {loading ? "Decoding…" : "Execute Decoding"}
          </button>
        </div>

        {/* Output — shown after successful extraction */}
        {outputFile && (
          <div className="col-12 text-center mt-4">
            <div className="output-box">
              <h5>File Extracted Successfully</h5>
              <p>{outputFile.name}</p>
              <a
                href={outputFile.url}
                download={outputFile.name}
                className="primary-btn"
              >
                Download File
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Hidden canvas used by the steganography engine */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Instructions */}
      <div className="info-box mt-5">
        <h5>⚠️ Please read before decoding</h5>
        <ul>
          <li>
            Use <strong>PNG or BMP</strong> only. If you received a ZIP, extract
            it first.
          </li>
          <li>
            Toggle must <strong>match</strong> what was used during encoding.
          </li>
          <li>
            Encryption <strong>ON</strong>: enter the exact password used to
            encode. <strong>OFF</strong>: no password needed.
          </li>
          <li>Wrong password or wrong toggle = corrupted or no output.</li>
        </ul>
      </div>
    </div>
  );
}

export default Decode;
