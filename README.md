# Stego.Image

![License](https://img.shields.io/badge/license-MIT-green) ![React](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-fast-purple) ![Status](https://img.shields.io/badge/status-active-success)

A **client-side steganography web application** that hides and extracts files inside images using **AES-256 encryption**, **GZIP compression**, and **LSB steganography**.

All processing happens **directly in the browser** — no servers, no uploads, complete privacy.

🌐 **Live Demo**  
https://stegoimage.pages.dev/

---

# About the Project

**Stego.Image** combines **steganography and encryption** to securely hide files inside ordinary images.

The hidden data:
- cannot be visually detected
- requires a **password** to extract
- remains **encrypted even if extracted**

This creates **two layers of security**:

1. **Steganography** → hides the existence of the data  
2. **Encryption** → protects the data itself

The output image looks identical to the original but secretly contains hidden information.

---

# Features

- **AES-256 Encryption** – password protected hidden files  
- **GZIP Compression** – reduces file size before embedding  
- **LSB Steganography** – invisible pixel-level data hiding  
- **Any File Type Supported** – PDF, ZIP, images, documents, media  
- **100% Client-Side** – no backend or server communication  
- **Fast Processing** – encode/decode in seconds  
- **Image Capacity Indicator** – shows available space  
- **ZIP Export** – download extracted files together  

---

# How It Works

Stego.Image combines **compression, encryption, and steganography**.

### Step 1 — Compression

The input file is compressed using **GZIP** to reduce size.

Library used: **pako**

---

### Step 2 — Encryption

The compressed file is encrypted using **AES-256 encryption**.

- Password-derived encryption key
- Data unreadable without password
- Industry-standard security

Library used: **crypto-js**

---

### Step 3 — LSB Steganography

Encrypted binary data is hidden in the **least significant bits of image pixels**.

Each pixel contains RGB values.

Example:

```

Original Pixel: 11001010
Modified Pixel: 11001011

```

The difference is **invisible to the human eye**.

---

# Supported File Types

Any binary file can be hidden inside an image, including:

- Documents (PDF, DOCX, TXT)
- Images (PNG, JPG, GIF)
- Archives (ZIP, RAR, 7z)
- Media files (MP3, MP4)
- Code files (JS, Python, JSON)

---

# Tech Stack

| Category | Technology |
|--------|-------------|
| Framework | React |
| Build Tool | Vite |
| Styling | Bootstrap |
| Encryption | crypto-js |
| Compression | pako |
| File Handling | file-saver |
| Archive Support | jszip |
| File Upload | react-dropzone |
| Routing | react-router-dom |
| Unique IDs | uuid |

---

# Contributing

Contributions are welcome.

Please read **CONTRIBUTING.md** for development setup and contribution guidelines.

---

# License

This project is licensed under the **MIT License**.

