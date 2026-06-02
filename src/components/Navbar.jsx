import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

/** Navigation links config — add/remove routes here only. */
const NAV_LINKS = [
  { to: '/',       label: 'Home'   },
  { to: '/encode', label: 'Encode' },
  { to: '/decode', label: 'Decode' },
  { to: '/about',  label: 'About'  },
  { to: 'https://github.com/50RISHU/Stego.Image',  label: 'Github'  },
]

/**
 * Navbar — top navigation bar with logo and responsive hamburger menu.
 * Bootstrap collapse is used for mobile toggling.
 */
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar px-3">

      {/* Brand / logo */}
      <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
        <img src={logo} alt="Stego.Image logo" width="35" height="35" />
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
          {NAV_LINKS.map(({ to, label }) => (
            <li className="nav-item" key={to}>
              <Link className="nav-link custom-link" to={to}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>

    </nav>
  )
}

export default Navbar