# Contributing to StegoImage

Thank you for helping improve this project. This guide is simple and beginner-friendly.

## Requirements

Make sure you have:

- [Git](https://git-scm.com)
- [Node.js 18+](https://nodejs.org)

## Installation

```bash
git clone https://github.com/50RISHU/Stego.Image.git
cd StegoImage
npm install
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

## Create a Branch

Never work directly on `main`. Create a new branch for your change.

```bash
git checkout -b fix/typo-on-encode-page
```

### Branch Naming Table

| Type | Use for | Example |
|------|---------|---------|
| `feat/` | New feature | `feat/add-image-preview` |
| `fix/` | Bug fix | `fix/encode-button-error` |
| `docs/` | Documentation | `docs/improve-contributing-guide` |
| `chore/` | Small cleanup | `chore/update-dependencies` |

## Make Your Changes

Keep changes small and focused.

- Fix one issue at a time
- Keep the code easy to read
- Test the app in the browser before submitting

## Commit Your Changes

After your changes, commit them with a clear message.

```bash
git status
git add .
git commit -m "fix: correct typo on encode page"
```

### Good Commit Message Examples

```text
feat: add file size warning before encoding
fix: prevent crash when image is too small
docs: improve contributor instructions
```

### Bad Commit Message Examples

```text
update stuff
fix
asdfgh
```

## Push and Open a Pull Request

```bash
git push origin fix/typo-on-encode-page
```

Then open a pull request on GitHub and explain:

- what you changed
- why you changed it
- how you tested it

## Guidelines

- Be respectful and kind
- Keep each pull request focused on one thing
- Do not add trackers, analytics, or external APIs without discussion
- Ask before making large design changes

## Need Help?

If you are stuck, ask for help in the issue or pull request. Small tasks like typo fixes, text improvements, or UI cleanup are a great place to start.