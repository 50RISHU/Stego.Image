import { useState, useRef } from 'react'
import { encodeImage } from '../utils/stego'
import { downloadZip } from '../utils/downloadZip'

/**
 * Encode page — lets the user pick a cover image and a secret file,
 * optionally enter a password, then embed the (optionally encrypted)
 * file into the image pixels.
 *
 * Encryption toggle:
 *   ON  → file is GZIP-compressed then AES-256 encrypted before embedding.
 *   OFF → file is GZIP-compressed only; no encryption is applied.
 *         The password field is hidden and irrelevant in this mode.
 */
function Encode() {
  const [image,      setImage]      = useState(null)
  const [file,       setFile]       = useState(null)
  const [password,   setPassword]   = useState('')
  const [useEncrypt, setUseEncrypt] = useState(true)   // encryption toggle — ON by default
  const [capacity,   setCapacity]   = useState(null)   // max bytes the image can hold
  const [stegoUrl,   setStegoUrl]   = useState(null)   // object URL of the output PNG
  const [loading,    setLoading]    = useState(false)

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

  /**
   * Toggles encryption on/off.
   * Clears the password field when turning encryption off.
   */
  const handleToggleEncrypt = () => {
    setUseEncrypt((prev) => {
      if (prev) setPassword('') // clear password when switching OFF
      return !prev
    })
  }

  // ── Encode ─────────────────────────────────────────────────────────────────

  /**
   * Validates inputs, then loads the cover image and calls encodeImage.
   * Passes password only when encryption is enabled; passes null otherwise
   * so the stego utility knows to skip the encryption step.
   */
  const handleEncode = async () => {
    if (!image || !file) {
      alert('Please provide both a cover image and a secret file.')
      return
    }

    // Password is required only when encryption is enabled
    if (useEncrypt && !password) {
      alert('Please enter a password, or turn off encryption.')
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
        // Pass null as password when encryption is OFF so encodeImage skips it
        const result = await encodeImage(
          img,
          file,
          useEncrypt ? password : null,
          canvasRef.current
        )
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
        <p>Embed a file inside an image, with optional AES-256 encryption</p>
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

        {/* ── Encryption Toggle ── */}
        <div className="col-12">
          <div className="encrypt-toggle-row">

            {/* Left: label + status badge */}
            <div className="encrypt-toggle-label">
              <span className="label-text mb-0">Encryption</span>
              <span className={`encrypt-badge ${useEncrypt ? 'badge-on' : 'badge-off'}`}>
                {useEncrypt ? '🔒 AES-256 ON' : '🔓 OFF'}
              </span>
            </div>

            {/* Right: toggle switch button */}
            <button
              type="button"
              className={`encrypt-toggle-btn ${useEncrypt ? 'toggle-on' : 'toggle-off'}`}
              onClick={handleToggleEncrypt}
              aria-pressed={useEncrypt}
              aria-label="Toggle AES-256 encryption"
            >
              <span className="toggle-knob" />
            </button>

          </div>

          {/* Contextual hint below the toggle */}
          <p className="encrypt-hint">
            {useEncrypt
              ? 'Data will be AES-256 encrypted before embedding. A password is required to decode.'
              : 'Data will be embedded without encryption. Anyone with the image can extract it.'}
          </p>
        </div>

        {/* Password field — only rendered when encryption is ON */}
        {useEncrypt && (
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
        )}

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
          <li>Use <strong>PNG or BMP</strong> only — JPEG compression will destroy hidden data.</li>
          <li>Encryption <strong>ON</strong>: set a strong password. <strong>OFF</strong>: anyone can extract the data.</li>
          <li>Secret file size must not exceed the capacity shown above.</li>
          <li>Use <strong>Download ZIP</strong> for sharing — direct PNG sharing (WhatsApp, etc.) may corrupt data.</li>
        </ul>
      </div>

    </div>
  )
}

export default Encode