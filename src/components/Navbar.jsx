import { Link } from "react-router-dom";
import logo from "../assets/logo.svg"; // 👈 import logo

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar px-3">
      
      {/* 🔥 Logo + Text */}
      <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
        <img 
          src={logo} 
          alt="logo" 
          width="35" 
          height="35"
          style={{ objectFit: "cover" }}
        />
        Stego.Image
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link custom-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-link" to="/encode">Encode</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-link" to="/decode">Decode</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-link" to="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;