import { Helmet } from "react-helmet-async";
import { useState } from "react";

/* ─── Data ───────────────────────────────────────────────────── */
const ENCODE_STEPS = [
  { icon: "📂", title: "Select inputs",           desc: "Upload a lossless cover image (PNG or BMP) and the secret file you want to hide." },
  { icon: "📦", title: "GZIP compress",           desc: "The secret file is compressed with DEFLATE (via pako) to reduce the pixel space needed." },
  { icon: "🔐", title: "AES-256 encrypt",         desc: "If a password is provided, the compressed data is encrypted with AES-256. The encrypted flag in the header is set so the decoder knows to decrypt." },
  { icon: "🧩", title: "Embed with LSB",          desc: "A binary stream — [4B meta length][JSON header][payload] — is written into the least significant bits of the R, G, and B channels of every fully opaque pixel." },
  { icon: "💾", title: "Export PNG",              desc: "The canvas is exported as a lossless PNG. The output is visually identical to the original." },
];

const DECODE_STEPS = [
  { icon: "🖼️", title: "Upload stego image",     desc: "Upload the stego PNG. The image must not have been re-compressed by a lossy platform." },
  { icon: "🔍", title: "Read LSBs",              desc: "The decoder reads the LSB of each RGB channel from every fully opaque pixel to reconstruct the bit stream." },
  { icon: "📋", title: "Parse metadata",         desc: "The first 4 bytes give the metadata length. The decoder parses the JSON header to learn the filename, type, size, and encryption state." },
  { icon: "🔓", title: "Decrypt",               desc: "If metadata.encrypted is true, AES-256 decryption is applied using the provided password. The UI toggle does not override this flag." },
  { icon: "📤", title: "Decompress & validate", desc: "The payload is decompressed and its byte length is checked against metadata.size. A mismatch means a wrong password or corrupted file." },
];

const TECH_STACK = [
  { name: "React 19",         role: "UI framework",                  pkg: "react" },
  { name: "Vite",             role: "Build tool & dev server",       pkg: "vite" },
  { name: "crypto-js",        role: "AES-256 encryption/decryption", pkg: "crypto-js" },
  { name: "pako",             role: "DEFLATE compression",           pkg: "pako" },
  { name: "file-saver",       role: "Browser file downloads",        pkg: "file-saver" },
  { name: "jszip",            role: "ZIP export for safe sharing",   pkg: "jszip" },
  { name: "Bootstrap 5",      role: "Responsive layout utilities",   pkg: "bootstrap" },
  { name: "react-dropzone",   role: "Drag-and-drop upload zones",    pkg: "react-dropzone" },
  { name: "react-router-dom", role: "Client-side routing",           pkg: "react-router-dom" },
  { name: "HTML5 Canvas",     role: "Direct pixel read/write",       pkg: "(browser built-in)" },
];

const LIMITATIONS = [
  { icon: "🚫", title: "No JPEG support",             desc: "JPEG lossy compression rewrites pixel values, destroying LSB data. Always use PNG or BMP." },
  { icon: "📏", title: "Capacity bound",              desc: "Capacity = ⌊(opaque pixels × 3) / 8⌋ bytes. A 1920×1080 PNG holds ~760 KB of payload after overhead." },
  { icon: "📱", title: "Social platform re-encoding", desc: "WhatsApp, Instagram, and Telegram re-encode images on upload. Use the ZIP download and share the archive instead." },
  { icon: "🔑", title: "Password non-recoverable",    desc: "There is no reset mechanism. A lost password means the hidden data is permanently inaccessible." },
  { icon: "👁️", title: "Unencrypted metadata",       desc: "The JSON header (filename, MIME, size) is stored unencrypted. Someone who knows to look can read these fields without the password." },
];

const FAQ = [
  { q: "Why can't I share the PNG directly on WhatsApp?", a: "WhatsApp re-encodes all images with lossy compression, overwriting the LSBs. Use \"Download ZIP\" — the receiver extracts the PNG and decodes it locally." },
  { q: "Does the encryption toggle on the Decode page matter?", a: "Partially. The metadata header stores an encrypted flag that drives decryption. The UI toggle only controls whether the password field is visible — you still need the correct password when the flag is true." },
  { q: "What happens if I enter the wrong password?", a: "Decryption produces garbage bytes. The decoder checks the decompressed length against metadata.size and throws an error if they don't match." },
  { q: "Can I hide a file without encryption?", a: "Yes. Turn the encryption toggle OFF before encoding. The payload is still compressed, but no password is required and anyone with the image can decode it." },
  { q: "What file types can I hide?", a: "Any binary file — PDFs, ZIPs, images, videos, code files, etc. The only constraint is that the compressed file fits within the image's pixel capacity." },
  { q: "Does any data leave my browser?", a: "No. All compression, encryption, and steganography runs entirely in JavaScript. No server receives your files or passwords." },
];

/* ─── FAQ accordion item ─────────────────────────────────────── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: open ? "#1a2030" : "#161b22",
      border: `1px solid ${open ? "rgba(88,166,255,0.3)" : "#30363d"}`,
      borderRadius: 10, overflow: "hidden",
      transition: "border-color 0.25s, background 0.25s",
    }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 16, padding: "16px 20px", background: "transparent", border: "none",
        color: "#e6edf3", fontSize: 14, fontWeight: 600, cursor: "pointer",
        fontFamily: "inherit", textAlign: "left",
      }}>
        <span>{q}</span>
        <span style={{
          color: "#58a6ff", fontSize: 18, flexShrink: 0, lineHeight: 1,
          transform: open ? "rotate(45deg)" : "none", transition: "transform 0.25s",
        }}>+</span>
      </button>
      {open && (
        <div style={{ padding: "0 20px 16px", fontSize: 14, color: "#8b949e", lineHeight: 1.75 }}>
          {a}
        </div>
      )}
    </div>
  );
}

/* ─── Pipeline step card ─────────────────────────────────────── */
function StepCard({ icon, title, desc, index, total }) {
  return (
    <div style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
      {/* connector column */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 16, flexShrink: 0 }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%", background: "#161b22",
          border: "1px solid #30363d", display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 16, flexShrink: 0,
        }}>{icon}</div>
        {index < total - 1 && (
          <div style={{ width: 1, flex: 1, background: "#30363d", minHeight: 20, margin: "4px 0" }} />
        )}
      </div>
      {/* content */}
      <div style={{ paddingBottom: index < total - 1 ? 24 : 0, flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, color: "#58a6ff",
            background: "rgba(88,166,255,0.1)", border: "1px solid rgba(88,166,255,0.2)",
            borderRadius: 4, padding: "1px 7px",
          }}>{String(index + 1).padStart(2, "0")}</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#e6edf3" }}>{title}</span>
        </div>
        <p style={{ fontSize: 13, color: "#8b949e", lineHeight: 1.7, margin: 0 }}>{desc}</p>
      </div>
    </div>
  );
}

/* ─── Section wrapper ────────────────────────────────────────── */
function Section({ title, children }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{
        fontSize: "clamp(16px,2.5vw,20px)", fontWeight: 700,
        color: "#e6edf3", marginBottom: 20, paddingBottom: 12,
        borderBottom: "1px solid #30363d", letterSpacing: -0.2,
      }}>{title}</h2>
      {children}
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function About() {
  return (
    <div style={{ background: "#0d1117", color: "#e6edf3" }}>
      <Helmet>
        <title>About Stego.Image — Free Client-Side Steganography Tool</title>
        <meta name="description" content="Learn about Stego.Image — an open-source, client-side steganography tool built with React, AES-256 encryption, and LSB pixel encoding." />
        <link rel="canonical" href="https://stegoimage.pages.dev/about" />
      </Helmet>

      <style>{`
        .ab-wrap { max-width:860px; margin:0 auto; padding:64px 24px; }
        .ab-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .ab-tech-table { width:100%; border-collapse:collapse; }
        .ab-tech-table th { font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:#8b949e; padding:10px 14px; text-align:left; border-bottom:1px solid #30363d; }
        .ab-tech-table td { font-size:13px; color:#c9d1d9; padding:11px 14px; border-bottom:1px solid #21262d; vertical-align:top; }
        .ab-tech-table tr:last-child td { border-bottom:none; }
        .ab-tech-table tr:nth-child(even) td { background:#111720; }
        .ab-tech-table code { font-size:12px; color:#58a6ff; background:rgba(88,166,255,0.08); border:1px solid rgba(88,166,255,0.15); border-radius:4px; padding:1px 6px; font-family:monospace; }
        @media (max-width:640px) {
          .ab-wrap { padding:40px 16px; }
          .ab-grid-2 { grid-template-columns:1fr; }
          .ab-tech-table th:last-child, .ab-tech-table td:last-child { display:none; }
        }
      `}</style>

      <div className="ab-wrap">

        {/* ── HERO ─────────────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#8b949e", marginBottom: 12 }}>
            Open source · MIT licensed
          </p>
          <h1 style={{ fontSize: "clamp(26px,5vw,42px)", fontWeight: 700, marginBottom: 16, letterSpacing: -0.5 }}>
            About Stego.Image
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "#8b949e", maxWidth: 600, margin: "0 auto" }}>
            A browser-based tool to hide and extract files inside images using
            steganography and optional AES-256 encryption — 100% client-side,
            zero server communication.
          </p>
        </div>

        {/* ── WHAT IT DOES ─────────────────────────────────── */}
        <Section title="What It Does">
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
            {[
              { n: "01", c: "#58a6ff", title: "Steganography", desc: "Hides the existence of data by writing it into the least significant bits of pixel RGB channels. Output is visually indistinguishable from the original." },
              { n: "02", c: "#2ea043", title: "Encryption",    desc: "Protects the data with AES-256 so that even if someone finds the hidden data, they cannot read it without the password." },
            ].map(({ n, c, title, desc }) => (
              <div key={n} style={{
                flex: "1 1 260px", background: "#161b22", border: `1px solid ${c}22`,
                borderRadius: 12, padding: "20px 20px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 20, fontWeight: 700, color: c, lineHeight: 1 }}>{n}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#e6edf3" }}>{title}</span>
                </div>
                <p style={{ fontSize: 13, color: "#8b949e", lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: 10, padding: "14px 18px" }}>
            <p style={{ fontSize: 13, color: "#8b949e", lineHeight: 1.75, margin: 0 }}>
              All processing runs locally in your browser. No files, passwords, or image data
              are ever transmitted to a server.
            </p>
          </div>
        </Section>

        {/* ── ENCODE PIPELINE ──────────────────────────────── */}
        <Section title="Encode Pipeline">
          <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: 12, padding: "24px 20px" }}>
            {ENCODE_STEPS.map((step, i) => (
              <StepCard key={step.title} {...step} index={i} total={ENCODE_STEPS.length} />
            ))}
          </div>
        </Section>

        {/* ── DECODE PIPELINE ──────────────────────────────── */}
        <Section title="Decode Pipeline">
          <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: 12, padding: "24px 20px" }}>
            {DECODE_STEPS.map((step, i) => (
              <StepCard key={step.title} {...step} index={i} total={DECODE_STEPS.length} />
            ))}
          </div>
        </Section>

        {/* ── TECH STACK ───────────────────────────────────── */}
        <Section title="Tech Stack">
          <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: 12, overflow: "hidden" }}>
            <table className="ab-tech-table">
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
                    <td style={{ fontWeight: 600, color: "#e6edf3" }}>{name}</td>
                    <td>{role}</td>
                    <td><code>{pkg}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── LIMITATIONS ──────────────────────────────────── */}
        <Section title="Limitations">
          <div className="ab-grid-2">
            {LIMITATIONS.map(({ icon, title, desc }) => (
              <div key={title} style={{
                background: "#161b22", border: "1px solid #30363d",
                borderRadius: 10, padding: "16px 18px",
                display: "flex", gap: 14, alignItems: "flex-start",
              }}>
                <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#e6edf3", marginBottom: 5 }}>{title}</p>
                  <p style={{ fontSize: 12, color: "#8b949e", lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <Section title="FAQ">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQ.map(item => <FaqItem key={item.q} {...item} />)}
          </div>
        </Section>

      </div>
    </div>
  );
}