import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const STEPS = [
  {
    num: 1,
    title: "Choose a Cover Image",
    desc: "A cover image is the ordinary PNG that carries the hidden data. PNG is required because it uses lossless compression — every pixel value is preserved exactly. JPEG destroys hidden data during saving due to lossy compression.",
  },
  {
    num: 2,
    title: "Compress the Secret File",
    desc: "The secret file is compressed using GZIP (via pako) to reduce its size before embedding. Smaller payload = more file types fit inside a given image.",
  },
  {
    num: 3,
    title: "Encrypt the Payload",
    desc: "The compressed data is encrypted using AES-256 with your password via crypto-js. This produces an encrypted binary payload. Without the correct password, the data is unreadable even if someone extracts it.",
  },
  {
    num: 4,
    title: "Embed Using LSB Encoding",
    desc: "The encrypted payload is hidden in the least significant bits of the image pixel values. Each pixel has RGB channels — each an 8-bit number. Changing the last bit causes a colour shift of less than 1% — completely invisible to the human eye.",
  },
  {
    num: 5,
    title: "Export the Stego Image",
    desc: "The output image looks identical to the original and can be shared like any normal PNG. Only someone with the correct password and Stego.Image can extract what is inside.",
  },
];

const RELATED = [
  {
    to: "/learn/lsb-steganography",
    label: "LSB Steganography",
    desc: "Deep dive into bit-level pixel manipulation",
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
    to: "/learn/detect-hidden-data",
    label: "Detect Hidden Data",
    desc: "How steganalysis tools detect hidden content",
  },
  {
    to: "/learn/steganography-vs-encryption",
    label: "Steganography vs Encryption",
    desc: "Full side-by-side comparison",
  },
  {
    to: "/learn/use-cases",
    label: "Use Cases",
    desc: "When to use steganography, encryption, or both together",
  },
];

function HowSteganographyWorks() {
  return (
    <div className="container py-5">
      <Helmet>
        <title>How Steganography Works — Beginner's Guide | Stego.Image</title>
        <meta
          name="description"
          content="Learn how steganography works — the technique of hiding secret data inside ordinary image files using LSB encoding and AES-256 encryption."
        />
        <link
          rel="canonical"
          href="https://stegoimage.pages.dev/learn/how-steganography-works"
        />
        <meta
          property="og:title"
          content="How Steganography Works — Beginner's Guide | Stego.Image"
        />
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
          How Steganography Works
        </span>
      </nav>

      <div className="row">
        {/* ── MAIN CONTENT ── */}
        <div className="col-lg-8">
          {/* Title */}
          <h1
            className="text-white mb-2"
            style={{ fontSize: "28px", fontWeight: 700 }}
          >
            How Steganography Works
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "15px",
              marginBottom: "36px",
              lineHeight: 1.7,
            }}
          >
            Steganography is the practice of hiding secret information inside
            ordinary files so that the existence of the hidden message is
            completely concealed.
          </p>

          {/* ── WHAT IS IT ── */}
          <section style={{ marginBottom: "30px" }} id="what-is">
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
              What Is Steganography?
            </h2>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              The word comes from the Greek <em>steganos</em> (covered) and{" "}
              <em>graphia</em> (writing) — literally "covered writing." Unlike
              encryption, which scrambles data so it cannot be read,
              steganography hides data so it cannot be <em>seen</em>.
            </p>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              An encrypted message tells an observer "there is secret data
              here." A steganographic message tells an observer nothing — the
              secret is invisible. This makes steganography powerful for covert
              communication — the carrier file looks completely normal to anyone
              who inspects it.
            </p>

            {/* Info callout */}
            <div className="about-note mt-3">
              <strong>Key distinction</strong> — Encryption protects{" "}
              <em>what</em> the data is. Steganography hides <em>that</em> data
              exists at all. Stego.Image uses both together.
            </div>
          </section>

          {/* ── HOW IT WORKS ── */}
          <section style={{ marginBottom: "30px" }} id="how-it-works">
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
              How It Works — Step by Step
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

          {/* ── LSB EXPLAINED ── */}
          <section style={{ marginBottom: "30px" }} id="lsb">
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
              LSB Pixel Example
            </h2>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              Every image pixel has RGB colour channels. Each channel is an
              8-bit number (0–255). LSB steganography changes only the last 1–2
              bits of each value:
            </p>

            <div
              className="about-section"
              style={{ fontFamily: "monospace", fontSize: "13.5px" }}
            >
              <div style={{ marginBottom: "8px" }}>
                <span style={{ color: "var(--text-muted)" }}>
                  Original pixel R channel:{" "}
                </span>
                <span style={{ color: "var(--text-primary)" }}>1100100</span>
                <span style={{ color: "var(--accent-blue)", fontWeight: 700 }}>
                  0
                </span>
                <span style={{ color: "var(--text-muted)" }}> = 200</span>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)" }}>
                  Modified pixel R channel:{" "}
                </span>
                <span style={{ color: "var(--text-primary)" }}>1100100</span>
                <span style={{ color: "#3fb950", fontWeight: 700 }}>1</span>
                <span style={{ color: "var(--text-muted)" }}>
                  {" "}
                  = 201 ← 1 bit of hidden data
                </span>
              </div>
            </div>

            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              The value changes from 200 to 201 — a brightness difference of
              0.4%. Out of 16.7 million possible RGB colours, this shift is
              invisible to the human eye. Across millions of pixels in a typical
              image, this method can hide entire files.
            </p>
          </section>

          {/* ── VS ENCRYPTION ── */}
          <section style={{ marginBottom: "30px" }} id="vs-encryption">
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
              Steganography vs Encryption
            </h2>

            <div className="about-table-wrapper">
              <table className="about-meta-table">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Encryption</th>
                    <th>Steganography</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style={{ color: "var(--text-primary)", fontWeight: 500 }}
                    >
                      What it protects
                    </td>
                    <td>The content of data</td>
                    <td>The existence of data</td>
                  </tr>
                  <tr>
                    <td
                      style={{ color: "var(--text-primary)", fontWeight: 500 }}
                    >
                      Is it visible?
                    </td>
                    <td>Yes — scrambled data is detectable</td>
                    <td>No — hidden inside normal files</td>
                  </tr>
                  <tr>
                    <td
                      style={{ color: "var(--text-primary)", fontWeight: 500 }}
                    >
                      Requires
                    </td>
                    <td>A decryption key or password</td>
                    <td>Knowledge of the hiding method</td>
                  </tr>
                  <tr>
                    <td
                      style={{ color: "var(--text-primary)", fontWeight: 500 }}
                    >
                      Example
                    </td>
                    <td>AES-256, RSA</td>
                    <td>LSB image encoding</td>
                  </tr>
                  <tr>
                    <td
                      style={{ color: "var(--text-primary)", fontWeight: 500 }}
                    >
                      Weakness
                    </td>
                    <td>Attacker knows a secret exists</td>
                    <td>If detected, data may be exposed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ── TWO LAYERS ── */}
          <section style={{ marginBottom: "30px" }} id="two-layers">
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
              Two Layers of Security
            </h2>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              Stego.Image combines both techniques. Your file is first encrypted
              with AES-256, then hidden inside an image using LSB steganography.
            </p>
            <div className="about-steps">
              <div className="about-step-card">
                <div className="about-step-number">1</div>
                <div>
                  <span
                    className="about-step-title"
                    style={{ fontWeight: 600 }}
                  >
                    Steganography layer
                  </span>
                  <p className="about-step-desc mb-0">
                    Hides the existence of the data. An attacker must first
                    detect that hidden data is present at all.
                  </p>
                </div>
              </div>
              <div className="about-step-card">
                <div className="about-step-number">2</div>
                <div>
                  <span
                    className="about-step-title"
                    style={{ fontWeight: 600 }}
                  >
                    Encryption layer
                  </span>
                  <p className="about-step-desc mb-0">
                    Even if the hidden data is detected and extracted, AES-256
                    encryption makes it unreadable without the correct password.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── USE CASES ── */}
          <section style={{ marginBottom: "30px" }} id="use-cases">
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
              Use Cases
            </h2>
            <div className="row g-3">
              {[
                {
                  title: "Private file transfer",
                  desc: "Hide sensitive documents inside images to transfer them without attracting attention.",
                },
                {
                  title: "Journalism",
                  desc: "Communicate securely in regions where encrypted messaging is monitored or blocked.",
                },
                {
                  title: "Digital watermarking",
                  desc: "Embed invisible ownership or authorship data into digital media files.",
                },
                {
                  title: "Security research",
                  desc: "Study steganographic techniques to build better detection and forensic tools.",
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
          </section>

          {/* ── LIMITATIONS ── */}
          <section style={{ marginBottom: "30px" }} id="limitations">
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
              Limitations
            </h2>
            <div className="about-limitations">
              {[
                {
                  icon: "⚠️",
                  title: "Image capacity",
                  desc: "The secret file cannot exceed the image capacity. Larger images support larger payloads.",
                },
                {
                  icon: "⚠️",
                  title: "PNG only",
                  desc: "JPEG and other lossy formats destroy LSB data during compression. Always use PNG.",
                },
                {
                  icon: "⚠️",
                  title: "Re-compression",
                  desc: "Uploading to WhatsApp, Instagram, or other platforms that re-compress images will destroy the hidden data.",
                },
                {
                  icon: "⚠️",
                  title: "Steganalysis",
                  desc: "Advanced statistical analysis tools can detect the presence of LSB-encoded data in some cases.",
                },
              ].map(({ icon, title, desc }) => (
                <div className="about-limitation-item" key={title}>
                  <span className="about-limitation-icon">{icon}</span>
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

          {/* ── RELATED PAGES ── */}
          <section style={{ marginBottom: "30px" }} id="related-pages">
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
                  <div
                    className="about-faq-item"
                    style={{
                      cursor: "pointer",
                      transition: "border-color 0.2s",
                    }}
                  >
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
            {/* On this page */}
            <div className="about-section mb-3">
              <div className="about-section-title">On this page</div>
              <div className="d-flex flex-column gap-1">
                {[
                  { href: "#what-is", label: "What Is Steganography?" },
                  { href: "#how-it-works", label: "How It Works" },
                  { href: "#lsb", label: "LSB Pixel Example" },
                  { href: "#vs-encryption", label: "vs Encryption" },
                  { href: "#two-layers", label: "Two Layers of Security" },
                  { href: "#use-cases", label: "Use Cases" },
                  { href: "#limitations", label: "Limitations" },
                  { href: "#related-pages", label: "Continue Learning" },
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

            {/* Try it */}
            <div className="about-section text-center">
              <div className="about-section-title">Try It</div>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--text-muted)",
                  marginBottom: "14px",
                }}
              >
                Hide any file inside an image — free, client-side, no uploads.
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

export default HowSteganographyWorks;
