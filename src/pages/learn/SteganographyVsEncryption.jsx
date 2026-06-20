import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const COMPARISON = [
  {
    property: "Primary goal",
    stego: "Hide that data exists",
    encryption: "Hide what the data says",
  },
  {
    property: "Output appearance",
    stego: "Normal image file",
    encryption: "Unreadable scrambled data",
  },
  {
    property: "Detectable?",
    stego: "Not visually",
    encryption: "Yes — ciphertext is obvious",
  },
  { property: "Requires password?", stego: "Optional", encryption: "Always" },
  {
    property: "Broken if detected?",
    stego: "Data location exposed",
    encryption: "Data still unreadable",
  },
  {
    property: "Broken if decrypted?",
    stego: "N/A",
    encryption: "Data fully exposed",
  },
  {
    property: "Example tools",
    stego: "Stego.Image, OpenStego",
    encryption: "AES-256, GPG, VeraCrypt",
  },
  {
    property: "Used for",
    stego: "Covert communication, watermarks",
    encryption: "Secure storage, transmission",
  },
];

const SCENARIOS = [
  {
    title: "Encryption alone",
    desc: "You send an encrypted file to a colleague. Anyone monitoring the transfer sees an obvious encrypted blob — they know a secret is being sent, even if they cannot read it. In some contexts this alone can be suspicious.",
  },
  {
    title: "Steganography alone",
    desc: "You hide a file inside an image without encrypting it. If someone detects the hidden data and extracts it — using a steganalysis tool — the file is immediately readable. No password required.",
  },
  {
    title: "Both together (Stego.Image approach)",
    desc: "The file is encrypted first, then hidden inside an image. An observer sees a normal image. Even if they detect and extract the hidden data, they cannot read it without the password. Two independent layers of protection.",
  },
];

const RELATED = [
  {
    to: "/learn/how-steganography-works",
    label: "How Steganography Works",
    desc: "Broad overview of steganography concepts",
  },
  {
    to: "/learn/aes256-encryption",
    label: "AES-256 Encryption",
    desc: "How your data is protected before embedding",
  },
  {
    to: "/learn/image-steganography",
    label: "Image Steganography",
    desc: "How image format affects hidden data survival",
  },
  {
    to: "/learn/lsb-steganography",
    label: "LSB Steganography",
    desc: "How pixel-level bit manipulation works",
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
  }
];

function SteganographyVsEncryption() {
  return (
    <div className="container py-5">
      <Helmet>
        <title>Steganography vs Encryption — Key Differences Explained | Stego.Image</title>
        <meta
          name="description"
          content="Understand the difference between steganography and encryption — how they work, when to use each, and why combining both provides the strongest protection."
        />
        <link
          rel="canonical"
          href="https://stegoimage.pages.dev/learn/steganography-vs-encryption"
        />
        <meta
          property="og:title"
          content="Steganography vs Encryption — Key Differences Explained | Stego.Image"
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
          Steganography vs Encryption
        </span>
      </nav>

      <div className="row">
        <div className="col-lg-8">
          <h1
            className="text-white mb-2"
            style={{ fontSize: "28px", fontWeight: 700 }}
          >
            Steganography vs Encryption
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "15px",
              marginBottom: "36px",
              lineHeight: 1.7,
            }}
          >
            Steganography and encryption are both tools for protecting
            information — but they solve different problems. Understanding the
            difference helps you choose the right approach, or combine both for
            maximum security.
          </p>

          {/* ── CORE DIFFERENCE ── */}
          <section style={{ marginBottom: "30px" }} id="core-difference">
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
              The Core Difference
            </h2>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              The fundamental distinction is about <em>what</em> each technique
              conceals:
            </p>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="about-faq-item h-100">
                  <div className="about-faq-q">Encryption</div>
                  <div className="about-faq-a">
                    Protects <strong>what</strong> the data says. The existence
                    of the data is visible — but its contents are scrambled and
                    unreadable without a key.
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="about-faq-item h-100">
                  <div className="about-faq-q">Steganography</div>
                  <div className="about-faq-a">
                    Protects <strong>that</strong> data exists. The data is
                    hidden inside a normal-looking file — an observer does not
                    know a secret is present at all.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── COMPARISON TABLE ── */}
          <section style={{ marginBottom: "30px" }} id="comparison">
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
              Full Comparison
            </h2>
            <div className="about-table-wrapper">
              <table className="about-meta-table">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th style={{ color: "#58a6ff" }}>Steganography</th>
                    <th style={{ color: "#3fb950" }}>Encryption</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map(({ property, stego, encryption }) => (
                    <tr key={property}>
                      <td
                        style={{
                          color: "var(--text-primary)",
                          fontWeight: 500,
                        }}
                      >
                        {property}
                      </td>
                      <td style={{ color: "var(--text-body)" }}>{stego}</td>
                      <td style={{ color: "var(--text-body)" }}>
                        {encryption}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── SCENARIOS ── */}
          <section style={{ marginBottom: "30px" }} id="scenarios">
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
              Three Scenarios
            </h2>
            <div className="about-steps">
              {SCENARIOS.map(({ title, desc }, i) => (
                <div className="about-step-card" key={title}>
                  <div className="about-step-number">{i + 1}</div>
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
            <div className="about-note mt-3">
              Stego.Image always uses both. Your file is AES-256 encrypted
              before being hidden with LSB steganography — two independent
              layers that must both be defeated for your data to be exposed.
            </div>
          </section>

          {/* ── WEAKNESSES ── */}
          <section style={{ marginBottom: "30px" }} id="weaknesses">
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
              Individual Weaknesses
            </h2>
            <div className="about-limitations">
              {[
                {
                  icon: "⚠️",
                  title: "Steganography weakness",
                  desc: "If steganalysis detects hidden data and the payload is not encrypted, the file is immediately exposed. Steganography alone provides security by obscurity only.",
                },
                {
                  icon: "⚠️",
                  title: "Encryption weakness",
                  desc: "Encrypted data is obviously secret. In environments where encryption attracts scrutiny — or is restricted — the presence of ciphertext can itself be a problem.",
                },
                {
                  icon: "✅",
                  title: "Combined strength",
                  desc: "Steganography hides the existence of the data. Encryption protects it if found. An attacker must both detect the hidden data AND break AES-256 with PBKDF2 key derivation.",
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

          {/* ── WHEN TO USE ── */}
          <section style={{ marginBottom: "30px" }} id="when-to-use">
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
              When to Use Each
            </h2>
            <div className="row g-3">
              {[
                {
                  title: "Use encryption when",
                  desc: "You need to protect data during storage or transmission and the existence of the secret is not itself sensitive. Example: encrypted backups, secure messaging.",
                },
                {
                  title: "Use steganography when",
                  desc: "The existence of a secret must be concealed. Example: covert communication, embedding ownership metadata invisibly.",
                },
                {
                  title: "Use both when",
                  desc: "You need the highest level of protection — the data must be undetectable and unreadable even if detected. This is what Stego.Image does.",
                },
              ].map(({ title, desc }) => (
                <div className="col-12" key={title}>
                  <div className="about-faq-item">
                    <div className="about-faq-q">{title}</div>
                    <div className="about-faq-a">{desc}</div>
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
                  { href: "#core-difference", label: "Core Difference" },
                  { href: "#comparison", label: "Full Comparison" },
                  { href: "#scenarios", label: "Three Scenarios" },
                  { href: "#weaknesses", label: "Individual Weaknesses" },
                  { href: "#when-to-use", label: "When to Use Each" },
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
            <div className="about-section text-center">
              <div className="about-section-title">Try It</div>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--text-muted)",
                  marginBottom: "14px",
                }}
              >
                See both techniques working together — free, client-side, no
                uploads.
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

export default SteganographyVsEncryption;
