import { useState, useRef } from "react";
import { decodeImage } from "../utils/decode";

function Decode() {
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");
  const [outputFile, setOutputFile] = useState(null);

  const canvasRef = useRef();
  const imageInputRef = useRef();

  // Drag & Drop
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image");
      return;
    }

    setImage(file);
  };

  const handleDragOver = (e) => e.preventDefault();

  // 🔓 Decode
  const handleDecode = () => {
    if (!image) {
      alert("Upload stego image");
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(image);

    img.onload = async () => {
      try {
        const canvas = canvasRef.current;

        const { blob, fileName } = await decodeImage(img, canvas, password);

        const url = URL.createObjectURL(blob);

        setOutputFile({
          url,
          name: fileName,
        });
      } catch (err) {
        alert(err.message);
      }
    };
  };

  return (
    <div className="decode-container container py-5">
      {/* Title */}
      <div className="text-center text-white mb-4">
        <h1>Decode Data from Image</h1>
        <p>Extract hidden data from steganographic image</p>
      </div>

      <div className="row g-4">
        {/* Image Upload */}
        <div className="col-md-8 offset-md-2">
          <label className="label-text">Stego Image</label>
          <div
            className="drop-zone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => imageInputRef.current.click()}
          >
            <p>Select or drop stego image</p>
            {image && <span className="file-name">{image.name}</span>}
            <input
              type="file"
              accept="image/*"
              hidden
              ref={imageInputRef}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </div>

        {/* Password (for future encryption use) */}
        <div className="col-md-8 offset-md-2">
          <label className="label-text">Decryption Password</label>
          <input
            type="password"
            className="form-control custom-input"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Action */}
        <div className="col-12 text-center">
          <button className="primary-btn" onClick={handleDecode}>
            Execute Decoding
          </button>
        </div>

        {/* Output */}
        {outputFile && (
          <div className="col-12 text-center mt-4">
            <div className="output-box">
              <h5>Extracted File</h5>
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

      {/* Hidden canvas */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Instructions */}
      <div className="info-box mt-5">
        <h5>⚠️ Please read the instructions carefully before decoding data</h5>
        <ul>
          <li>Upload the stego image generated using this encoder.</li>
          <li>Supported formats: PNG or BMP (lossless images only).</li>
          <li>
            If you downloaded a ZIP file, extract it first and then upload the
            image.
          </li>
          <li>Enter the correct password used during encoding.</li>
          <li>
            Using the wrong password will result in failed or corrupted output.
          </li>
          <li>
            If no data is found, the image may not be encoded or data may be
            destroyed.
          </li>
          <li>
            Avoid images shared via WhatsApp or social media, as compression can
            remove hidden data.
          </li>
          <li>
            For best results, always use the original PNG file or ZIP version.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Decode;
