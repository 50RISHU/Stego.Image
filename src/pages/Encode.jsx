import { useState, useRef } from 'react'
import { encodeImage } from '../utils/stego'
import { downloadZip } from '../utils/downloadZip'

/**
 * Encode page — lets the user pick a cover image and a secret file,
 * enter a password, then embed the encrypted file into the image pixels.
 */
function Encode() {
  const [image,    setImage]    = useState(null)
  const [file,     setFile]     = useState(null)
  const [password, setPassword] = useState('')
  const [capacity, setCapacity] = useState(null)   // max bytes the image can hold
  const [stegoUrl, setStegoUrl] = useState(null)   // object URL of the output PNG
  const [loading,  setLoading]  = useState(false)

  const fileInputRef  = useRef()
  const imageInputRef = useRef()
  const canvasRef     = useRef()

  // ── Helpers ────────────────────────────────────────────────────────────────

  /**
   * Counts opaque pixels and converts to available byte capacity.
   * Each opaque pixel contributes 3 LSBs (one per RGB channel).
   * @param {File} imgFile
   */
  const calculateCapacity = (imgFile) => {
    const objectUrl = URL.createObjectURL(imgFile)
    const img = new window.Image()
    img.src = objectUrl

    img.onload = () => {
      const tempCanvas = document.createElement('canvas')
      const ctx = tempCanvas.getContext('2d')
      tempCanvas.width  = img.width
      tempCanvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const pixels = ctx.getImageData(0, 0, img.width, img.height).data

      // Count only fully opaque pixels (alpha === 255)
      let opaqueCount = 0
      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] === 255) opaqueCount++
      }

      setCapacity(Math.floor((opaqueCount * 3) / 8))
      URL.revokeObjectURL(objectUrl)
    }
  }

  /**
   * Handles file drops on either drop zone.
   * @param {DragEvent} e
   * @param {'image'|'file'} type
   */
  const handleDrop = (e, type) => {
    e.preventDefault()
    const dropped = e.dataTransfer.files[0]
    if (!dropped) return

    if (type === 'image') {
      setImage(dropped)
      calculateCapacity(dropped)
    } else {
      setFile(dropped)
    }
  }

  const handleDragOver = (e) => e.preventDefault()

  // ── Encode ─────────────────────────────────────────────────────────────────

  /**
   * Loads the cover image onto the hidden canvas, then calls encodeImage
   * to compress → encrypt → embed the secret file into the pixels.
   */
  const handleEncode = async () => {
    if (!image || !file || !password) {
      alert('All inputs are required')
      return
    }

    setLoading(true)

    // Rough pre-flight size warning (actual enforcement is in stego.js)
    if (file.size * 2 > capacity) {
      alert('File might be too large for the selected image. Trying anyway…')
    }

    const objectUrl = URL.createObjectURL(image)
    const img = new window.Image()
    img.src = objectUrl

    img.onload = async () => {
      try {
        const result = await encodeImage(img, file, password, canvasRef.current)
        setStegoUrl(result)
      } catch (err) {
        alert(err.message)
      } finally {
        setLoading(false)
        URL.revokeObjectURL(objectUrl)
      }
    }

    img.onerror = () => {
      alert('Failed to load image. Please try a different file.')
      setLoading(false)
      URL.revokeObjectURL(objectUrl)
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="encode-container container py-5">

      {/* Page header */}
      <div className="text-center text-white mb-4">
        <h1>Encode Data into Image</h1>
        <p className="text-warning small mb-1">
          ⚠️ Read the instructions below before hiding data — incorrect usage may cause data loss.
        </p>
        <p>Encrypt and embed a file inside an image</p>
      </div>

      <div className="row g-4">

        {/* Cover image drop zone */}
        <div className="col-md-6">
          <label className="label-text">Cover Image</label>
          <div
            className="drop-zone"
            onDrop={(e) => handleDrop(e, 'image')}
            onDragOver={handleDragOver}
            onClick={() => imageInputRef.current.click()}
          >
            <p className="mb-0">Select or drop image</p>
            {image && <span className="file-name">{image.name}</span>}
            <input
              type="file"
              accept="image/*"
              hidden
              ref={imageInputRef}
              onChange={(e) => {
                const f = e.target.files[0]
                setImage(f)
                calculateCapacity(f)
              }}
            />
          </div>
        </div>

        {/* Secret file drop zone */}
        <div className="col-md-6">
          <label className="label-text">Secret File</label>
          <div
            className="drop-zone"
            onDrop={(e) => handleDrop(e, 'file')}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current.click()}
          >
            <p className="mb-0">Select or drop file</p>
            {file && <span className="file-name">{file.name}</span>}
            <input
              type="file"
              hidden
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </div>

        {/* Capacity indicator — only shown once an image is chosen */}
        {capacity !== null && (
          <div className="col-12">
            <div className="capacity-box">
              <h6>Estimated Image Capacity</h6>
              <strong>{(capacity / 1024).toFixed(2)} KB</strong>
            </div>
          </div>
        )}

        {/* Password field */}
        <div className="col-12">
          <label className="label-text">Encryption Password</label>
          <input
            type="password"
            className="form-control custom-input"
            placeholder="Enter a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Encode button */}
        <div className="col-12 text-center">
          <button
            className="primary-btn"
            onClick={handleEncode}
            disabled={loading}
          >
            {loading && <span className="spinner-border spinner-border-sm me-2" />}
            {loading ? 'Encoding…' : 'Execute Encoding'}
          </button>
        </div>

        {/* Download section — shown after successful encoding */}
        {stegoUrl && (
          <div className="col-12 text-center text-white mt-4">
            <h5>Stego Image Ready</h5>
            <img
              src={stegoUrl}
              alt="encoded stego preview"
              style={{ maxWidth: '300px', borderRadius: '10px' }}
            />
            <div className="mt-3 d-flex gap-3 justify-content-center flex-wrap">
              <a href={stegoUrl} download="stego-image.png" className="primary-btn">
                Download PNG
              </a>
              <button className="primary-btn" onClick={() => downloadZip(stegoUrl)}>
                Download ZIP (Safe Share)
              </button>
            </div>
            <p className="text-warning mt-3 small">
              ⚠️ Sharing the PNG directly via WhatsApp, Instagram, etc. may destroy
              hidden data due to image compression. Use the ZIP option for safe sharing.
            </p>
          </div>
        )}

      </div>

      {/* Hidden canvas used by the steganography engine */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Instructions */}
      <div className="info-box mt-4">
        <h5>Instructions</h5>
        <ul>
          <li>Use PNG or BMP images for best results (lossless formats).</li>
          <li>JPEG is not recommended — compression may corrupt the hidden data.</li>
          <li>You can hide any file type: ZIP, PDF, TXT, images, etc.</li>
          <li>Always use a strong password to protect your hidden data.</li>
          <li>Ensure the secret file size does not exceed the image capacity shown above.</li>
          <li>Download the output as PNG for direct use, or ZIP for safe sharing.</li>
          <li>Do NOT share the image on platforms that re-compress images.</li>
          <li>To decode later, upload the stego image and enter the same password.</li>
        </ul>
      </div>

    </div>
  )
}

export default Encode