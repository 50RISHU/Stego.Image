import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

/** Main nav links */
const NAV_LINKS = [
  { to: "/",       label: "Home" },
  { to: "/encode", label: "Encode" },
  { to: "/decode", label: "Decode" },
  { to: "/about",  label: "About" },
  { to: "https://github.com/50RISHU/Stego.Image", label: "GitHub" },
];

/** Dropdown content pages */
const LEARN_LINKS = [
  { to: "/learn/how-steganography-works",     label: "How Steganography Works" },
  { to: "/learn/lsb-steganography",           label: "LSB Steganography" },
  { to: "/learn/image-steganography",         label: "Image Steganography" },
  { to: "/learn/aes256-encryption",           label: "AES-256 Encryption" },
  { to: "/learn/steganography-vs-encryption", label: "Steganography vs Encryption"},
  { to: "/learn/detect-hidden-data",          label: "Detect Hidden Data" },
  { to: "/learn/use-cases",                   label: "Use Cases" },
];

function Navbar() {
  const location = useLocation();

  // highlight "Learn" dropdown if current path matches any learn page
  const isLearnActive = LEARN_LINKS.some((l) => location.pathname === l.to);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar px-3">
      {/* Brand / logo */}
      <Link
        className="navbar-brand fw-bold d-flex align-items-center gap-2"
        to="/"
      >
        <img src={logo} alt="Stego.Image logo" width="30" height="30" />
        Stego.Image
      </Link>

      {/* Mobile hamburger toggle */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
        aria-controls="navMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      {/* Collapsible nav links */}
      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav ms-auto">
          {/* Regular links */}
          {NAV_LINKS.map(({ to, label }) => (
            <li className="nav-item" key={to}>
              <Link className="nav-link custom-link" to={to}>
                {label}
              </Link>
            </li>
          ))}

          {/* Learn dropdown */}
          <li className="nav-item dropdown">
            <a
              className={`nav-link custom-link dropdown-toggle ${isLearnActive ? "active" : ""}`}
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Learn
            </a>
            <ul className="dropdown-menu dropdown-menu-end custom-dropdown">
              {LEARN_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link className="dropdown-item custom-dropdown-item" to={to}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
