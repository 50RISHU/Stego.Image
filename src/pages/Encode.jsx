import { useState, useRef } from "react";
import { encodeImage } from "../utils/stego";
import { downloadZip } from "../utils/downloadZip";

function Encode() {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [capacity, setCapacity] = useState(null);
  const [stegoUrl, setStegoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef();
  const imageInputRef = useRef();
  const canvasRef = useRef();

  // Capacity calculation
  // Capacity calculation
  const calculateCapacity = (imgFile) => {
    const objectUrl = URL.createObjectURL(imgFile);
    const img = new Image();
    img.src = objectUrl;

    img.onload = () => {
      // Create a temporary canvas to read the actual pixels
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      tempCanvas.width = img.width;
      tempCanvas.height = img.height;
      tempCtx.drawImage(img, 0, 0);

      const pixels = tempCtx.getImageData(0, 0, img.width, img.height).data;

      // Count only opaque pixels
      let opaqueCount = 0;
      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] === 255) opaqueCount++;
      }

      const bytes = Math.floor((opaqueCount * 3) / 8);
      setCapacity(bytes);
      URL.revokeObjectURL(objectUrl); // Cleanup memory
    };
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (type === "image") {
      setImage(droppedFile);
      calculateCapacity(droppedFile);
    } else {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  // 🔐 Encode
  const handleEncode = async () => {
    if (!image || !file || !password) {
      alert("All inputs are required");
      return;
    }

    setLoading(true);

    // Rough estimate check (actual check happens in stego.js)
    if (file.size * 2 > capacity) {
      alert("File might be too large for selected image. Trying anyway...");
    }

    const objectUrl = URL.createObjectURL(image);
    const img = new Image();
    img.src = objectUrl;

    img.onload = async () => {
      try {
        const canvas = canvasRef.current;
        const stegoImage = await encodeImage(img, file, password, canvas);
        setStegoUrl(stegoImage);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
        URL.revokeObjectURL(objectUrl); // Cleanup memory
      }
    };

    img.onerror = () => {
      alert("Failed to load image. Please try a different file.");
      setLoading(false);
      URL.revokeObjectURL(objectUrl);
    };
  };

  return (
    <div className="encode-container container py-5">
      <div className="text-center text-white mb-4">
        <h1>Encode Data into Image</h1>
        <h5>
          ⚠️ Please read the instructions carefully before hiding data.
          <br />
          Otherwise, your data may be lost.
        </h5>
        <p>Encrypt and embed file inside image</p>
      </div>

      <div className="row g-4">
        {/* Image Upload */}
        <div className="col-md-6">
          <label className="label-text">Cover Image</label>
          <div
            className="drop-zone"
            onDrop={(e) => handleDrop(e, "image")}
            onDragOver={handleDragOver}
            onClick={() => imageInputRef.current.click()}
          >
            <p>Select or drop image</p>
            {image && <span className="file-name">{image.name}</span>}
            <input
              type="file"
              accept="image/*" // Suggest lossless formats
              hidden
              ref={imageInputRef}
              onChange={(e) => {
                setImage(e.target.files[0]);
                calculateCapacity(e.target.files[0]);
              }}
            />
          </div>
        </div>

        {/* Secret File */}
        <div className="col-md-6">
          <label className="label-text">Secret File</label>
          <div
            className="drop-zone"
            onDrop={(e) => handleDrop(e, "file")}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current.click()}
          >
            <p>Select or drop file</p>
            {file && <span className="file-name">{file.name}</span>}
            <input
              type="file"
              hidden
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </div>

        {/* Capacity */}
        {capacity && (
          <div className="col-12">
            <div className="capacity-box">
              <h6>Estimated Image Capacity</h6>
              <strong>{(capacity / 1024).toFixed(2)} KB</strong>
            </div>
          </div>
        )}

        {/* Password */}
        <div className="col-12">
          <label className="label-text">Encryption Password</label>
          <input
            type="password"
            className="form-control custom-input"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Encode Button */}
        <div className="col-12 text-center">
          <button
            className="primary-btn d-flex align-items-center justify-content-center gap-2 mx-auto"
            onClick={handleEncode}
            disabled={loading}
          >
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            {loading ? "Encoding..." : "Execute Encoding"}
          </button>
        </div>

        {/* Download Section */}
        {stegoUrl && (
          <div className="col-12 text-center text-white mt-4">
            <h5>Stego Image Ready</h5>
            <img
              src={stegoUrl}
              alt="stego preview"
              style={{ maxWidth: "300px", borderRadius: "10px" }}
            />
            <div className="mt-3 d-flex gap-3 justify-content-center">
              <a
                href={stegoUrl}
                download="stego-image.png"
                className="primary-btn"
              >
                Download PNG
              </a>
              <button
                className="primary-btn"
                onClick={() => downloadZip(stegoUrl)}
              >
                Download ZIP (Safe Share)
              </button>
            </div>
            <p className="text-warning mt-3">
              ⚠️ Sharing image directly (WhatsApp, Instagram, etc.) may destroy
              hidden data. Use ZIP for safe sharing.
            </p>
          </div>
        )}
      </div>

      {/* Hidden canvas */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Instructions */}
      <div className="info-box mt-4">
        <h5>Instructions</h5>
        <ul>
          <li>Use PNG or BMP images for best results (lossless formats).</li>
          <li>
            JPG/JPEG is not recommended as it may destroy hidden data due to
            compression.
          </li>
          <li>You can hide any type of file (ZIP, PDF, TXT, images, etc.).</li>
          <li>Always use a strong password to secure your hidden data.</li>
          <li>
            Make sure the secret file size does not exceed the image capacity.
          </li>
          <li>After encoding, download the image as PNG for direct use.</li>
          <li>
            For safe sharing (WhatsApp, Email, etc.), use the ZIP download
            option.
          </li>
          <li>
            Do NOT share the image directly on platforms that compress images.
          </li>
          <li>
            To decode, upload the same stego image and enter the correct
            password.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Encode;
