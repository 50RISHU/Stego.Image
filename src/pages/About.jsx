import { Helmet } from "react-helmet-async";

/**
 * About.jsx — Stego.Image project overview page.
 *
 * Sections:
 *  1. Hero
 *  2. What It Does       — dual-layer security overview
 *  3. How It Works       — full encode/decode pipeline with step cards
 *  4. STEGO_V1 Metadata  — documents the binary header format
 *  5. Tech Stack         — libraries with versions
 *  6. Supported Formats  — file type guidance
 *  7. Limitations        — known constraints
 *  8. FAQ                — common user questions
 */

// ─── Static data ────────────────────────────────────────────────────────────

const ENCODE_STEPS = [
  {
    icon: "📂",
    title: "Select Inputs",
    desc: "Upload a lossless cover image (PNG or BMP) and the secret file you want to hide.",
  },
  {
    icon: "📦",
    title: "GZIP Compress",
    desc: "The secret file is compressed with GZIP (via pako) to reduce the amount of pixel space needed.",
  },
  {
    icon: "🔐",
    title: "AES-256 Encrypt (optional)",
    desc: "If a password is provided, the compressed data is encrypted with AES-256. The encrypted flag in the header is set to true so the decoder knows to decrypt.",
  },
  {
    icon: "🧩",
    title: "Embed with LSB",
    desc: "A binary stream — [4B meta length][JSON header][payload] — is converted to bits and written into the least significant bits of the R, G, and B channels of every fully opaque pixel.",
  },
  {
    icon: "💾",
    title: "Export PNG",
    desc: "The canvas is exported as a lossless PNG. The output image is visually identical to the original.",
  },
];

const DECODE_STEPS = [
  {
    icon: "🖼️",
    title: "Upload Stego Image",
    desc: "Upload the stego PNG. The image must not have been re-compressed (e.g. by WhatsApp or Instagram).",
  },
  {
    icon: "🔍",
    title: "Read LSBs",
    desc: "The decoder reads the LSB of each RGB channel from every fully opaque pixel to reconstruct the original bit stream.",
  },
  {
    icon: "📋",
    title: "Parse Metadata",
    desc: "The first 4 bytes give the metadata length. The decoder then parses the STEGO_V1 JSON header to learn the original filename, type, size, and whether encryption was used.",
  },
  {
    icon: "🔓",
    title: "Decrypt (if encrypted)",
    desc: "If metadata.encrypted is true, AES-256 decryption is applied using the provided password. The toggle on the decode page does not override this flag.",
  },
  {
    icon: "📤",
    title: "Decompress & Validate",
    desc: "The payload is GZIP-decompressed and its byte length is compared against metadata.size. A mismatch indicates a wrong password or corrupted file.",
  },
];

const TECH_STACK = [
  { name: "React 19", role: "UI framework", pkg: "react" },
  { name: "Vite", role: "Build tool & dev server", pkg: "vite" },
  {
    name: "crypto-js",
    role: "AES-256 encryption / decryption",
    pkg: "crypto-js",
  },
  { name: "pako", role: "GZIP compression (deflate/inflate)", pkg: "pako" },
  {
    name: "file-saver",
    role: "Trigger browser file downloads",
    pkg: "file-saver",
  },
  { name: "jszip", role: "Wrap PNG in a ZIP for safe sharing", pkg: "jszip" },
  {
    name: "Bootstrap 5",
    role: "Responsive layout & utilities",
    pkg: "bootstrap",
  },
  {
    name: "react-dropzone",
    role: "Drag-and-drop file upload zones",
    pkg: "react-dropzone",
  },
  {
    name: "react-router-dom",
    role: "Client-side page routing",
    pkg: "react-router-dom",
  },
  {
    name: "HTML5 Canvas",
    role: "Direct pixel read / write",
    pkg: "(browser built-in)",
  },
];

const LIMITATIONS = [
  {
    icon: "🚫",
    title: "No JPEG",
    desc: "JPEG uses lossy compression that rewrites pixel values. Even a single altered LSB destroys the hidden data. Always use PNG or BMP.",
  },
  {
    icon: "📏",
    title: "Capacity Bound",
    desc: "Capacity = ⌊(opaque pixels × 3) / 8⌋ bytes. A 1920×1080 fully opaque PNG holds ~760 KB of payload after compression and encryption overhead.",
  },
  {
    icon: "📱",
    title: "Social Platform Re-compression",
    desc: "WhatsApp, Instagram, Telegram, and similar platforms re-encode images on upload. Use the ZIP download option and share the archive instead.",
  },
  {
    icon: "🔑",
    title: "Password is Non-recoverable",
    desc: "There is no password reset or recovery mechanism. A lost password means the hidden data is permanently inaccessible.",
  },
  {
    icon: "👁️",
    title: "Metadata Visibility",
    desc: "The JSON metadata header (filename, MIME type, size) is stored unencrypted. An attacker who knows to look for STEGO_V1 can read these fields even without the password.",
  },
];

const FAQ = [
  {
    q: "Why can't I share the PNG directly on WhatsApp?",
    a: 'WhatsApp re-encodes all images with lossy compression before delivery. This overwrites the LSBs that carry your hidden data. Use the "Download ZIP" option — the receiver extracts the PNG from the ZIP and decodes it locally.',
  },
  {
    q: "Does the encryption toggle on the Decode page matter?",
    a: "Partially. The metadata header stores an encrypted flag that tells the decoder whether to decrypt. However, the UI toggle controls whether the password field is shown — you still need to provide the correct password when the flag is true. Mismatching the toggle causes a failed extraction.",
  },
  {
    q: "What happens if I enter the wrong password?",
    a: 'Decryption will produce garbage bytes. The decoder then checks the decompressed length against metadata.size and throws "Wrong password or corrupted file" if they don\'t match.',
  },
  {
    q: "Can I hide a file without encryption?",
    a: "Yes. Turn the encryption toggle OFF before encoding. The payload is still GZIP-compressed, but no password is required to extract it. Anyone with the image can decode it.",
  },
  {
    q: "What file types can I hide?",
    a: "Any binary file — PDFs, ZIPs, images, videos, code files, etc. The only constraint is size: the file (after GZIP compression) must fit within the image's capacity.",
  },
  {
    q: "Does any data leave my browser?",
    a: "No. All compression, encryption, and steganography runs entirely in JavaScript inside your browser. No server receives your files or passwords.",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function Section({ title, children }) {
  return (
    <section className="about-section mb-5">
      <h3 className="about-section-title">{title}</h3>
      {children}
    </section>
  );
}

function StepCard({ icon, title, desc, index }) {
  return (
    <div className="about-step-card">
      <div className="about-step-number">{index + 1}</div>
      <div className="about-step-icon">{icon}</div>
      <div>
        <strong className="about-step-title">{title}</strong>
        <p className="about-step-desc mb-0">{desc}</p>
      </div>
    </div>
  );
}

function FaqItem({ q, a }) {
  return (
    <div className="about-faq-item">
      <p className="about-faq-q">Q: {q}</p>
      <p className="about-faq-a mb-0">A: {a}</p>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <div className="about-container container py-5">
      {/* HELMET */}
      <Helmet>
        <title>About — Stego.Image</title>
        <meta
          name="description"
          content="Learn about Stego.Image — an open-source, client-side steganography tool built with React, AES-256 encryption, and LSB pixel encoding."
        />
        <link rel="canonical" href="https://stegoimage.pages.dev/about" />
      </Helmet>

      {/* ── Hero ── */}
      <div className="text-center text-white mb-5">
        <h1 className="mb-3">About Stego.Image</h1>
        <p className="about-subtext">
          A browser-based tool to hide and extract files inside images using
          steganography and optional AES-256 encryption — 100% client-side, zero
          server communication.
        </p>
      </div>

      {/* ── What It Does ── */}
      <Section title="What It Does">
        <p>
          Stego.Image combines <strong>steganography</strong> and{" "}
          <strong>encryption</strong> to hide files inside ordinary images using
          two independent layers of security:
        </p>
        <ul className="about-list">
          <li>
            <strong>Layer 1 — Steganography:</strong> hides the existence of the
            data by writing it into the least significant bits of pixel RGB
            channels. The output image is visually indistinguishable from the
            original.
          </li>
          <li>
            <strong>Layer 2 — Encryption (optional):</strong> protects the data
            itself with AES-256 so that even if someone knows to look for hidden
            data, they cannot read it without the password.
          </li>
        </ul>
        <p>
          All processing runs locally in your browser. No files, passwords, or
          image data are ever transmitted to a server.
        </p>
      </Section>

      {/* ── Encode Pipeline ── */}
      <Section title="Encode Pipeline">
        <div className="about-steps">
          {ENCODE_STEPS.map((step, i) => (
            <StepCard key={step.title} {...step} index={i} />
          ))}
        </div>
      </Section>

      {/* ── Decode Pipeline ── */}
      <Section title="Decode Pipeline">
        <div className="about-steps">
          {DECODE_STEPS.map((step, i) => (
            <StepCard key={step.title} {...step} index={i} />
          ))}
        </div>
      </Section>

      {/* ── Tech Stack ── */}
      <Section title="Tech Stack">
        <div className="about-table-wrapper">
          <table className="about-meta-table">
            <thead>
              <tr>
                <th>Library</th>
                <th>Role</th>
                <th>Package</th>
              </tr>
            </thead>
            <tbody>
              {TECH_STACK.map(({ name, role, pkg }) => (
                <tr key={name}>
                  <td>
                    <strong>{name}</strong>
                  </td>
                  <td>{role}</td>
                  <td>
                    <code>{pkg}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── Limitations ── */}
      <Section title="Limitations">
        <div className="about-limitations">
          {LIMITATIONS.map(({ icon, title, desc }) => (
            <div key={title} className="about-limitation-item">
              <span className="about-limitation-icon">{icon}</span>
              <div>
                <strong>{title}</strong>
                <p className="mb-0 about-step-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── FAQ ── */}
      <Section title="FAQ">
        {FAQ.map((item) => (
          <FaqItem key={item.q} {...item} />
        ))}
      </Section>
    </div>
  );
}

export default About;
