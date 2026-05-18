<p align="center">
  <img src="public/logo.svg" alt="Stego.Image" width="80" />
</p>

<h1 align="center">Stego.Image</h1>

<p align="center">
  Hide any file inside an image — encrypted, compressed, and invisible to the human eye.<br/>
  100% client-side. No servers. No uploads. Your data never leaves your device.
</p>

<p align="center">
  <a href="https://stegoimage.pages.dev/"><img src="https://img.shields.io/badge/🌐 Live Demo-stegoimage.pages.dev-blue?style=flat-square" /></a>
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite" />
  <img src="https://img.shields.io/badge/status-active-brightgreen?style=flat-square" />
</p>

---

## How It Works

Stego.Image applies three steps before touching a single pixel:

```
File  →  GZIP compress  →  AES-256 encrypt  →  LSB embed into image pixels  →  PNG output
```

**LSB (Least Significant Bit) steganography** modifies only the last bit of each RGB channel per pixel — a change so small it's invisible, but enough to encode binary data.

```
Original:  1 1 0 0 1 0 1 [0]  →  202
Modified:  1 1 0 0 1 0 1 [1]  →  203  ← visually identical
```

This creates **two independent security layers** — steganography hides the *existence* of the data, encryption protects its *content*.

---

## Features

- **AES-256 Encryption** — optional password protection; data is unreadable without the correct key
- **GZIP Compression** — shrinks the payload before embedding to maximize image capacity
- **LSB Steganography** — pixel-level data hiding using the HTML5 Canvas API
- **Any File Type** — PDF, ZIP, images, video, code, documents — anything works
- **Capacity Indicator** — shows available space in the selected image before encoding
- **ZIP Export** — download all decoded files bundled in a single archive

---

## Security Model

Stego.Image applies **defense in depth** — two independent protections stack on top of each other.

| Layer | Technology | What It Protects Against |
|---|---|---|
| Steganography | LSB pixel embedding | Casual detection — the hidden file is invisible |
| Encryption | AES-256 + password | Content exposure — data is unreadable without the key |

Even if someone suspects an image contains hidden data and successfully extracts the raw bytes, they still cannot read the content without the correct password. Both layers must be defeated independently.

> **Privacy note:** All cryptographic operations run entirely in your browser using the `crypto-js`. No key material, plaintext, or file content is ever transmitted anywhere.

---

## Supported Files

Any binary file can be hidden inside a carrier image. Common examples:

- **Documents** — PDF, DOCX, TXT, XLSX
- **Archives** — ZIP, RAR, 7z
- **Media** — MP3, MP4, PNG, JPG, GIF
- **Code** — JS, Python, JSON, HTML
- **Other** — anything with a file extension works

**Capacity** depends on the carrier image size: roughly `(width × height × 3) / 8` bytes. A 1920×1080 image can hold ~777 KB of hidden data. Use a larger image for larger payloads.

---

## Tech Stack

| Purpose | Library |
|---|---|
| Framework | React 19 + Vite |
| Encryption | crypto-js (AES-256) |
| Compression | pako (GZIP) |
| Steganography | HTML5 Canvas API |
| UI | Bootstrap |
| File Export | file-saver + jszip |

---

## Important Notes

- **PNG or BMP only** — JPEG's lossy compression alters pixel values and destroys hidden data on save.
- **Avoid social platforms** — Twitter, WhatsApp, and similar services re-compress images on upload, corrupting the payload. Share the output file directly.
- **Encryption settings must match** — the password and encryption toggle used at decode must be identical to what was set at encode.
- **No password recovery** — AES-256 without the correct key is computationally infeasible to break. There is no fallback.

---

## Contributing

Contributions are welcome — bug fixes, new features, or documentation improvements.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full setup instructions, branch naming conventions, and the PR checklist.

**Quick steps:**
1. Fork the repo and create a branch: `git checkout -b feat/your-feature`
2. Commit using [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `chore:`
3. Open a Pull Request with a clear description of what changed and why

**New to the project?** Issues tagged [`good first issue`](https://github.com/<your-username>/StegoImage/issues?q=label%3A%22good+first+issue%22) are a great starting point.

To report a bug, [open an issue](https://github.com/<your-username>/StegoImage/issues/new) with steps to reproduce, your browser/OS, and any relevant console errors.

---

## License

MIT — free to use, modify, and distribute. See [LICENSE](./LICENSE) for details.