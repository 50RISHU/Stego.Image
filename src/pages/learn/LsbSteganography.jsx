import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const STEPS = [
  {
    num: 1,
    title: "Convert payload to binary",
    desc: "The encrypted file is converted into a stream of bits — a sequence of 0s and 1s. Every byte of data becomes 8 bits.",
  },
  {
    num: 2,
    title: "Read pixel channels",
    desc: "The encoder reads each pixel of the cover image. Every pixel has three channels: Red, Green, Blue — each an 8-bit value between 0 and 255.",
  },
  {
    num: 3,
    title: "Replace the least significant bit",
    desc: "The last bit of each channel value is replaced with one bit from the payload. 3 channels per pixel = 3 bits hidden per pixel.",
  },
  {
    num: 4,
    title: "Write modified pixels back",
    desc: "The modified pixel values are written back to the image canvas. The visual difference is imperceptible — a max change of ±1 per channel.",
  },
  {
    num: 5,
    title: "Export as PNG",
    desc: "The image is exported as a lossless PNG so the modified LSBs are preserved exactly. Any lossy format like JPEG would overwrite the hidden bits.",
  },
];

const RELATED = [
  {
    to: "/learn/how-steganography-works",
    label: "How Steganography Works",
    desc: "Broad overview of steganography concepts",
  },
  {
    to: "/learn/image-steganography",
    label: "Image Steganography",
    desc: "PNG vs JPEG and format tradeoffs",
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
    desc: "How steganalysis tools detect LSB-encoded images",
  },
  {
    to: "/learn/use-cases",
    label: "Use Cases",
    desc: "When to use steganography, encryption, or both together",
  }
];

function LsbSteganography() {
  return (
    <div className="container py-5">
      <Helmet>
        <title>LSB Steganography Explained — Least Significant Bit Technique | Stego.Image</title>
        <meta
          name="description"
          content="Learn how LSB steganography works — hiding secret data in the least significant bits of image pixels. Covers binary encoding, capacity, and detection."
        />
        <link
          rel="canonical"
          href="https://stegoimage.pages.dev/learn/lsb-steganography"
        />
        <meta property="og:title" content="LSB Steganography Explained — Least Significant Bit Technique | Stego.Image" />
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
        <span style={{ color: "var(--text-primary)" }}>LSB Steganography</span>
      </nav>

      <div className="row">
        {/* ── MAIN CONTENT ── */}
        <div className="col-lg-8">
          <h1
            className="text-white mb-2"
            style={{ fontSize: "28px", fontWeight: 700 }}
          >
            LSB Steganography
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "15px",
              marginBottom: "36px",
              lineHeight: 1.7,
            }}
          >
            Least Significant Bit (LSB) steganography is the most widely used
            technique for hiding data inside images. It works by replacing the
            last bit of each pixel channel value with one bit of secret data — a
            change so small it is invisible to the human eye.
          </p>

          {/* ── WHAT IS LSB ── */}
          <section style={{ marginBottom: "30px" }} id="what-is-lsb">
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
              What Is the Least Significant Bit?
            </h2>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              Every pixel channel value is stored as an 8-bit binary number. In
              an 8-bit number, the{" "}
              <strong style={{ color: "var(--text-primary)" }}>
                most significant bit (MSB)
              </strong>{" "}
              is the leftmost bit — it contributes 128 to the value. The{" "}
              <strong style={{ color: "var(--text-primary)" }}>
                least significant bit (LSB)
              </strong>{" "}
              is the rightmost bit — it contributes only 1 to the value.
            </p>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              Flipping the LSB changes the pixel value by at most ±1 out of 255.
              That is a 0.4% change in brightness — well below the threshold of
              human visual perception.
            </p>

            <div
              className="about-section"
              style={{ fontFamily: "monospace", fontSize: "13.5px" }}
            >
              <div
                style={{
                  marginBottom: "6px",
                  color: "var(--text-muted)",
                  fontSize: "12px",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                8-bit value breakdown
              </div>
              <div style={{ display: "flex", gap: "4px", marginBottom: "8px" }}>
                {["1", "1", "0", "0", "1", "0", "0", "0"].map((bit, i) => (
                  <div
                    key={i}
                    style={{
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        i === 7
                          ? "rgba(88,166,255,0.15)"
                          : "rgba(255,255,255,0.04)",
                      border: `1px solid ${i === 7 ? "var(--accent-blue)" : "var(--border)"}`,
                      borderRadius: "6px",
                      color:
                        i === 7 ? "var(--accent-blue)" : "var(--text-primary)",
                      fontWeight: i === 7 ? 700 : 400,
                      fontSize: "15px",
                    }}
                  >
                    {bit}
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "11px",
                  color: "var(--text-muted)",
                  marginBottom: "14px",
                }}
              >
                <span>← MSB (bit 7) = 128</span>
                <span>LSB (bit 0) = 1 →</span>
              </div>
              <div style={{ marginBottom: "6px" }}>
                <span style={{ color: "var(--text-muted)" }}>Original: </span>
                <span style={{ color: "var(--text-primary)" }}>1100100</span>
                <span style={{ color: "var(--text-muted)" }}>0</span>
                <span style={{ color: "var(--text-muted)" }}> = 200</span>
              </div>
              <div style={{ marginBottom: "6px" }}>
                <span style={{ color: "var(--text-muted)" }}>LSB = 0: </span>
                <span style={{ color: "var(--text-primary)" }}>1100100</span>
                <span style={{ color: "#3fb950", fontWeight: 700 }}>0</span>
                <span style={{ color: "var(--text-muted)" }}>
                  {" "}
                  = 200 (hidden bit: 0)
                </span>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)" }}>LSB = 1: </span>
                <span style={{ color: "var(--text-primary)" }}>1100100</span>
                <span style={{ color: "var(--accent-blue)", fontWeight: 700 }}>
                  1
                </span>
                <span style={{ color: "var(--text-muted)" }}>
                  {" "}
                  = 201 (hidden bit: 1)
                </span>
              </div>
            </div>
          </section>

          {/* ── HOW IT WORKS ── */}
          <section style={{ marginBottom: "30px" }} id="encoding">
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
              How LSB Encoding Works
            </h2>
            <div className="about-steps">
              {STEPS.map(({ num, title, desc }) => (
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
              Storage Capacity
            </h2>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              Using 1 LSB per channel, each pixel stores 3 bits (one per RGB
              channel). The maximum payload capacity of any image is:
            </p>

            <div
              className="about-section"
              style={{ fontFamily: "monospace", fontSize: "13.5px" }}
            >
              <div style={{ marginBottom: "8px" }}>
                <span style={{ color: "var(--text-muted)" }}>
                  Capacity (bytes) ={" "}
                </span>
                <span style={{ color: "var(--accent-blue)" }}>
                  (width × height × 3) ÷ 8
                </span>
              </div>
              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  paddingTop: "10px",
                  marginTop: "10px",
                }}
              >
                <div style={{ marginBottom: "4px" }}>
                  <span style={{ color: "var(--text-muted)" }}>
                    1920×1080 image:{" "}
                  </span>
                  <span style={{ color: "#3fb950" }}>
                    (1920 × 1080 × 3) ÷ 8 = ~777 KB max payload
                  </span>
                </div>
                <div style={{ marginBottom: "4px" }}>
                  <span style={{ color: "var(--text-muted)" }}>
                    800×600 image:{" "}
                  </span>
                  <span style={{ color: "#3fb950" }}>
                    (800 × 600 × 3) ÷ 8 = ~180 KB max payload
                  </span>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)" }}>
                    3840×2160 image:{" "}
                  </span>
                  <span style={{ color: "#3fb950" }}>
                    (3840 × 2160 × 3) ÷ 8 = ~3.1 MB max payload
                  </span>
                </div>
              </div>
            </div>

            <div className="about-note mt-3">
              Stego.Image shows you the exact available capacity for your
              uploaded image before encoding. The secret file (after GZIP
              compression) must fit within this limit.
            </div>
          </section>

          {/* ── DECODING ── */}
          <section style={{ marginBottom: "30px" }} id="decoding">
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
              How LSB Decoding Works
            </h2>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              Decoding is the exact reverse of encoding. The decoder reads the
              LSB of each RGB channel from every pixel in order, reconstructing
              the original bit stream. The bits are reassembled into bytes, then
              parsed to extract the metadata header and payload.
            </p>
            <div className="about-steps">
              {[
                {
                  num: 1,
                  title: "Read LSBs in order",
                  desc: "The decoder reads the last bit of each R, G, B channel from every pixel, left to right, top to bottom.",
                },
                {
                  num: 2,
                  title: "Reassemble the bit stream",
                  desc: "Every 8 bits are combined into one byte, reconstructing the original encrypted binary payload.",
                },
                {
                  num: 3,
                  title: "Parse the metadata header",
                  desc: "The first bytes contain a metadata header (filename, file type, size, encryption flag). This tells the decoder how to handle the rest of the data.",
                },
                {
                  num: 4,
                  title: "Decrypt and decompress",
                  desc: "If encrypted, AES-256 decryption is applied using the provided password. Then GZIP decompression recovers the original file.",
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

          {/* ── DETECTION ── */}
          <section style={{ marginBottom: "30px" }} id="detection">
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
              Can LSB Steganography Be Detected?
            </h2>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              Yes — under certain conditions. Steganalysis tools use statistical
              analysis to detect anomalies in LSB patterns that differ from
              natural image noise.
            </p>
            <div className="row g-3">
              {[
                {
                  title: "Visual inspection",
                  desc: "Impossible for humans. The modified image is visually identical to the original.",
                },
                {
                  title: "Statistical analysis",
                  desc: "Tools like StegExpose can detect unusual LSB distributions across large image areas.",
                },
                {
                  title: "Chi-square attack",
                  desc: "Compares LSB frequency distributions against expected natural image statistics.",
                },
                {
                  title: "With encryption",
                  desc: "AES-256 encryption randomises the payload bits, making statistical detection significantly harder.",
                },
              ].map(({ title, desc }) => (
                <div className="col-md-6" key={title}>
                  <div className="about-faq-item h-100">
                    <div className="about-faq-q">{title}</div>
                    <div className="about-faq-a">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="about-note mt-3">
              Always use encryption when hiding sensitive data. An encrypted
              payload produces random-looking bits that are much harder to
              distinguish from natural image noise.
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
                  { href: "#what-is-lsb", label: "What Is the LSB?" },
                  { href: "#encoding", label: "How Encoding Works" },
                  { href: "#capacity", label: "Storage Capacity" },
                  { href: "#decoding", label: "How Decoding Works" },
                  { href: "#detection", label: "Detection" },
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
              <div className="about-section-title">Quick Facts</div>
              <div className="d-flex flex-column gap-2">
                {[
                  { label: "Bits per pixel", value: "3 (1 per RGB channel)" },
                  { label: "Max value change", value: "±1 per channel" },
                  { label: "Required format", value: "PNG (lossless)" },
                  { label: "Encryption", value: "AES-256 via crypto-js" },
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
                See LSB steganography in action — free, client-side, no uploads.
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

export default LsbSteganography;
