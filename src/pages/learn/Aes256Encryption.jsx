import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const STEPS = [
  {
    num: 1,
    title: "Key derivation — PBKDF2-SHA256",
    desc: "Your password is never used directly as the encryption key. Instead, PBKDF2-SHA256 runs 100,000 iterations with a random 16-byte salt to derive a strong 256-bit key. This makes brute-force attacks computationally expensive.",
  },
  {
    num: 2,
    title: "Salt generation",
    desc: "A new random 16-byte salt is generated for every encode operation using a cryptographically secure random number generator. The salt is prepended to the ciphertext so decryption can derive the same key.",
  },
  {
    num: 3,
    title: "AES-256-CBC encryption",
    desc: "The GZIP-compressed payload is encrypted using AES-256 in CBC (Cipher Block Chaining) mode. Each 16-byte block is XOR'd with the previous ciphertext block before encryption, preventing identical plaintext blocks from producing identical ciphertext.",
  },
  {
    num: 4,
    title: "Output — salt + ciphertext",
    desc: "The final encrypted blob is: [16-byte salt] + [ciphertext]. This is what gets embedded into the image pixels. Without the correct password, the data cannot be decrypted.",
  },
];

const DECODE_STEPS = [
  {
    num: 1,
    title: "Extract the salt",
    desc: "The first 16 bytes of the encrypted blob are the salt used during encoding.",
  },
  {
    num: 2,
    title: "Re-derive the key",
    desc: "PBKDF2-SHA256 runs again with the provided password and extracted salt at 100,000 iterations, producing the same 256-bit key used during encoding.",
  },
  {
    num: 3,
    title: "Decrypt with AES-256-CBC",
    desc: "The ciphertext is decrypted using the derived key. If the password is wrong, the derived key will be different and decryption produces garbage — or fails entirely.",
  },
  {
    num: 4,
    title: "GZIP decompress",
    desc: "The decrypted payload is GZIP decompressed to recover the original file. A size mismatch against the metadata header signals a wrong password or corrupted file.",
  },
];

const RELATED = [
  {
    to: "/learn/how-steganography-works",
    label: "How Steganography Works",
    desc: "Broad overview combining steganography and encryption",
  },
  {
    to: "/learn/lsb-steganography",
    label: "LSB Steganography",
    desc: "How the encrypted payload is hidden in pixels",
  },
  {
    to: "/learn/steganography-vs-encryption",
    label: "Steganography vs Encryption",
    desc: "Full side-by-side comparison of both techniques",
  },
  {
    to: "/learn/detect-hidden-data",
    label: "Detect Hidden Data",
    desc: "Why encryption makes steganalysis much harder",
  },
  {
    to: "/learn/use-cases",
    label: "Use Cases",
    desc: "When to use steganography, encryption, or both together",
  },
  {
    to: "/learn/image-steganography",
    label: "Image Steganography",
    desc: "How the encrypted payload is hidden in pixels",
  }
];

function Aes256Encryption() {
  return (
    <div className="container py-5">
      <Helmet>
        <title>AES-256 Encryption Explained — How It Protects Hidden Data | Stego.Image</title>
        <meta
          name="description"
          content="Learn how Stego.Image uses AES-256 encryption with PBKDF2-SHA256 key derivation to protect hidden files. Covers the full encrypt and decrypt pipeline."
        />
        <link
          rel="canonical"
          href="https://stegoimage.pages.dev/learn/aes256-encryption"
        />
        <meta property="og:title" content="AES-256 Encryption Explained — How It Protects Hidden Data | Stego.Image" />
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
        <span style={{ color: "var(--text-primary)" }}>AES-256 Encryption</span>
      </nav>

      <div className="row">
        {/* ── MAIN CONTENT ── */}
        <div className="col-lg-8">
          <h1
            className="text-white mb-2"
            style={{ fontSize: "28px", fontWeight: 700 }}
          >
            AES-256 Encryption
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "15px",
              marginBottom: "36px",
              lineHeight: 1.7,
            }}
          >
            Before any data is hidden inside an image, Stego.Image encrypts it
            using AES-256 — the same encryption standard used by governments,
            banks, and security software worldwide. Even if the hidden data is
            detected and extracted, it remains unreadable without the correct
            password.
          </p>

          {/* ── WHAT IS AES ── */}
          <section style={{ marginBottom: "30px" }} id="what-is-aes">
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
              What Is AES-256?
            </h2>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              AES (Advanced Encryption Standard) is a symmetric block cipher
              standardised by NIST in 2001. It operates on 128-bit blocks of
              data using a key of 128, 192, or 256 bits. Stego.Image uses the
              256-bit variant — the strongest available.
            </p>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              AES-256 has never been broken. A brute-force attack would require
              trying 2<sup>256</sup> possible keys — more combinations than
              there are atoms in the observable universe. The practical security
              depends entirely on your password strength.
            </p>

            <div className="about-note mt-3">
              <strong>Library used:</strong> crypto-js — a pure JavaScript
              implementation of AES-256. All encryption and decryption happens
              entirely in your browser. Your password and file data never leave
              your device.
            </div>
          </section>

          {/* ── ENCRYPT PIPELINE ── */}
          <section style={{ marginBottom: "30px" }} id="encrypt">
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
              Encryption Pipeline
            </h2>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              Stego.Image does not use a simple password-to-key mapping. It uses
              a hardened key derivation process before any encryption occurs:
            </p>
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

          {/* ── PBKDF2 EXPLAINED ── */}
          <section style={{ marginBottom: "30px" }} id="pbkdf2">
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
              Why PBKDF2 Matters
            </h2>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              A weak password fed directly into AES is easy to brute-force — an
              attacker can try millions of passwords per second. PBKDF2
              (Password-Based Key Derivation Function 2) makes each password
              attempt deliberately expensive by running 100,000 rounds of
              SHA-256 hashing.
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
                Key derivation
              </div>
              <div>
                <span style={{ color: "#3fb950" }}>{"const"}</span>
                <span style={{ color: "var(--text-primary)" }}>
                  {" salt = "}
                </span>
                <span style={{ color: "var(--accent-blue)" }}>
                  {"CryptoJS.lib.WordArray.random(16)"}
                </span>
              </div>
              <div style={{ marginTop: "4px" }}>
                <span style={{ color: "#3fb950" }}>{"const"}</span>
                <span style={{ color: "var(--text-primary)" }}>
                  {" key  = "}
                </span>
                <span style={{ color: "var(--accent-blue)" }}>
                  {"CryptoJS.PBKDF2(password, salt, {"}
                </span>
              </div>
              <div style={{ paddingLeft: "20px", color: "var(--text-body)" }}>
                {"keySize: 256 / 32,"}
              </div>
              <div style={{ paddingLeft: "20px", color: "var(--text-body)" }}>
                {"iterations: 100000,"}
              </div>
              <div style={{ paddingLeft: "20px", color: "var(--text-body)" }}>
                {"hasher: CryptoJS.algo.SHA256"}
              </div>
              <div style={{ color: "var(--accent-blue)" }}>{"  })"}</div>
            </div>

            <div className="row g-3 mt-2">
              {[
                {
                  title: "Without PBKDF2",
                  desc: "An attacker can try ~1 billion passwords per second on modern hardware.",
                },
                {
                  title: "With PBKDF2 at 100k iterations",
                  desc: "Each attempt takes ~100ms. The same attack tries only ~10 passwords per second.",
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

          {/* ── DECRYPT PIPELINE ── */}
          <section style={{ marginBottom: "30px" }} id="decrypt">
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
              Decryption Pipeline
            </h2>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              Decryption is the exact reverse of encryption. The salt embedded
              in the payload is used to re-derive the key from the password:
            </p>
            <div className="about-steps">
              {DECODE_STEPS.map(({ num, title, desc }) => (
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

          {/* ── CIPHERTEXT LAYOUT ── */}
          <section style={{ marginBottom: "30px" }} id="layout">
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
              Encrypted Payload Layout
            </h2>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              The encrypted blob embedded into the image has this structure:
            </p>

            <div
              className="about-section"
              style={{ fontFamily: "monospace", fontSize: "13px" }}
            >
              <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                <div
                  style={{
                    padding: "10px 14px",
                    background: "rgba(88,166,255,0.12)",
                    border: "1px solid rgba(88,166,255,0.3)",
                    borderRadius: "6px",
                    color: "#58a6ff",
                    fontWeight: 600,
                  }}
                >
                  16 bytes
                  <br />
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 400,
                      color: "var(--text-muted)",
                    }}
                  >
                    Random salt
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "var(--text-muted)",
                  }}
                >
                  +
                </div>
                <div
                  style={{
                    padding: "10px 14px",
                    background: "rgba(63,185,80,0.10)",
                    border: "1px solid rgba(63,185,80,0.3)",
                    borderRadius: "6px",
                    color: "#3fb950",
                    fontWeight: 600,
                    flex: 1,
                  }}
                >
                  N bytes
                  <br />
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 400,
                      color: "var(--text-muted)",
                    }}
                  >
                    AES-256-CBC ciphertext
                  </span>
                </div>
              </div>
            </div>

            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
                marginTop: "14px",
              }}
            >
              The salt is not secret — it is stored alongside the ciphertext.
              Its purpose is to ensure two identical files encrypted with the
              same password produce completely different ciphertext, preventing
              pattern-based attacks.
            </p>
          </section>

          {/* ── PASSWORD TIPS ── */}
          <section style={{ marginBottom: "30px" }} id="password-tips">
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
              Password Strength
            </h2>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              The security of AES-256 in practice is only as strong as your
              password. PBKDF2 significantly raises the cost of brute-force
              attacks, but a short or common password can still be cracked with
              a dictionary attack.
            </p>
            <div className="about-limitations">
              {[
                {
                  icon: "✅",
                  title: "Use a long passphrase",
                  desc: 'A sentence like "correct-horse-battery-staple" is far stronger than a short complex password.',
                },
                {
                  icon: "✅",
                  title: "Avoid dictionary words",
                  desc: "Single words, even with substitutions (p@ssw0rd), are vulnerable to dictionary attacks.",
                },
                {
                  icon: "✅",
                  title: "Use a unique password",
                  desc: "Do not reuse passwords from other accounts. If one is leaked, your stego files remain safe.",
                },
                {
                  icon: "⚠️",
                  title: "No password recovery",
                  desc: "Stego.Image has no password recovery. If you forget your password, the hidden file cannot be retrieved.",
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
                  { href: "#what-is-aes", label: "What Is AES-256?" },
                  { href: "#encrypt", label: "Encryption Pipeline" },
                  { href: "#pbkdf2", label: "Why PBKDF2 Matters" },
                  { href: "#decrypt", label: "Decryption Pipeline" },
                  { href: "#layout", label: "Payload Layout" },
                  { href: "#password-tips", label: "Password Strength" },
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
              <div className="about-section-title">Encryption Summary</div>
              <div className="d-flex flex-column gap-2">
                {[
                  { label: "Algorithm", value: "AES-256-CBC" },
                  { label: "KDF", value: "PBKDF2-SHA256" },
                  { label: "Iterations", value: "100,000" },
                  { label: "Salt size", value: "16 bytes (random)" },
                  { label: "Library", value: "crypto-js" },
                  { label: "Runs in", value: "Browser only" },
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
                Encrypt and hide any file inside a PNG — free, client-side, no
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

export default Aes256Encryption;
