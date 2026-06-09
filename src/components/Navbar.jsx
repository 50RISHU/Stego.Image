import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.png";

const NAV_LINKS = [
  { to: "/",        label: "Home" },
  { to: "/encode",  label: "Encode" },
  { to: "/decode",  label: "Decode" },
  { to: "/about",   label: "About" },
];

const LEARN_LINKS = [
  { to: "/learn/how-steganography-works",     label: "How Steganography Works" },
  { to: "/learn/lsb-steganography",           label: "LSB Steganography" },
  { to: "/learn/image-steganography",         label: "Image Steganography" },
  { to: "/learn/aes256-encryption",           label: "AES-256 Encryption" },
  { to: "/learn/steganography-vs-encryption", label: "Steganography vs Encryption" },
  { to: "/learn/detect-hidden-data",          label: "Detect Hidden Data" },
  { to: "/learn/use-cases",                   label: "Use Cases" },
];

const GH = "https://github.com/50RISHU/Stego.Image";

export default function Navbar() {
  const location                  = useLocation();
  const [menuOpen, setMenuOpen]   = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const navRef                    = useRef(null);

  const isLearnActive = LEARN_LINKS.some(l => location.pathname === l.to);
  const isActive      = to => location.pathname === to;

  const closeMenus = () => {
    setMenuOpen(false);
    setLearnOpen(false);
  };

  /* close everything on route change */
  useEffect(() => {
    closeMenus();
  }, [location.pathname]);

  /* close on outside click */
  useEffect(() => {
    function handler(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        closeMenus();
      }
    }
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  return (
    <>
      {/* Fixed navbar */}
      <nav ref={navRef} style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "rgba(22,27,34,0.92)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #30363d",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 20px", height: 60,
      }}>

        {/* Brand */}
        <Link to="/" onClick={closeMenus} style={{
          display: "flex", alignItems: "center", gap: 9,
          textDecoration: "none", fontWeight: 700, fontSize: 16,
          color: "#58a6ff", flexShrink: 0,
        }}>
          <img src={logo} alt="Stego.Image" width={28} height={28} />
          Stego.Image
        </Link>

        {/* Desktop links */}
        <div style={{
          display: "flex", alignItems: "center", gap: 4,
          "@media(max-width:768px)": { display: "none" },
        }} className="nb-desktop">

          {NAV_LINKS.map(({ to, label }) => (
            <Link key={to} to={to} style={{
              padding: "6px 12px", borderRadius: 6, fontSize: 14, textDecoration: "none",
              color: isActive(to) ? "#e6edf3" : "#8b949e",
              background: isActive(to) ? "rgba(255,255,255,0.06)" : "transparent",
              transition: "color 0.2s, background 0.2s",
              fontWeight: isActive(to) ? 500 : 400,
            }}
              onMouseEnter={e => { if (!isActive(to)) e.currentTarget.style.color = "#e6edf3"; }}
              onMouseLeave={e => { if (!isActive(to)) e.currentTarget.style.color = "#8b949e"; }}
            >{label}</Link>
          ))}

          {/* Learn dropdown */}
          <div style={{ position: "relative" }}>
            <button onClick={() => setLearnOpen(o => !o)} style={{
              padding: "6px 12px", borderRadius: 6, fontSize: 14, cursor: "pointer",
              color: isLearnActive ? "#e6edf3" : "#8b949e",
              background: isLearnActive ? "rgba(255,255,255,0.06)" : "transparent",
              border: "none", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5,
              transition: "color 0.2s",
            }}
              onMouseEnter={e => { if (!isLearnActive) e.currentTarget.style.color = "#e6edf3"; }}
              onMouseLeave={e => { if (!isLearnActive && !learnOpen) e.currentTarget.style.color = "#8b949e"; }}
            >
              Learn
              <span style={{ fontSize: 10, opacity: 0.6, transform: learnOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▼</span>
            </button>

            {learnOpen && (
              <div style={{
                position: "absolute", top: "calc(100% + 8px)", right: 0,
                background: "#161b22", border: "1px solid #30363d",
                borderRadius: 10, padding: "6px", minWidth: 230,
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                zIndex: 10,
              }}>
                {LEARN_LINKS.map(({ to, label }) => (
                  <Link key={to} to={to} onClick={() => setLearnOpen(false)} style={{
                    display: "block", padding: "9px 12px", borderRadius: 6,
                    fontSize: 13, textDecoration: "none",
                    color: location.pathname === to ? "#58a6ff" : "#8b949e",
                    background: location.pathname === to ? "rgba(88,166,255,0.08)" : "transparent",
                    transition: "background 0.15s, color 0.15s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#e6edf3"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = location.pathname === to ? "rgba(88,166,255,0.08)" : "transparent"; e.currentTarget.style.color = location.pathname === to ? "#58a6ff" : "#8b949e"; }}
                  >{label}</Link>
                ))}
              </div>
            )}
          </div>

          {/* GitHub */}
          <a href={GH} target="_blank" rel="noopener noreferrer" style={{
            marginLeft: 4, padding: "5px 12px", borderRadius: 6, fontSize: 13,
            color: "#8b949e", border: "1px solid #30363d", textDecoration: "none",
            transition: "border-color 0.2s, color 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#58a6ff"; e.currentTarget.style.color = "#58a6ff"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#30363d"; e.currentTarget.style.color = "#8b949e"; }}
          >GitHub</a>
        </div>

        {/* Hamburger (mobile) */}
        <button onClick={() => setMenuOpen(o => !o)} className="nb-hamburger" style={{
          background: "transparent", border: "1px solid #30363d", borderRadius: 6,
          padding: "6px 8px", cursor: "pointer", display: "none",
          flexDirection: "column", gap: 4, alignItems: "center", justifyContent: "center",
        }} aria-label="Toggle menu" aria-expanded={menuOpen}>
          <span style={{ display: "block", width: 18, height: 2, background: menuOpen ? "#58a6ff" : "#8b949e", borderRadius: 2, transition: "transform 0.25s, opacity 0.25s", transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none" }} />
          <span style={{ display: "block", width: 18, height: 2, background: menuOpen ? "#58a6ff" : "#8b949e", borderRadius: 2, transition: "opacity 0.25s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: 18, height: 2, background: menuOpen ? "#58a6ff" : "#8b949e", borderRadius: 2, transition: "transform 0.25s, opacity 0.25s", transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none" }} />
        </button>

        {/* Mobile menu drawer with Scrolling Fixed */}
        {menuOpen && (
          <div style={{
            position: "fixed", top: 60, left: 0, right: 0, zIndex: 999,
            background: "#161b22", borderBottom: "1px solid #30363d",
            padding: "12px 16px 16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            maxHeight: "calc(100vh - 60px)", // Ensures it doesn't exceed screen height
            overflowY: "auto",               // Enables scrolling
          }}>
            {NAV_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} onClick={closeMenus} style={{
                display: "flex", alignItems: "center", width: "100%", boxSizing: "border-box",
                padding: "12px 14px", borderRadius: 8, marginBottom: 4,
                background: isActive(to) ? "rgba(88,166,255,0.08)" : "transparent",
                border: `1px solid ${isActive(to) ? "rgba(88,166,255,0.2)" : "transparent"}`,
                color: isActive(to) ? "#58a6ff" : "#c9d1d9",
                fontSize: 14, fontWeight: isActive(to) ? 600 : 400,
                textDecoration: "none", fontFamily: "inherit",
              }}>
                {label}
              </Link>
            ))}

            {/* Learn section on mobile */}
            <button onClick={() => setLearnOpen(o => !o)} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              width: "100%", padding: "12px 14px", borderRadius: 8, marginBottom: 4,
              background: isLearnActive ? "rgba(88,166,255,0.08)" : "transparent",
              border: `1px solid ${isLearnActive ? "rgba(88,166,255,0.2)" : "transparent"}`,
              color: isLearnActive ? "#58a6ff" : "#c9d1d9",
              fontSize: 14, cursor: "pointer", fontFamily: "inherit",
            }}>
              <span>Learn</span>
              <span style={{ fontSize: 10, opacity: 0.6, transform: learnOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▼</span>
            </button>

            {learnOpen && (
              <div style={{ paddingLeft: 12, marginBottom: 4 }}>
                {LEARN_LINKS.map(({ to, label }) => (
                  <Link key={to} to={to} onClick={closeMenus} style={{
                    display: "flex", width: "100%", padding: "10px 14px", boxSizing: "border-box",
                    borderRadius: 6, marginBottom: 3,
                    background: location.pathname === to ? "rgba(88,166,255,0.08)" : "transparent",
                    color: location.pathname === to ? "#58a6ff" : "#8b949e",
                    fontSize: 13, textDecoration: "none", fontFamily: "inherit",
                  }}>
                    {label}
                  </Link>
                ))}
              </div>
            )}

            <a href={GH} target="_blank" rel="noopener noreferrer" onClick={closeMenus} style={{
              display: "flex", alignItems: "center", width: "100%", boxSizing: "border-box",
              padding: "12px 14px", borderRadius: 8, marginTop: 4,
              background: "transparent", border: "1px solid #30363d",
              color: "#8b949e", fontSize: 14, textDecoration: "none",
            }}>
              GitHub ↗
            </a>
          </div>
        )}
      </nav>

      {/* Body offset so content isn't hidden under fixed nav */}
      <div style={{ height: 60 }} aria-hidden="true" />

      <style>{`
        @media (max-width: 768px) {
          .nb-desktop  { display: none !important; }
          .nb-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}