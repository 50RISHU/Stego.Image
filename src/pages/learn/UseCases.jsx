import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const USE_CASES = [
  {
    title: "Private File Transfer",
    id: "use-case-0",
    desc: 'Transfer sensitive documents without attracting attention. Instead of sending an obviously encrypted file — which signals "there is a secret here" — embed it inside an ordinary image. The recipient extracts it with the correct password.',
    examples: [
      "Legal documents",
      "Financial records",
      "Private keys or credentials",
      "Medical records",
    ],
  },
  {
    title: "Covert Communication",
    id: "use-case-1",
    desc: "In regions where encrypted messaging is monitored or restricted, steganography allows communication without revealing that a secret exists. A stego image shared as a holiday photo raises no suspicion.",
    examples: [
      "Journalist communications",
      "Whistleblower channels",
      "Privacy-sensitive correspondence",
    ],
  },
  {
    title: "Digital Watermarking",
    id: "use-case-2",
    desc: "Embed invisible ownership or authorship data inside digital media. Unlike visible watermarks, LSB-embedded metadata cannot be cropped or edited out without degrading the image. Used to prove ownership in copyright disputes.",
    examples: [
      "Photography copyright",
      "Document authenticity",
      "Software licensing",
    ],
  },
  {
    title: "Dead Drop Communication",
    id: "use-case-3",
    desc: "A dead drop is a communication method where parties share information without direct contact. A stego image uploaded to a public site — a forum, image hosting service, or social media — can carry a hidden message retrievable only by the intended recipient.",
    examples: [
      "Operational security",
      "Research coordination",
      "Anonymous tip channels",
    ],
  },
  {
    title: "Data Backup with Plausible Deniability",
    id: "use-case-4",
    desc: "Store sensitive backup data inside ordinary-looking image files in cloud storage. Even if the cloud account is accessed, the images appear normal. The data is both hidden and AES-256 encrypted — two layers of protection.",
    examples: [
      "Password backups",
      "Sensitive configuration files",
      "Cryptocurrency seed phrases",
    ],
  },
  {
    title: "Security Research and Education",
    id: "use-case-5",
    desc: "Stego.Image is fully open-source and client-side. Researchers and students can inspect the source code, test steganographic techniques, study LSB encoding and decoding, and experiment with steganalysis against known stego images.",
    examples: [
      "University coursework",
      "CTF (Capture the Flag) challenges",
      "Security tool development",
    ],
  },
];

const RELATED = [
  {
    to: "/learn/how-steganography-works",
    label: "How Steganography Works",
    desc: "Broad overview of steganography concepts",
  },
  {
    to: "/learn/steganography-vs-encryption",
    label: "Steganography vs Encryption",
    desc: "When to use each technique",
  },
  {  
    to: "/learn/lsb-steganography",
    label: "LSB Steganography",
    desc: "Technical deep dive into bit-level pixel manipulation",
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
    to: "/learn/image-steganography",
    label: "Image Steganography",
    desc: "How image format affects hidden data survival",
  },
];

function UseCases() {
  return (
    <div className="container py-5">
      <Helmet>
        <title>Steganography Use Cases — Real-World Applications | Stego.Image</title>
        <meta
          name="description"
          content="Explore real-world use cases for steganography — private file transfer, covert communication, digital watermarking, dead drops, secure backup, and security research."
        />
        <link
          rel="canonical"
          href="https://stegoimage.pages.dev/learn/use-cases"
        />
        <meta
          property="og:title"
          content="Steganography Use Cases — Real-World Applications | Stego.Image"
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
        <span style={{ color: "var(--text-primary)" }}>Use Cases</span>
      </nav>

      <div className="row">
        <div className="col-lg-8">
          <h1
            className="text-white mb-2"
            style={{ fontSize: "28px", fontWeight: 700 }}
          >
            Steganography Use Cases
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "15px",
              marginBottom: "36px",
              lineHeight: 1.7,
            }}
          >
            Steganography has practical applications across privacy, security,
            journalism, and digital rights. Here are the most common real-world
            use cases for hiding data inside images.
          </p>

          {/* ── USE CASES ── */}
          {USE_CASES.map(({ id, title, desc, examples }, i) => (
            <section style={{ marginBottom: "36px" }} id={id}>
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
                {i + 1}. {title}
              </h2>
              <p
                style={{
                  color: "var(--text-body)",
                  lineHeight: 1.75,
                  fontSize: "14.5px",
                }}
              >
                {desc}
              </p>
              <div className="about-section" style={{ padding: "14px 18px" }}>
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: "10px",
                    fontWeight: 600,
                  }}
                >
                  Examples
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {examples.map((ex) => (
                    <span
                      key={ex}
                      style={{
                        fontSize: "12.5px",
                        padding: "3px 10px",
                        borderRadius: "12px",
                        background: "rgba(88,166,255,0.08)",
                        color: "var(--text-body)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          ))}

          {/* ── LEGAL NOTE ── */}
          <section style={{ marginBottom: "30px" }} id="legal">
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
              Legal Considerations
            </h2>
            <p
              style={{
                color: "var(--text-body)",
                lineHeight: 1.75,
                fontSize: "14.5px",
              }}
            >
              Steganography itself is legal in most jurisdictions. It is a
              neutral technique — the same tool used for privacy can be misused.
              Stego.Image is provided for legitimate privacy, research, and
              educational purposes.
            </p>
            <div className="about-limitations">
              {[
                {
                  icon: "✅",
                  title: "Legal uses",
                  desc: "Personal privacy, journalism, security research, digital watermarking, education, CTF challenges.",
                },
                {
                  icon: "⚠️",
                  title: "Illegal uses",
                  desc: "Concealing evidence, transmitting illegal content, or circumventing lawful interception orders. Stego.Image must not be used for illegal activity.",
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
                {USE_CASES.map(({ title }, i) => (
                  <a
                    key={title}
                    href={`#use-case-${i}`}
                    style={{
                      fontSize: "13px",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      padding: "4px 0",
                      borderLeft: "2px solid var(--border)",
                      paddingLeft: "10px",
                    }}
                  >
                    {title}
                  </a>
                ))}
                <a
                  href="#legal"
                  style={{
                    fontSize: "13px",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    padding: "4px 0",
                    borderLeft: "2px solid var(--border)",
                    paddingLeft: "10px",
                  }}
                >
                  Legal Considerations
                </a>
                <a
                  href="#related"
                  style={{
                    fontSize: "13px",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    padding: "4px 0",
                    borderLeft: "2px solid var(--border)",
                    paddingLeft: "10px",
                  }}
                >
                  Related Topics
                </a>
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

export default UseCases;
