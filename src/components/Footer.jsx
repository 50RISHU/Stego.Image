/**
 * Footer — site-wide bottom bar.
 */

import pkg from "../../package.json";
import {
  FaGithub,
  FaBug,
  FaTag,
} from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi2";

export default function Footer() {
  const GITHUB_URL = "https://github.com/50RISHU/Stego.Image";
  const LICENSE_URL = `${GITHUB_URL}/blob/main/LICENSE`;
  const ISSUES_URL = `${GITHUB_URL}/issues`;
  const RELEASES_URL = `${GITHUB_URL}/releases`;

  const buttonStyle = {
    border: "1px solid #30363d",
    color: "#c9d1d9",
    background: "transparent",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "0.875rem",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.2s ease",
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.background = "#21262d";
    e.currentTarget.style.borderColor = "#58a6ff";
    e.currentTarget.style.color = "#ffffff";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.background = "transparent";
    e.currentTarget.style.borderColor = "#30363d";
    e.currentTarget.style.color = "#c9d1d9";
  };

  return (
    <footer
      className="mt-auto"
      style={{
        borderTop: "1px solid #30363d",
        background: "rgba(22, 27, 34, 0.5)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        className="container text-center py-4"
        style={{ maxWidth: "720px" }}
      >
        {/* Copyright */}
        <h6
          className="mb-3"
          style={{
            color: "#c9d1d9",
            fontWeight: 600,
          }}
        >
          © {new Date().getFullYear()} <strong>50RISHU</strong> — Stego.Image
        </h6>

        {/* Description */}
        <p
          className="mb-4"
          style={{
            color: "#8b949e",
            lineHeight: 1.7,
            fontSize: "0.95rem",
          }}
        >
          Open-source image steganography tool.
          <br />
          Securely hide encrypted files inside images using{" "}
          <strong style={{ color: "#c9d1d9" }}>AES-256 encryption</strong>.
        </p>

        {/* Action Buttons */}
        <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={buttonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FaGithub size={16} />
            <span>GitHub</span>
          </a>

          <a
            href={LICENSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={buttonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <HiDocumentText size={18} />
            <span>MIT License</span>
          </a>

          <a
            href={ISSUES_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={buttonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FaBug size={16} />
            <span>Report Issue</span>
          </a>
        </div>

        {/* Version */}
        <p
          className="mb-0"
          style={{
            color: "#8b949e",
            fontSize: "0.85rem",
          }}
        >
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#58a6ff",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <FaTag size={12} />
            Version v{pkg.version}
          </a>
        </p>
      </div>
    </footer>
  );
}