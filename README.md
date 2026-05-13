<p align="center">
  <img src="public/logo.svg" alt="Stego.Image" width="80" />
</p>

<h1 align="center">Stego.Image</h1>

<p align="center">Hide files inside images — securely, privately, in your browser.</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-green" />
  <img src="https://img.shields.io/badge/React-19-blue" />
  <img src="https://img.shields.io/badge/Vite-fast-purple" />
  <img src="https://img.shields.io/badge/status-active-success" />
</p>

<p align="center">
  <a href="https://stegoimage.pages.dev/">🌐 Live Demo</a>
</p>

---

## What It Does

Stego.Image embeds any file inside an ordinary image using **LSB steganography**. The output image looks identical to the original. Encryption is optional — when enabled, data is protected with **AES-256** before embedding.

All processing runs **100% client-side**. No uploads, no servers, no data leaves your device.

---

## Features

- **Optional AES-256 encryption** — toggle on/off per encode
- **GZIP compression** — reduces payload size before embedding
- **LSB steganography** — pixel-level, visually undetectable
- **Any file type** — PDF, ZIP, images, media, code, and more
- **Capacity indicator** — shows how much data the image can hold
- **Fast** — encode and decode in seconds

---

## How It Works

```
File  →  GZIP compress  →  [AES-256 encrypt]  →  Embed into image pixels  →  PNG output
```

Each pixel's RGB channels have their least significant bit modified to store data.
The visual change is imperceptible to the human eye.

---

## Tech Stack

| Purpose | Library |
|---------|---------|
| Framework | React 19 + Vite |
| Encryption | crypto-js |
| Compression | pako |
| Steganography | HTML5 Canvas |
| UI | Bootstrap |
| File export | file-saver + jszip |

---

## Getting Started

```bash
git clone https://github.com/<your-username>/StegoImage.git
cd StegoImage
npm install
npm run dev
```

---

## Important Notes

- Use **PNG or BMP** only — JPEG compression destroys hidden data.
- For sharing, use the **ZIP download** — social platforms re-compress images.
- Encryption toggle and password during **decode must match** what was used to encode.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup and guidelines.

---

## License

MIT — free to use, modify, and distribute. See [LICENSE](LICENSE) for details.