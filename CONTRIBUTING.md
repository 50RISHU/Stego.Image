# Contributing to Stego.Image

Welcome! We're glad you want to contribute. This guide is written for beginners — no experience needed.

---

## Before You Start

- You'll need [Git](https://git-scm.com) and [Node.js 18+](https://nodejs.org) installed
- Read this whole guide before opening your first PR

---

## Step 1 — Fork & Clone

1. Click **Fork** on the top right of this repo
2. Clone your fork to your computer:

```bash
git clone https://github.com/YOUR_USERNAME/stego.image.git
cd stego.image
npm install
npm run dev
```

---

## Step 2 — Create a Branch

Never work directly on `main`. Always create a new branch:

```bash
git checkout -b fix/my-bug-fix
```

Use one of these prefixes:

| Prefix | Use it for |
|--------|------------|
| `feat/` | Adding something new |
| `fix/` | Fixing a bug |
| `docs/` | Updating documentation |
| `chore/` | Small cleanup or config |

---

## Step 3 — Make Your Changes

- Keep changes **small and focused** — one fix or one feature per PR
- Test your changes in the browser before submitting
- Make sure `npm run build` runs without errors

---

## Step 4 — Commit Your Changes

Write a clear commit message that explains what you did:

```bash
git add .
git commit -m "fix: correct typo on encode page"
git push origin fix/my-bug-fix
```

**Good commit messages:**
```
feat: add file size warning before encoding
fix: prevent crash when image is too small
docs: fix broken link in README
```

**Bad commit messages:**
```
update stuff
fix
asdfgh
```

---

## Step 5 — Open a Pull Request

1. Go to your fork on GitHub
2. Click **Compare & pull request**
3. Fill in what you changed and why
4. Submit — a maintainer will review it

---

## Ground Rules

- **Be kind.** Everyone here is learning.
- **Ask before big changes.** Open an issue first if you want to redesign something major.
- **Don't add trackers or external APIs.** This app is 100% private and client-side — keep it that way.
- **One thing per PR.** Don't mix a bug fix with a new feature in the same PR.

---

## Not Sure Where to Start?

Look for issues tagged **`good first issue`** — these are picked specifically for new contributors.

If you're stuck, leave a comment on the issue and someone will help you.