import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

/** Feature cards data — update here without touching JSX. */
const FEATURES = [
  {
    title: "Encryption",
    desc: "Protect data using AES-based password encryption before embedding.",
  },
  {
    title: "Steganography",
    desc: "Embed binary data into image pixels using the least significant bit method.",
  },
  {
    title: "Client-Side Processing",
    desc: "All operations run in the browser — no data is ever sent to a server.",
  },
  {
    title: "Multi File Support",
    desc: "Support for any file type through compression and packaging.",
  },
];

/** Workflow steps shown in the "How It Works" section. */
const STEPS = [
  {
    num: 1,
    title: "Upload",
    desc: "Select a cover image and the secret file to hide.",
  },
  {
    num: 2,
    title: "Encrypt",
    desc: "Data is encrypted with your chosen password.",
  },
  {
    num: 3,
    title: "Embed",
    desc: "Encrypted data is hidden in the image pixels.",
  },
  {
    num: 4,
    title: "Download",
    desc: "Download and share the stego image securely.",
  },
];

/**
 * Home — landing page with hero, features, workflow, security info, and CTA.
 */
function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* HELMET */}
      <Helmet>
        <title>Hide Files in Images — Stego.Image</title>
        <meta
          name="description"
          content="Free client-side steganography tool. Hide any file inside a PNG using AES-256 encryption and LSB steganography. No uploads, no servers."
        />
        <link rel="canonical" href="https://stegoimage.pages.dev/" />
      </Helmet>

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10 text-center">
              <h1 className="glow-text">Stego.Image</h1>

              <p className="hero-text">
                A client-side steganography tool for securely embedding and
                extracting data within images. Combine encryption, compression,
                and pixel-level encoding to protect sensitive information.
              </p>

              <div className="hero-buttons mt-4">
                <button
                  className="primary-btn m-1"
                  onClick={() => navigate("/encode")}
                >
                  Start Encoding
                </button>
                <button
                  className="secondary-btn m-1"
                  onClick={() => navigate("/decode")}
                >
                  Extract Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features container">
        <div className="row g-4">
          {FEATURES.map(({ title, desc }) => (
            <div className="col-lg-3 col-md-6 col-12" key={title}>
              <div className="card hover-card">
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="container py-5">
        <div className="text-center text-white mb-4">
          <h2>How It Works</h2>
        </div>
        <div className="row g-4 text-center">
          {STEPS.map(({ num, title, desc }) => (
            <div className="col-md-3" key={num}>
              <div className="card h-100">
                <h4>
                  {num}. {title}
                </h4>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECURITY ── */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 text-white">
            <h2>Security and Privacy</h2>
            <p className="mb-3">
              All processing happens locally in your browser — no files are
              transmitted or stored on external servers.
            </p>
            <ul className="text-white" style={{ paddingLeft: "18px" }}>
              <li>Password-based encryption ensures confidentiality</li>
              <li>Hidden data is indistinguishable from normal image data</li>
              <li>No network communication — maximum privacy guaranteed</li>
            </ul>
          </div>

          <div className="col-md-6 mt-4 mt-md-0">
            <div className="card p-4">
              <h5 className="text-white mb-3">Key Benefits</h5>
              <ul>
                <li>Zero server dependency</li>
                <li>Secure file transfer using images</li>
                <li>Lightweight and fast in-browser processing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="container py-5 text-center text-white">
        <h2>Start Using Stego.Image</h2>
        <p className="hero-text">
          Encode your first file and experience secure data hiding directly in
          your browser.
        </p>
        <button
          className="primary-btn mt-3"
          onClick={() => navigate("/encode")}
        >
          Begin Encoding
        </button>
      </section>
    </div>
  );
}

export default Home;
