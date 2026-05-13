/**
 * Footer — site-wide bottom bar.
 * Includes quick links and MIT license display.
 */
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="custom-footer">
      <div className="container py-3">
        <div className="row mb-3">
          {/* Quick Links */}
          <div className="col-md-6 mb-3 mb-md-0">
            <h6 className="fw-bold mb-2" style={{ color: "#58a6ff" }}>
              Quick Links
            </h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="custom-link text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/encode" className="custom-link text-decoration-none">
                  Encode
                </Link>
              </li>
              <li>
                <Link to="/decode" className="custom-link text-decoration-none">
                  Decode
                </Link>
              </li>
              <li>
                <Link to="/about" className="custom-link text-decoration-none">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* License */}
          <div className="col-md-6">
            <h6 className="fw-bold mb-2" style={{ color: "#58a6ff" }}>
              License
            </h6>
            <p className="small mb-0">
              This project is licensed under the <strong>MIT License</strong>
            </p>
            <p className="small mb-0">
              © 2026 50RISHU | Stego.Image - Secure Data Hiding Tool
            </p>
          </div>
        </div>

        {/* Copyright & License Text */}
        <hr className="my-2" style={{ borderColor: "#30363d" }} />
        <div className="text-center">
          <p className="small mb-1">
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software.
          </p>
          <p className="small mb-0">
            See LICENSE file for full MIT License terms.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
