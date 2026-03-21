import { useState, useRef } from "react";
import { encodeImage } from "../utils/stego";

function Encode() {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [capacity, setCapacity] = useState(null);
  const [stegoUrl, setStegoUrl] = useState(null);

  const fileInputRef = useRef();
  const imageInputRef = useRef();
  const canvasRef = useRef();

  // Capacity calculation
  const calculateCapacity = (imgFile) => {
    const img = new Image();
    img.src = URL.createObjectURL(imgFile);

    img.onload = () => {
      const pixels = img.width * img.height;
      const bytes = Math.floor((pixels * 3) / 8);
      setCapacity(bytes);
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

  // 🔐 Encode (frontend placeholder)
  const handleEncode = async () => {
    if (!image || !file || !password) {
      alert("All inputs are required");
      return;
    }

    if (file.size > capacity) {
      alert("File too large for selected image");
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(image);

    img.onload = async () => {
      try {
        const canvas = canvasRef.current;

        const stegoImage = await encodeImage(img, file, password, canvas);

        setStegoUrl(stegoImage);
      } catch (err) {
        alert(err.message);
      }
    };
  };

  return (
    <div className="encode-container container py-5">
      <div className="text-center text-white mb-4">
        <h1>Encode Data into Image</h1>
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
              accept="image/*"
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
              <h6>Image Capacity</h6>
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
          <button className="primary-btn" onClick={handleEncode}>
            Execute Encoding
          </button>
        </div>

        {/* Download Section */}
        {stegoUrl && (
          <div className="col-12 text-center mt-4">
            <h5>Stego Image Ready</h5>

            <img
              src={stegoUrl}
              alt="stego preview"
              style={{ maxWidth: "300px", borderRadius: "10px" }}
            />

            <div className="mt-3">
              <a
                href={stegoUrl}
                download="stego-image.png"
                className="primary-btn"
              >
                Download Image
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Hidden canvas */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Instructions */}
      <div className="info-box mt-4">
        <h5>Instructions</h5>
        <ul>
          <li>Supported image formats: PNG, BMP (recommended)</li>
          <li>JPG is not recommended due to compression loss</li>
          <li>Secret file: any format (zip, txt, pdf, etc.)</li>
          <li>Use strong password for AES encryption</li>
          <li>Ensure file size is within image capacity</li>
        </ul>
      </div>
    </div>
  );
}

export default Encode;
