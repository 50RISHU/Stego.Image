import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const FORMAT_COMPARISON = [
  {
    property: "Compression type",
    png: "Lossless (DEFLATE)",
    jpeg: "Lossy (DCT)",
  },
  {
    property: "Pixel values preserved",
    png: "Yes — exactly",
    jpeg: "No — approximated",
  },
  {
    property: "LSB data survives save",
    png: "Yes",
    jpeg: "No — destroyed",
  },
  {
    property: "File size",
    png: "Larger",
    jpeg: "Smaller",
  },
  {
    property: "Suitable for steganography",
    png: "Yes",
    jpeg: "No",
  },
  {
    property: "Colour depth",
    png: "Up to 48-bit",
    jpeg: "Up to 24-bit",
  },
  {
    property: "Transparency support",
    png: "Yes (alpha channel)",
    jpeg: "No",
  },
];

const PLATFORMS_TO_AVOID = [
  {
    name: "WhatsApp",
    reason:
      "Re-compresses all images to JPEG on send. Hidden data is destroyed.",
  },
  {
    name: "Instagram",
    reason:
      "Applies lossy compression to all uploads. Stego images will not survive.",
  },
  {
    name: "Facebook",
    reason: "Re-encodes images server-side. LSB data does not survive upload.",
  },
  {
    name: "Twitter/X",
    reason:
      "Converts PNG to JPEG for most uploads. Use direct file transfer instead.",
  },
  {
    name: "Discord",
    reason:
      "Compresses images above a certain size. Send as a file attachment, not image.",
  },
];

const SAFE_METHODS = [
  {
    name: "Direct file transfer",
    desc: "Send the PNG as a file attachment, not an inline image. Most messaging apps preserve files.",
  },
  {
    name: "Email attachment",
    desc: "Attach the PNG directly to an email. Do not paste it inline — some clients re-compress pasted images.",
  },
  {
    name: "Cloud storage",
    desc: "Google Drive, Dropbox, and OneDrive preserve files exactly. Share a download link.",
  },
  {
    name: "GitHub / Pastebin",
    desc: "Upload as a raw file. Useful for sharing with developers.",
  },
];

const RELATED = [
  {
    to: "/learn/how-steganography-works",
    label: "How Steganography Works",
    desc: "Broad overview of steganography concepts",
  },
  {
    to: "/learn/lsb-steganography",
    label: "LSB Steganography",
    desc: "How pixel-level bit manipulation works",
  },
  {
    to: "/learn/aes256-encryption",
    label: "AES-256 Encryption",
    desc: "How your data is protected before embedding",
  },
  {
    to: "/learn/steganography-vs-encryption",
    label: "Steganography vs Encryption",
    desc: "Full side-by-side comparison",
  },
  {
    to: "/learn/detect-hidden-data",
    label: "Detect Hidden Data",
    desc: "How steganalysis tools detect hidden content",
  },
  {
    to: "/learn/use-cases",
    label: "Use Cases",
    desc: "When to use steganography, encryption, or both together",
  },
];

function ImageSteganography() {
  return (
    <div className="container py-5">
      <Helmet>
        <title>Image Steganography — Stego.Image</title>
        <meta
          name="description"
          content="Learn how image steganography works, why PNG is required over JPEG, how file format affects hidden data survival, and which platforms destroy stego images."
        />
        <link
          rel="canonical"
          href="https://stegoimage.pages.dev/learn/image-steganography"
        />
        <meta property="og:title" content="Image Steganography — Stego.Image" />
        <meta property="og:type" content="article" />
      </Helmet>

      {/* ── BREADCRUMB ── */}
      <nav style={{ fontSize: "13px", marginBottom: "28px" }}>
        <Link className="custom-link" to="/">
          Home
        </Link>
        <span className="mx-2" style={{ color: "var(--text-primary)" }}>
          ›
        </span>
        <span style={{ color: "var(--text-primary)" }}>Learn</span>
        <span className="mx-2" style={{ color: "var(--text-primary)" }}>
          ›
        </span>
        <span style={{ color: "var(--text-primary)" }}>
          Image Steganography
        </span>
      </nav>

      <div className="row">
        {/* ── MAIN CONTENT ── */}
        <div className="col-lg-8">
          <h1
            className="text-white mb-2"
            style={{ fontSize: "28px", fontWeight: 700 }}
          >
            Image Steganography
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "15px",
              marginBottom: "36px",
              lineHeight: 1.7,
            }}
          >
            Image steganography hides secret data inside the pixel values of an
            image file. The choice of image format is critical — not all formats
            preserve the pixel data needed to keep hidden information intact.
          </p>

          {/* ── WHY IMAGES ── */}
          <section style={{ marginBottom: "30px" }} id="why-images">
            <h2
              className="text-white mb-3"
              style={{
                fontSize: "18px",
                fontWeight: 600,
                paddingBottom: "10px",
                paddingTop: "10px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              Why Images?
            </h2>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              Images are ideal carriers for hidden data for three reasons:
            </p>
            <div className="about-steps">
              {[
                {
                  num: 1,
                  title: "High redundancy",
                  desc: "A typical image contains millions of pixels. Modifying 1 bit per channel across a fraction of those pixels stores significant data while changing the image imperceptibly.",
                },
                {
                  num: 2,
                  title: "Natural variation",
                  desc: "Real-world images contain natural noise and colour variation. Small LSB changes blend in with this natural variation, making detection harder.",
                },
                {
                  num: 3,
                  title: "Universal format",
                  desc: "Images are shared constantly across every platform and communication channel — a stego image attracts no suspicion as a file type.",
                },
              ].map(({ num, title, desc }) => (
                <div className="about-step-card" key={num}>
                  <div className="about-step-number">{num}</div>
                  <div>
                    <span
                      className="about-step-title"
                      style={{ fontWeight: 600 }}
                    >
                      {title}
                    </span>
                    <p className="about-step-desc mb-0">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── PNG VS JPEG ── */}
          <section style={{ marginBottom: "30px" }} id="png-vs-jpeg">
            <h2
              className="text-white mb-3"
              style={{
                fontSize: "18px",
                fontWeight: 600,
                paddingBottom: "10px",
                paddingTop: "10px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              PNG vs JPEG
            </h2>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              The most important decision in image steganography is format. PNG
              and JPEG handle pixel data in fundamentally different ways.
            </p>

            <div className="about-table-wrapper">
              <table className="about-meta-table">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th style={{ color: "#58a6ff" }}>PNG</th>
                    <th style={{ color: "#ff7b72" }}>JPEG</th>
                  </tr>
                </thead>
                <tbody>
                  {FORMAT_COMPARISON.map(({ property, png, jpeg }) => (
                    <tr key={property}>
                      <td
                        style={{
                          color: "var(--text-primary)",
                          fontWeight: 500,
                        }}
                      >
                        {property}
                      </td>
                      <td
                        style={{
                          color:
                            property === "Suitable for steganography"
                              ? "#3fb950"
                              : "var(--text-body)",
                        }}
                      >
                        {png}
                      </td>
                      <td
                        style={{
                          color:
                            property === "Suitable for steganography"
                              ? "#ff7b72"
                              : "var(--text-body)",
                        }}
                      >
                        {jpeg}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="about-note mt-3">
              <strong>Why JPEG fails:</strong> JPEG uses Discrete Cosine
              Transform (DCT) compression. During saving, pixel values are
              approximated and rounded. Any LSB data written before saving is
              overwritten by this process. The hidden data is permanently
              destroyed.
            </div>
          </section>

          {/* ── HOW PNG WORKS ── */}
          <section style={{ marginBottom: "30px" }} id="why-png">
            <h2
              className="text-white mb-3"
              style={{
                fontSize: "18px",
                fontWeight: 600,
                paddingBottom: "10px",
                paddingTop: "10px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              Why PNG Preserves Hidden Data
            </h2>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              PNG uses DEFLATE lossless compression. This means the compression
              algorithm reduces file size without changing any pixel values —
              every pixel is stored and retrieved exactly as written. The LSBs
              you modify during encoding are still there when the file is
              opened.
            </p>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              PNG also supports an alpha (transparency) channel. Stego.Image
              only encodes data into fully opaque pixels — pixels where the
              alpha value is 255. Transparent pixels are skipped to avoid
              corrupting transparency data.
            </p>

            <div
              className="about-section"
              style={{ fontFamily: "monospace", fontSize: "13px" }}
            >
              <div
                style={{
                  color: "var(--text-muted)",
                  fontSize: "12px",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Pixel encoding logic
              </div>
              <div style={{ color: "#3fb950" }}>
                {"// Only encode into fully opaque pixels"}
              </div>
              <div style={{ color: "var(--text-body)" }}>
                {"if (alpha === 255) {"}
              </div>
              <div style={{ paddingLeft: "20px", color: "var(--accent-blue)" }}>
                {"embedBit(R, payloadBit++)"}
              </div>
              <div style={{ paddingLeft: "20px", color: "var(--accent-blue)" }}>
                {"embedBit(G, payloadBit++)"}
              </div>
              <div style={{ paddingLeft: "20px", color: "var(--accent-blue)" }}>
                {"embedBit(B, payloadBit++)"}
              </div>
              <div style={{ color: "var(--text-body)" }}>{"}"}</div>
            </div>
          </section>

          {/* ── CAPACITY ── */}
          <section style={{ marginBottom: "30px" }} id="capacity">
            <h2
              className="text-white mb-3"
              style={{
                fontSize: "18px",
                fontWeight: 600,
                paddingBottom: "10px",
                paddingTop: "10px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              Image Capacity
            </h2>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              The larger the image, the more data it can carry. Capacity depends
              on the number of fully opaque pixels and the number of LSBs used
              per channel (Stego.Image uses 1 LSB per channel).
            </p>

            <div className="row g-3">
              {[
                {
                  size: "800 × 600",
                  cap: "~180 KB",
                  note: "Small image, small files only",
                },
                {
                  size: "1920 × 1080",
                  cap: "~777 KB",
                  note: "Full HD — good for most files",
                },
                {
                  size: "2560 × 1440",
                  cap: "~1.4 MB",
                  note: "QHD — comfortable capacity",
                },
                {
                  size: "3840 × 2160",
                  cap: "~3.1 MB",
                  note: "4K — large file support",
                },
              ].map(({ size, cap, note }) => (
                <div className="col-md-6" key={size}>
                  <div className="about-faq-item h-100">
                    <div
                      className="about-faq-q"
                      style={{ fontFamily: "monospace" }}
                    >
                      {size}
                    </div>
                    <div
                      style={{
                        color: "#3fb950",
                        fontSize: "16px",
                        fontWeight: 700,
                        margin: "4px 0",
                      }}
                    >
                      {cap}
                    </div>
                    <div className="about-faq-a">{note}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="about-note mt-3">
              Stego.Image displays exact available capacity after you upload
              your cover image. The secret file is GZIP compressed before
              embedding — so the actual usable payload is often larger than the
              raw file size.
            </div>
          </section>

          {/* ── PLATFORMS ── */}
          <section style={{ marginBottom: "30px" }} id="platforms">
            <h2
              className="text-white mb-3"
              style={{
                fontSize: "18px",
                fontWeight: 600,
                paddingBottom: "10px",
                paddingTop: "10px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              Platforms That Destroy Hidden Data
            </h2>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              Many popular platforms re-compress images on upload or send. This
              destroys the LSB data. Never use these platforms to transfer a
              stego image:
            </p>
            <div className="about-limitations">
              {PLATFORMS_TO_AVOID.map(({ name, reason }) => (
                <div className="about-limitation-item" key={name}>
                  <span className="about-limitation-icon">⚠️</span>
                  <div>
                    <span
                      className="about-step-title"
                      style={{ fontWeight: 600 }}
                    >
                      {name}
                    </span>
                    <p className="about-step-desc mb-0">{reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── SAFE METHODS ── */}
          <section style={{ marginBottom: "30px" }} id="safe-methods">
            <h2
              className="text-white mb-3"
              style={{
                fontSize: "18px",
                fontWeight: 600,
                paddingBottom: "10px",
                paddingTop: "10px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              Safe Transfer Methods
            </h2>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              To preserve the hidden data, always transfer the stego image as a
              raw file — not as an inline image preview:
            </p>
            <div className="about-steps">
              {SAFE_METHODS.map(({ name, desc }, i) => (
                <div className="about-step-card" key={name}>
                  <div className="about-step-number">{i + 1}</div>
                  <div>
                    <span
                      className="about-step-title"
                      style={{ fontWeight: 600 }}
                    >
                      {name}
                    </span>
                    <p className="about-step-desc mb-0">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── RELATED ── */}
          <section style={{ marginBottom: "30px" }} id="related">
            <h2
              className="text-white mb-3"
              style={{
                fontSize: "18px",
                fontWeight: 600,
                paddingBottom: "10px",
                paddingTop: "10px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              Continue Learning
            </h2>
            <div className="d-flex flex-column gap-2">
              {RELATED.map(({ to, label, desc }) => (
                <Link key={to} to={to} style={{ textDecoration: "none" }}>
                  <div className="about-faq-item" style={{ cursor: "pointer" }}>
                    <div
                      className="about-faq-q"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{label}</span>
                      <span style={{ color: "var(--text-muted)" }}>→</span>
                    </div>
                    <div className="about-faq-a">{desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* ── SIDEBAR ── */}
        <div className="col-lg-4 d-none d-lg-block">
          <div style={{ position: "sticky", top: "24px" }}>
            <div className="about-section mb-3">
              <div className="about-section-title">On this page</div>
              <div className="d-flex flex-column gap-1">
                {[
                  { href: "#why-images", label: "Why Images?" },
                  { href: "#png-vs-jpeg", label: "PNG vs JPEG" },
                  { href: "#why-png", label: "Why PNG Preserves Data" },
                  { href: "#capacity", label: "Image Capacity" },
                  { href: "#platforms", label: "Platforms That Destroy Data" },
                  { href: "#safe-methods", label: "Safe Transfer Methods" },
                  { href: "#related", label: "Continue Learning" },
                ].map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    style={{
                      fontSize: "13px",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      padding: "4px 0",
                      borderLeft: "2px solid var(--border)",
                      paddingLeft: "10px",
                    }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="about-section mb-3">
              <div className="about-section-title">Format Summary</div>
              <div className="d-flex flex-column gap-2">
                {[
                  { label: "Required format", value: "PNG" },
                  { label: "Avoid", value: "JPEG, WEBP, GIF" },
                  { label: "Compression", value: "Lossless only" },
                  { label: "Alpha pixels", value: "Skipped" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "13px",
                      paddingBottom: "8px",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <span style={{ color: "var(--text-muted)" }}>{label}</span>
                    <span
                      style={{ color: "var(--text-primary)", fontWeight: 500 }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-section text-center">
              <div className="about-section-title">Try It</div>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--text-muted)",
                  marginBottom: "14px",
                }}
              >
                Hide any file inside a PNG — free, client-side, no uploads.
              </p>
              <div className="d-flex flex-column gap-2">
                <Link
                  className="primary-btn justify-content-center"
                  to="/encode"
                >
                  Start Encoding
                </Link>
                <Link
                  className="secondary-btn justify-content-center"
                  to="/decode"
                >
                  Extract Data
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageSteganography;
