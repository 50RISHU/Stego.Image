# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [1.1.0] - 2026-06-30

### Added
- Redesigned footer with a clean, GitHub-inspired interface.
- Dynamic application version display sourced from `package.json`.
- Quick access buttons for GitHub, MIT License, and Report Issue.
- Icons for footer action buttons.
- Version link that points to GitHub Releases.

### Changed
- Improved footer layout with concise project information.
- Implemented route-based footer visibility.
- Footer is now hidden on the Encode and Decode pages for a distraction-free workspace.
- Refactored footer hover effects for cleaner and more maintainable code.

### Fixed
- Corrected footer icon imports and rendering.
- Fixed hover interactions using `currentTarget`.
- Improved spacing, alignment, and responsiveness of footer elements.

## [1.0.0] - 2024-06-25

### Added
- AES-256 encryption with PBKDF2-SHA256 key derivation (100,000 iterations)
- DEFLATE compression via pako before encryption
- LSB steganography — embeds data in least significant bits of opaque pixels
- Encrypted metadata for plausible deniability — no plaintext embedded in image
- Magic byte verification ("STGO") on decode for wrong-password detection
- Any file type supported — PDF, ZIP, images, documents, media
- Image capacity indicator before encoding
- ZIP export for extracted files
- React error boundary — prevents blank screen on runtime errors
- Per-page meta tags via react-helmet-async
- 7 educational articles in Learn section
- Sitemap, robots.txt, and OG tags for SEO
- Dependabot configured for automated dependency updates