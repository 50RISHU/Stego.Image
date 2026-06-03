<p align="center">
  <img src="public/logo.png" alt="Stego.Image" width="80" />
</p>

<h1 align="center">Stego.Image</h1>

<p align="center">
  Hide any file inside an image — encrypted, compressed, and invisible to the human eye.<br/>
  100% client-side. No servers. No uploads. Your data never leaves your device.
</p>

## Badges

<p align="center">
  <a href="https://stegoimage.pages.dev/"><img src="https://img.shields.io/badge/🌐 Live Demo-stegoimage.pages.dev-blue?style=flat-square" /></a>
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite" />
  <img src="https://img.shields.io/badge/status-active-brightgreen?style=flat-square" />
</p>

---

## Introduction

Stego.Image is a secure, client-side steganography tool that lets you hide any file inside an image with AES-256 encryption and GZIP compression. Perfect for privacy-conscious users who need a simple way to conceal sensitive files. All operations run entirely in your browser — no data ever touches a server.

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

## Security

Stego.Image applies **defense in depth** — two independent protections stack on top of each other.

| Layer | Technology | What It Protects Against |
|---|---|---|
| Steganography | LSB pixel embedding | Casual detection — the hidden file is invisible |
| Encryption | AES-256 + password | Content exposure — data is unreadable without the key |

Even if someone suspects an image contains hidden data and successfully extracts the raw bytes, they still cannot read the content without the correct password. Both layers must be defeated independently.

> **Privacy note:** All cryptographic operations run entirely in your browser using the `crypto-js`. No key material, plaintext, or file content is ever transmitted anywhere.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

You are free to use, modify, and distribute this software for personal and commercial purposes, provided you include the original license notice.
