function About() {
  return (
    <div className="about-container container py-5">

      {/* Title */}
      <div className="text-center text-white mb-5">
        <h1>About Stego.Image</h1>
        <p className="about-subtext">
          A client-side steganography application for secure data embedding inside images.
        </p>
      </div>

      {/* Overview */}
      <section className="about-section">
        <h3>Project Overview</h3>
        <p>
          Stego.Image is a web-based application designed to hide and retrieve data within digital images
          using steganography techniques. The system allows users to embed any file inside an image while
          maintaining visual integrity.
        </p>
        <p>
          The application operates entirely in the browser environment, ensuring that no data is transmitted
          to external servers. This provides a high level of privacy and control over sensitive information.
        </p>
      </section>

      {/* Working */}
      <section className="about-section">
        <h3>System Workflow</h3>
        <ol>
          <li>User uploads a cover image (preferably PNG or BMP format).</li>
          <li>User selects a secret file to embed.</li>
          <li>The file is optionally compressed to reduce size.</li>
          <li>Data is encrypted using a password-based encryption algorithm.</li>
          <li>Encrypted binary data is embedded into image pixels using LSB method.</li>
          <li>Encoded image is generated and available for download.</li>
          <li>Receiver uploads the encoded image and provides the correct password.</li>
          <li>Hidden data is extracted and reconstructed into original file.</li>
        </ol>
      </section>

      {/* Technology */}
      <section className="about-section">
        <h3>Technologies Used</h3>
        <ul>
          <li>Frontend: React (Vite)</li>
          <li>Styling: Bootstrap and custom CSS</li>
          <li>Encryption: AES-based encryption (crypto-js)</li>
          <li>Compression: Gzip (pako)</li>
          <li>File Handling: Browser File API</li>
          <li>Processing: HTML5 Canvas</li>
        </ul>
      </section>

      {/* Security */}
      <section className="about-section">
        <h3>Security Model</h3>
        <p>
          Stego.Image ensures data confidentiality through a combination of encryption and steganography.
        </p>
        <ul>
          <li>All data is encrypted before embedding</li>
          <li>Password-based access control</li>
          <li>No backend or server communication</li>
          <li>Data remains entirely within user environment</li>
        </ul>
      </section>

      {/* Features */}
      <section className="about-section">
        <h3>Key Features</h3>
        <ul>
          <li>Hide any file type inside images</li>
          <li>Password-protected data extraction</li>
          <li>Drag and drop file upload</li>
          <li>Real-time image capacity calculation</li>
          <li>Fully client-side processing</li>
          <li>Downloadable encoded image</li>
        </ul>
      </section>

      {/* Limitations */}
      <section className="about-section">
        <h3>Limitations</h3>
        <ul>
          <li>Lossy formats (JPEG) may corrupt hidden data</li>
          <li>File size is limited by image resolution</li>
          <li>Incorrect password results in unusable output</li>
          <li>Browser memory limits may affect large files</li>
        </ul>
      </section>

      {/* Conclusion */}
      <section className="about-section">
        <h3>Conclusion</h3>
        <p>
          Stego.Image provides a secure and efficient method for hiding data in images using modern web
          technologies. It combines encryption, compression, and steganography into a single, easy-to-use
          interface while maintaining full user privacy.
        </p>
      </section>

    </div>
  );
}

export default About;