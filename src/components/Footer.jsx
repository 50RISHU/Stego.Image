/**
 * Footer — site-wide bottom bar.
 * Minimalist design focusing on copyright, MIT license, and open-source links.
 */

export default function Footer() {
  const GH_LINK = "https://github.com/50RISHU/Stego.Image/blob/main/LICENSE";

  return (
    <footer 
      className="mt-auto" 
      style={{ 
        borderTop: "1px solid #30363d", 
        backgroundColor: "rgba(22,27,34,0.5)",
        backdropFilter: "blur(12px)"
      }}
    >
      <div className="container py-4 text-center">
        {/* Copyright */}
        <p className="mb-2" style={{ color: "#c9d1d9", fontSize: "1rem" }}>
          © {new Date().getFullYear()} <strong>50RISHU</strong> — Stego.Image
        </p>

        {/* License Highlight */}
        <p className="mb-3" style={{ color: "#8b949e", fontSize: "0.875rem" }}>
          Released under the <span style={{ color: "#58a6ff", fontWeight: 500 }}>MIT License</span>
        </p>

        {/* GitHub Link */}
        <div className="mb-4">
          <a 
            href={GH_LINK} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-decoration-none d-inline-flex align-items-center gap-2 px-3 py-2 rounded"
            style={{ 
              border: "1px solid #30363d", 
              color: "#c9d1d9", 
              fontSize: "0.875rem",
              transition: "background-color 0.2s, border-color 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
              e.currentTarget.style.borderColor = "#8b949e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "#30363d";
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            View on GitHub
          </a>
        </div>

        {/* Legal Subtext */}
        <p 
          style={{ 
            color: "#8b949e", 
            fontSize: "0.8rem", 
            maxWidth: "550px", 
            margin: "0 auto", 
            opacity: 0.7,
            lineHeight: "1.5"
          }}
        >
          Permission is hereby granted, free of charge, to any person obtaining a copy of this software. 
          See the LICENSE file for full terms and conditions.
        </p>
      </div>
    </footer>
  );
}