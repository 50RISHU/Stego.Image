# Contributing to Stego.Image

Contributions that improve functionality, security, performance, or documentation are welcome.

---

## Getting Started

```bash
# 1. Fork the repo, then clone your fork
git clone https://github.com/<your-username>/StegoImage.git
cd StegoImage

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
# → http://localhost:5173
```

---

## Workflow

```bash
# Create a focused branch
git checkout -b feature/your-feature-name

# Commit with a clear message
git commit -m "feat: short description of change"

# Push and open a Pull Request
git push origin feature/your-feature-name
```

Open a **Pull Request** against `main`. Describe what changed and why.

---

## Guidelines

- Keep changes focused — one feature or fix per PR.
- Follow the existing project structure and coding style.
- Do not introduce unnecessary dependencies.
- Ensure the app builds and runs without errors before submitting.
- Update relevant documentation when behaviour changes.

---

## Reporting Issues

Open a GitHub issue and include:

- A clear description of the problem
- Steps to reproduce
- Expected vs actual behaviour
- Screenshots or console logs if applicable

For **security vulnerabilities**, please open a private issue or contact the maintainer directly rather than disclosing publicly.

---

## Commit Convention

| Prefix | Use for |
|--------|---------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `refactor:` | Code change with no behaviour change |
| `chore:` | Build, config, or tooling |

---

All contributions are licensed under the project's existing [MIT License](./LICENSE).