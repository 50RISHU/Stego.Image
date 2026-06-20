import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const TECHNIQUES = [
  {
    title: "Visual inspection",
    difficulty: "Easy",
    effectiveness: "None",
    desc: "Looking at a stego image with the naked eye. LSB changes are imperceptible — a ±1 change per channel is invisible. Visual inspection cannot detect LSB steganography.",
  },
  {
    title: "LSB plane visualisation",
    difficulty: "Easy",
    effectiveness: "Low",
    desc: "Extracting and visualising only the LSB of each channel produces a noise-like pattern. In natural images this pattern looks random. In stego images with large payloads, the LSB plane may show structured patterns — but this requires a reference image to compare against.",
  },
  {
    title: "Chi-square attack",
    difficulty: "Medium",
    effectiveness: "Medium",
    desc: "Compares the frequency distribution of pixel value pairs (e.g. 200 and 201) against expected natural image statistics. LSB embedding disturbs this distribution in detectable ways — but only when a significant portion of the image is used.",
  },
  {
    title: "RS analysis",
    difficulty: "Medium",
    effectiveness: "High",
    desc: "Regular-Singular (RS) analysis measures smoothness of pixel groups. Embedding data increases irregularity in predictable ways. RS analysis can estimate the proportion of pixels that carry hidden data.",
  },
  {
    title: "StegExpose",
    difficulty: "Low (automated)",
    effectiveness: "High",
    desc: "An open-source steganalysis tool that combines multiple statistical tests (chi-square, RS, sample pairs, primary sets) to detect LSB steganography. Effective against images with large payloads.",
  },
];

const COUNTERMEASURES = [
  {
    title: "Always use encryption",
    desc: "AES-256 encrypted payloads produce random-looking bits. Random bits closely match the statistical profile of natural image noise, making chi-square and RS analysis significantly less effective.",
  },
  {
    title: "Use small payloads",
    desc: "The smaller the payload relative to image size, the harder detection becomes. Statistical anomalies grow with payload size. Use the largest cover image practical.",
  },
  {
    title: "Use high-detail images",
    desc: "Images with complex textures and natural noise — photographs of nature, crowds, or cityscapes — absorb LSB changes better than flat or simple images like logos or gradients.",
  },
  {
    title: "Avoid reusing cover images",
    desc: "If an attacker has access to the original cover image, comparison attacks become trivial. Use a fresh cover image for each encode operation.",
  },
];

const RELATED = [
  {
    to: "/learn/how-steganography-works",
    label: "How Steganography Works",
    desc: "Technical deep dive into the encoding process",
  },
  {
    to: "/learn/lsb-steganography",
    label: "LSB Steganography",
    desc: "How pixel-level bit manipulation works",
  },
  {
    to: "/learn/aes256-encryption",
    label: "AES-256 Encryption",
    desc: "Why encryption makes detection much harder",
  },
  {
    to: "/learn/steganography-vs-encryption",
    label: "Steganography vs Encryption",
    desc: "Full comparison of both techniques",
  },
  {
    to: "/learn/image-steganography",
    label: "Image Steganography",
    desc: "How image format affects hidden data survival",
  },
    {
    to: "/learn/use-cases",
    label: "Use Cases",
    desc: "When to use steganography, encryption, or both together",
  },
];

function DetectHiddenData() {
  return (
    <div className="container py-5">
      <Helmet>
        <title>How to Detect Hidden Data in Images — Steganalysis Guide | Stego.Image</title>
        <meta
          name="description"
          content="Learn how steganalysis tools detect hidden data in images. Covers chi-square attacks, RS analysis, LSB visualisation, and how encryption makes detection harder."
        />
        <link
          rel="canonical"
          href="https://stegoimage.pages.dev/learn/detect-hidden-data"
        />
        <meta
          property="og:title"
          content="How to Detect Hidden Data in Images — Steganalysis Guide | Stego.Image"
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
        <span style={{ color: "var(--text-primary)" }}>Detect Hidden Data</span>
      </nav>

      <div className="row">
        <div className="col-lg-8">
          <h1
            className="text-white mb-2"
            style={{ fontSize: "28px", fontWeight: 700 }}
          >
            Detecting Hidden Data in Images
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "15px",
              marginBottom: "36px",
              lineHeight: 1.7,
            }}
          >
            Steganalysis is the practice of detecting steganographic content in
            files. Understanding how detection works helps you use steganography
            more effectively — and understand its limits.
          </p>

          {/* ── CAN IT BE DETECTED ── */}
          <section style={{ marginBottom: "30px" }} id="can-it-be-detected">
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
              Yes — under certain conditions. LSB encoding is invisible to human
              vision, but it leaves statistical traces in the pixel data that
              automated tools can measure. The detectability depends on three
              factors:
            </p>
            <div className="row g-3">
              {[
                {
                  title: "Payload size",
                  desc: "Larger payloads relative to image size leave stronger statistical traces. A small payload in a large image is much harder to detect.",
                },
                {
                  title: "Encryption",
                  desc: "Unencrypted payloads have structured bit patterns that differ from natural image noise. Encrypted payloads are statistically random — much harder to distinguish.",
                },
                {
                  title: "Cover image",
                  desc: "Complex, high-detail images absorb LSB changes better than flat or simple images. A photograph is a better carrier than a flat-colour graphic.",
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

          {/* ── TECHNIQUES ── */}
          <section style={{ marginBottom: "30px" }} id="techniques">
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
              Detection Techniques
            </h2>
            <div className="about-steps">
              {TECHNIQUES.map(
                ({ title, difficulty, effectiveness, desc }, i) => (
                  <div className="about-step-card" key={title}>
                    <div className="about-step-number">{i + 1}</div>
                    <div style={{ width: "100%" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "4px",
                          flexWrap: "wrap",
                          gap: "6px",
                        }}
                      >
                        <span
                          className="about-step-title"
                          style={{ fontWeight: 600 }}
                        >
                          {title}
                        </span>
                        <div style={{ display: "flex", gap: "6px" }}>
                          <span
                            style={{
                              fontSize: "11px",
                              padding: "2px 8px",
                              borderRadius: "12px",
                              background: "rgba(88,166,255,0.1)",
                              color: "#58a6ff",
                              border: "1px solid rgba(88,166,255,0.2)",
                            }}
                          >
                            {difficulty}
                          </span>
                          <span
                            style={{
                              fontSize: "11px",
                              padding: "2px 8px",
                              borderRadius: "12px",
                              background:
                                effectiveness === "None"
                                  ? "rgba(139,148,158,0.1)"
                                  : effectiveness === "Low"
                                    ? "rgba(227,179,65,0.1)"
                                    : effectiveness === "Medium"
                                      ? "rgba(88,166,255,0.1)"
                                      : "rgba(63,185,80,0.1)",
                              color:
                                effectiveness === "None"
                                  ? "#8b949e"
                                  : effectiveness === "Low"
                                    ? "#e3b341"
                                    : effectiveness === "Medium"
                                      ? "#58a6ff"
                                      : "#3fb950",
                              border: `1px solid ${effectiveness === "None" ? "rgba(139,148,158,0.2)" : effectiveness === "Low" ? "rgba(227,179,65,0.2)" : effectiveness === "Medium" ? "rgba(88,166,255,0.2)" : "rgba(63,185,80,0.2)"}`,
                            }}
                          >
                            {effectiveness} effectiveness
                          </span>
                        </div>
                      </div>
                      <p className="about-step-desc mb-0">{desc}</p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </section>

          {/* ── COUNTERMEASURES ── */}
          <section style={{ marginBottom: "30px" }} id="countermeasures">
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
              How to Make Detection Harder
            </h2>
            <div className="about-steps">
              {COUNTERMEASURES.map(({ title, desc }, i) => (
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
              Stego.Image applies AES-256 encryption before embedding by
              default. This is the single most effective countermeasure against
              statistical steganalysis.
            </div>
          </section>

          {/* ── LIMITS OF DETECTION ── */}
          <section style={{ marginBottom: "30px" }} id="limits">
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
              Limits of Steganalysis
            </h2>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              Current steganalysis tools can detect LSB steganography reliably
              only when the payload is large relative to the image and the
              payload is unencrypted. With a small encrypted payload in a large,
              complex cover image, detection rates drop significantly.
            </p>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              No steganalysis tool can reliably detect all steganographic
              content in all images. Detection is probabilistic, not certain.
              Advanced deep-learning based detectors are an active research area
              but remain imperfect.
            </p>
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
                  { href: "#can-it-be-detected", label: "Can It Be Detected?" },
                  { href: "#techniques", label: "Detection Techniques" },
                  { href: "#countermeasures", label: "Make Detection Harder" },
                  { href: "#limits", label: "Limits of Steganalysis" },
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
                Hide encrypted data inside a PNG — free, client-side, no
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

export default DetectHiddenData;
