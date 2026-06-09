import { useNavigate } from "react-router-dom";
import { Helmet }      from "react-helmet-async";
import { useEffect, useRef, useState, useCallback } from "react";

/* ─── Typing animation ──────────────────────────────────────── */
function useTyping(phrases) {
  const [text, setText]     = useState("");
  const [idx,  setIdx]      = useState(0);
  const [del,  setDel]      = useState(false);
  useEffect(() => {
    const target = phrases[idx];
    let t;
    if (!del && text.length < target.length)
      t = setTimeout(() => setText(target.slice(0, text.length + 1)), 60);
    else if (!del && text.length === target.length)
      t = setTimeout(() => setDel(true), 2000);
    else if (del && text.length > 0)
      t = setTimeout(() => setText(text.slice(0, -1)), 30);
    else { setDel(false); setIdx(i => (i + 1) % phrases.length); }
    return () => clearTimeout(t);
  }, [text, del, idx, phrases]);
  return text;
}

/* ─── Pixel canvas ──────────────────────────────────────────── */
function PixelGrid() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx  = canvas.getContext("2d");
    const COLS = 20, ROWS = 10, CELL = 18, GAP = 3;
    canvas.width  = COLS * (CELL + GAP);
    canvas.height = ROWS * (CELL + GAP);
    const cells = Array.from({ length: COLS * ROWS }, () => ({
      base:  Math.random() > 0.5 ? 1 : 0,
      phase: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 0.8,
    }));
    let frame = 0, raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = frame * 0.016;
      cells.forEach((c, i) => {
        const col = i % COLS, row = Math.floor(i / COLS);
        const x = col * (CELL + GAP), y = row * (CELL + GAP);
        const osc = Math.sin(t * c.speed + c.phase) * 0.5 + 0.5;
        const lit = c.base ? osc > 0.35 : osc > 0.88;
        ctx.fillStyle   = lit ? `rgba(88,166,255,${0.1 + osc * 0.2})` : "rgba(22,27,34,0.9)";
        ctx.strokeStyle = lit ? "rgba(88,166,255,0.22)" : "rgba(48,54,61,0.4)";
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.roundRect(x, y, CELL, CELL, 2); ctx.fill(); ctx.stroke();
      });
      frame++; raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <canvas
      ref={ref}
      style={{ display: "block", borderRadius: 6, opacity: 0.75, maxWidth: "100%", height: "auto" }}
      aria-hidden="true"
    />
  );
}

/* ─── LSB interactive demo ───────────────────────────────────── */
function LsbDemo() {
  const [step, setStep] = useState(0);
  const bits     = [1, 0, 1, 1, 0, 0, 1, 0];
  const original = [202, 198, 210, 187, 204, 195, 178, 209];
  const modified = original.map((v, i) => (v & 254) | bits[i]);
  return (
    <div style={{ background: "#0d1117", border: "1px solid #30363d", borderRadius: 10, padding: "20px" }}>
      <p style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#8b949e", marginBottom: 14 }}>
        LSB demo — pixel channel values
      </p>
      <div className="lsb-grid">
        {original.map((v, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{
              height: 44, borderRadius: 6, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 11, fontWeight: 600,
              background: step === 0
                ? `rgba(88,166,255,${0.05 + (v / 255) * 0.15})`
                : `rgba(46,160,67,${0.05 + (modified[i] / 255) * 0.15})`,
              border: `1px solid ${step === 0 ? "rgba(88,166,255,0.2)" : "rgba(46,160,67,0.3)"}`,
              color: step === 0 ? "#58a6ff" : "#2ea043",
              transition: "all 0.4s",
            }}>
              {step === 0 ? v : modified[i]}
            </div>
            <div style={{ fontSize: 9, color: "#8b949e", marginTop: 4, fontFamily: "monospace", wordBreak: "break-all" }}>
              {(step === 0 ? v : modified[i]).toString(2).padStart(8, "0")}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
        <button onClick={() => setStep(s => 1 - s)} style={{
          background: step === 0 ? "#238636" : "#161b22",
          border: `1px solid ${step === 0 ? "#238636" : "#30363d"}`,
          color: "#fff", borderRadius: 6, padding: "7px 14px",
          fontSize: 12, cursor: "pointer", fontFamily: "inherit", transition: "all 0.25s",
        }}>
          {step === 0 ? "Embed secret bit →" : "← Show original"}
        </button>
        <span style={{ fontSize: 11, color: "#8b949e" }}>
          {step === 0 ? "Original pixel values" : "LSB changed — visually identical"}
        </span>
      </div>
    </div>
  );
}

/* ─── Data ───────────────────────────────────────────────────── */
const FEATURES = [
  { icon: "🔒", title: "AES-256 encryption",  desc: "PBKDF2-SHA256 key derivation — 100,000 iterations, random salt per session." },
  { icon: "🖼️", title: "LSB steganography",   desc: "Data hidden in the least significant bits of RGB channels. Invisible to the eye." },
  { icon: "📦", title: "GZIP compression",    desc: "Files compressed before embedding to maximise cover image capacity." },
  { icon: "🖥️", title: "100% client-side",   desc: "No servers, no uploads, no telemetry. Runs entirely in your browser." },
];
const STEPS = [
  { n: "01", label: "Upload cover image", note: "PNG or BMP only" },
  { n: "02", label: "Select secret file", note: "Any file type" },
  { n: "03", label: "Set password",       note: "Optional encryption" },
  { n: "04", label: "Download stego PNG", note: "Identical to original" },
];
const PIPELINE = [
  { icon: "📄", label: "Secret file", color: "#8b949e" },
  { icon: "📦", label: "GZIP",        color: "#58a6ff" },
  { icon: "🔐", label: "AES-256",     color: "#2ea043" },
  { icon: "🖼️", label: "LSB embed",   color: "#a371f7" },
  { icon: "✅", label: "Stego PNG",   color: "#58a6ff" },
];
const SEC_ROWS = [
  ["Key derivation",      "PBKDF2-SHA256", "#58a6ff"],
  ["Iterations",          "100,000",       "#58a6ff"],
  ["Encryption",          "AES-256",       "#58a6ff"],
  ["Compression",         "DEFLATE",       "#58a6ff"],
  ["Network requests",    "0",             "#2ea043"],
  ["Server-side storage", "None",          "#2ea043"],
];
const LEARN = [
  { to: "/learn/how-steganography-works",     label: "How steganography works" },
  { to: "/learn/lsb-steganography",           label: "LSB steganography" },
  { to: "/learn/aes256-encryption",           label: "AES-256 encryption" },
  { to: "/learn/steganography-vs-encryption", label: "Steganography vs encryption" },
  { to: "/learn/detect-hidden-data",          label: "Detect hidden data" },
  { to: "/learn/use-cases",                   label: "Use cases" },
];

/* ─── Hover helpers ──────────────────────────────────────────── */
const onCard  = e => { e.currentTarget.style.cssText += ";border-color:rgba(88,166,255,0.4);transform:translateY(-4px);box-shadow:0 8px 24px rgba(88,166,255,0.08)"; };
const offCard = e => { e.currentTarget.style.cssText += ";border-color:#30363d;transform:none;box-shadow:none"; };
const onLearn  = e => { e.currentTarget.style.cssText += ";border-color:#58a6ff;color:#58a6ff;transform:translateX(4px)"; };
const offLearn = e => { e.currentTarget.style.cssText += ";border-color:#30363d;color:#c9d1d9;transform:none"; };
const onPipe   = e => { e.currentTarget.style.transform = "scale(1.06)"; };
const offPipe  = e => { e.currentTarget.style.transform = "none"; };

/* ─── Component ──────────────────────────────────────────────── */
export default function Home() {
  const navigate = useNavigate();
  const typed    = useTyping(["Hide files in images.", "Encrypt. Compress. Embed.", "No servers. No traces."]);

  return (
    <div style={{ background: "#0d1117", color: "#e6edf3" }}>
      <Helmet>
        <title>Hide Files in Images — Stego.Image</title>
        <meta name="description" content="Free client-side steganography tool. Hide any file inside a PNG using AES-256 encryption and LSB steganography. No uploads, no servers." />
        <link rel="canonical" href="https://stegoimage.pages.dev/" />
      </Helmet>

      {/* ── CSS (scoped, media-query-driven) ───────────────── */}
      <style>{`
        .si-wrap    { max-width:960px; margin:0 auto; padding:0 24px; }
        .si-section { padding:64px 0; }
        .si-card    { background:#161b22; border:1px solid #30363d; border-radius:12px; }

        /* HERO */
        .si-hero {
          min-height:calc(100vh - 60px);
          display:flex; align-items:center;
          padding:64px 0;
          background:radial-gradient(ellipse 60% 50% at 65% 40%,rgba(88,166,255,0.06) 0%,transparent 70%) #0d1117;
        }
        .si-hero-row { display:flex; gap:48px; align-items:center; }
        .si-hero-text { flex:1 1 300px; }
        .si-hero-canvas { flex:0 0 auto; display:flex; justify-content:center; }

        /* LAYERS strip */
        .si-layers { display:flex; align-items:center; gap:24px; }
        .si-layer-item { display:flex; align-items:flex-start; gap:14px; flex:1; min-width:0; }

        /* FEATURES grid */
        .si-feat-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }

        /* STEPS grid */
        .si-steps-grid { display:grid; grid-template-columns:repeat(4,1fr); overflow:hidden; }
        .si-step { display:flex; align-items:center; padding:24px 18px; gap:12px; border-right:1px solid #30363d; }
        .si-step:last-child { border-right:none; }
        .si-step-mob-border { border-bottom:none; }

        /* PIPELINE */
        .si-pipe-row { display:flex; align-items:center; justify-content:center; flex-wrap:wrap; }
        .si-pipe-box { text-align:center; min-width:82px; transition:transform 0.2s; cursor:default; }
        .si-pipe-vertical { display:none; }

        /* SECURITY */
        .si-sec-inner { display:flex; gap:40px; align-items:center; }
        .si-sec-table { flex:1 1 220px; }

        /* LEARN grid */
        .si-learn-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; }

        /* LSB grid */
        .lsb-grid { display:grid; grid-template-columns:repeat(8,1fr); gap:6px; }

        /* ── Tablet ≤ 900px ── */
        @media (max-width:900px) {
          .si-hero-row   { flex-direction:column; gap:36px; }
          .si-hero-canvas { width:100%; }
          .si-layers     { flex-direction:column; align-items:stretch; gap:20px; }
          .si-layer-sep  { display:none; }
          .si-feat-grid  { grid-template-columns:repeat(2,1fr); }
          .si-steps-grid { grid-template-columns:repeat(2,1fr); }
          .si-step       { border-right:none; border-bottom:1px solid #30363d; }
          .si-step:nth-child(odd)  { border-right:1px solid #30363d; }
          .si-step:nth-last-child(-n+2) { border-bottom:none; }
          .si-sec-inner  { flex-direction:column; gap:28px; }
          .si-sec-table  { flex:none; width:100%; }
          .si-learn-grid { grid-template-columns:1fr; }
          .lsb-grid      { grid-template-columns:repeat(4,1fr); }
        }

        /* ── Mobile ≤ 600px ── */
        @media (max-width:600px) {
          .si-wrap    { padding:0 16px; }
          .si-section { padding:48px 0; }
          .si-hero    { padding:48px 0; min-height:unset; }
          .si-hero-canvas { display:none; }
          .si-feat-grid  { grid-template-columns:repeat(2,1fr); gap:10px; }
          .si-steps-grid { grid-template-columns:repeat(2,1fr); }
          .si-pipe-row   { display:none; }
          .si-pipe-vertical { display:flex; flex-direction:column; gap:8px; }
          .lsb-grid { grid-template-columns:repeat(4,1fr); }
        }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .si-cursor { animation:blink 0.9s step-end infinite; color:#58a6ff; }

        .si-btn-learn {
          background:#161b22; border:1px solid #30363d; border-radius:10px;
          padding:14px 18px; display:flex; align-items:center;
          justify-content:space-between; color:#c9d1d9; font-size:13px;
          cursor:pointer; text-align:left; font-family:inherit; width:100%;
          transition:border-color 0.2s, color 0.2s, transform 0.2s;
        }
        .si-sec-bullet { font-size:13px; color:#c9d1d9; padding-left:18px; position:relative; line-height:1.5; margin-bottom:9px; }
        .si-sec-bullet::before { content:"→"; position:absolute; left:0; color:#58a6ff; font-size:11px; }
        .si-sec-bullet:last-child { margin-bottom:0; }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="si-hero">
        <div className="si-wrap">
          <div className="si-hero-row">

            <div className="si-hero-text">
              <p style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#8b949e", marginBottom: 14 }}>
                Client-side steganography
              </p>
              <h1 style={{ fontSize: "clamp(26px,5vw,48px)", fontWeight: 700, lineHeight: 1.2, marginBottom: 18, minHeight: "1.3em" }}>
                <span style={{ color: "#58a6ff" }}>{typed}</span>
                <span className="si-cursor" aria-hidden="true">|</span>
              </h1>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#8b949e", marginBottom: 28, maxWidth: 480 }}>
                Embed any file inside a PNG using LSB steganography and optional AES-256
                encryption — entirely in your browser. Nothing ever leaves your device.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                <button className="primary-btn" onClick={() => navigate("/encode")}>Start encoding</button>
                <button className="secondary-btn" onClick={() => navigate("/decode")}>Extract file</button>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[["Zero network requests", "#2ea043"], ["Open source", "#58a6ff"], ["Free forever", "#2ea043"]].map(([t, c]) => (
                  <span key={t} style={{
                    display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11,
                    color: "#8b949e", background: "#161b22", border: "1px solid #30363d",
                    borderRadius: 20, padding: "3px 10px",
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: c, boxShadow: `0 0 4px ${c}`, flexShrink: 0 }} />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="si-hero-canvas">
              <div className="si-card" style={{ padding: 18, display: "inline-flex", flexDirection: "column", gap: 10, maxWidth: "100%" }}>
                <span style={{ fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: "#8b949e" }}>pixel data</span>
                <PixelGrid />
                <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                  {["🔒 AES-256", "👁️ Invisible"].map(b => (
                    <span key={b} style={{ fontSize: 10, color: "#58a6ff", background: "rgba(88,166,255,0.08)", border: "1px solid rgba(88,166,255,0.2)", borderRadius: 5, padding: "2px 8px" }}>{b}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TWO LAYERS ────────────────────────────────────── */}
      <section style={{ padding: "0 0 64px" }}>
        <div className="si-wrap">
          <div className="si-card si-layers" style={{ padding: "32px 28px" }}>
            {[
              { n: "01", c: "#58a6ff", title: "Steganography",    desc: "Hides the existence of the data inside ordinary pixel values." },
              { sep: "+" },
              { n: "02", c: "#2ea043", title: "Encryption",       desc: "Protects the data itself — unreadable even if extracted." },
              { sep: "=" },
              { n: "✓",  c: "#a371f7", title: "Two-layer security", desc: "Attackers must find the data, then break the cipher." },
            ].map((item, i) =>
              item.sep ? (
                <div key={i} className="si-layer-sep" style={{ fontSize: 24, fontWeight: 300, color: "#30363d", flexShrink: 0 }}>{item.sep}</div>
              ) : (
                <div key={i} className="si-layer-item">
                  <div style={{ fontSize: 26, fontWeight: 700, color: item.c, lineHeight: 1, flexShrink: 0, minWidth: 32 }}>{item.n}</div>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 600, color: "#e6edf3", marginBottom: 3 }}>{item.title}</p>
                    <p style={{ fontSize: 12, color: "#8b949e", lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────── */}
      <section className="si-section">
        <div className="si-wrap">
          <h2 style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 700, color: "#e6edf3", textAlign: "center", marginBottom: 32, letterSpacing: -0.3 }}>
            What's under the hood
          </h2>
          <div className="si-feat-grid">
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} className="si-card"
                style={{ padding: "22px 18px", transition: "border-color 0.25s,transform 0.25s,box-shadow 0.25s", cursor: "default" }}
                onMouseEnter={onCard} onMouseLeave={offCard}
              >
                <span style={{ fontSize: 24, display: "block", marginBottom: 10 }}>{icon}</span>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#e6edf3", marginBottom: 6 }}>{title}</p>
                <p style={{ fontSize: 12, color: "#8b949e", lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO USE ────────────────────────────────────── */}
      <section className="si-section">
        <div className="si-wrap">
          <h2 style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 700, color: "#e6edf3", textAlign: "center", marginBottom: 32, letterSpacing: -0.3 }}>
            How to use it
          </h2>
          <div className="si-card si-steps-grid" style={{ marginBottom: 28 }}>
            {STEPS.map(({ n, label, note }) => (
              <div key={n} className="si-step">
                <div style={{ fontSize: 22, fontWeight: 700, color: "#58a6ff", opacity: 0.4, flexShrink: 0, lineHeight: 1 }}>{n}</div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#e6edf3", marginBottom: 2, lineHeight: 1.3 }}>{label}</p>
                  <p style={{ fontSize: 10, color: "#8b949e", margin: 0 }}>{note}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="primary-btn" onClick={() => navigate("/encode")}>Try it now</button>
            <button className="secondary-btn" onClick={() => navigate("/about")}>Technical details</button>
          </div>
        </div>
      </section>

      {/* ── LSB DEMO ──────────────────────────────────────── */}
      <section className="si-section">
        <div className="si-wrap">
          <h2 style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 700, color: "#e6edf3", textAlign: "center", marginBottom: 32, letterSpacing: -0.3 }}>
            See how LSB works
          </h2>
          <LsbDemo />
          <p style={{ textAlign: "center", fontSize: 12, color: "#8b949e", marginTop: 12 }}>
            Only the last bit of each byte changes. The visual difference is zero.
          </p>
        </div>
      </section>

      {/* ── PIPELINE ──────────────────────────────────────── */}
      <section className="si-section">
        <div className="si-wrap">
          <h2 style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 700, color: "#e6edf3", textAlign: "center", marginBottom: 32, letterSpacing: -0.3 }}>
            Encode pipeline
          </h2>

          {/* Horizontal (tablet+desktop) */}
          <div className="si-pipe-row">
            {PIPELINE.map(({ icon, label, color }, i) => (
              <div key={label} style={{ display: "flex", alignItems: "center" }}>
                {i > 0 && <div style={{ fontSize: 16, color: "#30363d", padding: "0 8px" }}>→</div>}
                <div className="si-card si-pipe-box"
                  style={{ padding: "14px 14px", borderColor: color + "33" }}
                  onMouseEnter={onPipe} onMouseLeave={offPipe}
                >
                  <span style={{ display: "block", fontSize: 22, marginBottom: 6 }}>{icon}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", color }}>{label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Vertical (mobile only) */}
          <div className="si-pipe-vertical">
            {PIPELINE.map(({ icon, label, color }, i) => (
              <div key={label}>
                <div className="si-card" style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderColor: color + "33" }}>
                  <span style={{ fontSize: 22 }}>{icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color }}>{label}</span>
                  {i < PIPELINE.length - 1 && <span style={{ marginLeft: "auto", color: "#30363d" }}>↓</span>}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECURITY ──────────────────────────────────────── */}
      <section className="si-section">
        <div className="si-wrap">
          <div className="si-card" style={{ padding: "36px 28px" }}>
            <div className="si-sec-inner">
              <div style={{ flex: "1 1 280px" }}>
                <h2 style={{ fontSize: "clamp(18px,2.5vw,24px)", fontWeight: 700, color: "#e6edf3", marginBottom: 14 }}>
                  Privacy by architecture
                </h2>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "#8b949e", marginBottom: 18 }}>
                  There is no backend. Every byte stays in your browser — never serialised,
                  transmitted, or logged. Inspect network traffic while encoding: request count stays at zero.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {["PBKDF2-SHA256, 100,000 iterations, random salt", "Output PNG carries no hidden metadata or fingerprint", "Cloudflare Pages — no origin server to subpoena", "MIT licensed — read every line on GitHub"].map(item => (
                    <li key={item} className="si-sec-bullet">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="si-sec-table" style={{ border: "1px solid #30363d", borderRadius: 10, overflow: "hidden" }}>
                {SEC_ROWS.map(([k, v, c], i) => (
                  <div key={k} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "13px 18px", gap: 16,
                    background: i % 2 === 0 ? "#0d1117" : "#111720",
                    borderBottom: i < SEC_ROWS.length - 1 ? "1px solid #21262d" : "none",
                  }}>
                    <span style={{ fontSize: 13, color: "#8b949e", fontWeight: 400 }}>{k}</span>
                    <span style={{
                      fontSize: 13, fontWeight: 700, color: c,
                      background: c === "#2ea043" ? "rgba(46,160,67,0.1)" : "rgba(88,166,255,0.08)",
                      border: `1px solid ${c === "#2ea043" ? "rgba(46,160,67,0.25)" : "rgba(88,166,255,0.2)"}`,
                      borderRadius: 5, padding: "2px 9px", letterSpacing: 0.3,
                    }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEARN ─────────────────────────────────────────── */}
      <section className="si-section">
        <div className="si-wrap">
          <h2 style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 700, color: "#e6edf3", textAlign: "center", marginBottom: 32, letterSpacing: -0.3 }}>
            Learn the concepts
          </h2>
          <div className="si-learn-grid">
            {LEARN.map(({ to, label }) => (
              <button key={to} className="si-btn-learn" onClick={() => navigate(to)}
                onMouseEnter={onLearn} onMouseLeave={offLearn}
              >
                <span>{label}</span>
                <span style={{ opacity: 0.4, flexShrink: 0, marginLeft: 8 }}>→</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="si-section">
        <div className="si-wrap">
          <div className="si-card" style={{ textAlign: "center", padding: "56px 24px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)", width: 300, height: 150, background: "radial-gradient(circle,rgba(88,166,255,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />
            <h2 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: 700, color: "#e6edf3", marginBottom: 8 }}>
              Ready to hide something?
            </h2>
            <p style={{ fontSize: 15, color: "#8b949e", marginBottom: 28 }}>
              Your files. Your browser. Your control.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="primary-btn" onClick={() => navigate("/encode")}>Start encoding</button>
              <button className="secondary-btn" onClick={() => navigate("/decode")}>Extract a file</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}