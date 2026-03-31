function About() {
  return (
    <div className="about-container container py-5">

      {/* Hero */}
      <div className="text-center text-white mb-5">
        <h1 className="mb-3">About Stego.Image</h1>
        <p className="about-subtext">
          A privacy-focused steganography tool that allows users to securely hide
          and extract files inside digital images directly in the browser.
        </p>
      </div>

      {/* Overview */}
      <section className="about-section mb-5">
        <h3>Project Overview</h3>
        <p>
          Stego.Image is a browser-based steganography application that enables
          secure data embedding within images using modern web technologies.
          The system allows users to hide files inside an image while preserving
          its visual appearance.
        </p>

        <p>
          Unlike traditional tools that rely on servers, Stego.Image performs
          all operations locally inside the user's browser. This ensures that
          sensitive data never leaves the user's device, providing strong
          privacy and security guarantees.
        </p>
      </section>

      {/* Workflow */}
      <section className="about-section mb-5">
        <h3>System Workflow</h3>

        <ol className="about-list">
          <li>User uploads a cover image (PNG or BMP recommended).</li>
          <li>User selects a secret file to hide.</li>
          <li>The file may be compressed to reduce its size.</li>
          <li>Data is encrypted using password-based AES encryption.</li>
          <li>The encrypted binary data is embedded inside image pixels using the LSB technique.</li>
          <li>A new encoded image (stego image) is generated.</li>
          <li>The receiver uploads the encoded image.</li>
          <li>Using the correct password, the hidden file is extracted and reconstructed.</li>
        </ol>
      </section>

      {/* Technology */}
      <section className="about-section mb-5">
        <h3>Technologies Used</h3>

        <ul>
          <li><strong>React (Vite)</strong> — fast modern frontend framework</li>
          <li><strong>Bootstrap</strong> — responsive UI components</li>
          <li><strong>Crypto-JS</strong> — AES encryption for secure data protection</li>
          <li><strong>Pako</strong> — gzip compression for optimized data storage</li>
          <li><strong>HTML5 Canvas</strong> — pixel manipulation for steganography</li>
        </ul>
      </section>

      {/* Security */}
      <section className="about-section mb-5">
        <h3>Security Model</h3>

        <p>
          Stego.Image combines cryptography and steganography to ensure that
          hidden data remains confidential and difficult to detect.
        </p>

        <ul>
          <li>All files are encrypted before embedding</li>
          <li>Password-based access protection</li>
          <li>No server-side storage or processing</li>
          <li>Fully client-side architecture</li>
          <li>User data never leaves the browser</li>
        </ul>
      </section>

      {/* Features */}
      <section className="about-section mb-5">
        <h3>Key Features</h3>

        <ul>
          <li>Hide any file type inside images</li>
          <li>Password-protected data extraction</li>
          <li>Drag & drop file uploads</li>
          <li>Real-time image capacity estimation</li>
          <li>Fully client-side processing</li>
          <li>Downloadable encoded images</li>
          <li>Simple and privacy-focused interface</li>
        </ul>
      </section>

      {/* Limitations */}
      <section className="about-section mb-5">
        <h3>Limitations</h3>

        <ul>
          <li>Lossy formats such as JPEG may corrupt embedded data</li>
          <li>Hidden file size is limited by image resolution</li>
          <li>Incorrect passwords result in unusable extracted data</li>
          <li>Very large files may be limited by browser memory</li>
        </ul>
      </section>

      {/* Conclusion */}
      <section className="about-section">
        <h3>Conclusion</h3>

        <p>
          Stego.Image provides a modern and secure approach to hiding
          information inside images. By integrating encryption,
          compression, and steganographic techniques into a simple
          web interface, the project showcases how privacy-first
          applications can be built using entirely client-side
          technologies.
        </p>
      </section>

    </div>
  );
}

export default About;