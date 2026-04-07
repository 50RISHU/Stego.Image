# 🖼️ Stego.Image

A powerful **client-side steganography web app** that allows users to **hide and extract any file inside an image securely** using encryption and compression.

Working Link :- [Click here to see live Demo](https://stegoimage.pages.dev/)

---

## 🚀 Features

* 🔐 **Password Protection**
  Secure hidden data using AES encryption

* 📦 **File Compression**
  Reduce file size before embedding using gzip

* 🖼️ **Image Steganography (LSB)**
  Hide data inside image pixels without visible changes

* 📂 **Supports Any File Type**
  (PDF, ZIP, TXT, Images, etc.)

* 🔓 **Data Extraction**
  Retrieve hidden files using the correct password

* 🌐 **100% Frontend (No Backend)**
  All processing happens in the browser

---

## 🧠 How It Works

### 🔒 Encoding Process

```
File → Compress → Encrypt → Convert to Binary → Hide in Image (LSB)
```

### 🔓 Decoding Process

```
Image → Extract Binary → Decrypt → Decompress → Original File
```

---

## 🛠️ Tech Stack

* ⚛️ React (Vite)
* 🎨 Bootstrap
* 🔐 crypto-js (AES Encryption)
* 📦 pako (Compression)
* 💾 file-saver


---

## 📋 Project Structure

```
src/
├── components/
│   ├── Footer.jsx       # Footer component
│   └── Navbar.jsx       # Navigation bar component
├── pages/
│   ├── Home.jsx         # Landing page
│   ├── Encode.jsx       # Data hiding interface
│   ├── Decode.jsx       # Data extraction interface
│   └── About.jsx        # Project information page
├── utils/
│   ├── stego.js         # LSB steganography implementation
│   ├── encryption.js    # AES encryption/decryption
│   ├── compression.js   # File compression/decompression
│   ├── decode.js        # Data extraction logic
│   └── downloadZip.js   # File download utilities
├── App.jsx              # Main application component
├── main.jsx             # React entry point
├── App.css              # Application styles
└── index.css            # Global styles
```

---

## 🔐 Security Features

### Encryption
* **AES-256 Encryption** via crypto-js library
* Password-based key derivation for enhanced security
* Each file is encrypted before embedding
* Encrypted data is unreadable without the correct password

### Data Protection
* **Client-side processing**: All operations occur in your browser
* **No server storage**: Your files never leave your device
* **No logs or tracking**: Complete privacy guaranteed
* **GZIP Compression**: Reduces file size and data redundancy

### LSB (Least Significant Bit) Steganography
* Embeds data in the least significant bits of image pixels
* Changes are invisible to the human eye
* Works with PNG, JPEG, and other image formats
* Capacity depends on image dimensions

---

## 📊 File Capacity & Limitations

* **Maximum file size**: Limited by image dimensions
  - Formula: `(Image Width × Image Height × 3) / 8 bytes` (approximately)
  - Example: A 1000×1000 PNG can hide ~375 KB of compressed data
* **Compression ratio**: Typically 60-70% reduction in file size
* **Image quality**: LSB modifications are imperceptible
* **Supported image formats**: PNG (recommended), JPEG, BMP, WebP

---

## 💾 Supported File Types

The application supports hiding **any file type**, including:
- 📄 Documents (PDF, DOCX, TXT, etc.)
- 🖼️ Images (PNG, JPG, GIF, etc.)
- 📦 Archives (ZIP, RAR, 7z, etc.)
- 🎵 Media files (MP3, MP4, etc.)
- ⚙️ Code files (JS, Python, etc.)
- 📊 Data files (JSON, CSV, etc.)

---

## 📌 Usage Guide

### 🔹 Encoding (Hiding Data in Image)

1. Navigate to the **Encode** page
2. **Select Image**: Choose a cover image (PNG recommended for best results)
3. **Select File**: Pick the file you want to hide (ensure it fits within image capacity)
4. **Enter Password**: Set a strong password (minimum recommended: 8 characters)
5. **Click Encode**: Wait for the encryption and embedding process
6. **Download**: Save the resulting stego image (looks identical to original)

**Tips:**
- Use larger images for bigger files
- Avoid editing the stego image after creation
- Remember your password - it cannot be recovered

---

### 🔹 Decoding (Extracting Hidden Data)

1. Navigate to the **Decode** page
2. **Upload Stego Image**: Select the image containing hidden data
3. **Enter Password**: Input the exact password used during encoding
4. **Click Decode**: The hidden data will be extracted and decompressed
5. **Download**: Save the recovered file

**Important:**
- Password is case-sensitive
- Wrong password will result in corrupted data
- Ensure the image hasn't been modified or re-encoded

---

## 🧪 How the Technology Works

### Least Significant Bit (LSB) Technique
- Each pixel in an image has RGB values (0-255)
- LSB steganography modifies the last bit of each color channel
- Human eyes cannot detect single-bit changes (~0.4% modification)
- Example: `11111111` becomes `11111110` (imperceptible change)

### Encryption Layer
- Original file is encrypted using AES-256 algorithm
- Encryption uses a password-derived key
- Encrypted data cannot be decrypted without the correct password
- Adds a layer of security even if stego image is compromised

### Compression Layer
- Files are compressed using GZIP before encryption
- Reduces storage requirements by 60-70%
- Allows larger files to fit in smaller images
- Transparent to the user

### Complete Flow
```
User File → Compression (GZIP) → Encryption (AES-256) → 
Binary Conversion → LSB Embedding → Stego Image
```

---

## ⚠️ Important Considerations

### Image Format Selection
- **PNG**: Recommended (lossless, preserves all data)
- **JPEG**: Use with caution (lossy compression may corrupt data)
- **BMP**: Works well but larger file sizes
- **WebP**: Good balance between size and quality

### Security Best Practices
- Use strong, unique passwords
- Don't share the stego image if you want to keep data secret
- Keep a backup of important files
- Test encoding/decoding before relying on it for critical data

### Data Loss Prevention
- The stego image will not show obvious signs of data corruption
- Ensure passwords are remembered or securely stored
- Test with sample files before hiding important data

---

## 🎯 Use Cases

* **Private Document Storage**: Hide sensitive documents in photos
* **Data Backup**: Store backup files covertly
* **Secure Communication**: Send hidden messages via images
* **Copyright Protection**: Embed metadata in images
* **Privacy Protection**: Keep personal information private

---

## 🌐 Live Demo

Try the application online: [Stego.Image Demo](https://stegoimage.pages.dev/)

---

## 🛠️ Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Frontend Framework | React (Vite) | Modern UI development |
| Styling | Bootstrap | Responsive design |
| Encryption | crypto-js | AES-256 encryption |
| Compression | pako | GZIP compression/decompression |
| File Operations | file-saver | Download functionality |

---

## 🚀 Performance

* **Encoding Speed**: Typically 1-5 seconds depending on file size
* **Decoding Speed**: Similar to encoding speed
* **Memory Usage**: Client-side processing (no server overhead)
* **Browser Compatibility**: Works on all modern browsers (Chrome, Firefox, Edge, Safari)

---

## 📝 License

This project is licensed under the MIT License.

---


**Disclaimer**: This tool is provided for educational and legitimate purposes. Users are responsible for ensuring their use complies with applicable laws and regulations.

---


## ⚠️ Limitations

* Image must be large enough to hold data
* Large files may fail due to capacity limits
* Works best with **PNG images**

---

## 📸 Screenshots

### Home
![alt text](image.png)

### Encode
![alt text](image-1.png)

### Decode
![alt text](image-2.png)

---

## License
This project is licensed under the MIT License.

---

## Support

If you like this project, consider giving it a ⭐ on GitHub!

---
