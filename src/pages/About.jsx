/**
 * About page — project overview, workflow, tech stack, security model,
 * features, limitations, and conclusion.
 *
 * Content is defined as data arrays so the JSX stays clean and sections
 * are easy to update without touching markup.
 */

const WORKFLOW_STEPS = [
  'User uploads a cover image (PNG or BMP recommended).',
  'User selects a secret file to hide.',
  'The file is compressed to reduce its size.',
  'Data is encrypted using password-based AES encryption.',
  'Encrypted binary data is embedded into image pixels via LSB steganography.',
  'A new encoded image (stego image) is generated and downloaded.',
  'The receiver uploads the stego image to the Decode page.',
  'Using the correct password, the hidden file is extracted and reconstructed.',
]

const TECH_STACK = [
  ['React (Vite)',  'Fast modern frontend framework'],
  ['Bootstrap',     'Responsive UI components'],
  ['Crypto-JS',     'AES encryption for secure data protection'],
  ['Pako',          'GZIP compression for optimized data storage'],
  ['HTML5 Canvas',  'Pixel manipulation for steganography'],
]

const SECURITY_POINTS = [
  'All files are encrypted before embedding',
  'Password-based access protection',
  'No server-side storage or processing',
  'Fully client-side architecture',
  'User data never leaves the browser',
]

const FEATURES = [
  'Hide any file type inside images',
  'Password-protected data extraction',
  'Drag & drop file uploads',
  'Real-time image capacity estimation',
  'Fully client-side processing',
  'Downloadable encoded images',
  'Simple and privacy-focused interface',
]

const LIMITATIONS = [
  'Lossy formats such as JPEG may corrupt embedded data',
  'Hidden file size is limited by image resolution',
  'Incorrect passwords result in unusable extracted data',
  'Very large files may be limited by browser memory',
]

/** Reusable section wrapper. */
function Section({ title, children }) {
  return (
    <section className="about-section mb-5">
      <h3>{title}</h3>
      {children}
    </section>
  )
}

function About() {
  return (
    <div className="about-container container py-5">

      {/* Hero */}
      <div className="text-center text-white mb-5">
        <h1 className="mb-3">About Stego.Image</h1>
        <p className="about-subtext">
          A privacy-focused steganography tool that allows users to securely hide
          and extract files inside digital images — entirely within the browser.
        </p>
      </div>

      {/* Overview */}
      <Section title="Project Overview">
        <p>
          Stego.Image is a browser-based steganography application that enables
          secure data embedding within images using modern web technologies.
          The system hides files inside an image while preserving its visual
          appearance.
        </p>
        <p className="mt-2">
          Unlike traditional tools that rely on servers, Stego.Image performs
          all operations locally. Sensitive data never leaves the user's device,
          providing strong privacy and security guarantees.
        </p>
      </Section>

      {/* Workflow */}
      <Section title="System Workflow">
        <ol className="about-list">
          {WORKFLOW_STEPS.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </Section>

      {/* Tech stack */}
      <Section title="Technologies Used">
        <ul>
          {TECH_STACK.map(([name, desc]) => (
            <li key={name}><strong>{name}</strong> — {desc}</li>
          ))}
        </ul>
      </Section>

      {/* Security */}
      <Section title="Security Model">
        <p>
          Stego.Image combines cryptography and steganography to ensure hidden
          data remains confidential and difficult to detect.
        </p>
        <ul className="mt-2">
          {SECURITY_POINTS.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </Section>

      {/* Features */}
      <Section title="Key Features">
        <ul>
          {FEATURES.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </Section>

      {/* Limitations */}
      <Section title="Limitations">
        <ul>
          {LIMITATIONS.map((l) => <li key={l}>{l}</li>)}
        </ul>
      </Section>

      {/* Conclusion */}
      <Section title="Conclusion">
        <p>
          Stego.Image provides a modern and secure approach to hiding information
          inside images. By integrating encryption, compression, and
          steganographic techniques into a simple web interface, the project
          demonstrates how privacy-first applications can be built using entirely
          client-side technologies.
        </p>
      </Section>

    </div>
  )
}

export default About