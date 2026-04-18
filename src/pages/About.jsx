const WORKFLOW_STEPS = [
  'Upload a cover image (PNG or BMP) and the secret file.',
  'Optionally enable AES-256 encryption and set a password.',
  'File is compressed, then encrypted (if enabled), then embedded into image pixels.',
  'Download the stego image and share securely.',
  'Receiver uploads the stego image, matches the encryption setting, enters the password (if used), and downloads the extracted file.',
]

const TECH_STACK = [
  ['React + Vite',  'Frontend framework'],
  ['Crypto-JS',     'AES-256 encryption'],
  ['Pako',          'GZIP compression'],
  ['HTML5 Canvas',  'Pixel-level steganography'],
  ['Bootstrap',     'Responsive UI'],
]

const LIMITATIONS = [
  'JPEG images will corrupt hidden data — use PNG or BMP only.',
  'File size is limited by image resolution.',
  'Images re-compressed by WhatsApp, Instagram, etc. will destroy hidden data.',
  'Wrong password or mismatched encryption setting = failed extraction.',
]

function Section({ title, children }) {
  return (
    <section className="about-section mb-4">
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
          A browser-based tool to hide and extract files inside images using
          steganography and optional AES-256 encryption — 100% client-side.
        </p>
      </div>

      {/* What it does */}
      <Section title="What It Does">
        <p>
          Stego.Image hides any file inside an ordinary image by embedding it
          into the least significant bits of each pixel. The output image looks
          identical to the original. All processing runs locally — no data ever
          leaves your browser.
        </p>
      </Section>

      {/* How it works */}
      <Section title="How It Works">
        <ol className="about-list">
          {WORKFLOW_STEPS.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </Section>

      {/* Tech stack */}
      <Section title="Tech Stack">
        <ul>
          {TECH_STACK.map(([name, desc]) => (
            <li key={name}><strong>{name}</strong> — {desc}</li>
          ))}
        </ul>
      </Section>

      {/* Limitations */}
      <Section title="Limitations">
        <ul>
          {LIMITATIONS.map((l) => <li key={l}>{l}</li>)}
        </ul>
      </Section>

    </div>
  )
}

export default About