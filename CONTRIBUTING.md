# Contributing to Stego.Image

Contributions that improve functionality, security, performance, or documentation are welcome. Please read this guide before submitting.

---

## Setup

```bash
git clone https://github.com/<your-username>/StegoImage.git
cd StegoImage
npm install
npm run dev        # → http://localhost:5173
```

---

## Submitting a Change

```bash
git checkout -b feat/your-feature-name
git commit -m "feat: describe your change"
git push origin feat/your-feature-name
```

Open a **Pull Request** against `main`. Clearly describe what changed and why.

---

## Commit Prefixes

| Prefix | Purpose |
|--------|---------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `refactor:` | No behaviour change |
| `chore:` | Build or config |

---

## Guidelines

- One feature or fix per PR — keep changes focused.
- Follow the existing code structure and style.
- Avoid adding unnecessary dependencies.
- Ensure the app builds without errors before submitting.
- Update documentation if behaviour changes.

---

## Reporting Issues

Open a GitHub issue and include a description, steps to reproduce, and expected vs actual behaviour.

For **security vulnerabilities**, contact the maintainer privately instead of opening a public issue.

---

All contributions are licensed under the project's [MIT License](./LICENSE).