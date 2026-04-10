# Stego.Image

A **client-side steganography web application** that securely hides and extracts files inside images using **AES-256 encryption**, **GZIP compression**, and **LSB steganography**.  
All processing happens **directly in the browser** — no server, no uploads, complete privacy.

**Live Demo:** https://stegoimage.pages.dev/

---

## What is Stego.Image?

**Stego.Image** combines **encryption and steganography** to hide sensitive files inside ordinary images.  
The hidden data is encrypted and requires a password to extract, providing **two layers of security**:

1. **Steganography** – hides the existence of the data  
2. **Encryption** – protects the data even if extracted

The resulting image looks identical to the original but secretly contains embedded information.

### Example Use Cases

- Secure document sharing
- Private file backups
- Hidden data transmission
- Privacy-focused file storage

---

## Features

- **AES-256 Encryption** – password-protected hidden files  
- **GZIP Compression** – reduces file size before embedding  
- **LSB Steganography** – invisible pixel-level data embedding  
- **Supports Any File Type** – documents, archives, images, media, etc.  
- **100% Client-Side** – no backend server required  
- **Fast Processing** – encoding and decoding in seconds  
- **Image Capacity Indicator** – shows available space  
- **ZIP Export** – download multiple extracted files together  
- **Drag-and-Drop UI** – easy file uploads

---

## How It Works

Stego.Image combines **three technologies** to hide files securely.

### 1️. Compression (GZIP)

The input file is compressed before embedding to reduce size and increase image capacity.

Library used: **pako**

---

### 2️. AES-256 Encryption

The compressed file is encrypted using a **password-derived key**.

- Industry-standard encryption
- Data cannot be read without the correct password
- Even extracted data remains protected

Library used: **crypto-js**

---

### 3️. LSB Steganography

The encrypted binary data is embedded in the **least significant bits of image pixels**.

- Each pixel contains RGB values
- The last bit of each channel stores hidden data
- Changes are **invisible to the human eye**

---

## Security Model

Stego.Image provides **multiple layers of protection**.

### Encryption
- AES-256 symmetric encryption
- Password-derived keys
- Data unreadable without correct password

### Steganography
- Hidden within pixel bits
- Image appearance unchanged
- Hidden data not visible to normal viewers

### Privacy

- All operations occur **in your browser**
- No files uploaded to servers
- No tracking or analytics
- No account required

---

## Tech Stack

| Category | Technology |
|--------|-------------|
| Framework | React |
| Build Tool | Vite |
| Styling | Bootstrap |
| Encryption | crypto-js |
| Compression | pako |
| File Download | file-saver |
| ZIP Support | jszip |
| File Upload | react-dropzone |
| Routing | react-router-dom |
| UUID | uuid |

---

## Project Structure

```

StegoImage
│
├── public
├── src
│   ├── components
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   │
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── Encode.jsx
│   │   ├── Decode.jsx
│   │   └── About.jsx
│   │
│   ├── utils
│   │   ├── stego.js
│   │   ├── encryption.js
│   │   ├── compression.js
│   │   ├── decode.js
│   │   └── downloadZip.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── package.json

```

---

## Supported File Types

Any binary file can be hidden, including:

- Documents (PDF, DOCX, TXT)
- Images (PNG, JPG, GIF)
- Archives (ZIP, RAR, 7z)
- Media files (MP3, MP4)
- Code files (JS, Python, JSON)

---

## Limitations

- Image must be large enough to store the data
- Works best with **PNG images**
- JPEG compression may reduce reliability
- Password cannot be recovered if lost

---

## Legal Notice

This tool is intended for **legal and ethical use only**, such as:

- personal privacy
- secure data sharing
- educational purposes

Users are responsible for complying with local laws.

---

## Contributing

Contributions are welcome!  
See **CONTRIBUTING.md** for development setup and contribution guidelines.

---

## License

This project is licensed under the **MIT License**.

---

If you find this project useful, consider **starring the repository**.

