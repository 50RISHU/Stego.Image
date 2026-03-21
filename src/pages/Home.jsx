import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* HERO */}
      <section className="hero-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10 text-center">

              <h1 className="glow-text">Stego.Image</h1>

              <p className="hero-text">
                A client-side steganography tool for securely embedding and extracting data within images.
                Combine encryption, compression, and pixel-level encoding to protect sensitive information.
              </p>

              <div className="hero-buttons d-flex flex-wrap justify-content-center gap-3">
                <button
                  className="primary-btn"
                  onClick={() => navigate("/encode")}
                >
                  Start Encoding
                </button>

                <button
                  className="secondary-btn"
                  onClick={() => navigate("/decode")}
                >
                  Extract Data
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features container">
        <div className="row g-4">

          <div className="col-lg-3 col-md-6 col-12">
            <div className="card hover-card h-100 text-center">
              <h3>Encryption</h3>
              <p>Protect data using AES-based password encryption before embedding</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12">
            <div className="card hover-card h-100 text-center">
              <h3>Steganography</h3>
              <p>Embed binary data into image pixels using least significant bit method</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12">
            <div className="card hover-card h-100 text-center">
              <h3>Client-Side Processing</h3>
              <p>All operations run in browser without uploading data to any server</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12">
            <div className="card hover-card h-100 text-center">
              <h3>Multi File Support</h3>
              <p>Supports multiple files through compression and packaging</p>
            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container py-5">
        <div className="text-center text-white mb-4">
          <h2>How It Works</h2>
        </div>

        <div className="row g-4 text-center">

          <div className="col-md-3">
            <div className="card h-100">
              <h4>1. Upload</h4>
              <p>Select a cover image and secret file</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card h-100">
              <h4>2. Encrypt</h4>
              <p>Data is encrypted using password-based encryption</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card h-100">
              <h4>3. Embed</h4>
              <p>Encrypted data is embedded into image pixels</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card h-100">
              <h4>4. Download</h4>
              <p>Download stego image and share securely</p>
            </div>
          </div>

        </div>
      </section>

      {/* SECURITY SECTION */}
      <section className="container py-5">
        <div className="row align-items-center">

          <div className="col-md-6 text-white">
            <h2>Security and Privacy</h2>
            <p>
              Stego.Image ensures that all processing is performed locally in the browser.
              No files are transmitted or stored on external servers.
            </p>
            <ul>
              <li>Password-based encryption ensures confidentiality</li>
              <li>Hidden data is indistinguishable from normal image data</li>
              <li>No network communication ensures maximum privacy</li>
            </ul>
          </div>

          <div className="col-md-6">
            <div className="card p-4">
              <h5 class="text-white">Key Benefits</h5>
              <ul>
                <li>Zero server dependency</li>
                <li>Secure file transfer using images</li>
                <li>Lightweight and fast processing</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="container py-5 text-center text-white">
        <h2>Start Using Stego.Image</h2>
        <p className="hero-text">
          Encode your first file and experience secure data hiding directly in your browser.
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